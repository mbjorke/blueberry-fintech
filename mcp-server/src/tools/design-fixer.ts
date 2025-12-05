import { readFile, writeFile } from "fs/promises";
import path from "path";

interface Fix {
  line: number;
  original: string;
  fixed: string;
  rule: string;
  description: string;
}

interface FixResult {
  filePath: string;
  fixes: Fix[];
  applied: number;
  errors: string[];
}

/**
 * Automatically fixes common design system violations
 */
export async function fixDesignViolations(
  filePath: string,
  dryRun: boolean = false
): Promise<string> {
  try {
    const content = await readFile(filePath, "utf-8");
    const lines = content.split("\n");
    const fixes: Fix[] = [];

    // Apply all fixers
    fixColorTokens(lines, fixes);
    fixSpacingTokens(lines, fixes);
    fixTypographyTokens(lines, fixes);
    fixButtonHierarchy(lines, fixes);
    fixEmojis(lines, fixes);

    if (dryRun) {
      return formatDryRunReport(filePath, fixes);
    }

    // Apply fixes (in reverse order to preserve line numbers)
    const result = applyFixes(content, fixes);
    
    if (result.applied > 0) {
      await writeFile(filePath, result.content, "utf-8");
    }

    return formatFixReport(filePath, fixes, result.applied, result.errors);
  } catch (error) {
    return `Error fixing violations: ${error instanceof Error ? error.message : String(error)}`;
  }
}

function fixColorTokens(lines: string[], fixes: Fix[]): void {
  // Common color replacements
  const colorReplacements: Array<{
    pattern: RegExp;
    replacement: string;
    rule: string;
  }> = [
    // Hex colors to primary
    {
      pattern: /bg-\[#9b87f5\]/g,
      replacement: "bg-primary",
      rule: "color-token-usage",
    },
    {
      pattern: /bg-\[#8b5cf6\]/g,
      replacement: "bg-primary",
      rule: "color-token-usage",
    },
    // Hex colors to destructive
    {
      pattern: /bg-\[#ef4444\]/g,
      replacement: "bg-destructive",
      rule: "color-token-usage",
    },
    {
      pattern: /bg-\[#dc2626\]/g,
      replacement: "bg-destructive",
      rule: "color-token-usage",
    },
    {
      pattern: /bg-\[rgb\(239,68,68\)\]/g,
      replacement: "bg-destructive",
      rule: "color-token-usage",
    },
    // Hex colors to muted
    {
      pattern: /bg-\[#f3f4f6\]/g,
      replacement: "bg-muted",
      rule: "color-token-usage",
    },
    {
      pattern: /bg-\[#e5e7eb\]/g,
      replacement: "bg-muted",
      rule: "color-token-usage",
    },
    // Text colors
    {
      pattern: /text-\[#ffffff\]/g,
      replacement: "text-foreground",
      rule: "color-token-usage",
    },
    {
      pattern: /text-\[#000000\]/g,
      replacement: "text-foreground",
      rule: "color-token-usage",
    },
    {
      pattern: /text-\[hsl\(0,0%,50%\)\]/g,
      replacement: "text-muted-foreground",
      rule: "color-token-usage",
    },
    // Border colors
    {
      pattern: /border-\[#e5e7eb\]/g,
      replacement: "border-border",
      rule: "color-token-usage",
    },
  ];

  lines.forEach((line, index) => {
    colorReplacements.forEach(({ pattern, replacement, rule }) => {
      if (pattern.test(line)) {
        const fixed = line.replace(pattern, replacement);
        if (fixed !== line) {
          fixes.push({
            line: index + 1,
            original: line.trim(),
            fixed: fixed.trim(),
            rule,
            description: `Replace hardcoded color with token: ${replacement}`,
          });
        }
      }
    });
  });
}

function fixSpacingTokens(lines: string[], fixes: Fix[]): void {
  // Map common arbitrary spacing values to standard tokens
  const spacingReplacements: Array<{
    pattern: RegExp;
    replacement: string;
    rule: string;
  }> = [
    // Common non-standard values
    {
      pattern: /p-\[23px\]/g,
      replacement: "p-6",
      rule: "spacing-consistency",
    },
    {
      pattern: /gap-\[17px\]/g,
      replacement: "gap-4",
      rule: "spacing-consistency",
    },
    {
      pattern: /space-y-\[13px\]/g,
      replacement: "space-y-3",
      rule: "spacing-consistency",
    },
  ];

  // Pixel values to closest standard token (handled separately)
  const pixelSpacingPattern = /(p|m|gap|space-[xy])-\[(\d+)px\]/g;

  lines.forEach((line, index) => {
    // Handle simple string replacements
    spacingReplacements.forEach(({ pattern, replacement, rule }) => {
      if (pattern.test(line)) {
        const fixed = line.replace(pattern, replacement);
        if (fixed !== line) {
          fixes.push({
            line: index + 1,
            original: line.trim(),
            fixed: fixed.trim(),
            rule,
            description: `Replace arbitrary spacing with standard token`,
          });
        }
      }
    });

    // Handle pixel value replacements with function
    let match;
    while ((match = pixelSpacingPattern.exec(line)) !== null) {
      const prefix = match[1];
      const px = parseInt(match[2]);
      const standard = findClosestSpacing(px);
      const fixed = line.replace(match[0], `${prefix}-${standard}`);
      if (fixed !== line) {
        fixes.push({
          line: index + 1,
          original: line.trim(),
          fixed: fixed.trim(),
          rule: "spacing-consistency",
          description: `Replace arbitrary spacing ${match[0]} with standard token ${prefix}-${standard}`,
        });
      }
    }
  });
}

function fixTypographyTokens(lines: string[], fixes: Fix[]): void {
  // Map common arbitrary font sizes to standard tokens
  const typographyMap: Array<{
    pattern: RegExp;
    replacement: string;
    rule: string;
  }> = [
    // Common pixel values
    { pattern: /text-\[13px\]/g, replacement: "text-sm", rule: "typography-consistency" },
    { pattern: /text-\[14px\]/g, replacement: "text-sm", rule: "typography-consistency" },
    { pattern: /text-\[15px\]/g, replacement: "text-base", rule: "typography-consistency" },
    { pattern: /text-\[16px\]/g, replacement: "text-base", rule: "typography-consistency" },
    { pattern: /text-\[18px\]/g, replacement: "text-lg", rule: "typography-consistency" },
    { pattern: /text-\[20px\]/g, replacement: "text-xl", rule: "typography-consistency" },
    { pattern: /text-\[24px\]/g, replacement: "text-2xl", rule: "typography-consistency" },
    { pattern: /text-\[28px\]/g, replacement: "text-3xl", rule: "typography-consistency" },
    { pattern: /text-\[30px\]/g, replacement: "text-3xl", rule: "typography-consistency" },
    { pattern: /text-\[36px\]/g, replacement: "text-4xl", rule: "typography-consistency" },
  ];

  lines.forEach((line, index) => {
    typographyMap.forEach(({ pattern, replacement, rule }) => {
      if (pattern.test(line)) {
        const fixed = line.replace(pattern, replacement);
        if (fixed !== line) {
          fixes.push({
            line: index + 1,
            original: line.trim(),
            fixed: fixed.trim(),
            rule,
            description: `Replace arbitrary font size with standard token: ${replacement}`,
          });
        }
      }
    });
  });
}

function fixButtonHierarchy(lines: string[], fixes: Fix[]): void {
  // Find all Button components and count primary buttons
  const buttonLines: Array<{ line: number; content: string; isPrimary: boolean }> = [];
  
  lines.forEach((line, index) => {
    if (line.includes("<Button")) {
      // Explicitly check for primary: variant="default" or no variant attribute
      const hasVariant = line.includes('variant="');
      const isDefaultVariant = line.includes('variant="default"');
      const isPrimary = !hasVariant || isDefaultVariant;
      buttonLines.push({
        line: index + 1,
        content: line,
        isPrimary,
      });
      }
  });

  // If more than one primary button, convert extras to outline
  const primaryButtons = buttonLines.filter(b => b.isPrimary);
  if (primaryButtons.length > 1) {
    // Keep the first primary, convert others to outline
    for (let i = 1; i < primaryButtons.length; i++) {
      const button = primaryButtons[i];
      let fixed = button.content;
      
      if (button.content.includes('variant="default"')) {
        fixed = button.content.replace('variant="default"', 'variant="outline"');
      } else if (!button.content.includes('variant=')) {
        // Add variant="outline" before the closing >
        fixed = button.content.replace(/<Button([^>]*)>/, '<Button$1 variant="outline">');
      }
      
      if (fixed !== button.content) {
        fixes.push({
          line: button.line,
          original: button.content.trim(),
          fixed: fixed.trim(),
          rule: "button-hierarchy",
          description: `Convert primary button to outline variant (only 1 primary allowed per screen)`,
        });
      }
    }
  }
}

function fixEmojis(lines: string[], fixes: Fix[]): void {
  // Common emoji to icon mappings
  const emojiReplacements: Array<{
    emoji: string;
    icon: string;
    rule: string;
  }> = [
    { emoji: "❤️", icon: "Heart", rule: "no-emojis" },
    { emoji: "⭐", icon: "Star", rule: "no-emojis" },
    { emoji: "✅", icon: "Check", rule: "no-emojis" },
    { emoji: "🎉", icon: "PartyPopper", rule: "no-emojis" },
    { emoji: "🐛", icon: "Bug", rule: "no-emojis" },
    { emoji: "🔍", icon: "Search", rule: "no-emojis" },
    { emoji: "⚙️", icon: "Settings", rule: "no-emojis" },
    { emoji: "📝", icon: "FileText", rule: "no-emojis" },
    { emoji: "🔔", icon: "Bell", rule: "no-emojis" },
    { emoji: "👤", icon: "User", rule: "no-emojis" },
    { emoji: "🏠", icon: "Home", rule: "no-emojis" },
    { emoji: "📊", icon: "BarChart", rule: "no-emojis" },
    { emoji: "💰", icon: "DollarSign", rule: "no-emojis" },
    { emoji: "🛒", icon: "ShoppingCart", rule: "no-emojis" },
    { emoji: "📧", icon: "Mail", rule: "no-emojis" },
    { emoji: "👍", icon: "ThumbsUp", rule: "no-emojis" },
    { emoji: "👎", icon: "ThumbsDown", rule: "no-emojis" },
    { emoji: "🔥", icon: "Flame", rule: "no-emojis" },
    { emoji: "💡", icon: "Lightbulb", rule: "no-emojis" },
    { emoji: "✨", icon: "Sparkles", rule: "no-emojis" },
    { emoji: "🎯", icon: "Target", rule: "no-emojis" },
    { emoji: "🚀", icon: "Rocket", rule: "no-emojis" },
    { emoji: "💪", icon: "Zap", rule: "no-emojis" },
    { emoji: "🌟", icon: "Star", rule: "no-emojis" },
    { emoji: "💯", icon: "Award", rule: "no-emojis" },
  ];

  lines.forEach((line, index) => {
    let fixed = line;
    let hasChanges = false;
    const foundEmojis: Array<{ emoji: string; icon: string }> = [];

    // Check for each emoji
    for (const { emoji, icon } of emojiReplacements) {
      if (line.includes(emoji)) {
        foundEmojis.push({ emoji, icon });
        // Remove emoji from line (will be replaced with icon component)
        fixed = fixed.replace(emoji, "");
        hasChanges = true;
      }
    }

    if (hasChanges && foundEmojis.length > 0) {
      // Note: This is a simple replacement - manual review needed for proper JSX structure
      const icons = foundEmojis.map(f => f.icon).join(", ");
      fixes.push({
        line: index + 1,
        original: line.trim(),
        fixed: fixed.trim(),
        rule: "no-emojis",
        description: `Replace emoji(s) with Lucide React icon(s): ${icons}. Import: import { ${icons} } from "lucide-react";`,
      });
    }
  });
}

function findClosestSpacing(px: number): string {
  // Standard spacing scale in pixels (4px base unit)
  const spacingMap: Record<number, string> = {
    0: "0",
    2: "0.5",
    4: "1",
    8: "2",
    12: "3",
    16: "4",
    20: "5",
    24: "6",
    32: "8",
    40: "10",
    48: "12",
    64: "16",
    80: "20",
    96: "24",
    128: "32",
  };

  // Find closest value
  const keys = Object.keys(spacingMap).map(Number).sort((a, b) => a - b);
  let closest = keys[0];
  let minDiff = Math.abs(px - closest);

  for (const key of keys) {
    const diff = Math.abs(px - key);
    if (diff < minDiff) {
      minDiff = diff;
      closest = key;
    }
  }

  return spacingMap[closest];
}

function applyFixes(content: string, fixes: Fix[]): { content: string; applied: number; errors: string[] } {
  const lines = content.split("\n");
  const errors: string[] = [];
  let applied = 0;

  // Sort fixes by line number (descending) to preserve line numbers
  const sortedFixes = [...fixes].sort((a, b) => b.line - a.line);

  for (const fix of sortedFixes) {
    try {
      const lineIndex = fix.line - 1;
      if (lineIndex >= 0 && lineIndex < lines.length) {
        const originalLine = lines[lineIndex];
        // Preserve leading whitespace/indentation from original line
        const leadingWhitespace = originalLine.match(/^\s*/)?.[0] || '';
        // Apply the fix while preserving indentation
        lines[lineIndex] = leadingWhitespace + fix.fixed.trim();
        applied++;
      } else {
        errors.push(`Line ${fix.line} out of range`);
      }
    } catch (error) {
      errors.push(`Error applying fix at line ${fix.line}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  return {
    content: lines.join("\n"),
    applied,
    errors,
  };
}

function formatDryRunReport(filePath: string, fixes: Fix[]): string {
  let report = `# Design System Fixes (Dry Run)\n\n`;
  report += `**File:** ${filePath}\n\n`;
  report += `**Total fixes found:** ${fixes.length}\n\n`;

  if (fixes.length === 0) {
    report += `✅ No fixes needed! File follows design system guidelines.\n`;
    return report;
  }

  // Group fixes by rule
  const fixesByRule: Record<string, Fix[]> = {};
  fixes.forEach(fix => {
    if (!fixesByRule[fix.rule]) {
      fixesByRule[fix.rule] = [];
    }
    fixesByRule[fix.rule].push(fix);
  });

  report += `## Fixes by Rule\n\n`;

  for (const [rule, ruleFixes] of Object.entries(fixesByRule)) {
    report += `### ${rule}\n`;
    report += `**Count:** ${ruleFixes.length}\n\n`;

    for (const fix of ruleFixes) {
      report += `**Line ${fix.line}:**\n`;
      report += `- **Original:** \`${fix.original}\`\n`;
      report += `- **Fixed:** \`${fix.fixed}\`\n`;
      report += `- **Description:** ${fix.description}\n\n`;
    }
  }

  report += `\n## Next Steps\n`;
  report += `Run without \`--dry-run\` to apply these fixes automatically.\n`;

  return report;
}

function formatFixReport(
  filePath: string,
  fixes: Fix[],
  applied: number,
  errors: string[]
): string {
  let report = `# Design System Fixes Applied\n\n`;
  report += `**File:** ${filePath}\n\n`;
  report += `**Fixes applied:** ${applied}\n`;
  report += `**Errors:** ${errors.length}\n\n`;

  if (applied === 0 && errors.length === 0) {
    report += `✅ No fixes needed! File follows design system guidelines.\n`;
    return report;
  }

  if (errors.length > 0) {
    report += `## Errors\n`;
    for (const error of errors) {
      report += `- ❌ ${error}\n`;
    }
    report += `\n`;
  }

  if (applied > 0) {
    // Group fixes by rule
    const fixesByRule: Record<string, Fix[]> = {};
    fixes.forEach(fix => {
      if (!fixesByRule[fix.rule]) {
        fixesByRule[fix.rule] = [];
      }
      fixesByRule[fix.rule].push(fix);
    });

    report += `## Applied Fixes\n\n`;

    for (const [rule, ruleFixes] of Object.entries(fixesByRule)) {
      report += `### ${rule}\n`;
      report += `**Fixed:** ${ruleFixes.length} violation(s)\n\n`;
    }

    report += `\n✅ File has been updated. Please review the changes.\n`;
  }

  return report;
}

