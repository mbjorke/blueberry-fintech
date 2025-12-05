# Typography Consistency Rule

## Problem Statement

Inconsistent typography breaks visual hierarchy, reduces readability, and creates a disjointed user experience. Arbitrary font sizes, inconsistent font weights, and improper text hierarchy make interfaces feel unprofessional and hard to scan.

## Rule

**Use the design system typography scale consistently to maintain visual hierarchy and readability.**

### Guidelines

1. **Use Standard Typography Scale**
   - Font sizes: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`
   - Font weights: `font-light`, `font-normal`, `font-medium`, `font-semibold`, `font-bold`
   - Line heights: `leading-none`, `leading-tight`, `leading-normal`, `leading-relaxed`

2. **Text Hierarchy**
   ```
   H1 (Page title):     text-3xl font-bold
   H2 (Section title):  text-2xl font-semibold
   H3 (Card title):     text-xl font-semibold
   H4 (Subsection):     text-lg font-medium
   Body:                text-base font-normal
   Small text:          text-sm font-normal
   Caption:             text-xs font-normal
   ```

3. **Never Use**
   - Arbitrary font sizes: `text-[13px]`, `text-[18px]`
   - Arbitrary font weights: `font-[450]`
   - Inconsistent hierarchy (skipping heading levels)
   - Non-semantic heading usage

## Visual Examples

### ❌ Bad: Arbitrary Typography

```tsx
// Inconsistent arbitrary sizes
<h1 className="text-[28px] font-[600]">Title</h1>
<p className="text-[15px]">Body text</p>
<span className="text-[11px]">Caption</span>
```

**Problems:**
- ❌ Breaks visual hierarchy
- ❌ Doesn't scale responsively
- ❌ Hard to maintain
- ❌ Creates visual inconsistency

### ✅ Good: Standard Typography Scale

```tsx
// Consistent standard sizes
<h1 className="text-3xl font-bold">Title</h1>
<p className="text-base">Body text</p>
<span className="text-xs">Caption</span>
```

**Benefits:**
- ✅ Maintains visual hierarchy
- ✅ Scales responsively
- ✅ Easy to maintain
- ✅ Creates visual consistency

### ✅ Good: Proper Text Hierarchy

```tsx
// Proper semantic hierarchy
<article>
  <h1 className="text-3xl font-bold mb-6">Page Title</h1>
  
  <section>
    <h2 className="text-2xl font-semibold mb-4">Section Title</h2>
    
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Card Title</h3>
      <p className="text-base text-muted-foreground">
        Body text with proper hierarchy
      </p>
      <span className="text-sm text-muted-foreground">
        Small supporting text
      </span>
    </div>
  </section>
</article>
```

### ✅ Good: Component Typography Patterns

```tsx
// Card typography pattern
<Card>
  <CardHeader>
    <CardTitle className="text-lg font-semibold">
      Card Title
    </CardTitle>
    <CardDescription className="text-sm text-muted-foreground">
      Description text
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-base">
      Main content
    </p>
  </CardContent>
</Card>

// Dashboard typography patterns
<div>
  <h2 className="text-2xl font-bold">Account Balance</h2>
  <p className="text-sm text-muted-foreground">Last updated</p>
</div>
```

## Typography Scale Reference

### Font Sizes

| Token | Value | Pixels | Use Case |
|-------|-------|--------|----------|
| `text-xs` | 0.75rem | 12px | Captions, labels |
| `text-sm` | 0.875rem | 14px | Small text, metadata |
| `text-base` | 1rem | 16px | Body text (default) |
| `text-lg` | 1.125rem | 18px | Large body text |
| `text-xl` | 1.25rem | 20px | Card titles, H4 |
| `text-2xl` | 1.5rem | 24px | Section titles, H2 |
| `text-3xl` | 1.875rem | 30px | Page titles, H1 |
| `text-4xl` | 2.25rem | 36px | Hero titles |

### Font Weights

| Token | Value | Use Case |
|-------|-------|----------|
| `font-light` | 300 | Light emphasis |
| `font-normal` | 400 | Body text (default) |
| `font-medium` | 500 | Medium emphasis |
| `font-semibold` | 600 | Headings, emphasis |
| `font-bold` | 700 | Strong emphasis, titles |

### Line Heights

| Token | Value | Use Case |
|-------|-------|----------|
| `leading-none` | 1 | Tight spacing |
| `leading-tight` | 1.25 | Headings |
| `leading-normal` | 1.5 | Body text (default) |
| `leading-relaxed` | 1.625 | Readable paragraphs |

## Common Patterns

### Headings
```tsx
// Page title
<h1 className="text-3xl font-bold">Page Title</h1>

// Section title
<h2 className="text-2xl font-semibold">Section Title</h2>

// Card title
<h3 className="text-xl font-semibold">Card Title</h3>

// Subsection
<h4 className="text-lg font-medium">Subsection</h4>
```

### Body Text
```tsx
// Default body
<p className="text-base">Body text</p>

// Small text
<p className="text-sm text-muted-foreground">Small text</p>

// Caption
<span className="text-xs text-muted-foreground">Caption</span>
```

### Dashboard Patterns
```tsx
// Account balance
<div className="text-2xl font-bold">$12,345.67</div>

// Transaction amount
<div className="text-sm font-medium">-$45.99</div>

// Transaction date
<div className="text-xs text-muted-foreground">Jan 15, 2024</div>
```

## Validation Criteria

When validating a component or page:

1. **Scan for arbitrary typography**:
   - Arbitrary font sizes: `text-[13px]`, `text-[18px]`
   - Arbitrary font weights: `font-[450]`, `font-[550]`
   - Non-standard line heights

2. **Check text hierarchy**:
   - Proper heading order (h1 → h2 → h3)
   - No skipped heading levels
   - Semantic HTML usage

3. **Flag violations**:
   - **Error**: Arbitrary typography values
   - **Warning**: Inconsistent hierarchy or non-semantic usage

4. **Suggest improvements**:
   - Replace arbitrary sizes with closest standard token
   - Map `text-[13px]` → `text-sm` (14px)
   - Map `text-[18px]` → `text-lg` (18px)
   - Ensure proper heading hierarchy

## Accessibility Considerations

- Maintain minimum 16px (text-base) for body text
- Use semantic heading hierarchy (h1 → h2 → h3)
- Ensure color contrast meets WCAG AA standards
- Don't rely solely on font weight to convey meaning
- Use proper line heights for readability

## Related Patterns

- See `tokens/typography.md` for complete typography token reference
- See `components/ui/card.md` for component typography patterns
- See `patterns/dashboard-layout.md` for layout typography patterns

