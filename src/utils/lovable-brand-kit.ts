/**
 * Lovable Brand Kit Integration
 * 
 * Utilities for loading and using the Lovable brand kit from public/lovable-brand
 */

import { BrandKit, importBrandKitFromJSON, brandKitToTheme } from './brand-kit';
import { Theme, ThemeName } from '@/tokens/themes';

/**
 * Load Lovable brand kit from public directory
 */
export async function loadLovableBrandKit(): Promise<BrandKit> {
  try {
    const response = await fetch('/lovable-brand/brand-kit.json');
    if (!response.ok) {
      throw new Error(`Failed to load brand kit: ${response.statusText}`);
    }
    const json = await response.text();
    return importBrandKitFromJSON(json);
  } catch (error) {
    // Fallback to hardcoded brand kit if file doesn't exist
    console.warn('Could not load brand kit file, using fallback:', error);
    return getLovableBrandKitFallback();
  }
}

/**
 * Fallback Lovable brand kit definition
 * Based on Lovable's design system and brand assets
 */
export function getLovableBrandKitFallback(): BrandKit {
  return {
    name: 'Lovable',
    version: '1.0.0',
    description: 'Lovable brand kit - Official brand assets and design tokens',
    colors: {
      primary: '#00A2EA',       // Cyan-blue - From Lovable root CSS (button-primary)
      primaryHover: '#0088cc',  // Darker cyan - button-hover
      secondary: '#2167DB',     // Blue - button-secondary-hover
      accent: '#00A2EA',        // Same as primary
      background: '#0F0F0F',     // bg-primary - Dark theme default
      backgroundSecondary: '#1C1C1C', // bg-secondary
      backgroundTertiary: '#272725',  // bg-tertiary
      foreground: 'rgba(255, 255, 255, 0.9)', // text-primary
      foregroundSecondary: 'rgba(255, 255, 255, 0.7)', // text-secondary
      foregroundTertiary: 'rgba(255, 255, 255, 0.5)', // text-tertiary
      border: 'rgba(255, 255, 255, 0.15)', // border-color
      inputBg: '#2D2D2D',       // input-bg
      buttonPrimary: '#00A2EA', // button-primary (WCAG AA: 6.71:1)
      buttonHover: '#0088cc',   // button-hover
      buttonSecondary: '#272725', // button-secondary
      buttonSecondaryHover: '#2167DB', // button-secondary-hover
      error: 'rgba(239, 68, 68, 0.95)', // error-bg
      success: '#22c55e',
      warning: '#FE7B02',
      gradient: {
        start: '#FF8E63',       // Orange - From logo gradient
        middle: '#FF7EB0',      // Pink - From logo gradient
        end: '#4B73FF',         // Blue - From logo gradient
      },
    },
    typography: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
    spacing: {
      base: '4px',
    },
    borderRadius: {
      base: '0.5rem',
    },
    assets: {
      logos: {
        primary: '/lovable-brand/logoblack.svg',
        primaryLight: '/lovable-brand/logowhite.svg',
        icon: '/lovable-brand/lovable-logo-icon.svg',
        iconPng: '/lovable-brand/lovable-logo-icon.png',
        light: '/lovable-brand/lovable-light-png.png',
        dark: '/lovable-brand/lovable-dark-png.png',
        logoBgLight: '/lovable-brand/lovable-logo-bg-light.png',
        logoBgDark: '/lovable-brand/lovable-logo-bg-dark.png',
        iconBgLight: '/lovable-brand/lovable-icon-bg-light.png',
        iconBgDark: '/lovable-brand/lovable-icon-bg-dark.png',
      },
    },
    metadata: {
      author: 'Lovable',
      website: 'https://lovable.dev',
      license: 'Proprietary - Lovable Brand Assets',
    },
  };
}

/**
 * Get Lovable theme generated from brand kit
 */
export async function getLovableThemeFromBrandKit(): Promise<Theme> {
  const brandKit = await loadLovableBrandKit();
  const theme = brandKitToTheme(brandKit, 'lovable');
  
  // Ensure it's a complete theme
  if (!theme.light || !theme.dark) {
    throw new Error('Failed to generate complete theme from brand kit');
  }
  
  return theme as Theme;
}

/**
 * Get Lovable logo paths
 */
export function getLovableLogos() {
  return {
    primary: '/lovable-brand/logoblack.svg',
    primaryLight: '/lovable-brand/logowhite.svg',
    icon: '/lovable-brand/lovable-logo-icon.svg',
    iconPng: '/lovable-brand/lovable-logo-icon.png',
    light: '/lovable-brand/lovable-light-png.png',
    dark: '/lovable-brand/lovable-dark-png.png',
    logoBgLight: '/lovable-brand/lovable-logo-bg-light.png',
    logoBgDark: '/lovable-brand/lovable-logo-bg-dark.png',
    iconBgLight: '/lovable-brand/lovable-icon-bg-light.png',
    iconBgDark: '/lovable-brand/lovable-icon-bg-dark.png',
  };
}

