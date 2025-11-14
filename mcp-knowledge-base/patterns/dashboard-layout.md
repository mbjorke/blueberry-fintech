# Dashboard Layout Pattern

## Overview
The Blueberry Dashboard is the reference implementation showcasing all design patterns, components, and token usage.

## Structure

### 1. Page Layout
```
┌─────────────────────────────────────┐
│ Header (Logo, Theme, Alerts, User) │
├──────┬──────────────────────────────┤
│      │                              │
│ Side │  Main Content Area           │
│ bar  │  - Account Cards (Grid)      │
│      │  - Transactions (List)       │
│      │  - Spending Insights (Sticky)│
│      │                              │
└──────┴──────────────────────────────┘
```

### 2. Component Hierarchy
```
Index Page
├── SidebarNav (collapsible, responsive)
├── Header
│   ├── Logo
│   ├── ThemeToggle
│   ├── AlertsDropdown
│   └── UserAvatar
└── Dashboard
    ├── Account Cards Grid (1/2/3 columns)
    ├── Transactions List
    │   └── TransactionDetailsModal
    └── Spending Insights (sticky)
```

## Responsive Behavior

### Mobile (< 640px)
- Sidebar collapses to hamburger menu
- Account cards: 1 column
- Full-width layout
- Sticky header

### Tablet (640px - 1024px)
- Sidebar toggleable
- Account cards: 2 columns
- Compact spacing

### Desktop (> 1024px)
- Persistent sidebar
- Account cards: 3 columns
- Optimal spacing
- Sticky spending insights

## Key Patterns

### Grid Layout
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
  {accounts.map(account => <AccountCard key={account.id} {...account} />)}
</div>
```

### List Pattern
```tsx
<div className="space-y-2">
  {transactions.map(tx => <TransactionItem key={tx.id} {...tx} />)}
</div>
```

### Sticky Sidebar
```tsx
<div className="sticky top-4 space-y-6">
  <SpendingInsights />
</div>
```

## Color Usage
- Background: `bg-background`
- Cards: `bg-card border-border`
- Text hierarchy: `text-foreground`, `text-muted-foreground`
- Actions: `text-primary`, `bg-primary`

## Spacing System
- Page padding: `container mx-auto p-4 lg:p-8`
- Section gaps: `space-y-8`
- Card padding: `p-6`
- Grid gap: `gap-4 lg:gap-6`
