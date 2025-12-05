# Blueberry Design System MCP Server Setup

## Overview

This repository includes an MCP (Model Context Protocol) server that acts as an expert consultant on the Blueberry Design System. It provides tools for validating component usage, checking Tailwind tokens, performing visual regression testing, and querying design system documentation.

## What This MCP Server Does

The Blueberry Design System MCP Server is an AI-powered assistant that:

1. **Analyzes Component Usage** - Validates React components against design system guidelines
2. **Validates Design Tokens** - Ensures Tailwind CSS classes use proper design tokens
3. **Compares Against Dashboard** - Uses Playwright for visual regression testing
4. **Checks Accessibility** - Validates Radix UI accessibility patterns
5. **Answers Questions** - Queries the design system knowledge base

## Installation

### 1. Build the MCP Server

```bash
cd mcp-server
npm install
npm run build
```

### 2. Configure Claude Code

Add the MCP server to your Claude Code configuration:

**Location:** `~/.config/claude-code/mcp.json` (or your Claude Code config directory)

```json
{
  "mcpServers": {
    "blueberry-design-system": {
      "command": "node",
      "args": ["/absolute/path/to/blueberry/mcp-server/dist/index.js"],
      "env": {
        "BASE_URL": "http://localhost:8080"
      }
    }
  }
}
```

### 3. Restart Claude Code

The MCP server will now be available in your Claude Code sessions.

## Available Tools

### 1. `analyze_component_usage`

Analyzes React component files to ensure proper design system usage.

**Parameters:**
- `filePath` (required): Path to React component file
- `checkAgainst` (optional): Specific components to check

**Example:**
```typescript
analyze_component_usage({
  filePath: "./src/pages/NewPage.tsx",
  checkAgainst: ["Button", "Card"]
})
```

**What it checks:**
- Correct import paths (using `@/` alias)
- Proper component composition (e.g., CardTitle within CardHeader)
- Required props and variants
- Best practices from dashboard reference

### 2. `validate_tailwind_tokens`

Validates Tailwind CSS classes against design tokens.

**Parameters:**
- `filePath` (required): Path to file with Tailwind classes
- `strict` (optional): Enable strict mode (default: true)

**Example:**
```typescript
validate_tailwind_tokens({
  filePath: "./src/components/NewComponent.tsx",
  strict: true
})
```

**What it checks:**
- No hardcoded color values (hex, rgb, hsl)
- Spacing uses design system scale
- Typography uses defined sizes and weights
- No arbitrary Tailwind values without reason

### 3. `compare_with_dashboard`

Performs visual regression testing against the dashboard reference.

**Parameters:**
- `pageUrl` (required): URL path to test (e.g., "/new-page")
- `aspects` (optional): Specific aspects to compare
- `threshold` (optional): Visual diff threshold (default: 0.05)

**Example:**
```typescript
compare_with_dashboard({
  pageUrl: "/transactions",
  aspects: ["layout", "components", "colors"],
  threshold: 0.05
})
```

**What it checks:**
- Color palette consistency
- Component usage patterns
- Layout structure (grid/flexbox)
- Spacing consistency
- Typography hierarchy

**Note:** Requires development server running at `http://localhost:8080`

### 4. `check_accessibility`

Validates accessibility patterns and ARIA attributes.

**Parameters:**
- `filePath` (required): Path to component file
- `pageUrl` (optional): URL for live accessibility testing

**Example:**
```typescript
check_accessibility({
  filePath: "./src/components/Dialog.tsx"
})
```

**What it checks:**
- Radix UI accessibility attributes
- ARIA labels on interactive elements
- Image alt text
- Heading hierarchy
- Form labels
- Keyboard navigation support

### 5. `query_design_system`

Searches the design system knowledge base for documentation.

**Parameters:**
- `query` (required): Natural language question
- `category` (optional): Narrow search to category

**Example:**
```typescript
query_design_system({
  query: "How to use Button variants?",
  category: "components"
})
```

**Available categories:**
- `components` - UI and Fintech components
- `tokens` - Color, spacing, typography tokens
- `patterns` - Layout patterns and best practices
- `reference` - Dashboard reference implementation

## Usage Examples

### Validating a New Page

```typescript
// 1. Check component usage
const componentAnalysis = await analyze_component_usage({
  filePath: "./src/pages/AccountDetails.tsx"
});

// 2. Validate design tokens
const tokenValidation = await validate_tailwind_tokens({
  filePath: "./src/pages/AccountDetails.tsx"
});

// 3. Visual comparison with dashboard
const visualComparison = await compare_with_dashboard({
  pageUrl: "/account-details",
  threshold: 0.05
});

// 4. Check accessibility
const a11yCheck = await check_accessibility({
  filePath: "./src/pages/AccountDetails.tsx"
});
```

### Querying Documentation

```typescript
// Find Button usage examples
const buttonDocs = await query_design_system({
  query: "Button component variants",
  category: "components"
});

// Learn about color tokens
const colorDocs = await query_design_system({
  query: "primary color token",
  category: "tokens"
});

// Understand layout patterns
const layoutDocs = await query_design_system({
  query: "dashboard grid layout",
  category: "patterns"
});
```

## Knowledge Base Structure

The MCP server uses a comprehensive knowledge base located in `mcp-knowledge-base/`:

```
mcp-knowledge-base/
├── components/
│   ├── ui/              # 56 UI component docs
│   └── fintech/         # Fintech component docs
├── tokens/
│   ├── colors.md        # Color system
│   ├── spacing.md       # Spacing scale
│   └── typography.md    # Typography tokens
├── patterns/
│   └── dashboard-layout.md
└── reference/
    └── dashboard-spec.md
```

You can extend this knowledge base by adding new markdown files.

## Development

### Running the MCP Server Locally

```bash
cd mcp-server
npm run dev
```

### Adding New Tools

1. Create a new tool file in `mcp-server/src/tools/`
2. Implement the tool logic
3. Register it in `mcp-server/src/index.ts`

### Updating Knowledge Base

Add or update markdown files in `mcp-knowledge-base/` - the server automatically indexes them.

## Visual Regression Testing

### Setup Baseline Screenshots

Before using `compare_with_dashboard`, generate baseline screenshots:

```bash
# Start dev server
npm run dev

# Generate baselines (in separate terminal)
npx playwright test --update-snapshots
```

### Running Visual Tests

```bash
npx playwright test
```

Screenshots are stored in `tests/visual-regression/baselines/`.

## Troubleshooting

### MCP Server Not Found

- Check the absolute path in your MCP configuration
- Ensure `npm run build` completed successfully
- Restart Claude Code after configuration changes

### Visual Comparison Fails

- Ensure dev server is running at `http://localhost:8080`
- Check `BASE_URL` environment variable in MCP config
- Verify baseline screenshots exist

### Knowledge Base Queries Return No Results

- Check that `mcp-knowledge-base/` directory exists
- Ensure markdown files have content
- Verify the MCP server can read the knowledge base directory

## Extending for Other Projects

To use this MCP server for a different design system:

1. **Update Knowledge Base**: Replace content in `mcp-knowledge-base/` with your design system docs
2. **Configure Components**: Update component list in `component-analyzer.ts`
3. **Configure Tokens**: Update token definitions in `token-validator.ts`
4. **Set Reference Page**: Change dashboard URL in `visual-comparator.ts`
5. **Update Config**: Modify `mcp-config.json` with your project details

## Future Enhancements

Potential additions for the MCP server:

- AI-powered component generation based on design system
- Automatic code refactoring suggestions
- Integration with Figma for design-to-code validation
- Performance analysis and optimization recommendations
- Automated documentation generation from components
- Support for multiple design system versions
- Mock data generation based on component schemas

## Support

For issues or questions:
- Check the knowledge base: `query_design_system({ query: "your question" })`
- Review dashboard reference implementation
- See Storybook for component examples: `npm run storybook`
