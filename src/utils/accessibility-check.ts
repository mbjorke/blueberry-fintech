/**
 * Accessibility Check Utilities
 * 
 * Validates theme colors meet WCAG AA/AAA contrast requirements
 */

import { Theme } from '@/tokens/themes';
import { getContrastRatio, meetsWCAGAA, meetsWCAGAAA, hexToHsl, rgbaToHsl } from './color-contrast';

/**
 * Check accessibility of a theme
 */
export function checkThemeAccessibility(theme: Theme): {
  passed: boolean;
  issues: Array<{
    element: string;
    foreground: string;
    background: string;
    ratio: number;
    aa: boolean;
    aaa: boolean;
    severity: 'error' | 'warning';
  }>;
} {
  const issues: Array<{
    element: string;
    foreground: string;
    background: string;
    ratio: number;
    aa: boolean;
    aaa: boolean;
    severity: 'error' | 'warning';
  }> = [];

  // Check light theme
  const light = theme.light;
  const lightBg = `hsl(${light.background})`;
  const lightFg = `hsl(${light.foreground})`;
  
  // Primary button contrast
  const primaryRatio = getContrastRatio(`hsl(${light.primary})`, lightBg);
  const primaryAA = meetsWCAGAA(`hsl(${light.primary})`, lightBg, false);
  const primaryAAA = meetsWCAGAAA(`hsl(${light.primary})`, lightBg, false);
  
  if (!primaryAA) {
    issues.push({
      element: 'Primary button (light)',
      foreground: `hsl(${light.primary})`,
      background: lightBg,
      ratio: primaryRatio,
      aa: primaryAA,
      aaa: primaryAAA,
      severity: 'error',
    });
  } else if (!primaryAAA) {
    issues.push({
      element: 'Primary button (light)',
      foreground: `hsl(${light.primary})`,
      background: lightBg,
      ratio: primaryRatio,
      aa: primaryAA,
      aaa: primaryAAA,
      severity: 'warning',
    });
  }

  // Text contrast
  const textRatio = getContrastRatio(lightFg, lightBg);
  const textAA = meetsWCAGAA(lightFg, lightBg, false);
  const textAAA = meetsWCAGAAA(lightFg, lightBg, false);
  
  if (!textAA) {
    issues.push({
      element: 'Text (light)',
      foreground: lightFg,
      background: lightBg,
      ratio: textRatio,
      aa: textAA,
      aaa: textAAA,
      severity: 'error',
    });
  }

  // Check dark theme
  const dark = theme.dark;
  const darkBg = `hsl(${dark.background})`;
  const darkFg = `hsl(${dark.foreground})`;
  
  // Primary button contrast on dark
  const darkPrimaryRatio = getContrastRatio(`hsl(${dark.primary})`, darkBg);
  const darkPrimaryAA = meetsWCAGAA(`hsl(${dark.primary})`, darkBg, false);
  const darkPrimaryAAA = meetsWCAGAAA(`hsl(${dark.primary})`, darkBg, false);
  
  if (!darkPrimaryAA) {
    issues.push({
      element: 'Primary button (dark)',
      foreground: `hsl(${dark.primary})`,
      background: darkBg,
      ratio: darkPrimaryRatio,
      aa: darkPrimaryAA,
      aaa: darkPrimaryAAA,
      severity: 'error',
    });
  } else if (!darkPrimaryAAA) {
    issues.push({
      element: 'Primary button (dark)',
      foreground: `hsl(${dark.primary})`,
      background: darkBg,
      ratio: darkPrimaryRatio,
      aa: darkPrimaryAA,
      aaa: darkPrimaryAAA,
      severity: 'warning',
    });
  }

  // Text contrast on dark
  const darkTextRatio = getContrastRatio(darkFg, darkBg);
  const darkTextAA = meetsWCAGAA(darkFg, darkBg, false);
  const darkTextAAA = meetsWCAGAAA(darkFg, darkBg, false);
  
  if (!darkTextAA) {
    issues.push({
      element: 'Text (dark)',
      foreground: darkFg,
      background: darkBg,
      ratio: darkTextRatio,
      aa: darkTextAA,
      aaa: darkTextAAA,
      severity: 'error',
    });
  }

  // Accent contrast
  const accentRatio = getContrastRatio(`hsl(${dark.accent})`, darkBg);
  const accentAA = meetsWCAGAA(`hsl(${dark.accent})`, darkBg, false);
  
  if (!accentAA) {
    issues.push({
      element: 'Accent (dark)',
      foreground: `hsl(${dark.accent})`,
      background: darkBg,
      ratio: accentRatio,
      aa: accentAA,
      aaa: false,
      severity: 'error',
    });
  }

  return {
    passed: issues.filter(i => i.severity === 'error').length === 0,
    issues,
  };
}

/**
 * Validate Lovable theme colors against actual root CSS
 */
export function validateLovableColors() {
  // Lovable's actual colors
  const lovableColors = {
    bgPrimary: '#0F0F0F',
    bgSecondary: '#1C1C1C',
    bgTertiary: '#272725',
    textPrimary: 'rgba(255, 255, 255, 0.9)',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    buttonPrimary: '#00A2EA',
    buttonHover: '#0088cc',
  };

  const results = {
    'Primary button on dark bg': getContrastRatio(lovableColors.buttonPrimary, lovableColors.bgPrimary),
    'Primary button hover on dark bg': getContrastRatio(lovableColors.buttonHover, lovableColors.bgPrimary),
    'Text primary on dark bg': getContrastRatio(lovableColors.textPrimary, lovableColors.bgPrimary),
    'Text secondary on dark bg': getContrastRatio(lovableColors.textSecondary, lovableColors.bgPrimary),
  };

  return {
    ratios: results,
    aaCompliant: Object.values(results).every(ratio => ratio >= 4.5),
    aaaCompliant: Object.values(results).every(ratio => ratio >= 7),
  };
}

