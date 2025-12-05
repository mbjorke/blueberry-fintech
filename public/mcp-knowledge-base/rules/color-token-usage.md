# Color Token Usage Rule

## Problem Statement

Hardcoded color values (hex codes, RGB, HSL) break design system consistency, prevent theme switching, and create maintenance nightmares. When colors are hardcoded, they don't adapt to dark mode, can't be updated globally, and violate accessibility standards.

## Rule

**Always use design system color tokens instead of hardcoded color values.**

### Guidelines

1. **Use Semantic Tokens**
   - Use semantic color names (`primary`, `destructive`, `muted`) instead of specific colors
   - Tokens automatically adapt to theme changes and dark mode
   - Example: `bg-primary` instead of `bg-[#9b87f5]`

2. **Token Categories**
   ```
   Primary:      bg-primary, text-primary-foreground
   Secondary:    bg-secondary, text-secondary-foreground
   Destructive:  bg-destructive, text-destructive-foreground
   Muted:        bg-muted, text-muted-foreground
   Accent:       bg-accent, text-accent-foreground
   Surface:     bg-card, bg-background, bg-popover
   Border:       border-border, border-input
   ```

3. **Never Use**
   - Hex colors: `#9b87f5`, `#ffffff`
   - RGB values: `rgb(155, 135, 245)`
   - HSL values: `hsl(260, 85%, 68%)`
   - Arbitrary Tailwind values: `bg-[#9b87f5]`, `text-[rgb(255,0,0)]`

## Visual Examples

### ❌ Bad: Hardcoded Colors

```tsx
// Hardcoded hex color
<div className="bg-[#9b87f5] text-white">
  Primary Action
</div>

// Hardcoded RGB
<button className="bg-[rgb(239,68,68)]">
  Delete
</button>

// Hardcoded HSL
<div className="text-[hsl(0,0%,50%)]">
  Muted text
</div>
```

**Problems:**
- ❌ Doesn't adapt to dark mode
- ❌ Can't be updated globally
- ❌ Breaks design system consistency
- ❌ May violate accessibility contrast requirements

### ✅ Good: Design Tokens

```tsx
// Semantic token
<div className="bg-primary text-primary-foreground">
  Primary Action
</div>

// Semantic destructive token
<button className="bg-destructive text-destructive-foreground">
  Delete
</button>

// Semantic muted token
<div className="text-muted-foreground">
  Muted text
</div>
```

**Benefits:**
- ✅ Automatically adapts to dark mode
- ✅ Can be updated globally via CSS variables
- ✅ Maintains design system consistency
- ✅ Meets accessibility contrast requirements

### ✅ Good: Contextual Usage

```tsx
// Card with proper token usage
<Card className="bg-card border-border">
  <CardHeader>
    <CardTitle className="text-card-foreground">Title</CardTitle>
  </CardHeader>
  <CardContent className="text-foreground">
    Content with proper foreground color
  </CardContent>
</Card>

// Status indicators
<div className="bg-success text-success-foreground">Success</div>
<div className="bg-warning text-warning-foreground">Warning</div>
<div className="bg-destructive text-destructive-foreground">Error</div>
```

## Validation Criteria

When validating a component or page:

1. **Scan for hardcoded colors**:
   - Hex codes: `#[0-9a-fA-F]{3,8}`
   - RGB/RGBA: `rgb(`, `rgba(`
   - HSL/HSLA: `hsl(`, `hsla(`
   - Arbitrary Tailwind values: `bg-[...]`, `text-[...]` with color values

2. **Flag violations**:
   - **Error**: Any hardcoded color value in className
   - **Warning**: Arbitrary values that might be colors (needs manual review)

3. **Suggest improvements**:
   - Replace hex colors with semantic tokens
   - Map RGB/HSL values to closest semantic token
   - Use `bg-primary` instead of `bg-[#9b87f5]`
   - Use `text-muted-foreground` instead of `text-[hsl(0,0%,50%)]`

## Common Replacements

| Hardcoded Value | Token Replacement |
|----------------|-------------------|
| `bg-[#9b87f5]` | `bg-primary` |
| `text-[#ffffff]` | `text-foreground` or `text-primary-foreground` |
| `bg-[rgb(239,68,68)]` | `bg-destructive` |
| `text-[hsl(0,0%,50%)]` | `text-muted-foreground` |
| `border-[#e5e7eb]` | `border-border` |
| `bg-[#f3f4f6]` | `bg-muted` or `bg-card` |

## Related Patterns

- See `tokens/colors.md` for complete color token reference
- See `components/ui/button.md` for component-specific color usage
- See `patterns/dashboard-layout.md` for layout color patterns

