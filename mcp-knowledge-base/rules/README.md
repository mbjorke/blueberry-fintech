# Design Rules

This directory contains design rules and validation guidelines for the Blueberry Design System. These rules help maintain consistency, improve usability, and prevent common design anti-patterns.

## Available Rules

### Button Hierarchy (`button-hierarchy.md`)
**Problem:** Overusing primary buttons creates cognitive overload and decision paralysis.

**Rule:** Use a hierarchy of buttons to improve decision making.

**Validation:** The `analyze_component_usage` MCP tool automatically checks for:
- Multiple primary buttons per logical section
- More than 3-4 primary buttons on a single screen
- Proper button variant usage

## How to Validate Rules

### Using MCP Tools

#### 1. Component Analysis (includes button hierarchy check)
```bash
# In Claude Code or via MCP
analyze_component_usage filePath="src/pages/Dashboard.tsx"
```

This will check:
- Button hierarchy violations
- Component composition
- Import paths
- Variant usage

#### 2. Design System Query
```bash
query_design_system query="button hierarchy" category="rules"
```

This searches the knowledge base for relevant rules and guidelines.

### Manual Validation Checklist

When reviewing a component or page:

- [ ] Count primary buttons (`variant="default"` or no variant)
- [ ] Group buttons by logical sections (cards, modals, forms)
- [ ] Verify only 1 primary button per section
- [ ] Check total primary buttons don't exceed 3-4 per screen
- [ ] Ensure proper variant hierarchy (primary → outline → ghost)

## Adding New Rules

1. Create a new `.md` file in this directory
2. Follow the structure:
   - Problem Statement
   - Rule/Guidelines
   - Examples (❌ Bad, ✅ Good)
   - Validation Criteria
   - Related Patterns

3. Update the component analyzer (`mcp-server/src/tools/component-analyzer.ts`) to add automated validation
4. Update this README to document the new rule

## Integration with CI/CD

Rules can be enforced via:
- MCP server validation tools
- Pre-commit hooks
- CI pipeline checks
- Code review guidelines

See `EXTERNAL_REPO_INTEGRATION.md` for CI/CD integration examples.

