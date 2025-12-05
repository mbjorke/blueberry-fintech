# Dashboard Reference Specification

## Purpose
This document serves as the golden reference for the Blueberry Design System. All new pages should be compared against these specifications.

## Visual Baseline
Location: `/` (root route)
Screenshots: `tests/visual-regression/baselines/`

## Components Used

### UI Components (from src/components/ui/)
- Avatar
- Badge
- Button
- Card (with Header, Title, Content, Footer)
- DropdownMenu
- ScrollArea
- Separator
- Sheet (mobile menu)

### Fintech Components (from src/components/fintech/)
- AccountCard
- AlertsDropdown
- SidebarNav
- SpendingInsights
- TransactionDetailsModal
- TransactionItem
- UserAvatar

## Design Token Usage

### Colors
- Primary brand: Account actions, links
- Card backgrounds: All cards use `bg-card`
- Borders: Consistent `border-border`
- Text: `text-foreground` for primary, `text-muted-foreground` for secondary
- Status colors: Green (positive), Red (negative)

### Spacing
- Container: `max-w-7xl mx-auto px-4 lg:px-8`
- Page sections: `space-y-8`
- Card padding: `p-6`
- Grid gap: `gap-4` (mobile) → `gap-6` (desktop)
- List items: `space-y-2`

### Typography
- Page title: `text-3xl font-bold`
- Section titles: `text-2xl font-semibold`
- Card titles: `text-lg font-semibold`
- Balance amounts: `text-2xl font-bold`
- Body text: `text-sm` or `text-base`
- Captions: `text-xs text-muted-foreground`

## Accessibility Features
- Keyboard navigation support
- Focus visible states
- ARIA labels on interactive elements
- Screen reader compatible
- Color contrast meets WCAG AA
- Responsive touch targets (min 44x44px)

## Performance Characteristics
- First paint: < 1s
- Interactive: < 2s
- Smooth animations: 60fps
- Lazy loading for images
- Optimistic UI updates

## Testing Checklist
When comparing new pages against dashboard:

### Visual
- [ ] Color scheme matches design tokens
- [ ] Spacing follows spacing scale
- [ ] Typography hierarchy consistent
- [ ] Components styled identically
- [ ] Dark mode works correctly

### Functional
- [ ] Responsive at all breakpoints
- [ ] Interactive elements accessible
- [ ] Navigation works correctly
- [ ] Forms validate properly
- [ ] Loading states implemented

### Performance
- [ ] No layout shifts
- [ ] Smooth animations
- [ ] Images optimized
- [ ] No console errors
- [ ] Lighthouse score > 90
