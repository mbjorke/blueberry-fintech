# No Emojis Rule

## Problem Statement

Emojis in code create inconsistency, accessibility issues, and maintenance problems. They don't scale well, may not render correctly across platforms, and can cause encoding issues. The design system provides a comprehensive icon system (Lucide React) that should be used instead.

## Rule

**Never use emojis in code. Always use the design system icon system instead.**

### Guidelines

1. **Use Lucide React Icons**
   - The design system uses `lucide-react` for all icons
   - Icons are consistent, accessible, and scalable
   - Example: `<Heart />` instead of ❤️

2. **Icon System**
   ```
   Import: import { Heart, Star, Check } from "lucide-react"
   Usage: <Heart className="w-4 h-4" />
   ```

3. **Never Use**
   - Unicode emojis: ❤️, ⭐, ✅, 🎉, etc.
   - Emoji shortcodes: `:heart:`, `:star:`, etc.
   - Emoji in strings: "Check ✅", "Success 🎉"
   - Emoji in JSX: `<span>✅</span>`

## Visual Examples

### ❌ Bad: Using Emojis

```tsx
// Unicode emoji
<button>Save ❤️</button>

// Emoji in text
<p>Success! 🎉</p>

// Emoji in JSX
<span>✅ Completed</span>

// Emoji in comments (also discouraged)
{/* TODO: Fix this 🐛 */}
```

**Problems:**
- ❌ Inconsistent rendering across platforms
- ❌ Accessibility issues (screen readers may not read emojis correctly)
- ❌ Encoding problems
- ❌ Not scalable or customizable
- ❌ Breaks design system consistency

### ✅ Good: Using Icon System

```tsx
// Lucide React icon
import { Heart, Check, PartyPopper } from "lucide-react";

<button className="flex items-center gap-2">
  <Heart className="w-4 h-4" />
  Save
</button>

// Icon with text
<div className="flex items-center gap-2">
  <PartyPopper className="w-5 h-5 text-primary" />
  <p>Success!</p>
</div>

// Icon in status
<div className="flex items-center gap-2">
  <Check className="w-4 h-4 text-success" />
  <span>Completed</span>
</div>
```

**Benefits:**
- ✅ Consistent rendering across all platforms
- ✅ Accessible (proper ARIA support)
- ✅ Scalable and customizable (size, color, stroke)
- ✅ Maintains design system consistency
- ✅ No encoding issues

### ✅ Good: Common Emoji Replacements

| Emoji | Icon Component | Use Case |
|-------|---------------|----------|
| ❤️ | `<Heart />` | Favorites, likes |
| ⭐ | `<Star />` | Ratings, favorites |
| ✅ | `<Check />` | Success, completed |
| 🎉 | `<PartyPopper />` | Celebration, success |
| 🐛 | `<Bug />` | Bugs, issues |
| 🔍 | `<Search />` | Search functionality |
| ⚙️ | `<Settings />` | Settings, configuration |
| 📝 | `<FileText />` | Documents, notes |
| 🔔 | `<Bell />` | Notifications |
| 👤 | `<User />` | User, profile |
| 🏠 | `<Home />` | Home, navigation |
| 📊 | `<BarChart />` | Analytics, data |
| 💰 | `<DollarSign />` | Money, finance |
| 🛒 | `<ShoppingCart />` | Shopping, cart |
| 📧 | `<Mail />` | Email, messages |

## Validation Criteria

When validating a component or page:

1. **Scan for emojis**:
   - Unicode emoji characters (wide range of Unicode ranges)
   - Common emoji patterns: ❤️, ⭐, ✅, 🎉, etc.
   - Emoji in strings, JSX, and comments

2. **Flag violations**:
   - **Error**: Any emoji found in code
   - **Warning**: Emoji in comments (less critical but still discouraged)

3. **Suggest improvements**:
   - Replace emoji with appropriate Lucide React icon
   - Provide icon import statement
   - Show proper icon usage example

## Common Replacements

### Text Content
```tsx
// ❌ Bad
<p>Welcome! 👋</p>

// ✅ Good
import { Wave } from "lucide-react";
<p className="flex items-center gap-2">
  <Wave className="w-4 h-4" />
  Welcome!
</p>
```

### Status Indicators
```tsx
// ❌ Bad
<span>✅ Active</span>

// ✅ Good
import { CheckCircle } from "lucide-react";
<span className="flex items-center gap-2">
  <CheckCircle className="w-4 h-4 text-success" />
  Active
</span>
```

### Buttons
```tsx
// ❌ Bad
<Button>Save ❤️</Button>

// ✅ Good
import { Heart } from "lucide-react";
<Button className="flex items-center gap-2">
  <Heart className="w-4 h-4" />
  Save
</Button>
```

## Related Patterns

- See `components/ui/button.md` for button with icon patterns
- Lucide React Icons: https://lucide.dev/icons/
- Icon usage guidelines: Use consistent sizing (`w-4 h-4` for small, `w-5 h-5` for medium)

