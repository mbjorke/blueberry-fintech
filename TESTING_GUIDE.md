# Testing Your Blueberry MCP Server

## 🧪 Local Testing (Before Claude Code Setup)

### Method 1: Direct Tool Testing

Test each MCP tool independently before integrating with Claude Code:

#### 1. Create Test Script

```bash
# Create test file
cat > mcp-server/test-tools.ts << 'EOF'
import { analyzeComponentUsage } from './src/tools/component-analyzer.js';
import { validateTailwindTokens } from './src/tools/token-validator.js';
import { checkAccessibility } from './src/tools/accessibility-checker.js';
import { queryDesignSystem } from './src/tools/design-system-query.js';

async function testTools() {
  console.log('🧪 Testing MCP Tools...\n');

  // Test 1: Component Analysis
  console.log('1️⃣ Testing analyze_component_usage...');
  const componentResult = await analyzeComponentUsage(
    '../src/pages/Index.tsx'
  );
  console.log(componentResult);
  console.log('\n---\n');

  // Test 2: Token Validation
  console.log('2️⃣ Testing validate_tailwind_tokens...');
  const tokenResult = await validateTailwindTokens(
    '../src/pages/Index.tsx',
    true
  );
  console.log(tokenResult);
  console.log('\n---\n');

  // Test 3: Accessibility Check
  console.log('3️⃣ Testing check_accessibility...');
  const a11yResult = await checkAccessibility(
    '../src/components/ui/button.tsx'
  );
  console.log(a11yResult);
  console.log('\n---\n');

  // Test 4: Design System Query
  console.log('4️⃣ Testing query_design_system...');
  const queryResult = await queryDesignSystem(
    'How to use Button component?',
    'components'
  );
  console.log(queryResult);
  console.log('\n---\n');

  console.log('✅ All tests completed!');
}

testTools().catch(console.error);
EOF
```

#### 2. Run Test Script

```bash
cd mcp-server
npm run build
node dist/test-tools.js
```

Expected output: Each tool should return formatted reports.

### Method 2: MCP Inspector (Official Testing Tool)

Use the official MCP Inspector to test your server:

```bash
# Install MCP Inspector
npx @modelcontextprotocol/inspector mcp-server/dist/index.js
```

This opens a web UI where you can:
- See all available tools
- Test each tool with different parameters
- Inspect request/response messages
- Debug MCP protocol communication

### Method 3: Manual STDIO Testing

Test the MCP server directly via stdio:

```bash
cd mcp-server
node dist/index.js
```

Then send JSON-RPC messages (copy/paste):

```json
{"jsonrpc":"2.0","id":1,"method":"tools/list"}
```

Press Enter twice. You should see the list of 5 tools.

## 🔌 Testing with Claude Code

### Step 1: Build and Configure

```bash
# Build MCP server
npm run mcp:build

# Get absolute path
pwd
# Copy output: /Users/mbjorke/Workspace/Lab/blueberry-fintech
```

### Step 2: Configure Claude Code

Edit `~/.config/claude-code/mcp.json`:

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

### Step 3: Restart Claude Code

Close and reopen Claude Code completely.

### Step 4: Verify MCP Server is Loaded

In Claude Code, type:
> "What MCP servers are available?"

Claude should mention "blueberry-design-system" with 5 tools.

### Step 5: Test Each Tool

#### Test 1: Component Analysis
```
Prompt: "Analyze the component usage in src/pages/Index.tsx"
```

Expected: Report showing components used, imports, and suggestions.

#### Test 2: Token Validation
```
Prompt: "Check if src/components/fintech/AccountCard.tsx uses proper design tokens"
```

Expected: Token validation report with any hardcoded values flagged.

#### Test 3: Visual Comparison

First, start dev server:
```bash
npm run dev
```

Then in Claude Code:
```
Prompt: "Compare the dashboard page visually against the reference"
```

Expected: Similarity score and visual analysis report.

#### Test 4: Accessibility Check
```
Prompt: "Check accessibility of src/components/ui/dialog.tsx"
```

Expected: ARIA validation report.

#### Test 5: Knowledge Base Query
```
Prompt: "How do I use the Button component with different variants?"
```

Expected: Documentation excerpts from knowledge base.

## 🧪 Visual Regression Testing

### Generate Baseline Screenshots

```bash
# Start dev server
npm run dev

# In another terminal, generate baselines
npm run test:visual:update
```

This creates baseline screenshots in `tests/visual-regression/dashboard.spec.ts-snapshots/`.

### Run Visual Tests

```bash
npm run test:visual
```

Expected output: All tests pass (since you just generated baselines).

### Test Visual Changes

1. Make a visual change (e.g., change button color in code)
2. Run `npm run test:visual`
3. Playwright will show differences
4. Review HTML report: `npx playwright show-report`

## 📊 Test Checklist

Use this checklist to verify everything works:

### MCP Server Tests
- [ ] `npm run mcp:build` completes without errors
- [ ] Test script runs all 5 tools successfully
- [ ] MCP Inspector shows all 5 tools
- [ ] Server responds to stdio messages

### Claude Code Integration Tests
- [ ] MCP config file is correct
- [ ] Claude Code shows blueberry-design-system server
- [ ] `analyze_component_usage` returns analysis
- [ ] `validate_tailwind_tokens` checks tokens
- [ ] `query_design_system` finds documentation
- [ ] `check_accessibility` validates ARIA

### Visual Testing
- [ ] Dev server runs on port 8080
- [ ] Baseline screenshots generated
- [ ] Visual tests pass
- [ ] HTML report accessible

### End-to-End Test
- [ ] Ask Claude to do full design system audit
- [ ] All 5 tools execute successfully
- [ ] Reports are comprehensive and helpful

## 🐛 Debugging

### MCP Server Not Loading

Check logs:
```bash
# View Claude Code logs
tail -f ~/.local/state/claude-code/logs/mcp-*.log
```

### Tool Execution Fails

Test tool directly:
```bash
cd mcp-server
node -e "
import('./dist/tools/component-analyzer.js').then(m => {
  m.analyzeComponentUsage('../src/pages/Index.tsx').then(console.log)
})
"
```

### Visual Tests Timeout

Increase timeout in `playwright.config.ts`:
```typescript
use: {
  baseURL: 'http://localhost:8080',
  timeout: 60000, // 60 seconds
}
```

## 📝 Creating Test Cases

### For Linear Issues

When creating Linear issues, use this template:

```markdown
## Test Case

**Component/Page:** [name]
**Expected Behavior:** [description]
**MCP Tools to Use:**
- [ ] analyze_component_usage
- [ ] validate_tailwind_tokens
- [ ] compare_with_dashboard
- [ ] check_accessibility

**Acceptance Criteria:**
- [ ] All MCP checks pass
- [ ] Visual regression tests pass
- [ ] No accessibility violations
- [ ] Design tokens used correctly
```

## 🔄 Continuous Testing

### Pre-commit Hook

Add to `.git/hooks/pre-commit`:

```bash
#!/bin/bash

echo "🧪 Running design system checks..."

# Check if files changed include React components
if git diff --cached --name-only | grep -E '\.(tsx|ts)$' > /dev/null; then
  echo "📝 React files changed, running MCP checks..."

  # Build MCP server if needed
  if [ ! -f "mcp-server/dist/index.js" ]; then
    npm run mcp:build
  fi

  # Run visual tests
  npm run test:visual

  if [ $? -ne 0 ]; then
    echo "❌ Visual regression tests failed!"
    exit 1
  fi
fi

echo "✅ All checks passed!"
```

### CI Pipeline

Add to `.github/workflows/ci.yml`:

```yaml
- name: Visual Regression Tests
  run: |
    npm run dev &
    sleep 5
    npm run test:visual
```

## 🎯 Testing Workflow

### For New Features

1. **Create component/page**
2. **Ask Claude**: "Analyze this new component"
3. **Fix issues** from MCP reports
4. **Generate visual baseline**: `npm run test:visual:update`
5. **Commit changes**

### For Bug Fixes

1. **Identify issue**
2. **Ask Claude**: "Check if this follows design system"
3. **Fix with MCP guidance**
4. **Verify**: `npm run test:visual`
5. **Commit**

### For Refactoring

1. **Generate baseline before**: `npm run test:visual:update`
2. **Make changes**
3. **Ask Claude**: "Compare before/after"
4. **Run visual tests**: Should pass (no visual changes)
5. **Commit**

## 📈 Success Metrics

Track these to measure MCP effectiveness:

- **Design System Compliance**: % of components passing MCP checks
- **Accessibility Score**: % passing a11y checks
- **Token Usage**: % using design tokens vs hardcoded
- **Visual Consistency**: # of visual regression failures caught
- **Time Saved**: Hours saved on manual design review

## 🚀 Next Steps

After testing locally:

1. **Document findings** - What works, what needs improvement
2. **Create Linear issues** - For improvements or expansions
3. **Share with team** - Train others on MCP usage
4. **Integrate with CI** - Automate checks on PRs
5. **Expand knowledge base** - Add more component docs

Ready to integrate with Linear and external repos? See next sections!
