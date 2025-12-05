# Button Hierarchy Rule

## Problem Statement

Overusing primary buttons or CSS tokens on a single screen creates cognitive overload. When multiple primary actions compete for attention, users struggle to identify the most important action, leading to decision paralysis and poor user experience.

## Rule

**Use a hierarchy of buttons to improve decision making.**

### Guidelines

1. **Single Primary Action Per Screen**
   - **Only one primary button** (`variant="default"`) should be visible on the entire screen
   - The primary button should represent the most important action on the screen
   - All other actions should use secondary (`outline`) or tertiary (`ghost`) variants

2. **Button Hierarchy**
   ```
   Primary (default)     → Most important action (1 per screen total)
   Secondary (outline)   → Secondary actions (unlimited)
   Tertiary (ghost)      → Less important actions (unlimited)
   Destructive           → Delete/danger actions (use sparingly)
   ```

3. **Visual Hierarchy**
   - Primary buttons should stand out through color and contrast
   - Secondary buttons should be visually distinct but less prominent
   - Use spacing and grouping to separate action hierarchies

## Visual Examples

### ❌ Bad: Multiple Primary Buttons

**Visual Representation:**
```
┌─────────────────────────────────┐
│  [Save Changes]  ← Primary      │  ❌ Too many primary buttons
│  [Submit Form]   ← Primary      │     compete for attention
│  [Continue]      ← Primary      │
└─────────────────────────────────┘
```

**Code:**
```tsx
<div className="space-y-4">
  <Button variant="default">Save Changes</Button>
  <Button variant="default">Submit Form</Button>
  <Button variant="default">Continue</Button>
</div>
```

**Problems:**
- ❌ Multiple primary buttons create cognitive overload
- ❌ Users can't identify the most important action
- ❌ Violates the "one primary action per screen" rule

### ✅ Good: Proper Hierarchy

**Visual Representation:**
```
┌─────────────────────────────────┐
│  [Save Changes]  ← Primary      │  ✅ Clear hierarchy:
│  [Cancel]        ← Secondary    │     One primary action
│  Reset           ← Tertiary     │     stands out
└─────────────────────────────────┘
```

**Code:**
```tsx
<div className="space-y-4">
  <Button variant="default">Save Changes</Button>
  <Button variant="outline">Cancel</Button>
  <Button variant="ghost">Reset</Button>
</div>
```

**Benefits:**
- ✅ Single primary action is clear
- ✅ Secondary actions are visually distinct
- ✅ Follows design system hierarchy

### ✅ Good: Single Primary Across Multiple Sections

**Visual Representation:**
```
┌──────────────┐  ┌──────────────┐
│ Card 1       │  │ Card 2       │
│              │  │              │
│ [Primary]    │  │ [Secondary]  │  ✅ Only one primary
│ [Secondary]  │  │ [Tertiary]   │     across entire screen
└──────────────┘  └──────────────┘
```

**Code:**
```tsx
<div className="grid grid-cols-2 gap-4">
  <Card>
    <CardContent>
      <Button variant="default">Primary Action</Button>
      <Button variant="outline">Secondary</Button>
    </CardContent>
  </Card>
  <Card>
    <CardContent>
      <Button variant="outline">Different Action</Button>
      <Button variant="ghost">Tertiary</Button>
    </CardContent>
  </Card>
</div>
```

**Benefits:**
- ✅ Only one primary button on entire screen
- ✅ Clear visual hierarchy maintained
- ✅ Each card has appropriate button variants

### ✅ Good: Form with Proper Button Hierarchy

**Visual Representation:**
```
┌─────────────────────────────────┐
│  Form Fields                    │
│  ┌───────────────────────────┐  │
│  │ Name: [____________]      │  │
│  │ Email: [____________]     │  │
│  └───────────────────────────┘  │
│                                 │
│  [Submit]  ← Primary            │  ✅ Single primary
│  [Cancel]  ← Secondary          │     action in footer
└─────────────────────────────────┘
```

**Code:**
```tsx
<form>
  <div className="space-y-4">
    <Input name="name" />
    <Input name="email" />
  </div>
  <div className="flex gap-4 mt-6">
    <Button type="submit" variant="default">Submit</Button>
    <Button type="button" variant="outline">Cancel</Button>
  </div>
</form>
```

## Validation Criteria

When validating a component or page:

1. **Count primary buttons** (`variant="default"` or no variant specified)
2. **Flag violations**:
   - **More than 1 primary button on the entire screen** (strict rule)
   - Primary buttons competing for attention

3. **Suggest improvements**:
   - Convert excess primary buttons to `outline` or `ghost` variants
   - Identify the single most important action and make it the only primary button
   - Use visual hierarchy (spacing, grouping) to guide users to the primary action

## Related Patterns

- See `patterns/dashboard-layout.md` for layout patterns
- See `components/ui/button.md` for button component details
- See `tokens/colors.md` for color token usage

