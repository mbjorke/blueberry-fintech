# Button Component

## Overview
Primary action component from Radix UI, supporting multiple variants and sizes.

## Location
`src/components/ui/button.tsx`

## Variants
- `default` - Primary brand button (purple)
- `destructive` - Danger/delete actions (red)
- `outline` - Secondary actions with border
- `secondary` - Muted gray button
- `ghost` - Minimal button without background
- `link` - Text link style

## Sizes
- `default` - Standard size (h-10, px-4 py-2)
- `sm` - Small (h-9, px-3)
- `lg` - Large (h-11, px-8)
- `icon` - Square icon button

## Props
```typescript
interface ButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}
```

## Usage Examples

### Primary Action
```tsx
<Button variant="default">Save Changes</Button>
```

### Destructive Action
```tsx
<Button variant="destructive">Delete Account</Button>
```

### Icon Button
```tsx
<Button variant="ghost" size="icon">
  <Icon className="h-4 w-4" />
</Button>
```

## Accessibility
- Uses Radix Slot for composition
- Supports keyboard navigation
- Proper focus states
- Screen reader compatible

## Dashboard Usage
- Quick actions: "Upcoming", "Filter", "Pay" buttons
- Account card actions: "View Details", "Transfer" buttons
- Uses `outline` variant for secondary actions
