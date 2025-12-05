# Color Tokens

## System Colors

All colors use HSL format with CSS variables for theming support.

### Primary Brand
- `hsl(var(--primary))` - Main brand color (purple: 260 85% 68%)
- `hsl(var(--primary-foreground))` - Text on primary background

### Semantic Colors
- `hsl(var(--destructive))` - Error/danger states
- `hsl(var(--destructive-foreground))` - Text on destructive background
- `hsl(var(--muted))` - Subtle backgrounds
- `hsl(var(--muted-foreground))` - Muted text
- `hsl(var(--accent))` - Accent highlights
- `hsl(var(--accent-foreground))` - Text on accent background

### Surface Colors
- `hsl(var(--background))` - Page background
- `hsl(var(--foreground))` - Primary text
- `hsl(var(--card))` - Card backgrounds
- `hsl(var(--card-foreground))` - Card text
- `hsl(var(--popover))` - Popover backgrounds
- `hsl(var(--popover-foreground))` - Popover text

### Borders
- `hsl(var(--border))` - Standard borders
- `hsl(var(--input))` - Input borders
- `hsl(var(--ring))` - Focus rings

## Usage Rules

### ✅ DO
```tsx
// Use semantic token names
<div className="bg-primary text-primary-foreground">
<div className="border-border bg-card">
```

### ❌ DON'T
```tsx
// Don't use arbitrary color values
<div className="bg-[#9b87f5]">
<div className="text-[hsl(260,85%,68%)]">
```

## Dark Mode
All tokens automatically adapt to dark mode via CSS variable switching.
- No manual dark mode classes needed on components
- Theme toggle handled by `next-themes`

## Dashboard Usage
- Account cards use `bg-card` with `border-border`
- Primary actions use `bg-primary` (purple brand color)
- Category badges use `bg-accent` variations
- Spending insights use semantic colors for status indicators
