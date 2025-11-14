import { chromium, devices } from "@playwright/test";
import { readFile } from "fs/promises";
import path from "path";

const DASHBOARD_URL = "/";
const BASE_URL = process.env.BASE_URL || "http://localhost:8080";

export async function compareWithDashboard(
  pageUrl: string,
  aspects: string[] = ["layout", "components", "tokens", "spacing", "colors"],
  threshold: number = 0.05
): Promise<string> {
  let report = `# Visual Comparison Report\n\n`;
  report += `**Page:** ${pageUrl}\n`;
  report += `**Compared against:** Dashboard (${DASHBOARD_URL})\n`;
  report += `**Threshold:** ${(threshold * 100).toFixed(1)}%\n\n`;

  try {
    const browser = await chromium.launch();
    const context = await browser.newContext();

    // Analyze dashboard (reference)
    report += `## Analysis\n\n`;
    report += `### Dashboard Reference\n`;
    const dashboardAnalysis = await analyzePage(context, DASHBOARD_URL);
    report += formatPageAnalysis(dashboardAnalysis);

    // Analyze target page
    report += `\n### Target Page: ${pageUrl}\n`;
    const targetAnalysis = await analyzePage(context, pageUrl);
    report += formatPageAnalysis(targetAnalysis);

    // Compare
    report += `\n## Comparison Results\n\n`;
    const comparison = compareAnalyses(dashboardAnalysis, targetAnalysis, aspects);
    report += formatComparison(comparison);

    // Recommendations
    report += `\n## Recommendations\n\n`;
    report += generateRecommendations(comparison, threshold);

    await browser.close();

    return report;
  } catch (error) {
    return `Error performing visual comparison: ${error instanceof Error ? error.message : String(error)}\n\n` +
           `Make sure the development server is running at ${BASE_URL}`;
  }
}

async function analyzePage(context: any, url: string): Promise<any> {
  const page = await context.newPage();
  await page.goto(`${BASE_URL}${url}`, { waitUntil: "networkidle" });

  const analysis = {
    url,
    colors: await extractColors(page),
    spacing: await extractSpacing(page),
    typography: await extractTypography(page),
    components: await detectComponents(page),
    layout: await analyzeLayout(page),
  };

  await page.close();
  return analysis;
}

async function extractColors(page: any): Promise<string[]> {
  return await page.evaluate(() => {
    const colors = new Set<string>();
    const elements = document.querySelectorAll("*") as NodeListOf<Element>;

    elements.forEach((el: Element) => {
      const styles = window.getComputedStyle(el as HTMLElement);
      const bgColor = styles.backgroundColor;
      const textColor = styles.color;
      const borderColor = styles.borderColor;

      if (bgColor && bgColor !== "rgba(0, 0, 0, 0)") colors.add(bgColor);
      if (textColor) colors.add(textColor);
      if (borderColor) colors.add(borderColor);
    });

    return Array.from(colors);
  });
}

async function extractSpacing(page: any): Promise<Record<string, number>> {
  return await page.evaluate(() => {
    const spacing: Record<string, number> = { padding: 0, margin: 0, gap: 0 };
    const elements = document.querySelectorAll("*") as NodeListOf<Element>;

    elements.forEach((el: Element) => {
      const styles = window.getComputedStyle(el as HTMLElement);
      const padding = parseInt(styles.padding) || 0;
      const margin = parseInt(styles.margin) || 0;
      const gap = parseInt(styles.gap) || 0;

      spacing.padding += padding;
      spacing.margin += margin;
      spacing.gap += gap;
    });

    return spacing;
  });
}

async function extractTypography(page: any): Promise<string[]> {
  return await page.evaluate(() => {
    const fonts = new Set<string>();
    const elements = document.querySelectorAll("*") as NodeListOf<Element>;

    elements.forEach((el: Element) => {
      const styles = window.getComputedStyle(el as HTMLElement);
      const fontFamily = styles.fontFamily;
      const fontSize = styles.fontSize;
      const fontWeight = styles.fontWeight;

      if (fontFamily) fonts.add(`${fontFamily} / ${fontSize} / ${fontWeight}`);
    });

    return Array.from(fonts);
  });
}

async function detectComponents(page: any): Promise<string[]> {
  return await page.evaluate(() => {
    const components: string[] = [];
    const testIds = document.querySelectorAll("[data-testid]") as NodeListOf<Element>;

    testIds.forEach((el: Element) => {
      components.push(el.getAttribute("data-testid") || "");
    });

    return components;
  });
}

async function analyzeLayout(page: any): Promise<any> {
  return await page.evaluate(() => {
    return {
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      scrollHeight: document.documentElement.scrollHeight,
      containers: document.querySelectorAll('[class*="container"]').length,
      grids: document.querySelectorAll('[class*="grid"]').length,
      flexboxes: document.querySelectorAll('[style*="display: flex"], [class*="flex"]').length,
    };
  });
}

function formatPageAnalysis(analysis: any): string {
  let output = "";
  output += `- Colors used: ${analysis.colors.length}\n`;
  output += `- Components: ${analysis.components.length}\n`;
  output += `- Typography variants: ${analysis.typography.length}\n`;
  output += `- Layout: ${analysis.layout.grids} grids, ${analysis.layout.flexboxes} flexboxes\n`;
  return output;
}

function compareAnalyses(dashboard: any, target: any, aspects: string[]): any {
  const comparison: any = {
    score: 100,
    differences: [],
  };

  if (aspects.includes("colors")) {
    const colorDiff = Math.abs(dashboard.colors.length - target.colors.length);
    if (colorDiff > 5) {
      comparison.differences.push({
        aspect: "colors",
        message: `Color count differs by ${colorDiff}`,
        impact: colorDiff * 2,
      });
      comparison.score -= colorDiff * 2;
    }
  }

  if (aspects.includes("components")) {
    const componentDiff = dashboard.components.filter(
      (c: string) => !target.components.includes(c)
    );
    if (componentDiff.length > 0) {
      comparison.differences.push({
        aspect: "components",
        message: `Missing components from dashboard: ${componentDiff.join(", ")}`,
        impact: componentDiff.length * 5,
      });
      comparison.score -= componentDiff.length * 5;
    }
  }

  if (aspects.includes("layout")) {
    const gridDiff = Math.abs(dashboard.layout.grids - target.layout.grids);
    if (gridDiff > 2) {
      comparison.differences.push({
        aspect: "layout",
        message: `Grid usage differs significantly (${gridDiff} difference)`,
        impact: 10,
      });
      comparison.score -= 10;
    }
  }

  return comparison;
}

function formatComparison(comparison: any): string {
  let output = `**Similarity Score:** ${Math.max(0, comparison.score)}/100\n\n`;

  if (comparison.differences.length === 0) {
    output += `✅ No significant differences detected!\n`;
  } else {
    output += `**Differences Found:**\n\n`;
    for (const diff of comparison.differences) {
      output += `- **${diff.aspect}**: ${diff.message} (impact: -${diff.impact})\n`;
    }
  }

  return output;
}

function generateRecommendations(comparison: any, threshold: number): string {
  if (comparison.score >= (1 - threshold) * 100) {
    return `✅ Page design is consistent with dashboard reference.\n`;
  }

  let recs = `⚠️ Design inconsistencies detected:\n\n`;

  for (const diff of comparison.differences) {
    switch (diff.aspect) {
      case "colors":
        recs += `- Review color usage - ensure all colors come from design tokens\n`;
        break;
      case "components":
        recs += `- Add missing components or ensure proper data-testid attributes\n`;
        break;
      case "layout":
        recs += `- Review grid/flexbox usage - should match dashboard patterns\n`;
        break;
      case "spacing":
        recs += `- Check spacing values match design system scale\n`;
        break;
    }
  }

  return recs;
}
