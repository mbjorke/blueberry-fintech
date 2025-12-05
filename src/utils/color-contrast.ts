/**
 * Color Contrast Utilities
 * 
 * Utilities for checking WCAG contrast ratios and ensuring accessibility
 */

/**
 * Convert hex to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Get relative luminance of a color (for contrast calculation)
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * Returns a value between 1 (no contrast) and 21 (maximum contrast)
 */
export function getContrastRatio(color1: string, color2: string): number {
  // Handle rgba colors
  const parseColor = (color: string): { r: number; g: number; b: number; a?: number } => {
    // Handle rgba
    const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (rgbaMatch) {
      return {
        r: parseInt(rgbaMatch[1]),
        g: parseInt(rgbaMatch[2]),
        b: parseInt(rgbaMatch[3]),
        a: rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1,
      };
    }
    
    // Handle hex
    const rgb = hexToRgb(color);
    if (rgb) return rgb;
    
    throw new Error(`Unable to parse color: ${color}`);
  };

  const c1 = parseColor(color1);
  const c2 = parseColor(color2);

  // Handle alpha blending if needed
  let bg: { r: number; g: number; b: number };
  let fg: { r: number; g: number; b: number };

  if (c1.a !== undefined && c1.a < 1) {
    // c1 has alpha, blend with c2 (assuming c2 is background)
    bg = { r: c2.r, g: c2.g, b: c2.b };
    fg = {
      r: Math.round(c1.r * c1.a + c2.r * (1 - c1.a)),
      g: Math.round(c1.g * c1.a + c2.g * (1 - c1.a)),
      b: Math.round(c1.b * c1.a + c2.b * (1 - c1.a)),
    };
  } else if (c2.a !== undefined && c2.a < 1) {
    // c2 has alpha, blend with c1 (assuming c1 is background)
    bg = { r: c1.r, g: c1.g, b: c1.b };
    fg = {
      r: Math.round(c2.r * c2.a + c1.r * (1 - c2.a)),
      g: Math.round(c2.g * c2.a + c1.g * (1 - c2.a)),
      b: Math.round(c2.b * c2.a + c1.b * (1 - c2.a)),
    };
  } else {
    bg = { r: c1.r, g: c1.g, b: c1.b };
    fg = { r: c2.r, g: c2.g, b: c2.b };
  }

  const l1 = getLuminance(fg.r, fg.g, fg.b);
  const l2 = getLuminance(bg.r, bg.g, bg.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast meets WCAG AA standard (4.5:1 for normal text, 3:1 for large text)
 */
export function meetsWCAGAA(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Check if contrast meets WCAG AAA standard (7:1 for normal text, 4.5:1 for large text)
 */
export function meetsWCAGAAA(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
}

/**
 * Convert rgba string to HSL format
 */
export function rgbaToHsl(rgba: string): string {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) {
    throw new Error(`Invalid rgba color: ${rgba}`);
  }

  const r = parseInt(match[1]) / 255;
  const g = parseInt(match[2]) / 255;
  const b = parseInt(match[3]) / 255;
  const a = match[4] ? parseFloat(match[4]) : 1;

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

  // Return HSL format: "h s% l%"
  // Note: Alpha is not included in HSL format, but we can handle it separately
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

/**
 * Convert hex to HSL format
 */
export function hexToHsl(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

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

