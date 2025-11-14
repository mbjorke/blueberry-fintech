import { readFile } from "fs/promises";

const DESIGN_TOKENS = {
  colors: [
    "primary", "primary-foreground", "secondary", "secondary-foreground",
    "destructive", "destructive-foreground", "muted", "muted-foreground",
    "accent", "accent-foreground", "popover", "popover-foreground",
    "card", "card-foreground", "border", "input", "ring",
    "background", "foreground"
  ],
  spacing: ["0", "0.5", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "14", "16", "20", "24", "28", "32"],
  fontSize: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"],
  fontWeight: ["light", "normal", "medium", "semibold", "bold"],
  borderRadius: ["sm", "md", "lg", "xl", "2xl", "3xl", "full"],
};

interface TokenIssue {
  type: "color" | "spacing" | "typography" | "border";
  line: number;
  className: string;
  suggestion?: string;
  severity: "error" | "warning";
}

export async function validateTailwindTokens(
  filePath: string,
  strict: boolean = true
): Promise<string> {
  try {
    const content = await readFile(filePath, "utf-8");
    const lines = content.split("\n");

    const issues: TokenIssue[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNumber = i + 1;

      // Check for arbitrary values
      const arbitraryRegex = /className\s*=\s*["`']([^"`']*\[[^\]]+\][^"`']*)["`']/g;
      let match;

      while ((match = arbitraryRegex.exec(line)) !== null) {
        const className = match[1];
        const arbitraryMatches = className.match(/(\w+-\[[^\]]+\])/g);

        if (arbitraryMatches) {
          for (const arbClass of arbitraryMatches) {
            const issue = analyzeArbitraryValue(arbClass, lineNumber, strict);
            if (issue) issues.push(issue);
          }
        }
      }

      // Check for hardcoded color values
      checkHardcodedColors(line, lineNumber, issues);

      // Check for non-standard spacing
      checkNonStandardSpacing(line, lineNumber, issues, strict);
    }

    return formatTokenReport(filePath, issues, content);
  } catch (error) {
    return `Error validating tokens: ${error instanceof Error ? error.message : String(error)}`;
  }
}

function analyzeArbitraryValue(
  className: string,
  line: number,
  strict: boolean
): TokenIssue | null {
  // Color arbitrary values
  if (className.match(/^(bg|text|border)-\[/)) {
    const colorValue = className.match(/\[(#[0-9a-fA-F]{3,8}|rgb|hsl)/);
    if (colorValue) {
      return {
        type: "color",
        line,
        className,
        suggestion: "Use design system color tokens (e.g., bg-primary, text-foreground)",
        severity: "error",
      };
    }
  }

  // Spacing arbitrary values
  if (className.match(/^(p|m|gap|space)-\[/)) {
    return {
      type: "spacing",
      line,
      className,
      suggestion: "Use design system spacing scale (0-32)",
      severity: strict ? "error" : "warning",
    };
  }

  // Typography arbitrary values
  if (className.match(/^text-\[\d+px\]/)) {
    return {
      type: "typography",
      line,
      className,
      suggestion: "Use design system font sizes (text-xs to text-6xl)",
      severity: strict ? "error" : "warning",
    };
  }

  return null;
}

function checkHardcodedColors(line: string, lineNumber: number, issues: TokenIssue[]): void {
  // Check for hex colors in className
  const hexPattern = /#[0-9a-fA-F]{3,8}/g;
  if (hexPattern.test(line) && line.includes("className")) {
    issues.push({
      type: "color",
      line: lineNumber,
      className: line.trim(),
      suggestion: "Replace hardcoded hex colors with design tokens",
      severity: "error",
    });
  }
}

function checkNonStandardSpacing(
  line: string,
  lineNumber: number,
  issues: TokenIssue[],
  strict: boolean
): void {
  // Check for unusual spacing values
  const spacingPattern = /\b(p|m|gap|space)-(\d+)\b/g;
  let match;

  while ((match = spacingPattern.exec(line)) !== null) {
    const value = match[2];
    if (!DESIGN_TOKENS.spacing.includes(value)) {
      issues.push({
        type: "spacing",
        line: lineNumber,
        className: match[0],
        suggestion: `Use standard spacing values: ${DESIGN_TOKENS.spacing.slice(0, 10).join(", ")}...`,
        severity: strict ? "error" : "warning",
      });
    }
  }
}

function formatTokenReport(filePath: string, issues: TokenIssue[], content: string): string {
  let report = `# Tailwind Token Validation Report\n\n`;
  report += `**File:** ${filePath}\n\n`;

  const errors = issues.filter(i => i.severity === "error");
  const warnings = issues.filter(i => i.severity === "warning");

  report += `## Summary\n`;
  report += `- Errors: ${errors.length}\n`;
  report += `- Warnings: ${warnings.length}\n\n`;

  if (errors.length > 0) {
    report += `## Errors\n`;
    for (const error of errors) {
      report += `\n### Line ${error.line}\n`;
      report += `**Type:** ${error.type}\n`;
      report += `**Class:** \`${error.className}\`\n`;
      if (error.suggestion) {
        report += `**Suggestion:** ${error.suggestion}\n`;
      }
    }
    report += `\n`;
  }

  if (warnings.length > 0) {
    report += `## Warnings\n`;
    for (const warning of warnings) {
      report += `\n### Line ${warning.line}\n`;
      report += `**Type:** ${warning.type}\n`;
      report += `**Class:** \`${warning.className}\`\n`;
      if (warning.suggestion) {
        report += `**Suggestion:** ${warning.suggestion}\n`;
      }
    }
    report += `\n`;
  }

  if (issues.length === 0) {
    report += `✅ **All tokens valid!** No hardcoded values or non-standard tokens found.\n\n`;
    report += `## Token Usage Statistics\n`;
    report += generateTokenStats(content);
  }

  return report;
}

function generateTokenStats(content: string): string {
  let stats = "";

  // Count color token usage
  const colorTokens = DESIGN_TOKENS.colors;
  const colorUsage: Record<string, number> = {};

  for (const token of colorTokens) {
    const regex = new RegExp(`(bg|text|border)-${token}`, "g");
    const matches = content.match(regex);
    if (matches) {
      colorUsage[token] = matches.length;
    }
  }

  if (Object.keys(colorUsage).length > 0) {
    stats += "### Color Tokens\n";
    for (const [token, count] of Object.entries(colorUsage).sort((a, b) => b[1] - a[1])) {
      stats += `- ${token}: ${count} usage(s)\n`;
    }
  }

  return stats || "No token usage detected.\n";
}
