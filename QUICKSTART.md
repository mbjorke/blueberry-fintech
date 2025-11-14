# 🚀 Blueberry MCP Quick Start

Get your design system MCP agent running in 5 minutes!

## ⚡ Super Quick Start

```bash
# 1. Build MCP Server (one-time)
npm run mcp:build

# 2. Get absolute path
pwd
# Copy this path!

# 3. Configure Claude Code
# Edit: ~/.config/claude-code/mcp.json
# (See configuration below)

# 4. Restart Claude Code

# 5. Start using MCP tools!
```

## 📝 Step-by-Step Guide

### Step 1: Install Dependencies

```bash
cd blueberry-fintech
npm install
```

### Step 2: Build MCP Server

```bash
npm run mcp:build
```

This installs dependencies and compiles TypeScript for the MCP server.

### Step 3: Get Your Absolute Path

```bash
pwd
# Output: /Users/mbjorke/Workspace/Lab/blueberry-fintech
```

Copy this entire path!

### Step 4: Configure Claude Code

Create or edit `~/.config/claude-code/mcp.json`:

```json
{
  "mcpServers": {
    "blueberry-design-system": {
      "command": "node",
      "args": ["/Users/mbjorke/Workspace/Lab/blueberry-fintech/mcp-server/dist/index.js"],
      "env": {
        "BASE_URL": "http://localhost:8080"
      }
    }
  }
}
```

**Important:** Replace `/Users/mbjorke/Workspace/Lab/blueberry-fintech` with YOUR absolute path from Step 3!

### Step 5: Restart Claude Code

Close and reopen Claude Code for the MCP server to be recognized.

### Step 6: Test It!

Start your development server:

```bash
npm run dev
```

In Claude Code, try asking:

> "Can you analyze the component usage in src/pages/Index.tsx?"

Claude will use the `analyze_component_usage` tool automatically!

## 🧪 Testing the Tools

### 1. Component Analysis

Ask Claude:
> "Check if src/pages/Index.tsx follows our design system"

Tool used: `analyze_component_usage`

Expected output:
- List of components used
- Import path validation
- Composition pattern checks
- Suggestions for improvements

### 2. Token Validation

Ask Claude:
> "Are there any hardcoded colors in src/components/fintech/AccountCard.tsx?"

Tool used: `validate_tailwind_tokens`

Expected output:
- Color token validation
- Spacing scale checks
- List of any arbitrary values
- Token usage statistics

### 3. Visual Comparison

First, start dev server:
```bash
npm run dev
```

Then ask Claude:
> "Compare the dashboard page visually against the reference"

Tool used: `compare_with_dashboard`

Expected output:
- Similarity score
- Color palette analysis
- Layout structure comparison
- Specific recommendations

### 4. Accessibility Check

Ask Claude:
> "Check accessibility of src/components/ui/dialog.tsx"

Tool used: `check_accessibility`

Expected output:
- ARIA attribute validation
- Radix UI pattern checks
- Missing accessibility features
- Suggestions for improvements

### 5. Documentation Query

Ask Claude:
> "How do I use the Button component with different variants?"

Tool used: `query_design_system`

Expected output:
- Button component documentation
- Usage examples
- Variant options
- Dashboard examples

## 🔧 Troubleshooting

### MCP Server Not Found

**Problem:** Claude says "Tool not available"

**Solution:**
1. Check absolute path in mcp.json is correct
2. Verify mcp-server/dist/index.js exists
3. Run `npm run mcp:build` again
4. Restart Claude Code

### Visual Comparison Fails

**Problem:** `compare_with_dashboard` returns error

**Solutions:**
1. Start dev server: `npm run dev`
2. Check BASE_URL in mcp.json is `http://localhost:8080`
3. Verify page loads in browser first
4. Check Playwright is installed: `npx playwright --version`

### Knowledge Base Empty

**Problem:** `query_design_system` returns no results

**Solution:**
1. Verify mcp-knowledge-base directory exists
2. Check markdown files have content
3. Try broader search query
4. Use category filter: `category: "components"`

### Permission Errors

**Problem:** "Cannot read file" errors

**Solution:**
1. Check file paths are absolute
2. Verify MCP server has read permissions
3. Run from project root directory

## 📚 Example Workflows

### Validating a New Page

```bash
# 1. Create your new page
# src/pages/NewPage.tsx

# 2. Ask Claude in Claude Code:
```

> "I created a new page at src/pages/NewPage.tsx. Can you:
> 1. Check if components are used correctly
> 2. Validate the design tokens
> 3. Compare it visually with the dashboard
> 4. Check accessibility"

Claude will automatically use all 4 tools and provide a comprehensive report!

### Learning the Design System

Ask Claude:
> "What components are available in the design system?"

> "Show me examples of Card component usage"

> "What color tokens should I use for primary actions?"

> "How does the dashboard implement responsive layout?"

### Code Review

Ask Claude:
> "Review src/components/fintech/TransactionItem.tsx for:
> - Design system compliance
> - Token usage
> - Accessibility
> - Best practices"

## 🎯 Common Use Cases

### 1. Onboarding New Developers

New dev asks Claude:
> "I'm new to this project. Can you explain the design system and show me examples?"

### 2. Maintaining Consistency

Before PR, ask Claude:
> "Check all files I changed follow the design system"

### 3. Refactoring

Ask Claude:
> "Help me refactor this component to use proper design tokens"

### 4. Documentation

Ask Claude:
> "Generate documentation for how we use Cards in this project"

### 5. Visual Regression Testing

After changes, ask Claude:
> "Run visual tests to make sure I didn't break anything"

## 🚀 Next Steps

### Extend the Knowledge Base

Add more component documentation:

```bash
# Copy the template
cp mcp-knowledge-base/components/ui/button.md \
   mcp-knowledge-base/components/ui/input.md

# Edit with Input component details
```

### Add More Visual Tests

```bash
# Copy dashboard test
cp tests/visual-regression/dashboard.spec.ts \
   tests/visual-regression/new-page.spec.ts

# Edit for new page
```

### Create Custom Tools

Add a new tool in `mcp-server/src/tools/`:

```typescript
// custom-analyzer.ts
export async function analyzeCustom(params) {
  // Your custom logic
  return "Analysis report";
}
```

Register in `mcp-server/src/index.ts`.

## 💡 Pro Tips

### Tip 1: Use Claude Code Contextually

Include file contents in your prompt:
> "Here's my component file [paste code]. Does it follow our design system?"

### Tip 2: Combine Multiple Tools

Ask for comprehensive checks:
> "Full design system audit on this file: components, tokens, accessibility, and compare with dashboard"

### Tip 3: Reference Dashboard

Ask to compare against reference:
> "How does the dashboard implement this pattern? Show me examples."

### Tip 4: Generate Baselines

Before making changes:
```bash
npm run test:visual:update
```

This creates baseline screenshots to compare against.

### Tip 5: Iterate with MCP

1. Ask Claude to analyze
2. Get suggestions
3. Make changes
4. Ask Claude to verify
5. Repeat until perfect!

## 📊 Performance Tips

### Speed Up Visual Tests

```typescript
// In playwright.config.ts
use: {
  baseURL: 'http://localhost:8080',
  screenshot: 'only-on-failure',  // Faster!
}
```

### Cache Knowledge Base

The MCP server caches markdown files in memory for faster queries.

### Parallel Tool Execution

When possible, Claude will run multiple tools in parallel for faster results.

## 🎓 Learning Resources

**MCP Concepts:**
- [MCP Specification](https://modelcontextprotocol.io)
- [Claude Code Docs](https://docs.claude.com)

**Your Documentation:**
- `README.md` - Project overview
- `MCP_SETUP.md` - Detailed MCP guide
- `DESIGN_TOKENS.md` - Token specs
- `.github/MCP_ARCHITECTURE.md` - Architecture diagrams

**Interactive:**
- Storybook: `npm run storybook` → http://localhost:6006
- Dashboard: `npm run dev` → http://localhost:8080

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] MCP server builds without errors
- [ ] Claude Code shows blueberry-design-system in MCP servers list
- [ ] `analyze_component_usage` returns component analysis
- [ ] `validate_tailwind_tokens` checks tokens
- [ ] `query_design_system` finds documentation
- [ ] Dev server runs on port 8080
- [ ] `compare_with_dashboard` works with dev server running
- [ ] `check_accessibility` validates ARIA attributes

## 🆘 Getting Help

**In Claude Code:**
> "Search the Blueberry design system docs for [your question]"

Uses `query_design_system` to find answers in your knowledge base.

**Check Documentation:**
- Component docs: `mcp-knowledge-base/components/`
- Token specs: `mcp-knowledge-base/tokens/`
- Patterns: `mcp-knowledge-base/patterns/`
- Reference: `mcp-knowledge-base/reference/`

**Debug Mode:**
```bash
# Run MCP server with debug logging
cd mcp-server
npm run dev
```

## 🎉 You're Ready!

Your Blueberry Design System MCP Agent is now running!

Start building with confidence knowing your AI assistant will:
✅ Validate design system compliance
✅ Check accessibility
✅ Prevent design drift
✅ Answer documentation questions
✅ Perform visual regression testing

**Happy building! 🫐**
