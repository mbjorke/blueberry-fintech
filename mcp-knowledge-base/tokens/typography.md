# Typography Tokens

## Font Family
- **Primary**: Montserrat Variable
- **Fallback**: system-ui, sans-serif
- **Import**: `@fontsource-variable/montserrat`

## Font Sizes
- `text-xs` - 12px
- `text-sm` - 14px
- `text-base` - 16px
- `text-lg` - 18px
- `text-xl` - 20px
- `text-2xl` - 24px
- `text-3xl` - 30px
- `text-4xl` - 36px

## Font Weights
- `font-light` - 300
- `font-normal` - 400
- `font-medium` - 500
- `font-semibold` - 600
- `font-bold` - 700

## Line Heights
- `leading-none` - 1
- `leading-tight` - 1.25
- `leading-normal` - 1.5
- `leading-relaxed` - 1.625

## Text Hierarchy

### Headings
```tsx
// H1 - Page title
<h1 className="text-3xl font-bold">

// H2 - Section title
<h2 className="text-2xl font-semibold">

// H3 - Card title
<h3 className="text-xl font-semibold">

// H4 - Subsection
<h4 className="text-lg font-medium">
```

### Body Text
```tsx
// Default
<p className="text-base">

// Small
<p className="text-sm text-muted-foreground">

// Caption
<span className="text-xs text-muted-foreground">
```

## Dashboard Usage
- **Account balance**: `text-2xl font-bold`
- **Card titles**: `text-lg font-semibold`
- **Transaction amount**: `text-sm font-medium`
- **Transaction merchant**: `text-sm font-medium`
- **Transaction date**: `text-xs text-muted-foreground`
- **Budget labels**: `text-sm font-medium`

## Accessibility
- Maintain minimum 16px base for body text
- Use semantic heading hierarchy (h1 → h2 → h3)
- Ensure color contrast meets WCAG AA standards
- Don't rely solely on font weight to convey meaning
