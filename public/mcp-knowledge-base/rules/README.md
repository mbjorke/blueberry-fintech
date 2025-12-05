# Design Rules

This directory contains design rules and validation guidelines for the Blueberry Design System. These rules help maintain consistency, improve usability, and prevent common design anti-patterns.

## Available Rules

### Button Hierarchy (`button-hierarchy.md`)
**Problem:** Overusing primary buttons creates cognitive overload and decision paralysis.

**Rule:** Use a hierarchy of buttons to improve decision making.

**Validation:** The `analyze_component_usage` MCP tool automatically checks for:
- Multiple primary buttons per logical section
- More than 1 primary button on a single screen (strict rule)
- Proper button variant usage

**Auto-fix:** The `fix_design_violations` tool can automatically convert excess primary buttons to outline variants.

### Color Token Usage (`color-token-usage.md`)
**Problem:** Hardcoded color values break design system consistency and prevent theme switching.

**Rule:** Always use design system color tokens instead of hardcoded color values.

**Validation:** The `validate_tailwind_tokens` MCP tool automatically checks for:
- Hardcoded hex colors (`#9b87f5`, `#ffffff`)
- RGB/RGBA values (`rgb(239,68,68)`)
- HSL/HSLA values (`hsl(260,85%,68%)`)
- Arbitrary Tailwind color values (`bg-[#9b87f5]`)

**Auto-fix:** The `fix_design_violations` tool can automatically replace common hardcoded colors with semantic tokens.

### Spacing Consistency (`spacing-consistency.md`)
**Problem:** Inconsistent spacing creates visual chaos and breaks design rhythm.

**Rule:** Use the design system spacing scale consistently across all components.

**Validation:** The `validate_tailwind_tokens` MCP tool automatically checks for:
- Arbitrary pixel values (`p-[23px]`, `gap-[17px]`)
- Non-standard rem values (`p-[1.3rem]`)
- Values not in the standard spacing scale

**Auto-fix:** The `fix_design_violations` tool can automatically map arbitrary spacing values to the closest standard token.

### Typography Consistency (`typography-consistency.md`)
**Problem:** Inconsistent typography breaks visual hierarchy and reduces readability.

**Rule:** Use the design system typography scale consistently to maintain visual hierarchy.

**Validation:** The `validate_tailwind_tokens` MCP tool automatically checks for:
- Arbitrary font sizes (`text-[13px]`, `text-[18px]`)
- Arbitrary font weights (`font-[450]`)
- Improper text hierarchy (skipped heading levels)

**Auto-fix:** The `fix_design_violations` tool can automatically replace arbitrary typography values with standard tokens.

### No Emojis (`no-emojis.md`)
**Problem:** Emojis create inconsistency, accessibility issues, and maintenance problems.

**Rule:** Never use emojis in code. Always use the design system icon system (Lucide React) instead.

**Validation:** The `validate_tailwind_tokens` MCP tool automatically checks for:
- Unicode emoji characters (❤️, ⭐, ✅, 🎉, etc.)
- Emoji in strings, JSX, and comments

**Auto-fix:** The `fix_design_violations` tool can automatically identify emojis and suggest Lucide React icon replacements.

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

#### 2. Token Validation (includes color, spacing, typography)
```bash
# In Claude Code or via MCP
validate_tailwind_tokens filePath="src/pages/Dashboard.tsx"
```

This will check:
- Hardcoded color values
- Arbitrary spacing values
- Non-standard typography values

#### 3. Auto-Fix Violations
```bash
# Dry run (preview fixes)
fix_design_violations filePath="src/pages/Dashboard.tsx" dryRun=true

# Apply fixes
fix_design_violations filePath="src/pages/Dashboard.tsx" dryRun=false
```

This automatically fixes:
- Hardcoded colors → design tokens
- Arbitrary spacing → standard spacing scale
- Arbitrary typography → standard typography scale
- Button hierarchy violations

#### 4. Design System Query
```bash
query_design_system query="button hierarchy" category="rules"
```

This searches the knowledge base for relevant rules and guidelines.

### Manual Validation Checklist

When reviewing a component or page:

**Button Hierarchy:**
- [ ] Count primary buttons (`variant="default"` or no variant)
- [ ] Verify only 1 primary button per screen (strict rule)
- [ ] Ensure proper variant hierarchy (primary → outline → ghost)

**Color Tokens:**
- [ ] No hardcoded hex colors (`#9b87f5`, `#ffffff`)
- [ ] No RGB/RGBA values (`rgb(239,68,68)`)
- [ ] No HSL/HSLA values (`hsl(260,85%,68%)`)
- [ ] All colors use semantic tokens (`bg-primary`, `text-foreground`)

**Spacing Consistency:**
- [ ] No arbitrary pixel values (`p-[23px]`, `gap-[17px]`)
- [ ] All spacing uses standard scale (0, 0.5, 1, 2, 3, 4, 5, 6, 8, etc.)
- [ ] Consistent spacing patterns across similar components

**Typography Consistency:**
- [ ] No arbitrary font sizes (`text-[13px]`, `text-[18px]`)
- [ ] All typography uses standard scale (`text-xs` to `text-4xl`)
- [ ] Proper heading hierarchy (h1 → h2 → h3, no skipped levels)

**No Emojis:**
- [ ] No emoji characters in code (❤️, ⭐, ✅, etc.)
- [ ] Use Lucide React icons instead of emojis
- [ ] Icons properly imported and sized (`w-4 h-4` for small, `w-5 h-5` for medium)

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

### Automated Validation

Design system validation is automatically run in CI/CD:

```bash
# Validate all components
npm run validate:design

# Auto-fix violations (dry run)
npm run fix:design:dry-run

# Auto-fix violations (apply fixes)
npm run fix:design
```

### CI Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) automatically:
1. Builds the MCP server
2. Validates all components against design system rules
3. Reports violations (non-blocking, but visible in CI logs)

### Pre-commit Hook (Optional)

You can add a pre-commit hook to validate before committing:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run validate:design"
    }
  }
}
```

### Rules Enforcement

Rules can be enforced via:
- ✅ **MCP server validation tools** - Real-time validation in IDE
- ✅ **CI pipeline checks** - Automated validation on every PR
- ✅ **Auto-fix tool** - Automatically fix common violations
- 📝 **Pre-commit hooks** - Optional local validation
- 📝 **Code review guidelines** - Manual review checklist

See `../../docs/EXTERNAL_REPO_INTEGRATION.md` for CI/CD integration examples.

