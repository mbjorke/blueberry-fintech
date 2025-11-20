import { readFile } from "fs/promises";
import path from "path";

interface ComponentUsage {
  name: string;
  imports: string[];
  props: Record<string, any>;
  location: { line: number; column: number };
}

const DESIGN_SYSTEM_COMPONENTS = [
  // UI Components
  "Button", "Card", "CardHeader", "CardTitle", "CardDescription", "CardContent", "CardFooter",
  "Input", "Label", "Select", "Checkbox", "RadioGroup", "Switch", "Slider",
  "Dialog", "AlertDialog", "Sheet", "Drawer", "Popover", "Tooltip", "HoverCard",
  "DropdownMenu", "ContextMenu", "Menubar", "NavigationMenu",
  "Table", "Badge", "Avatar", "Skeleton", "Progress", "Separator",
  "Accordion", "Tabs", "Collapsible", "ScrollArea", "AspectRatio",
  // Fintech Components
  "AccountCard", "TransactionItem", "TransactionDetailsModal", "SpendingInsights",
  "AlertsDropdown", "UserAvatar", "SidebarNav"
];

export async function analyzeComponentUsage(
  filePath: string,
  checkAgainst?: string[]
): Promise<string> {
  try {
    const content = await readFile(filePath, "utf-8");
    const componentsToCheck = checkAgainst || DESIGN_SYSTEM_COMPONENTS;

    const analysis = {
      filePath,
      imports: extractImports(content),
      componentUsages: extractComponentUsages(content, componentsToCheck),
      issues: [] as string[],
      suggestions: [] as string[],
    };

    // Analyze imports
    checkImportPaths(analysis);

    // Check for common issues
    checkPropsUsage(analysis, content);
    checkComposition(analysis, content);

    return formatAnalysisReport(analysis);
  } catch (error) {
    return `Error analyzing component usage: ${error instanceof Error ? error.message : String(error)}`;
  }
}

function extractImports(content: string): string[] {
  const importRegex = /import\s+(?:{[^}]+}|[\w]+)?\s*(?:,\s*{[^}]+})?\s*from\s+['"]([^'"]+)['"]/g;
  const imports: string[] = [];
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }

  return imports;
}

function extractComponentUsages(content: string, components: string[]): ComponentUsage[] {
  const usages: ComponentUsage[] = [];

  for (const component of components) {
    const regex = new RegExp(`<${component}([^>]*)>`, "g");
    let match;

    while ((match = regex.exec(content)) !== null) {
      const props = parseProps(match[1]);
      const lines = content.substring(0, match.index).split("\n");

      usages.push({
        name: component,
        imports: [],
        props,
        location: { line: lines.length, column: lines[lines.length - 1].length },
      });
    }
  }

  return usages;
}

function parseProps(propsString: string): Record<string, any> {
  const props: Record<string, any> = {};
  const propRegex = /(\w+)(?:=(?:{([^}]+)}|"([^"]+)"))?/g;
  let match;

  while ((match = propRegex.exec(propsString)) !== null) {
    const [, name, jsValue, stringValue] = match;
    props[name] = jsValue || stringValue || true;
  }

  return props;
}

function checkImportPaths(analysis: any): void {
  const correctUIPath = "@/components/ui";
  const correctFintechPath = "@/components/fintech";

  for (const importPath of analysis.imports) {
    if (importPath.includes("components/ui") && !importPath.startsWith("@/")) {
      analysis.issues.push(
        `❌ Use path alias: "${importPath}" should be "${correctUIPath}/..."`
      );
    }
    if (importPath.includes("components/fintech") && !importPath.startsWith("@/")) {
      analysis.issues.push(
        `❌ Use path alias: "${importPath}" should be "${correctFintechPath}/..."`
      );
    }
  }
}

function checkPropsUsage(analysis: any, content: string): void {
  // Check Button variant usage
  if (content.includes("<Button")) {
    const buttonUsages = analysis.componentUsages.filter((u: ComponentUsage) => u.name === "Button");

    for (const usage of buttonUsages) {
      if (!usage.props.variant) {
        analysis.suggestions.push(
          `💡 Button at line ${usage.location.line}: Consider specifying variant (default, destructive, outline, ghost)`
        );
      }
    }

    // Check button hierarchy (primary button overuse)
    checkButtonHierarchy(analysis, content, buttonUsages);
  }

  // Check Card structure
  if (content.includes("<Card>")) {
    if (!content.includes("<CardContent>")) {
      analysis.issues.push(
        "❌ Card should include CardContent for proper structure"
      );
    }
  }
}

function checkButtonHierarchy(analysis: any, content: string, buttonUsages: ComponentUsage[]): void {
  // Count primary buttons (default variant or no variant)
  const primaryButtons = buttonUsages.filter((u: ComponentUsage) => {
    const variant = u.props.variant;
    return !variant || variant === "default" || variant === '"default"';
  });

  // Count buttons by variant
  const variantCounts: Record<string, number> = {};
  buttonUsages.forEach((u: ComponentUsage) => {
    const variant = u.props.variant || "default";
    const cleanVariant = variant.replace(/"/g, "");
    variantCounts[cleanVariant] = (variantCounts[cleanVariant] || 0) + 1;
  });

  // Strict rule: Only 1 primary button per screen
  if (primaryButtons.length > 1) {
    const buttonLines = primaryButtons.map((b: ComponentUsage) => b.location.line).join(", ");
    analysis.issues.push(
      `❌ Button Hierarchy Violation: Found ${primaryButtons.length} primary buttons on this screen (lines: ${buttonLines}). ` +
      `Only 1 primary button should be visible per screen. Convert the others to 'outline' or 'ghost' variants to reduce cognitive overload and improve decision-making.`
    );
  } else if (primaryButtons.length === 1) {
    analysis.suggestions.push(
      `✅ Button Hierarchy: Found 1 primary button (line ${primaryButtons[0].location.line}). This follows the design rule.`
    );
  }

  // Provide variant usage summary
  if (Object.keys(variantCounts).length > 0) {
    const variantSummary = Object.entries(variantCounts)
      .map(([variant, count]) => `  - ${variant}: ${count}`)
      .join("\n");
    const primaryCount = variantCounts["default"] || 0;
    const message = primaryCount > 1 
      ? `\n⚠️ Remember: Only 1 primary button per screen total`
      : `\n💡 Remember: Use button hierarchy to guide user decisions (1 primary per screen)`;
    analysis.suggestions.push(
      `📊 Button Variant Usage:\n${variantSummary}${message}`
    );
  }
}

interface LogicalSection {
  type: string;
  startLine: number;
  endLine: number;
}

function detectLogicalSections(content: string): LogicalSection[] {
  const sections: LogicalSection[] = [];
  const lines = content.split("\n");
  
  let currentSection: { type: string; startLine: number } | null = null;
  let depth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // Detect Card sections
    if (line.includes("<Card") && !line.includes("</Card")) {
      if (currentSection) {
        sections.push({
          type: currentSection.type,
          startLine: currentSection.startLine,
          endLine: lineNum - 1,
        });
      }
      currentSection = { type: "Card", startLine: lineNum };
      depth = 1;
    }
    // Detect Dialog/Modal sections
    else if (line.includes("<Dialog") || line.includes("<AlertDialog") || line.includes("<Sheet")) {
      if (currentSection) {
        sections.push({
          type: currentSection.type,
          startLine: currentSection.startLine,
          endLine: lineNum - 1,
        });
      }
      currentSection = { type: "Dialog", startLine: lineNum };
      depth = 1;
    }
    // Detect form sections
    else if (line.includes("<form") || line.includes("<Form")) {
      if (currentSection) {
        sections.push({
          type: currentSection.type,
          startLine: currentSection.startLine,
          endLine: lineNum - 1,
        });
      }
      currentSection = { type: "Form", startLine: lineNum };
      depth = 1;
    }
    // Track depth for closing tags
    else if (line.includes("</Card>") || line.includes("</Dialog>") || line.includes("</form>")) {
      if (currentSection && depth === 1) {
        sections.push({
          type: currentSection.type,
          startLine: currentSection.startLine,
          endLine: lineNum,
        });
        currentSection = null;
      }
      if (depth > 0) depth--;
    }
    // Track opening tags
    else if (line.match(/<(Card|Dialog|form|Form)/) && !line.match(/<\/(Card|Dialog|form|Form)/)) {
      depth++;
    }
  }

  // Close any open section
  if (currentSection) {
    sections.push({
      type: currentSection.type,
      startLine: currentSection.startLine,
      endLine: lines.length,
    });
  }

  return sections;
}

function checkComposition(analysis: any, content: string): void {
  // Check for proper Card composition
  const cardPattern = /<Card>[\s\S]*?<\/Card>/g;
  const matches = content.match(cardPattern);

  if (matches) {
    for (const card of matches) {
      if (card.includes("<CardTitle>") && !card.includes("<CardHeader>")) {
        analysis.issues.push(
          "❌ CardTitle should be wrapped in CardHeader"
        );
      }
      if (card.includes("<Button") && !card.includes("<CardFooter>")) {
        analysis.suggestions.push(
          "💡 Consider placing action buttons in CardFooter for consistency"
        );
      }
    }
  }
}

function formatAnalysisReport(analysis: any): string {
  let report = `# Component Analysis Report\n\n`;
  report += `**File:** ${analysis.filePath}\n\n`;

  // Summary
  report += `## Summary\n`;
  report += `- Components used: ${analysis.componentUsages.length}\n`;
  report += `- Issues found: ${analysis.issues.length}\n`;
  report += `- Suggestions: ${analysis.suggestions.length}\n\n`;

  // Component Usage
  if (analysis.componentUsages.length > 0) {
    report += `## Components Used\n`;
    const componentCounts: Record<string, number> = {};
    for (const usage of analysis.componentUsages) {
      componentCounts[usage.name] = (componentCounts[usage.name] || 0) + 1;
    }
    for (const [name, count] of Object.entries(componentCounts)) {
      report += `- ${name}: ${count} usage(s)\n`;
    }
    report += `\n`;
  }

  // Issues
  if (analysis.issues.length > 0) {
    report += `## Issues\n`;
    for (const issue of analysis.issues) {
      report += `${issue}\n`;
    }
    report += `\n`;
  }

  // Suggestions
  if (analysis.suggestions.length > 0) {
    report += `## Suggestions\n`;
    for (const suggestion of analysis.suggestions) {
      report += `${suggestion}\n`;
    }
    report += `\n`;
  }

  // All clear
  if (analysis.issues.length === 0 && analysis.suggestions.length === 0) {
    report += `✅ **All checks passed!** Component usage follows design system guidelines.\n`;
  }

  return report;
}
