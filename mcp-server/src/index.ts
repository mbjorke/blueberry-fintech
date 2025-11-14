#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { analyzeComponentUsage } from "./tools/component-analyzer.js";
import { validateTailwindTokens } from "./tools/token-validator.js";
import { compareWithDashboard } from "./tools/visual-comparator.js";
import { checkAccessibility } from "./tools/accessibility-checker.js";
import { queryDesignSystem } from "./tools/design-system-query.js";

const server = new Server(
  {
    name: "@blueberry/design-system-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "analyze_component_usage",
      description: "Analyzes React component usage against the Blueberry Design System. Checks if components are used correctly, validates props, and suggests improvements.",
      inputSchema: {
        type: "object",
        properties: {
          filePath: {
            type: "string",
            description: "Path to the React component file to analyze",
          },
          checkAgainst: {
            type: "array",
            items: { type: "string" },
            description: "Optional: Specific component names to check (e.g., ['Button', 'Card'])",
          },
        },
        required: ["filePath"],
      },
    },
    {
      name: "validate_tailwind_tokens",
      description: "Validates that Tailwind CSS classes use proper design tokens from the Blueberry Design System. Flags hardcoded values and suggests token alternatives.",
      inputSchema: {
        type: "object",
        properties: {
          filePath: {
            type: "string",
            description: "Path to file containing Tailwind classes",
          },
          strict: {
            type: "boolean",
            description: "Enable strict mode - flag all non-token values (default: true)",
          },
        },
        required: ["filePath"],
      },
    },
    {
      name: "compare_with_dashboard",
      description: "Performs visual regression testing by comparing a page against the reference dashboard. Uses Playwright to capture screenshots and generate diff reports.",
      inputSchema: {
        type: "object",
        properties: {
          pageUrl: {
            type: "string",
            description: "URL path of the page to test (e.g., '/new-page')",
          },
          aspects: {
            type: "array",
            items: {
              type: "string",
              enum: ["layout", "components", "tokens", "spacing", "colors"],
            },
            description: "Specific aspects to compare (default: all)",
          },
          threshold: {
            type: "number",
            description: "Visual diff threshold 0-1 (default: 0.05 = 5%)",
          },
        },
        required: ["pageUrl"],
      },
    },
    {
      name: "check_accessibility",
      description: "Checks if Radix UI accessibility patterns are properly implemented. Validates ARIA attributes, keyboard navigation, and focus management.",
      inputSchema: {
        type: "object",
        properties: {
          filePath: {
            type: "string",
            description: "Path to component file to check",
          },
          pageUrl: {
            type: "string",
            description: "Optional: URL to test live accessibility with Playwright",
          },
        },
        required: ["filePath"],
      },
    },
    {
      name: "query_design_system",
      description: "Queries the Blueberry Design System knowledge base for component documentation, usage examples, token values, and best practices.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Natural language query (e.g., 'How to use Button component?')",
          },
          category: {
            type: "string",
            enum: ["components", "tokens", "patterns", "examples"],
            description: "Optional: Narrow search to specific category",
          },
        },
        required: ["query"],
      },
    },
  ],
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (!args) {
      throw new Error("Missing arguments");
    }

    switch (name) {
      case "analyze_component_usage": {
        const result = await analyzeComponentUsage(
          args.filePath as string,
          args.checkAgainst as string[] | undefined
        );
        return {
          content: [{ type: "text", text: result }],
        };
      }

      case "validate_tailwind_tokens": {
        const result = await validateTailwindTokens(
          args.filePath as string,
          args.strict !== false
        );
        return {
          content: [{ type: "text", text: result }],
        };
      }

      case "compare_with_dashboard": {
        const result = await compareWithDashboard(
          args.pageUrl as string,
          args.aspects as string[] | undefined,
          args.threshold as number | undefined
        );
        return {
          content: [{ type: "text", text: result }],
        };
      }

      case "check_accessibility": {
        const result = await checkAccessibility(
          args.filePath as string,
          args.pageUrl as string | undefined
        );
        return {
          content: [{ type: "text", text: result }],
        };
      }

      case "query_design_system": {
        const result = await queryDesignSystem(
          args.query as string,
          args.category as string | undefined
        );
        return {
          content: [{ type: "text", text: result }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [{ type: "text", text: `Error: ${errorMessage}` }],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Blueberry Design System MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
