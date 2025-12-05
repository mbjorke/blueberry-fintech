/**
 * Brand Kit Utilities
 * 
 * Utilities for importing, validating, and using brand kits.
 * Brand kits typically contain:
 * - Color palettes (hex/rgb/hsl values)
 * - Typography (font families, sizes, weights)
 * - Logos (various formats and sizes)
 * - Spacing guidelines
 * - Border radius values
 * - Usage guidelines
 * 
 * Compatible with standard brand kit formats like Lovable's brand kit structure.
 */

import { Theme, ThemeName } from '@/tokens/themes';

export interface BrandKitColors {
  primary: string;
  secondary?: string;
  accent?: string;
  background: string;
  foreground: string;
  muted?: string;
  success?: string;
  warning?: string;
  error?: string;
  // Additional brand colors
  [key: string]: string | undefined;
}

export interface BrandKitTypography {
  fontFamily: {
    sans?: string[];
    mono?: string[];
    serif?: string[];
  };
  fontSize?: Record<string, string>;
  fontWeight?: Record<string, string>;
  lineHeight?: Record<string, string>;
}

export interface BrandKitSpacing {
  base?: string; // Base spacing unit (e.g., "4px" or "0.25rem")
  scale?: Record<string, string>; // Spacing scale
}

export interface BrandKitBorderRadius {
  base?: string; // Base border radius
  scale?: Record<string, string>; // Border radius scale
}

export interface BrandKitAssets {
  logos?: {
    primary?: string; // Path to primary logo
    secondary?: string; // Path to secondary logo
    icon?: string; // Path to icon/favicon
    variants?: Record<string, string>; // Additional logo variants
  };
  icons?: string[]; // Paths to icon files
  images?: string[]; // Paths to brand images
}

export interface BrandKit {
  name: string;
  version?: string;
  description?: string;
  colors: BrandKitColors;
  typography?: BrandKitTypography;
  spacing?: BrandKitSpacing;
  borderRadius?: BrandKitBorderRadius;
  assets?: BrandKitAssets;
  metadata?: {
    author?: string;
    website?: string;
    license?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

/**
 * Convert brand kit colors to theme colors
 */
export function brandKitToTheme(brandKit: BrandKit, themeName: ThemeName = 'blueberry'): Partial<Theme> {
  const colors = brandKit.colors;
  
  // Convert hex/rgb to HSL format if needed
  const convertToHSL = (color: string): string => {
    // If already HSL format, return as-is
    if (color.startsWith('hsl(') || /^\d+\s+\d+%\s+\d+%$/.test(color)) {
      return color.replace(/hsl\(|\)/g, '').trim();
    }
    
    // Convert hex to HSL
    if (color.startsWith('#')) {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16) / 255;
      const g = parseInt(hex.substring(2, 4), 16) / 255;
      const b = parseInt(hex.substring(4, 6), 16) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;
      let s = 0;
      const l = (max + min) / 2;
      
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
          case g: h = ((b - r) / d + 2) / 6; break;
          case b: h = ((r - g) / d + 4) / 6; break;
        }
      }
      
      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    }
    
    // If RGB format, convert to HSL
    const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1]) / 255;
      const g = parseInt(rgbMatch[2]) / 255;
      const b = parseInt(rgbMatch[3]) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;
      let s = 0;
      const l = (max + min) / 2;
      
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
          case g: h = ((b - r) / d + 2) / 6; break;
          case b: h = ((r - g) / d + 4) / 6; break;
        }
      }
      
      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    }
    
    return color; // Return as-is if format not recognized
  };
  
  return {
    name: themeName,
    displayName: brandKit.name,
    description: brandKit.description || `Theme generated from ${brandKit.name} brand kit`,
    light: {
      background: convertToHSL(colors.background || '#ffffff'),
      foreground: convertToHSL(colors.foreground || '#000000'),
      card: convertToHSL(colors.background || '#ffffff'),
      'card-foreground': convertToHSL(colors.foreground || '#000000'),
      popover: convertToHSL(colors.background || '#ffffff'),
      'popover-foreground': convertToHSL(colors.foreground || '#000000'),
      primary: convertToHSL(colors.primary || '#000000'),
      'primary-foreground': convertToHSL(colors.foreground || '#ffffff'),
      secondary: convertToHSL(colors.secondary || colors.muted || '#f5f5f5'),
      'secondary-foreground': convertToHSL(colors.foreground || '#000000'),
      muted: convertToHSL(colors.muted || '#f5f5f5'),
      'muted-foreground': convertToHSL(colors.foreground || '#666666'),
      accent: convertToHSL(colors.accent || colors.primary || '#000000'),
      'accent-foreground': convertToHSL(colors.foreground || '#ffffff'),
      success: convertToHSL(colors.success || '#22c55e'),
      'success-foreground': convertToHSL(colors.foreground || '#ffffff'),
      warning: convertToHSL(colors.warning || '#f59e0b'),
      'warning-foreground': convertToHSL(colors.foreground || '#ffffff'),
      destructive: convertToHSL(colors.error || '#ef4444'),
      'destructive-foreground': convertToHSL(colors.foreground || '#ffffff'),
      info: convertToHSL(colors.accent || colors.primary || '#3b82f6'),
      'info-foreground': convertToHSL(colors.foreground || '#ffffff'),
      border: convertToHSL(colors.muted || '#e5e5e5'),
      input: convertToHSL(colors.muted || '#e5e5e5'),
      ring: convertToHSL(colors.primary || '#000000'),
      'gradient-primary': `linear-gradient(135deg, hsl(${convertToHSL(colors.primary || '#000000')}) 0%, hsl(${convertToHSL(colors.accent || colors.primary || '#000000')}) 100%)`,
      'gradient-bg': `linear-gradient(135deg, hsl(${convertToHSL(colors.background || '#ffffff')}), hsl(${convertToHSL(colors.muted || '#f5f5f5')}))`,
      'gradient-berry': `radial-gradient(circle at 30% 50%, hsl(${convertToHSL(colors.primary || '#000000')}), hsl(${convertToHSL(colors.accent || colors.primary || '#000000')}))`,
    },
    dark: {
      // Generate dark variant (simplified - could be more sophisticated)
      background: convertToHSL('#0a0a0a'),
      foreground: convertToHSL('#ffffff'),
      card: convertToHSL('#1a1a1a'),
      'card-foreground': convertToHSL('#ffffff'),
      popover: convertToHSL('#0a0a0a'),
      'popover-foreground': convertToHSL('#ffffff'),
      primary: convertToHSL(colors.primary || '#ffffff'),
      'primary-foreground': convertToHSL('#0a0a0a'),
      secondary: convertToHSL('#1a1a1a'),
      'secondary-foreground': convertToHSL('#ffffff'),
      muted: convertToHSL('#1a1a1a'),
      'muted-foreground': convertToHSL('#999999'),
      accent: convertToHSL(colors.accent || colors.primary || '#ffffff'),
      'accent-foreground': convertToHSL('#0a0a0a'),
      success: convertToHSL(colors.success || '#22c55e'),
      'success-foreground': convertToHSL('#0a0a0a'),
      warning: convertToHSL(colors.warning || '#f59e0b'),
      'warning-foreground': convertToHSL('#ffffff'),
      destructive: convertToHSL(colors.error || '#ef4444'),
      'destructive-foreground': convertToHSL('#ffffff'),
      info: convertToHSL(colors.accent || colors.primary || '#3b82f6'),
      'info-foreground': convertToHSL('#0a0a0a'),
      border: convertToHSL('#2a2a2a'),
      input: convertToHSL('#1a1a1a'),
      ring: convertToHSL(colors.primary || '#ffffff'),
      'gradient-primary': `linear-gradient(135deg, hsl(${convertToHSL(colors.primary || '#ffffff')}) 0%, hsl(${convertToHSL(colors.accent || colors.primary || '#ffffff')}) 100%)`,
      'gradient-bg': `linear-gradient(135deg, hsl(${convertToHSL('#0a0a0a')}), hsl(${convertToHSL('#1a1a1a')}))`,
      'gradient-berry': `radial-gradient(circle at 30% 50%, hsl(${convertToHSL(colors.primary || '#ffffff')}), hsl(${convertToHSL(colors.accent || colors.primary || '#ffffff')}))`,
    },
  } as Partial<Theme>;
}

/**
 * Validate brand kit structure
 */
export function validateBrandKit(brandKit: BrandKit): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!brandKit.name) {
    errors.push('Brand kit must have a name');
  }
  
  if (!brandKit.colors) {
    errors.push('Brand kit must have colors');
  } else {
    if (!brandKit.colors.primary) {
      errors.push('Brand kit must have a primary color');
    }
    if (!brandKit.colors.background) {
      errors.push('Brand kit must have a background color');
    }
    if (!brandKit.colors.foreground) {
      errors.push('Brand kit must have a foreground color');
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Import brand kit from JSON
 */
export function importBrandKitFromJSON(json: string): BrandKit {
  try {
    const brandKit = JSON.parse(json) as BrandKit;
    const validation = validateBrandKit(brandKit);
    
    if (!validation.valid) {
      throw new Error(`Invalid brand kit: ${validation.errors.join(', ')}`);
    }
    
    return brandKit;
  } catch (error) {
    throw new Error(`Failed to parse brand kit JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Export theme as brand kit
 */
export function exportThemeAsBrandKit(theme: Theme): BrandKit {
  const light = theme.light;
  
  return {
    name: theme.displayName,
    description: theme.description,
    colors: {
      primary: `hsl(${light.primary})`,
      background: `hsl(${light.background})`,
      foreground: `hsl(${light.foreground})`,
      secondary: `hsl(${light.secondary})`,
      accent: `hsl(${light.accent})`,
      muted: `hsl(${light.muted})`,
      success: `hsl(${light.success})`,
      warning: `hsl(${light.warning})`,
      error: `hsl(${light.destructive})`,
    },
    metadata: {
      createdAt: new Date().toISOString(),
    },
  };
}

