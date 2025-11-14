# Linear Integration Guide

## 🔗 Connecting Blueberry MCP to Linear

You have Linear at https://linear.app/blueberry-design-mcp/team/BLU/active - here's how to integrate your design system with it.

## 📋 Linear Project Structure

### Recommended Team Setup

Create these Linear projects/views:

```
Team: BLU (Blueberry Design System)

Projects:
├── 🎨 Design System Core
│   ├── Components
│   ├── Tokens
│   └── Documentation
├── 🤖 MCP Tools
│   ├── Tool Development
│   ├── Knowledge Base
│   └── Testing
├── 🔍 Quality Assurance
│   ├── Visual Regression
│   ├── Accessibility
│   └── Token Compliance
└── 🚀 Integrations
    ├── External Repos
    ├── CI/CD
    └── Deploy Pipelines
```

## 📝 Issue Templates

### 1. Component Documentation Issue

**Title:** Document [Component Name] in Knowledge Base

**Labels:** `documentation`, `mcp`, `knowledge-base`

**Template:**
```markdown
## Component
[Component Name]

## Location
src/components/ui/[component].tsx

## Tasks
- [ ] Create markdown doc in mcp-knowledge-base/components/ui/
- [ ] Document all variants and props
- [ ] Add usage examples
- [ ] Reference dashboard usage
- [ ] Add to MCP knowledge base
- [ ] Test with query_design_system tool

## MCP Validation
- [ ] Tool can find component docs
- [ ] Examples are clear and accurate
- [ ] Links to reference implementation work

## Acceptance Criteria
- [ ] Documentation complete and accurate
- [ ] MCP tool returns relevant results
- [ ] Code examples are tested
```

### 2. Visual Regression Issue

**Title:** Add Visual Tests for [Page/Component]

**Labels:** `testing`, `visual-regression`, `playwright`

**Template:**
```markdown
## Target
[Page or Component Name]

## Location
src/pages/[page].tsx or src/components/[component].tsx

## Tasks
- [ ] Create Playwright test spec
- [ ] Test desktop view
- [ ] Test mobile view
- [ ] Test tablet view
- [ ] Test dark mode
- [ ] Generate baseline screenshots
- [ ] Add to CI pipeline

## Test Cases
- [ ] Full page screenshot
- [ ] Key sections isolated
- [ ] Interactive states (hover, focus)
- [ ] Responsive breakpoints
- [ ] Theme variations

## Acceptance Criteria
- [ ] All tests pass
- [ ] Baselines generated
- [ ] CI integration complete
```

### 3. Design System Compliance Issue

**Title:** Audit [Component/Page] for Design System Compliance

**Labels:** `quality`, `design-system`, `mcp`

**Template:**
```markdown
## Target
[Component or Page Name]

## MCP Checks Required
- [ ] analyze_component_usage
- [ ] validate_tailwind_tokens
- [ ] check_accessibility
- [ ] compare_with_dashboard (if applicable)

## Current Issues
[List issues found by MCP tools]

## Proposed Fixes
[List proposed changes]

## Tasks
- [ ] Fix component composition issues
- [ ] Replace hardcoded values with tokens
- [ ] Add missing ARIA attributes
- [ ] Update to match dashboard patterns
- [ ] Re-run MCP validation
- [ ] Generate visual tests

## Acceptance Criteria
- [ ] All MCP checks pass
- [ ] No hardcoded values
- [ ] Accessibility score 100%
- [ ] Visual tests pass
```

### 4. MCP Tool Development Issue

**Title:** [New MCP Tool] - [Tool Name]

**Labels:** `mcp`, `tooling`, `development`

**Template:**
```markdown
## Tool Purpose
[What this tool will do]

## Input Parameters
- param1: [description]
- param2: [description]

## Output
[What the tool returns]

## Implementation Tasks
- [ ] Create tool file in mcp-server/src/tools/
- [ ] Implement core logic
- [ ] Add error handling
- [ ] Register in index.ts
- [ ] Write tests
- [ ] Update documentation
- [ ] Add to MCP_SETUP.md

## Testing
- [ ] Unit tests pass
- [ ] Integration test with Claude Code
- [ ] Documentation accurate

## Acceptance Criteria
- [ ] Tool works as expected
- [ ] Error cases handled
- [ ] Documentation complete
```

### 5. External Repo Integration Issue

**Title:** Connect [Repo Name] to Blueberry MCP

**Labels:** `integration`, `deployment`, `external`

**Template:**
```markdown
## Repository
[Repo Name and URL]

## Integration Type
- [ ] Use Blueberry components
- [ ] Use MCP for validation
- [ ] Use visual regression tests

## Setup Tasks
- [ ] Install @blueberry/design-system (if library mode)
- [ ] Copy MCP server to repo
- [ ] Configure MCP in CI/CD
- [ ] Set up visual regression
- [ ] Update deployment pipeline
- [ ] Configure Linear integration

## Configuration
- [ ] MCP server configured
- [ ] BASE_URL set correctly
- [ ] Claude Code config updated
- [ ] CI secrets added

## Testing
- [ ] MCP tools work in new repo
- [ ] Visual tests run in CI
- [ ] Deployment pipeline works

## Documentation
- [ ] README updated
- [ ] Team trained on MCP usage
- [ ] CI/CD docs updated
```

## 🤖 Linear API Integration

### Automate Issue Creation

Create a script to generate Linear issues from MCP findings:

```typescript
// scripts/create-linear-issues.ts
import { LinearClient } from '@linear/sdk';

const linear = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY
});

async function createDesignSystemIssue(mcpFindings: any) {
  const team = await linear.team('BLU');

  const issue = await linear.createIssue({
    teamId: team.id,
    title: `Fix Design System Issues in ${mcpFindings.file}`,
    description: `
## MCP Findings

${mcpFindings.issues.map(i => `- ${i}`).join('\n')}

## Suggested Fixes

${mcpFindings.suggestions.map(s => `- ${s}`).join('\n')}

## MCP Tools Used
- analyze_component_usage
- validate_tailwind_tokens
- check_accessibility
    `,
    labelIds: ['design-system', 'mcp'],
    priority: mcpFindings.issues.length > 5 ? 1 : 2,
  });

  console.log(`Created issue: ${issue.url}`);
}
```

### Usage in CI

```yaml
# .github/workflows/mcp-audit.yml
name: MCP Design System Audit

on:
  pull_request:
    paths:
      - 'src/**/*.tsx'
      - 'src/**/*.ts'

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3

      - name: Install dependencies
        run: npm install

      - name: Build MCP Server
        run: npm run mcp:build

      - name: Run MCP Audit
        run: |
          node scripts/run-mcp-audit.js > mcp-findings.json

      - name: Create Linear Issues
        if: failure()
        run: |
          node scripts/create-linear-issues.js
        env:
          LINEAR_API_KEY: ${{ secrets.LINEAR_API_KEY }}
```

## 📊 Linear Dashboard Views

### 1. Design System Health View

**Filters:**
- Label: `design-system`
- Status: Active, In Progress, Backlog

**Columns:**
- Priority
- Component
- MCP Status
- Assignee

### 2. MCP Backlog View

**Filters:**
- Label: `mcp`
- Status: Backlog

**Sort:** Priority, then Created Date

### 3. Visual Regression View

**Filters:**
- Label: `visual-regression`
- Status: All

**Columns:**
- Test Name
- Last Updated
- Status
- CI Status

## 🔄 Workflow Integration

### Development Workflow

```
1. Pick Linear issue from backlog
   └─> Issue has MCP checklist

2. Make code changes
   └─> Use Claude Code with MCP tools

3. Validate with MCP
   └─> Run checks from issue template

4. Pass all checks
   └─> Update Linear issue with results

5. Create PR
   └─> CI runs MCP checks automatically

6. PR merged
   └─> Linear issue auto-closed via commit message

7. Deploy
   └─> Visual regression tests run
   └─> New Linear issue created if tests fail
```

### Commit Message Convention

Link commits to Linear issues:

```bash
git commit -m "fix: Replace hardcoded colors with tokens

- Updated AccountCard to use design tokens
- Removed arbitrary bg-[#9b87f5] values
- MCP validation: ✅ All checks passed

Fixes BLU-123"
```

Linear will automatically link the commit and close BLU-123.

## 🎯 Linear Automations

### Create These Automations in Linear

#### 1. Auto-label MCP Issues

**Trigger:** Issue created with "MCP" in title
**Action:** Add label `mcp`

#### 2. Assign to Design System Team

**Trigger:** Label `design-system` added
**Action:** Set project to "Design System Core"

#### 3. Visual Test Failed

**Trigger:** Issue created with label `visual-regression` and priority 1
**Action:**
- Notify #design-system Slack channel
- Assign to design system lead

#### 4. Compliance Audit Complete

**Trigger:** All tasks completed on issue with label `quality`
**Action:**
- Change status to Done
- Add comment: "✅ Design system compliance verified"

## 📈 Metrics to Track in Linear

### Create Custom Views for:

1. **MCP Tool Usage**
   - Issues resolved using MCP tools
   - Time saved on manual review
   - Automation rate

2. **Design System Health**
   - Components documented: X/56
   - Token compliance: X%
   - Accessibility score: X%

3. **Visual Regression**
   - Tests passing: X/Y
   - Visual bugs caught: X
   - False positives: X

4. **Integration Status**
   - Repos using Blueberry: X
   - MCP servers deployed: X
   - CI pipelines active: X

## 🚀 Rollout Plan

### Phase 1: Internal Testing (Week 1)
- [ ] Create Linear project structure
- [ ] Add issue templates
- [ ] Test MCP tools locally
- [ ] Document findings in Linear

### Phase 2: Team Onboarding (Week 2)
- [ ] Train team on MCP usage
- [ ] Create training issues in Linear
- [ ] Set up automations
- [ ] Establish workflows

### Phase 3: CI Integration (Week 3)
- [ ] Add MCP checks to CI
- [ ] Auto-create Linear issues from CI
- [ ] Set up Slack notifications
- [ ] Monitor and iterate

### Phase 4: External Repos (Week 4)
- [ ] Integrate first external repo
- [ ] Document integration process
- [ ] Create templates for other repos
- [ ] Scale to more projects

## 📝 Linear Issue Examples

Here are some ready-to-create issues for your backlog:

### Quick Wins
1. "Document Button component in knowledge base"
2. "Add visual tests for AccountCard component"
3. "Audit TransactionItem for token compliance"
4. "Create accessibility checklist template"

### Medium Effort
5. "Expand MCP knowledge base to cover all 56 components"
6. "Implement CI pipeline for MCP checks"
7. "Create Linear automation for MCP findings"
8. "Set up visual regression in staging environment"

### Long Term
9. "Build MCP dashboard for team metrics"
10. "Integrate with Figma for design-to-code validation"
11. "Create custom MCP tool for performance analysis"
12. "Multi-repo MCP server deployment"

Ready to connect to external repos? See EXTERNAL_REPO_INTEGRATION.md next!
