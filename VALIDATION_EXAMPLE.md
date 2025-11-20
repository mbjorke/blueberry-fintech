# Validation Example: Button Hierarchy Rule

This document demonstrates how to validate the button hierarchy rule using the MCP tools.

## The Rule

**Overusing primary buttons creates cognitive overload. Use a hierarchy of buttons to improve decision making.**

**Strict Rule: Only 1 primary button per screen total.**

## Example: Violating Component

Let's say we have a component with multiple primary buttons:

```tsx
// src/pages/Example.tsx
import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <div className="space-y-4">
      <Button variant="default">Save Changes</Button>
      <Button variant="default">Submit Form</Button>
      <Button variant="default">Continue</Button>
      <Button variant="outline">Cancel</Button>
    </div>
  );
}
```

## How to Validate

### Method 1: Using MCP Tool (Component Analyzer)

The `analyze_component_usage` tool automatically checks for button hierarchy violations:

```bash
# Via MCP server
analyze_component_usage filePath="src/pages/Example.tsx"
```

**Expected Output:**
```
# Component Analysis Report

**File:** src/pages/Example.tsx

## Summary
- Components used: 4
- Issues found: 1
- Suggestions: 2

## Components Used
- Button: 4 usage(s)

## Issues
❌ Button Hierarchy Violation: Found 3 primary buttons on this screen (lines: 5, 6, 7). 
Only 1 primary button should be visible per screen. Convert the others to 'outline' 
or 'ghost' variants to reduce cognitive overload and improve decision-making.

## Suggestions
📊 Button Variant Usage:
  - default: 3
  - outline: 1
⚠️ Remember: Only 1 primary button per screen total
```

### Method 2: Query Design System Knowledge Base

Search for the rule documentation:

```bash
query_design_system query="button hierarchy cognitive overload" category="rules"
```

This will return the full rule documentation from `mcp-knowledge-base/rules/button-hierarchy.md`.

### Method 3: Manual Review Checklist

1. ✅ Count primary buttons: 3 found
2. ❌ **Violation:** More than 1 primary button per screen (strict rule: only 1 allowed)
3. ✅ **Fix:** Convert 2 primary buttons to `outline` or `ghost` variants, keep only the most important action as primary

## Fixed Component

```tsx
// src/pages/Example.tsx
import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <div className="space-y-4">
      <Button variant="default">Save Changes</Button>
      <Button variant="outline">Submit Form</Button>
      <Button variant="ghost">Continue</Button>
      <Button variant="outline">Cancel</Button>
    </div>
  );
}
```

**Validation Result:**
```
✅ All checks passed! Component usage follows design system guidelines.
```

## Integration with CI/CD

You can add this validation to your CI pipeline:

```yaml
# .github/workflows/design-system-check.yml
- name: Validate Button Hierarchy
  run: |
    node -e "
      const { analyzeComponentUsage } = require('./mcp-server/dist/tools/component-analyzer.js');
      analyzeComponentUsage('src/pages/Example.tsx').then(console.log);
    "
```

Or use it as a pre-commit hook:

```json
{
  "scripts": {
    "validate:design": "node scripts/validate-design-system.js",
    "precommit": "npm run validate:design"
  }
}
```

## Related Documentation

- Rule: `mcp-knowledge-base/rules/button-hierarchy.md`
- Component Docs: `mcp-knowledge-base/components/ui/button.md`
- MCP Setup: `MCP_SETUP.md`

