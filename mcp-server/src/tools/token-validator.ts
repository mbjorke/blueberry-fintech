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
  type: "color" | "spacing" | "typography" | "border" | "emoji";
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

      // Check for typography violations
      checkTypographyViolations(line, lineNumber, issues, strict);

      // Check for emoji usage
      checkEmojiUsage(line, lineNumber, issues);
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

function checkTypographyViolations(
  line: string,
  lineNumber: number,
  issues: TokenIssue[],
  strict: boolean
): void {
  // Check for arbitrary font sizes
  const fontSizePattern = /text-\[(\d+)px\]/g;
  let match;

  while ((match = fontSizePattern.exec(line)) !== null) {
    const pxValue = parseInt(match[1]);
    issues.push({
      type: "typography",
      line: lineNumber,
      className: match[0],
      suggestion: `Use standard font size token (e.g., text-sm, text-base, text-lg) instead of ${match[0]}`,
      severity: strict ? "error" : "warning",
    });
  }

  // Check for arbitrary font weights
  const fontWeightPattern = /font-\[(\d+)\]/g;
  while ((match = fontWeightPattern.exec(line)) !== null) {
    issues.push({
      type: "typography",
      line: lineNumber,
      className: match[0],
      suggestion: `Use standard font weight token (e.g., font-normal, font-medium, font-semibold, font-bold)`,
      severity: strict ? "error" : "warning",
    });
  }
}

function checkEmojiUsage(
  line: string,
  lineNumber: number,
  issues: TokenIssue[]
): void {
  // Skip comments
  if (line.trim().startsWith("//") || line.trim().startsWith("*")) {
    return;
  }
  
  // Skip object literal mappings (like icon mapping objects: '🎯': Target,)
  // Pattern: 'emoji': ComponentName, or "emoji": ComponentName,
  const objectMappingPattern = /['"][\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]+['"]\s*:\s*[A-Z][a-zA-Z]*/u;
  if (objectMappingPattern.test(line)) {
    return; // This is a mapping object, skip
  }
  
  // Common emoji Unicode ranges (excluding currency symbols)
  // This covers most common emojis: faces, symbols, objects, etc.
  const emojiPattern = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{200D}]|[\u{203C}-\u{3299}]/gu;
  
  // Also check for common emoji characters (exclude currency symbols like €, £, $, ¥)
  const commonEmojis = /[❤️⭐✅🎉🐛🔍⚙️📝🔔👤🏠📊💰🛒📧👍👎🔥💡✨🎯🚀💪🌟💯]/gu;
  
  let match;
  const foundEmojis: string[] = [];
  
  // Check for Unicode emojis
  while ((match = emojiPattern.exec(line)) !== null) {
    foundEmojis.push(match[0]);
  }
  
  // Check for common emojis
  while ((match = commonEmojis.exec(line)) !== null) {
    if (!foundEmojis.includes(match[0])) {
      foundEmojis.push(match[0]);
    }
  }
  
  if (foundEmojis.length > 0) {
    const emojiList = foundEmojis.join(", ");
    const suggestion = getEmojiReplacementSuggestion(foundEmojis[0]);
    
    issues.push({
      type: "emoji",
      line: lineNumber,
      className: line.trim().substring(0, 50) + (line.length > 50 ? "..." : ""),
      suggestion: `Replace emoji(s) ${emojiList} with Lucide React icon: ${suggestion}`,
      severity: "error",
    });
  }
}

function getEmojiReplacementSuggestion(emoji: string): string {
  // Map common emojis to Lucide React icons
  const emojiToIcon: Record<string, string> = {
    "❤️": "Heart",
    "⭐": "Star",
    "✅": "Check",
    "🎉": "PartyPopper",
    "🐛": "Bug",
    "🔍": "Search",
    "⚙️": "Settings",
    "📝": "FileText",
    "🔔": "Bell",
    "👤": "User",
    "🏠": "Home",
    "📊": "BarChart",
    "💰": "DollarSign",
    "🛒": "ShoppingCart",
    "📧": "Mail",
    "👍": "ThumbsUp",
    "👎": "ThumbsDown",
    "🔥": "Flame",
    "💡": "Lightbulb",
    "✨": "Sparkles",
    "🎯": "Target",
    "🚀": "Rocket",
    "💪": "Zap",
    "🌟": "Star",
    "💯": "Award",
  };
  
  const icon = emojiToIcon[emoji];
  if (icon) {
    return `import { ${icon} } from "lucide-react"; <${icon} className="w-4 h-4" />`;
  }
  
  return "Use appropriate Lucide React icon from https://lucide.dev/icons/";
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
