import { readFile } from "fs/promises";

const RADIX_ACCESSIBILITY_PATTERNS = {
  Button: ["aria-label", "aria-pressed", "aria-expanded"],
  Dialog: ["aria-labelledby", "aria-describedby", "role"],
  Select: ["aria-label", "aria-labelledby"],
  Checkbox: ["aria-checked", "aria-label"],
  RadioGroup: ["aria-label", "role"],
  Switch: ["aria-checked", "aria-label"],
};

export async function checkAccessibility(
  filePath: string,
  pageUrl?: string
): Promise<string> {
  try {
    const content = await readFile(filePath, "utf-8");

    let report = `# Accessibility Check Report\n\n`;
    report += `**File:** ${filePath}\n\n`;

    const issues: string[] = [];
    const suggestions: string[] = [];
    const passed: string[] = [];

    // Check for Radix components
    checkRadixA11y(content, issues, suggestions, passed);

    // Check for general patterns
    checkGeneralA11y(content, issues, suggestions);

    // Report
    report += `## Summary\n`;
    report += `- Issues: ${issues.length}\n`;
    report += `- Suggestions: ${suggestions.length}\n`;
    report += `- Passed: ${passed.length}\n\n`;

    if (issues.length > 0) {
      report += `## Issues\n`;
      for (const issue of issues) {
        report += `${issue}\n`;
      }
      report += `\n`;
    }

    if (suggestions.length > 0) {
      report += `## Suggestions\n`;
      for (const suggestion of suggestions) {
        report += `${suggestion}\n`;
      }
      report += `\n`;
    }

    if (passed.length > 0) {
      report += `## Passed Checks\n`;
      for (const pass of passed) {
        report += `${pass}\n`;
      }
      report += `\n`;
    }

    if (issues.length === 0) {
      report += `✅ No accessibility issues detected!\n`;
    }

    return report;
  } catch (error) {
    return `Error checking accessibility: ${error instanceof Error ? error.message : String(error)}`;
  }
}

function checkRadixA11y(
  content: string,
  issues: string[],
  suggestions: string[],
  passed: string[]
): void {
  for (const [component, requiredAttrs] of Object.entries(RADIX_ACCESSIBILITY_PATTERNS)) {
    const componentRegex = new RegExp(`<${component}([^>]*)>`, "g");
    let match;

    while ((match = componentRegex.exec(content)) !== null) {
      const props = match[1];
      let hasAnyA11y = false;

      for (const attr of requiredAttrs) {
        if (props.includes(attr)) {
          hasAnyA11y = true;
          passed.push(`✅ ${component} has ${attr}`);
        }
      }

      if (!hasAnyA11y && component !== "Button") {
        issues.push(`❌ ${component} missing accessibility attributes (${requiredAttrs.join(", ")})`);
      }
    }
  }
}

function checkGeneralA11y(content: string, issues: string[], suggestions: string[]): void {
  // Check for images without alt text
  const imgRegex = /<img[^>]*>/gi;
  let match;

  while ((match = imgRegex.exec(content)) !== null) {
    if (!match[0].includes("alt=")) {
      issues.push(`❌ Image without alt text found`);
    }
  }

  // Check for buttons with just icons (need aria-label)
  const iconButtonRegex = /<Button[^>]*size="icon"[^>]*>/gi;
  while ((match = iconButtonRegex.exec(content)) !== null) {
    if (!match[0].includes("aria-label")) {
      suggestions.push(`💡 Icon button should have aria-label for screen readers`);
    }
  }

  // Check for form inputs with labels
  if (content.includes("<Input")) {
    if (!content.includes("<Label")) {
      suggestions.push(`💡 Inputs should have associated Label components`);
    }
  }

  // Check for proper heading hierarchy
  const headings = content.match(/<h[1-6][^>]*>/gi);
  if (headings) {
    let lastLevel = 0;
    for (const heading of headings) {
      const level = parseInt(heading.match(/h([1-6])/)?.[1] || "1");
      if (level > lastLevel + 1) {
        suggestions.push(`💡 Heading hierarchy skip detected (h${lastLevel} to h${level})`);
      }
      lastLevel = level;
    }
  }
}
