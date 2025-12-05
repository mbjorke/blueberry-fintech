# Brand Kit Integration Guide

This repository supports brand kit integration, allowing you to import and use brand kits (like Lovable's brand kit) to create themes that match your brand standards.

## What is a Brand Kit?

A brand kit typically contains:
- **Colors**: Primary, secondary, accent colors, and semantic colors
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Spacing scale and guidelines
- **Border Radius**: Corner rounding values
- **Assets**: Logos, icons, brand images
- **Usage Guidelines**: How to use brand elements

## Supported Formats

### JSON Brand Kit Format

```json
{
  "name": "Lovable",
  "version": "1.0.0",
  "description": "Lovable brand kit",
  "colors": {
    "primary": "#3b82f6",
    "secondary": "#8b5cf6",
    "accent": "#06b6d4",
    "background": "#ffffff",
    "foreground": "#0f172a",
    "muted": "#f1f5f9",
    "success": "#22c55e",
    "warning": "#f59e0b",
    "error": "#ef4444"
  },
  "typography": {
    "fontFamily": {
      "sans": ["Inter", "system-ui", "sans-serif"]
    }
  },
  "spacing": {
    "base": "4px"
  },
  "borderRadius": {
    "base": "0.5rem"
  },
  "assets": {
    "logos": {
      "primary": "/logos/lovable-primary.svg",
      "icon": "/logos/lovable-icon.svg"
    }
  }
}
```

## Using Brand Kits

### Import Brand Kit

```typescript
import { importBrandKitFromJSON, brandKitToTheme } from '@/utils/brand-kit';

// Import from JSON
const json = `{ "name": "Lovable", "colors": { ... } }`;
const brandKit = importBrandKitFromJSON(json);

// Convert to theme
const theme = brandKitToTheme(brandKit, 'lovable');
```

### Validate Brand Kit

```typescript
import { validateBrandKit } from '@/utils/brand-kit';

const validation = validateBrandKit(brandKit);
if (!validation.valid) {
  console.error('Errors:', validation.errors);
}
```

### Export Theme as Brand Kit

```typescript
import { exportThemeAsBrandKit } from '@/utils/brand-kit';
import { blueberryTheme } from '@/tokens/themes';

const brandKit = exportThemeAsBrandKit(blueberryTheme);
const json = JSON.stringify(brandKit, null, 2);
```

## Brand Kit Structure

### Required Fields

- `name`: Brand name
- `colors.primary`: Primary brand color
- `colors.background`: Background color
- `colors.foreground`: Foreground/text color

### Optional Fields

- `colors.secondary`: Secondary brand color
- `colors.accent`: Accent color
- `colors.muted`: Muted/subtle color
- `colors.success`: Success state color
- `colors.warning`: Warning state color
- `colors.error`: Error/destructive color
- `typography`: Typography system
- `spacing`: Spacing scale
- `borderRadius`: Border radius values
- `assets`: Brand assets (logos, icons)

## Color Format Support

Brand kits support multiple color formats:
- **Hex**: `#3b82f6`
- **RGB**: `rgb(59, 130, 246)`
- **HSL**: `hsl(217 91% 60%)` or `217 91% 60%`

All colors are automatically converted to HSL format for use in themes.

## Integration with Lovable Brand Kit

If you have `lovable-brand.zip`, extract it and:

1. **Locate color definitions** (usually in CSS, JSON, or design files)
2. **Create brand kit JSON** using the structure above
3. **Import and convert** to a theme

Example workflow:

```typescript
// 1. Extract colors from Lovable brand kit
const lovableBrandKit: BrandKit = {
  name: 'Lovable',
  colors: {
    primary: '#3b82f6', // Extract from brand kit
    background: '#ffffff',
    foreground: '#0f172a',
    // ... other colors
  },
};

// 2. Convert to theme
const lovableTheme = brandKitToTheme(lovableBrandKit, 'lovable');

// 3. Use theme
applyTheme('lovable', 'light');
```

## Best Practices

1. **Validate First**: Always validate brand kits before using
2. **Test Colors**: Ensure colors meet accessibility standards
3. **Preserve Assets**: Keep brand assets in `/public` directory
4. **Document Usage**: Add usage guidelines to brand kit metadata
5. **Version Control**: Include version numbers in brand kits

## Checking Against Brand Standards

To ensure themes match brand kit standards:

1. **Color Accuracy**: Verify HSL values match brand kit colors
2. **Typography**: Ensure font families match brand guidelines
3. **Spacing**: Verify spacing scale aligns with brand kit
4. **Assets**: Confirm logos/icons match brand kit assets

## Future Enhancements

- [ ] Visual brand kit editor
- [ ] Import from Figma/Sketch files
- [ ] Export to CSS/SCSS
- [ ] Brand kit validation against WCAG standards
- [ ] Automatic dark mode generation from brand kit

## References

- [Lovable Design Tools](https://docs.lovable.dev/features/design)
- [Design Tokens Specification](https://tr.designtokens.org/format/)
- [Brand Kit Standards](https://www.brandfolder.com/brand-kit-guide)

