# Spacing Consistency Rule

## Problem Statement

Inconsistent spacing creates visual chaos, breaks design rhythm, and makes interfaces feel unprofessional. Arbitrary spacing values (like `p-[23px]` or `gap-[17px]`) prevent responsive scaling, break design system consistency, and make maintenance difficult.

## Rule

**Use the design system spacing scale consistently across all components.**

### Guidelines

1. **Use Standard Spacing Scale**
   - Base unit: 4px (0.25rem)
   - Standard values: `0`, `0.5`, `1`, `2`, `3`, `4`, `5`, `6`, `8`, `10`, `12`, `16`, `20`, `24`, `32`
   - Use Tailwind spacing tokens: `p-4`, `gap-6`, `space-y-8`

2. **Spacing Patterns**
   ```
   Component padding:    p-4, p-6, p-8
   Section gaps:         gap-4, gap-6, gap-8
   Vertical rhythm:      space-y-4, space-y-6, space-y-8
   Margins:              m-4, mt-8, mb-12
   ```

3. **Never Use**
   - Arbitrary pixel values: `p-[23px]`, `gap-[17px]`
   - Non-standard rem values: `p-[1.3rem]`, `m-[2.7rem]`
   - Inconsistent spacing within the same component

## Visual Examples

### ❌ Bad: Arbitrary Spacing

```tsx
// Inconsistent arbitrary values
<div className="p-[23px] gap-[17px]">
  <Card className="mb-[33px]">
    <div className="space-y-[13px]">
      Content
    </div>
  </Card>
</div>
```

**Problems:**
- ❌ Breaks visual rhythm
- ❌ Doesn't scale responsively
- ❌ Hard to maintain
- ❌ Creates visual inconsistency

### ✅ Good: Standard Spacing Scale

```tsx
// Consistent standard values
<div className="p-6 gap-4">
  <Card className="mb-8">
    <div className="space-y-4">
      Content
    </div>
  </Card>
</div>
```

**Benefits:**
- ✅ Maintains visual rhythm
- ✅ Scales responsively
- ✅ Easy to maintain
- ✅ Creates visual consistency

### ✅ Good: Responsive Spacing

```tsx
// Responsive spacing that adapts to screen size
<div className="p-4 md:p-6 lg:p-8">
  <div className="gap-4 lg:gap-6">
    <Card className="p-4 md:p-6">
      <div className="space-y-3 md:space-y-4">
        Content
      </div>
    </Card>
  </div>
</div>
```

### ✅ Good: Consistent Patterns

```tsx
// Card padding pattern (consistent across all cards)
<Card className="p-6">
  <CardHeader className="pb-4">
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <div>Item 1</div>
    <div>Item 2</div>
  </CardContent>
  <CardFooter className="pt-4">
    <Button>Action</Button>
  </CardFooter>
</Card>

// Grid spacing pattern
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</div>
```

## Spacing Scale Reference

| Token | Value | Pixels | Use Case |
|-------|-------|--------|----------|
| `0` | 0px | 0px | No spacing |
| `0.5` | 0.125rem | 2px | Tight spacing |
| `1` | 0.25rem | 4px | Minimal spacing |
| `2` | 0.5rem | 8px | Small spacing |
| `3` | 0.75rem | 12px | Medium-small spacing |
| `4` | 1rem | 16px | Standard spacing |
| `5` | 1.25rem | 20px | Medium spacing |
| `6` | 1.5rem | 24px | Card padding, section gaps |
| `8` | 2rem | 32px | Large spacing, section margins |
| `10` | 2.5rem | 40px | Extra large spacing |
| `12` | 3rem | 48px | Section spacing |
| `16` | 4rem | 64px | Page-level spacing |
| `20` | 5rem | 80px | Large page sections |
| `24` | 6rem | 96px | Hero sections |

## Common Patterns

### Component Spacing
```tsx
// Card padding
<Card className="p-6">  // Standard card padding

// Button groups
<div className="flex gap-2">  // Tight button spacing
<div className="flex gap-4">  // Standard button spacing

// Form fields
<div className="space-y-4">  // Form field spacing
```

### Layout Spacing
```tsx
// Page container
<div className="container mx-auto px-4 py-8">

// Section spacing
<section className="space-y-8">
  <div>Section 1</div>
  <div>Section 2</div>
</section>

// Grid spacing
<div className="grid gap-4 md:gap-6">
```

## Validation Criteria

When validating a component or page:

1. **Scan for arbitrary spacing**:
   - Arbitrary pixel values: `p-[...px]`, `m-[...px]`, `gap-[...px]`
   - Non-standard rem values: `p-[1.3rem]`, `m-[2.7rem]`
   - Values not in the standard scale

2. **Flag violations**:
   - **Error**: Arbitrary spacing values (strict mode)
   - **Warning**: Non-standard spacing values (lenient mode)

3. **Check consistency**:
   - Same component types should use consistent spacing
   - Related elements should follow spacing patterns
   - Responsive spacing should use standard breakpoints

4. **Suggest improvements**:
   - Replace arbitrary values with closest standard token
   - Map `p-[23px]` → `p-6` (24px)
   - Map `gap-[17px]` → `gap-4` (16px)
   - Ensure consistent spacing patterns

## Related Patterns

- See `tokens/spacing.md` for complete spacing token reference
- See `patterns/dashboard-layout.md` for layout spacing patterns
- See `components/ui/card.md` for component spacing guidelines

