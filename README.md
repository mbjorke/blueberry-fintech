# 🎨 Blueberry Design System

A comprehensive design system built for Blueberry products, featuring custom-branded components while respecting third-party dependencies. Originally developed as a proof of concept and now properly branded under the Blueberry ecosystem with our `blueberry-*` naming convention.

## 📦 Background

This design system was originally built as [`blueberry-fintech`](https://github.com/mbjorke/blueberry-fintech) - a proof of concept demonstrating:

- Design system architecture with Storybook documentation
- Component library built on Radix UI primitives
- Fintech-specific UI components
- TypeScript implementation with comprehensive testing
- Theme system with design tokens

**Now fully transitioned to Blueberry ecosystem** with:

- ✅ **Pure Blueberry Ownership** - All third-party tool references removed
- ✅ **Clean Branding** - `@blueberry/design-system` package name
- ✅ **Legal Compliance** - Clear IP separation maintained
- ✅ **Monorepo Integration** - Works seamlessly with other Blueberry packages

## 🏗️ Architecture

### Original Blueberry Structure
```
blueberry-fintech/
├── Components built on Radix UI
├── Fintech-specific UI patterns
├── Storybook documentation
└── Custom theming system
```

### Lopify Integration
```
packages/lopify-design-system/
├── 🔧 Built on Radix UI primitives (Third-party)
│   ├── @radix-ui/react-dialog
│   ├── @radix-ui/react-dropdown-menu
│   └── [40+ Radix components]
│
├── 🎨 Lopify Branding (Our IP)
│   ├── Custom styling & theming
│   ├── Lopify design tokens
│   ├── Branded component variants
│   └── Logo & identity system
│
└── 📚 Documentation & Examples
    ├── Storybook stories
    ├── Component documentation
    └── Usage guidelines
```

## 🎯 Naming Convention Demonstration

### ✅ Our Branding (`lopify-*`)
```bash
# Our design system package
@lopify/design-system

# Our branded components
<LopifyLogo />          ← Our component
<LopifyButton />        ← Our component
<LopifyCard />          ← Our component

# Our design tokens
lopifyColors           ← Our tokens
lopifyTypography       ← Our tokens
lopifySpacing          ← Our tokens
```

### 🔗 Third-Party Dependencies
```bash
# Radix UI primitives (MIT licensed)
@radix-ui/react-dialog
@radix-ui/react-dropdown-menu
@radix-ui/react-button

# Other third-party libraries
@iconify/react
@hookform/resolvers
tailwindcss
```

## 📜 Legal Considerations

### ✅ Proper Attribution Strategy
- **Radix UI**: MIT license (no attribution required)
- **Our Code**: MIT license (commercial friendly)
- **Clear Separation**: Third-party dependencies clearly listed in package.json

### ✅ Branding Rights
- **`lopify-*`**: Our trademarked brand name
- **No Confusion**: Clear distinction from Radix UI or other design systems
- **Commercial Use**: Can be used in proprietary products

### ✅ IP Protection
- **Our Components**: Original styling, theming, composition
- **Our Documentation**: Custom usage guidelines and examples
- **Our Branding**: Lopify logos, colors, typography system

## 🚀 Transition Process

### Step 1: Package Rebranding
```bash
# Before
"blueberry-fintech" → "blueberry.svg"

# After
"@lopify/design-system" → "lopify-logo.tsx"
```

### Step 2: Component Rebranding
```typescript
// Before
<BlueberryLogo src="/blueberry.svg" alt="Blueberry" />

// After
<LopifyLogo variant="lopify" alt="Lopify Logo" />
```

### Step 3: Backward Compatibility
```typescript
// Maintain compatibility for existing code
export const BlueberryLogo = LopifyLogo;
```

## 🎨 Component Showcase

### Base Components (Built on Radix UI)
- **Avatar, Badge, Button** - Essential UI primitives
- **Card, Dialog, Dropdown** - Layout and interaction
- **Form, Input, Select** - Data entry components
- **Toast, Tooltip, Progress** - Feedback and status

### Fintech Components (Our Innovation)
- **AccountCard** - Banking account display
- **TransactionItem** - Transaction history
- **SpendingInsights** - Analytics visualization
- **AlertsDropdown** - Notification system

### Branding Components (Our Identity)
- **LopifyLogo** - Company logo with variants
- **ThemeProvider** - Lopify theme system
- **Design Tokens** - Lopify color palette and typography

## 🛠️ Development

### Getting Started
```bash
# Install dependencies
npm install

# Run Storybook
npm run storybook

# Build for production
npm run build
```

### Adding New Components
1. **Choose Radix Primitive** (when applicable)
2. **Apply Lopify Styling** (design tokens)
3. **Add Lopify Branding** (naming, variants)
4. **Document in Storybook** (examples, props)

### Design Token Usage
```typescript
import { lopifyColors, lopifyTypography } from './tokens';

// Use our branded design tokens
const buttonStyles = {
  backgroundColor: lopifyColors.primary,
  fontFamily: lopifyTypography.fontFamily,
  borderRadius: lopifySpacing.borderRadius,
};
```

## 📊 Storybook Documentation

The design system includes comprehensive Storybook documentation:

### Component Categories
- **Base Components** - Fundamental UI primitives
- **Composed Components** - Complex fintech-specific components
- **Feedback Components** - Status and interaction feedback
- **Form Components** - Data entry and validation
- **Navigation Components** - Routing and navigation
- **Utilities** - Helper components and utilities

### Documentation Features
- **Interactive Examples** - Try components in real-time
- **Props Documentation** - Complete TypeScript interfaces
- **Usage Guidelines** - Best practices and patterns
- **Accessibility** - WCAG compliance information
- **Theming** - Customization and branding options

## 🔄 Migration Path

### For Existing Blueberry Projects
```typescript
// Old imports (still work)
import { BlueberryLogo } from '@lopify/design-system';

// New recommended imports
import { LopifyLogo } from '@lopify/design-system';
```

### Gradual Transition
1. **Keep backward compatibility** during transition
2. **Update documentation** to show Lopify examples
3. **Migrate components** gradually
4. **Update branding** in design files

## 🤝 Contributing

### Component Development Guidelines
1. **Use Radix UI** when possible (accessibility benefits)
2. **Follow Lopify design tokens** (consistency)
3. **Document thoroughly** (Storybook + README)
4. **Test accessibility** (WCAG AA compliance)
5. **TypeScript first** (comprehensive type definitions)

### Branding Guidelines
- Use `Lopify` prefix for component names
- Follow established design tokens
- Document component variants
- Include accessibility considerations

## 📄 License

MIT License - see LICENSE file for details.

---

**🎨 Built with ❤️ by Lopify | Originally developed as Blueberry Fintech POC**
**🔧 Powered by Radix UI primitives | 📚 Documented with Storybook**