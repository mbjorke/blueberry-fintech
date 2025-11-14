# Card Component

## Overview
Container component for grouping related content with consistent styling.

## Location
`src/components/ui/card.tsx`

## Sub-components
- `Card` - Main container
- `CardHeader` - Top section for titles
- `CardTitle` - Card heading
- `CardDescription` - Subtitle text
- `CardContent` - Main content area
- `CardFooter` - Bottom section for actions

## Default Styles
- Background: `bg-card`
- Border: `border border-border`
- Rounded corners: `rounded-lg`
- Shadow: `shadow-sm`
- Text color: `text-card-foreground`

## Usage Examples

### Basic Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Dashboard Usage
- **Account Cards**: Display account balances and quick actions
  - Uses icon in CardHeader
  - Balance in CardContent
  - Quick action buttons in CardFooter
- **Transaction Items**: Listed within Card components
- **Spending Insights**: Budget tracking in Card

## Composition Pattern
Cards should follow this structure:
1. Header (optional) - Title and description
2. Content (required) - Main information
3. Footer (optional) - Actions or metadata

## Accessibility
- Semantic HTML structure
- Proper heading hierarchy
- Interactive elements within cards maintain focus order
