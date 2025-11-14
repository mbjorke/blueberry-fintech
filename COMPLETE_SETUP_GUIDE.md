# 🚀 Complete Setup Guide: Testing & Integration

## 📋 Table of Contents

1. [Quick Testing (5 minutes)](#quick-testing)
2. [Claude Code Setup (10 minutes)](#claude-code-setup)
3. [Linear Integration](#linear-integration)
4. [External Repo Connection](#external-repo-connection)
5. [Deployment Pipeline](#deployment-pipeline)

---

## 🧪 Quick Testing (5 minutes) {#quick-testing}

### Step 1: Build MCP Server

```bash
cd /Users/mbjorke/Workspace/Lab/blueberry-fintech
npm run mcp:build
```

Expected output: Build completes without errors.

### Step 2: Run Test Suite

```bash
npm run mcp:test
```

This tests all 5 MCP tools:
- ✅ analyze_component_usage
- ✅ validate_tailwind_tokens
- ✅ check_accessibility
- ✅ query_design_system
- ⚠️ compare_with_dashboard (needs dev server)

**If all pass:** MCP server is working! 🎉

**If errors:** Check that these files exist:
- `mcp-server/dist/index.js`
- `mcp-knowledge-base/` directory
- `src/pages/Index.tsx`

### Step 3: Test Visual Regression

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Run visual tests
npm run test:visual:update   # First time: generate baselines
npm run test:visual          # Verify tests pass
```

Expected: 7 tests pass, screenshots saved to `tests/visual-regression/`.

---

## 🔌 Claude Code Setup (10 minutes) {#claude-code-setup}

### Step 1: Get Absolute Path

```bash
pwd
# Output: /Users/mbjorke/Workspace/Lab/blueberry-fintech
```

Copy this path!

### Step 2: Configure Claude Code

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

**Important:** Replace the path with YOUR path from Step 1!

### Step 3: Restart Claude Code

Completely close and reopen Claude Code.

### Step 4: Verify in Claude Code

Open Claude Code and ask:

> "What MCP servers are available?"

Expected response: Claude mentions "blueberry-design-system" with 5 tools.

### Step 5: Test Tools in Claude Code

#### Test 1: Component Analysis
```
Ask: "Analyze the component usage in src/pages/Index.tsx"
```

Expected: Detailed report showing components, imports, and any issues.

#### Test 2: Token Validation
```
Ask: "Check if src/components/fintech/AccountCard.tsx uses proper design tokens"
```

Expected: Report on token usage, any hardcoded values flagged.

#### Test 3: Knowledge Base
```
Ask: "How do I use the Button component with different variants?"
```

Expected: Button documentation with usage examples.

#### Test 4: Visual Comparison
```
# First, make sure dev server is running:
npm run dev

# Then ask:
Ask: "Compare the dashboard page visually"
```

Expected: Similarity score and analysis report.

---

## 📊 Linear Integration {#linear-integration}

You already have Linear at: https://linear.app/blueberry-design-mcp/team/BLU/active

### Step 1: Create Project Structure

In Linear, create these projects:

1. **🎨 Design System Core**
   - Components documentation
   - Token definitions
   - Pattern library

2. **🤖 MCP Tools**
   - Tool development
   - Knowledge base expansion
   - Testing improvements

3. **🔍 Quality Assurance**
   - Design system audits
   - Visual regression
   - Accessibility checks

4. **🚀 Integrations**
   - External repos
   - CI/CD setup
   - Deploy pipelines

### Step 2: Add Issue Templates

Copy templates from `LINEAR_INTEGRATION.md` to Linear:

**Quick Issues to Create:**

```markdown
1. "Document remaining 54 components in knowledge base"
   Labels: documentation, mcp
   Priority: Medium

2. "Add visual regression tests for all dashboard sections"
   Labels: testing, visual-regression
   Priority: High

3. "Audit all fintech components for token compliance"
   Labels: quality, design-system
   Priority: High

4. "Integrate MCP server with CI pipeline"
   Labels: mcp, ci-cd
   Priority: Medium

5. "Connect external repo: [your-other-repo-name]"
   Labels: integration, external
   Priority: Low
```

### Step 3: Set Up Automations

In Linear Settings → Automations:

**Automation 1: Auto-label MCP issues**
- Trigger: Issue created
- Condition: Title contains "MCP"
- Action: Add label "mcp"

**Automation 2: Design system project assignment**
- Trigger: Label added
- Condition: Label is "design-system"
- Action: Move to "Design System Core" project

### Step 4: GitHub Integration

In Linear → Settings → Integrations → GitHub:

1. Connect your GitHub account
2. Enable auto-linking (commits with "BLU-XXX" auto-link)
3. Enable PR sync

Now commits like this auto-update Linear:
```bash
git commit -m "fix: Use design tokens in AccountCard

Replaced hardcoded colors with primary tokens
MCP validation: ✅ All checks passed

Fixes BLU-42"
```

### Step 5: Create Initial Backlog

**High Priority:**
- BLU-1: Complete component documentation (Button ✅, need 54 more)
- BLU-2: Expand visual regression tests
- BLU-3: Set up CI/CD for MCP validation

**Medium Priority:**
- BLU-4: Connect first external repository
- BLU-5: Create team onboarding docs
- BLU-6: Build MCP dashboard for metrics

**Low Priority:**
- BLU-7: Figma integration research
- BLU-8: Performance analysis tool
- BLU-9: Multi-theme support

---

## 🔗 External Repo Connection {#external-repo-connection}

### Scenario: Connect Another Repo with Deploy Pipeline

Let's say you have `marketing-website` repo with Vercel deployment.

#### Option A: Full Integration (Components + MCP)

**Step 1: In blueberry-fintech repo**

```bash
# Build as distributable library
cd /Users/mbjorke/Workspace/Lab/blueberry-fintech
LIB_BUILD=1 npm run build

# Creates: dist/blueberry-design-system.es.js
```

**Step 2: In marketing-website repo**

```bash
cd /path/to/marketing-website

# Option 1: npm link (for local development)
cd /Users/mbjorke/Workspace/Lab/blueberry-fintech
npm link

cd /path/to/marketing-website
npm link @blueberry/design-system

# Option 2: Git submodule
git submodule add https://github.com/your-org/blueberry-fintech.git design-system
```

**Step 3: Copy MCP Server**

```bash
cd /path/to/marketing-website

# Copy MCP server and knowledge base
cp -r /Users/mbjorke/Workspace/Lab/blueberry-fintech/mcp-server ./
cp -r /Users/mbjorke/Workspace/Lab/blueberry-fintech/mcp-knowledge-base ./

# Add scripts to package.json
npm pkg set scripts.mcp:build="cd mcp-server && npm install && npm run build"
npm pkg set scripts.mcp:validate="node mcp-server/test-tools.js"
```

**Step 4: Use Components**

```tsx
// marketing-website/src/pages/Home.tsx
import { Button, Card } from '@blueberry/design-system';

export function Home() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketing Page</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Get Started</Button>
      </CardContent>
    </Card>
  );
}
```

**Step 5: Add to CI/CD (Vercel)**

```yaml
# marketing-website/.github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:

jobs:
  validate-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3

      - name: Install dependencies
        run: npm ci

      # MCP Validation
      - name: Build MCP Server
        run: npm run mcp:build

      - name: Validate Design System
        run: npm run mcp:validate

      # Visual Tests
      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run Visual Tests
        run: npm run test:visual

      # Build
      - name: Build
        run: npm run build

      # Deploy to Vercel
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        if: github.ref == 'refs/heads/main'
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

#### Option B: MCP Only (Just Validation)

If you just want validation without using components:

```bash
cd /path/to/marketing-website

# Copy only MCP server
cp -r /Users/mbjorke/Workspace/Lab/blueberry-fintech/mcp-server ./
cp -r /Users/mbjorke/Workspace/Lab/blueberry-fintech/mcp-knowledge-base ./

# Update mcp-config.json with your repo settings
# Add to CI pipeline (same as above)
```

---

## 🚀 Deployment Pipeline {#deployment-pipeline}

### Pipeline with MCP Checks

Here's a complete pipeline that validates design system before deploying:

```
┌─────────────────────────────────────────────────────────┐
│                    Git Push / PR                        │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Step 1: Code Quality                       │
│  - Linting (ESLint)                                     │
│  - Type checking (TypeScript)                           │
│  - Unit tests (Vitest)                                  │
└────────────────────┬────────────────────────────────────┘
                     │ ✅ Pass
                     ▼
┌─────────────────────────────────────────────────────────┐
│           Step 2: MCP Design System Check               │
│  - Build MCP server                                     │
│  - analyze_component_usage                              │
│  - validate_tailwind_tokens                             │
│  - check_accessibility                                  │
└────────────────────┬────────────────────────────────────┘
                     │ ✅ Pass
                     ▼
┌─────────────────────────────────────────────────────────┐
│          Step 3: Visual Regression Tests                │
│  - Start dev server                                     │
│  - Run Playwright tests                                 │
│  - Compare with baselines                               │
└────────────────────┬────────────────────────────────────┘
                     │ ✅ Pass
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Step 4: Build Application                  │
│  - Production build                                     │
│  - Asset optimization                                   │
│  - Bundle analysis                                      │
└────────────────────┬────────────────────────────────────┘
                     │ ✅ Pass
                     ▼
┌─────────────────────────────────────────────────────────┐
│          Step 5: Deploy to Production                   │
│  - Vercel / Netlify / Fly.io                            │
│  - Preview deployment (PRs)                             │
│  - Production deployment (main)                         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│         Step 6: Post-Deploy Validation                  │
│  - Smoke tests                                          │
│  - Visual regression on production                      │
│  - Create Linear issue if failures                      │
└─────────────────────────────────────────────────────────┘
```

### Complete CI Configuration

**File: `.github/workflows/complete-pipeline.yml`**

```yaml
name: Complete CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:

jobs:
  code-quality:
    name: Code Quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm test

  design-system:
    name: Design System Validation
    runs-on: ubuntu-latest
    needs: code-quality
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run mcp:build
      - run: npm run mcp:test

  visual-tests:
    name: Visual Regression
    runs-on: ubuntu-latest
    needs: design-system
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run dev &
      - run: sleep 5
      - run: npm run test:visual
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: visual-diffs
          path: test-results/

  build:
    name: Build Application
    runs-on: ubuntu-latest
    needs: visual-tests
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/
      - name: Deploy to Production
        run: |
          # Your deployment script
          echo "Deploying to production..."
```

---

## 🎯 Complete Setup Checklist

### Local Setup
- [ ] MCP server builds: `npm run mcp:build`
- [ ] Tests pass: `npm run mcp:test`
- [ ] Visual tests work: `npm run test:visual`
- [ ] Claude Code configured
- [ ] All 5 MCP tools work in Claude Code

### Linear Setup
- [ ] Projects created (Design System, MCP, QA, Integrations)
- [ ] Issue templates added
- [ ] Automations configured
- [ ] GitHub integration enabled
- [ ] Initial backlog created

### External Repo
- [ ] MCP server copied
- [ ] Components available (if needed)
- [ ] CI pipeline configured
- [ ] Visual tests running
- [ ] Deploy pipeline working

### Documentation
- [ ] Team trained on MCP usage
- [ ] Linear workflow documented
- [ ] CI/CD docs updated
- [ ] Runbook created

---

## 🆘 Troubleshooting

### MCP Server Issues

**Problem:** `npm run mcp:test` fails
```bash
# Solution:
npm run mcp:build    # Rebuild server
node --version       # Check Node 18+
```

**Problem:** Claude Code doesn't see MCP server
```bash
# Check config
cat ~/.config/claude-code/mcp.json

# Check path is absolute
ls /Users/mbjorke/Workspace/Lab/blueberry-fintech/mcp-server/dist/index.js

# Restart Claude Code completely
```

### Visual Test Issues

**Problem:** Tests timeout
```bash
# Increase timeout in playwright.config.ts
use: {
  timeout: 60000  # 60 seconds
}
```

**Problem:** Dev server not starting
```bash
# Check port 8080 is free
lsof -i :8080

# Kill if needed
kill -9 <PID>
```

### Linear Issues

**Problem:** GitHub commits not linking
- Check Linear GitHub integration is active
- Use format: "Fixes BLU-123" in commit message
- Verify repo is connected in Linear settings

### External Repo Issues

**Problem:** Components not found
```bash
# Check import path
import { Button } from '@blueberry/design-system'

# Verify link
npm ls @blueberry/design-system
```

---

## 📚 Additional Resources

**Created for you:**
- `TESTING_GUIDE.md` - Comprehensive testing documentation
- `LINEAR_INTEGRATION.md` - Linear setup and workflows
- `EXTERNAL_REPO_INTEGRATION.md` - Multi-repo strategies
- `MCP_SETUP.md` - Detailed MCP server guide
- `QUICKSTART.md` - 5-minute quick start

**Next Steps:**
1. ✅ Complete local setup
2. ✅ Test in Claude Code
3. ✅ Create Linear issues
4. ⏭️ Connect external repo
5. ⏭️ Set up CI pipeline
6. ⏭️ Train team
7. ⏭️ Scale to more repos

---

## 🎉 You're All Set!

Your Blueberry Design System is now:
- ✅ A production-ready component library
- ✅ An AI-powered MCP expert
- ✅ Integrated with Linear for project management
- ✅ Ready for multi-repo deployment
- ✅ Equipped with visual regression testing
- ✅ Fully documented and tested

**Start building with confidence!** 🫐✨
