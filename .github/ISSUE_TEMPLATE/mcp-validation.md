---
name: MCP Design System Validation
about: Audit a component or page for design system compliance
title: 'Audit [Component/Page] for design system compliance'
labels: mcp, quality, design-system
assignees: ''
---

## Target
[Component or Page Name]

## Location
`src/[path]/[file].tsx`

## MCP Checks Required
- [ ] `analyze_component_usage` - Component composition
- [ ] `validate_tailwind_tokens` - Design token usage
- [ ] `check_accessibility` - ARIA and a11y patterns
- [ ] `compare_with_dashboard` - Visual consistency (if applicable)

## Current Issues
[List issues found by MCP tools - run checks first]

## How to Run Checks

In Claude Code, ask:
```
Analyze component usage in src/[path]/[file].tsx
Check design tokens in src/[path]/[file].tsx
Check accessibility of src/[path]/[file].tsx
```

Or run locally:
```bash
npm run mcp:test
```

## Proposed Fixes
[List proposed changes based on MCP findings]

## Tasks
- [ ] Fix component composition issues
- [ ] Replace hardcoded values with design tokens
- [ ] Add missing ARIA attributes
- [ ] Update to match dashboard patterns
- [ ] Re-run MCP validation
- [ ] Generate/update visual tests

## Acceptance Criteria
- [ ] All MCP checks pass with ✅
- [ ] No hardcoded color or spacing values
- [ ] Accessibility score 100%
- [ ] Visual tests pass (if applicable)
- [ ] Follows patterns from dashboard reference

## Reference
- MCP Setup: `MCP_SETUP.md`
- Testing Guide: `TESTING_GUIDE.md`
- Dashboard Reference: `mcp-knowledge-base/reference/dashboard-spec.md`
