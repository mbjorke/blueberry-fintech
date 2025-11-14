# Spacing Tokens

## Scale
Tailwind's default spacing scale (4px base unit):
- `0` - 0px
- `1` - 4px
- `2` - 8px
- `3` - 12px
- `4` - 16px
- `5` - 20px
- `6` - 24px
- `8` - 32px
- `10` - 40px
- `12` - 48px
- `16` - 64px
- `20` - 80px
- `24` - 96px

## Common Patterns

### Component Spacing
- **Card padding**: `p-6` (24px)
- **Section gaps**: `gap-6` or `gap-8`
- **Grid columns**: `gap-4` (16px between cards)
- **Stack items**: `space-y-4` (16px vertical rhythm)

### Layout Spacing
- **Page margins**: `container mx-auto px-4`
- **Section padding**: `py-8` or `py-12`
- **Content max-width**: `max-w-7xl`

## Usage Rules

### ✅ DO
```tsx
// Use design system tokens
<div className="p-6 gap-4">
<div className="mt-8 space-y-6">
```

### ❌ DON'T
```tsx
// Don't use arbitrary values without reason
<div className="p-[23px] gap-[17px]">
<div className="mt-[33px] space-y-[13px]">
```

## Dashboard Usage
- Account cards grid: `gap-4` (responsive to `gap-6` on larger screens)
- Card internal padding: `p-6`
- Transaction list spacing: `space-y-2`
- Section spacing: `space-y-8` between major sections
- Spending insights: `p-6` with `space-y-4` internal spacing

## Responsive Spacing
Use responsive modifiers:
```tsx
<div className="p-4 md:p-6 lg:p-8">
<div className="gap-4 lg:gap-6">
```
