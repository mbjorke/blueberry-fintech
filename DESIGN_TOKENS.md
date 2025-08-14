# Design Tokens

This document outlines the design tokens used in the Fintech Dashboard project. Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes.

## Table of Contents

- [Colors](#colors)
- [Typography](#typography)
- [Spacing](#spacing)
- [Shadows](#shadows)
- [Border Radius](#border-radius)
- [Breakpoints](#breakpoints)
- [Z-Index](#z-index)
- [Animation](#animation)

## Colors

### Primary Colors

| Name | Value | Usage |
|------|-------|-------|
| Primary | `hsl(260 85% 68%)` | Main brand color, primary actions |
| Primary Dark | `hsl(260 65% 58%)` | Hover/focus states |
| Primary Light | `hsl(260 90% 80%)` | Light backgrounds, highlights |

### Semantic Colors

| Name | Value | Usage |
|------|-------|-------|
| Success | `hsl(142 76% 36%)` | Success states, positive actions |
| Warning | `hsl(38 92% 50%)` | Warning states, caution |
| Danger | `hsl(0 84% 60%)` | Error states, destructive actions |
| Info | `hsl(199 89% 48%)` | Informational messages |

### Neutral Colors

| Name | Value | Usage |
|------|-------|-------|
| Background | `hsl(240 10% 3.9%)` | Main background |
| Foreground | `hsl(0 0% 98%)` | Primary text |
| Muted | `hsl(240 3.7% 15.9%)` | Secondary text, borders |
| Accent | `hsl(240 3.7% 15.9%)` | Accent backgrounds |
| Popover | `hsl(240 10% 3.9%)` | Popover backgrounds |
| Card | `hsl(240 10% 3.9%)` | Card backgrounds |
| Input | `hsl(240 3.7% 15.9%)` | Input backgrounds |
| Border | `hsl(240 3.7% 15.9%)` | Border colors |

## Typography

### Font Family

- **Primary Font**: Montserrat
- **Fallback**: system-ui, sans-serif

### Font Sizes

| Name | Value | Usage |
|------|-------|-------|
| xs | `0.75rem` | 12px |
| sm | `0.875rem` | 14px |
| base | `1rem` | 16px |
| lg | `1.125rem` | 18px |
| xl | `1.25rem` | 20px |
| 2xl | `1.5rem` | 24px |
| 3xl | `1.875rem` | 30px |
| 4xl | `2.25rem` | 36px |
| 5xl | `3rem` | 48px |
| 6xl | `3.75rem` | 60px |

### Font Weights

| Name | Value | Usage |
|------|-------|-------|
| Light | 300 | Light text |
| Normal | 400 | Body text |
| Medium | 500 | Headings |
| SemiBold | 600 | Bold text |
| Bold | 700 | Strong emphasis |

### Line Heights

| Name | Value | Usage |
|------|-------|-------|
| None | 1 | Tight spacing |
| Tight | 1.25 | Headings |
| Normal | 1.5 | Body text |
| Relaxed | 1.625 | Long-form content |
| Loose | 2 | Large display text |

## Spacing

| Name | Value | Pixels |
|------|-------|--------|
| 0 | 0 | 0px |
| px | 1px | 1px |
| 0.5 | 0.125rem | 2px |
| 1 | 0.25rem | 4px |
| 1.5 | 0.375rem | 6px |
| 2 | 0.5rem | 8px |
| 2.5 | 0.625rem | 10px |
| 3 | 0.75rem | 12px |
| 3.5 | 0.875rem | 14px |
| 4 | 1rem | 16px |
| 5 | 1.25rem | 20px |
| 6 | 1.5rem | 24px |
| 7 | 1.75rem | 28px |
| 8 | 2rem | 32px |
| 9 | 2.25rem | 36px |
| 10 | 2.5rem | 40px |
| 11 | 2.75rem | 44px |
| 12 | 3rem | 48px |
| 14 | 3.5rem | 56px |
| 16 | 4rem | 64px |
| 20 | 5rem | 80px |
| 24 | 6rem | 96px |
| 28 | 7rem | 112px |
| 32 | 8rem | 128px |
| 36 | 9rem | 144px |
| 40 | 10rem | 160px |
| 44 | 11rem | 176px |
| 48 | 12rem | 192px |
| 52 | 13rem | 208px |
| 56 | 14rem | 224px |
| 60 | 15rem | 240px |
| 64 | 16rem | 256px |
| 72 | 18rem | 288px |
| 80 | 20rem | 320px |
| 96 | 24rem | 384px |

## Shadows

| Name | Value | Usage |
|------|-------|-------|
| sm | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Small elevation |
| DEFAULT | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` | Default shadow |
| md | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | Medium elevation |
| lg | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | Large elevation |
| xl | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Extra large elevation |
| 2xl | `0 25px 50px -12px rgb(0 0 0 / 0.25)` | 2x extra large elevation |
| inner | `inset 0 2px 4px 0 rgb(0 0 0 / 0.05)` | Inner shadow |
| none | `0 0 #0000` | No shadow |

## Border Radius

| Name | Value | Pixels |
|------|-------|--------|
| none | 0 | 0px |
| sm | 0.125rem | 2px |
| DEFAULT | 0.25rem | 4px |
| md | 0.375rem | 6px |
| lg | 0.5rem | 8px |
| xl | 0.75rem | 12px |
| 2xl | 1rem | 16px |
| 3xl | 1.5rem | 24px |
| full | 9999px | Full rounded |

## Breakpoints

| Name | Value | Pixels |
|------|-------|--------|
| sm | 640px | 640px |
| md | 768px | 768px |
| lg | 1024px | 1024px |
| xl | 1280px | 1280px |
| 2xl | 1536px | 1536px |

## Z-Index

| Name | Value | Usage |
|------|-------|-------|
| 0 | 0 | Default |
| 10 | 10 | Dropdowns |
| 20 | 20 | Modals |
| 30 | 30 | Popovers |
| 40 | 40 | Tooltips |
| 50 | 50 | Toasts |
| auto | auto | Auto |

## Animation

### Duration

| Name | Value | Usage |
|------|-------|-------|
| 75 | 75ms | Very fast animations |
| 100 | 100ms | Fast animations |
| 150 | 150ms | Quick transitions |
| 200 | 200ms | Default transition |
| 300 | 300ms | Smooth transitions |
| 500 | 500ms | Longer transitions |
| 700 | 700ms | Very long transitions |
| 1000 | 1000ms | Longest transitions |

### Easing

| Name | Value | Usage |
|------|-------|-------|
| linear | cubic-bezier(0, 0, 1, 1) | Linear transitions |
| in | cubic-bezier(0.4, 0, 1, 1) | Ease in |
| out | cubic-bezier(0, 0, 0.2, 1) | Ease out |
| in-out | cubic-bezier(0.4, 0, 0.2, 1) | Ease in and out |

## Usage in Code

### Tailwind CSS

All tokens are available as Tailwind CSS utility classes:

```jsx
// Using color tokens
<div className="bg-primary text-foreground p-4 rounded-lg">
  Primary content
</div>

// Using typography
<h1 className="text-3xl font-bold leading-tight">Heading</h1>
<p className="text-foreground/70">Subtitle</p>

// Using spacing
<div className="p-4 m-2">Spaced content</div>
```

### CSS Variables

All tokens are also available as CSS variables in `:root`:

```css
.your-selector {
  color: hsl(var(--primary));
  font-family: var(--font-sans);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}
```

## Adding New Tokens

1. Add the token to the appropriate file in `src/tokens/`
2. Update the Tailwind configuration in `tailwind.config.ts`
3. Document the new token in this file
4. If needed, add the token to Storybook's theming

## Best Practices

1. **Use semantic names**: Name tokens based on their purpose, not their visual appearance
2. **Be consistent**: Follow the established naming conventions
3. **Reuse tokens**: Use existing tokens before creating new ones
4. **Document changes**: Update this documentation when adding or modifying tokens
5. **Test in context**: Always verify tokens in the actual UI, not just in isolation
