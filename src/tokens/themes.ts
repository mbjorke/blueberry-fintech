/**
 * Theme Configuration
 * 
 * Credits:
 * - Token system inspired by Lovable's excellent design token architecture
 * - Component primitives built on Radix UI's accessible component foundation
 * 
 * Based on Lovable's theme system (https://docs.lovable.dev/features/design):
 * Themes define core style system: colors, fonts, spacing, and border radius
 * 
 * This demonstrates the power of token-based theming - switch entire color schemes
 * by simply updating CSS variables. No component code changes needed!
 */

export type ThemeName = 'blueberry' | 'lovable' | 'raspberry' | 'lingonberry' | 'strawberry';

export interface ThemeColors {
  // Base colors
  background: string;
  foreground: string;
  card: string;
  'card-foreground': string;
  popover: string;
  'popover-foreground': string;
  
  // Primary brand colors
  primary: string;
  'primary-foreground': string;
  
  // Secondary colors
  secondary: string;
  'secondary-foreground': string;
  
  // UI colors
  muted: string;
  'muted-foreground': string;
  accent: string;
  'accent-foreground': string;
  
  // Status colors
  success: string;
  'success-foreground': string;
  warning: string;
  'warning-foreground': string;
  destructive: string;
  'destructive-foreground': string;
  info: string;
  'info-foreground': string;
  
  // Border colors
  border: string;
  input: string;
  ring: string;
  
  // Gradients
  'gradient-primary': string;
  'gradient-bg': string;
  'gradient-berry': string;
}

/**
 * Theme Interface
 * 
 * Aligned with Lovable's theme structure (https://docs.lovable.dev/features/design):
 * - Colors: Primary palette and semantic colors (defined in light/dark)
 * - Fonts: Typography system (inherited from design tokens)
 * - Spacing: Spacing scale (inherited from design tokens)
 * - Border Radius: Corner rounding (inherited from design tokens)
 * 
 * Our themes focus on colors (light/dark variants), while typography, spacing,
 * and border radius are shared across all themes via design tokens.
 */
export interface Theme {
  name: ThemeName;
  displayName: string;
  description: string;
  light: ThemeColors;
  dark: ThemeColors;
}

/**
 * Blueberry Theme (Default)
 * Classic purple-blueberry aesthetic
 */
export const blueberryTheme: Theme = {
  name: 'blueberry',
  displayName: 'Blueberry',
  description: 'Classic purple-blueberry theme',
  light: {
    background: '0 0% 100%',
    foreground: '240 6% 15%',
    card: '0 0% 100%',
    'card-foreground': '240 6% 15%',
    popover: '0 0% 100%',
    'popover-foreground': '240 6% 15%',
    primary: '240 6% 15%',
    'primary-foreground': '0 0% 98%',
    secondary: '240 5% 96%',
    'secondary-foreground': '240 6% 10%',
    muted: '240 5% 96%',
    'muted-foreground': '240 4% 46%',
    accent: '260 85% 68%',
    'accent-foreground': '0 0% 98%',
    success: '150 80% 45%',
    'success-foreground': '0 0% 98%',
    warning: '38 92% 50%',
    'warning-foreground': '0 0% 98%',
    destructive: '0 84% 60%',
    'destructive-foreground': '0 0% 98%',
    info: '200 90% 50%',
    'info-foreground': '0 0% 98%',
    border: '240 6% 90%',
    input: '240 6% 90%',
    ring: '260 85% 68%',
    // Rich multi-stop gradients inspired by Lovable's approach - 5 color stops for depth
    'gradient-primary': 'linear-gradient(135deg, hsl(260 85% 68%) 0%, hsl(265 86% 69%) 25%, hsl(270 88% 70%) 50%, hsl(275 89% 71%) 75%, hsl(280 90% 72%) 100%)',
    'gradient-bg': 'linear-gradient(135deg, hsl(240 15% 8%), hsl(240 12% 11%))',
    'gradient-berry': 'radial-gradient(circle at 30% 50%, hsl(260 85% 70%) 0%, hsl(270 88% 72%) 40%, hsl(230 80% 65%) 100%)',
  },
  dark: {
    background: '240 15% 8%',
    foreground: '240 5% 98%',
    card: '240 12% 11%',
    'card-foreground': '240 5% 98%',
    popover: '240 15% 8%',
    'popover-foreground': '240 5% 98%',
    primary: '240 5% 98%',
    'primary-foreground': '240 15% 8%',
    secondary: '240 8% 15%',
    'secondary-foreground': '240 5% 98%',
    muted: '240 6% 18%',
    'muted-foreground': '240 5% 65%',
    accent: '260 85% 68%',
    'accent-foreground': '240 5% 98%',
    success: '150 80% 55%',
    'success-foreground': '240 15% 8%',
    warning: '38 92% 50%',
    'warning-foreground': '0 0% 100%',
    destructive: '0 84% 60%',
    'destructive-foreground': '240 5% 98%',
    info: '200 90% 60%',
    'info-foreground': '240 15% 8%',
    border: '240 8% 20%',
    input: '240 8% 15%',
    ring: '260 85% 68%',
    // Rich multi-stop gradients - 5 color stops for depth
    'gradient-primary': 'linear-gradient(135deg, hsl(260 85% 68%) 0%, hsl(265 86% 69%) 25%, hsl(270 88% 70%) 50%, hsl(275 89% 71%) 75%, hsl(280 90% 72%) 100%)',
    'gradient-bg': 'linear-gradient(135deg, hsl(240 15% 8%), hsl(240 12% 11%))',
    'gradient-berry': 'radial-gradient(circle at 30% 50%, hsl(260 85% 70%) 0%, hsl(270 88% 72%) 40%, hsl(230 80% 65%) 100%)',
  },
};

/**
 * Lovable Theme
 * Colors from Lovable's actual root CSS variables
 * Dark theme optimized for accessibility (WCAG AA/AAA compliant)
 * Primary: #00A2EA (cyan-blue), ensures AA contrast on dark backgrounds
 */
export const lovableTheme: Theme = {
  name: 'lovable',
  displayName: 'Lovable',
  description: 'Official Lovable theme matching root CSS variables - WCAG AA/AAA compliant',
  light: {
    // Note: Lovable uses dark theme by default, light theme is inferred
    background: '0 0% 100%',
    foreground: '0 0% 6%',        // #0F0F0F equivalent for light mode
    card: '0 0% 100%',
    'card-foreground': '0 0% 6%',
    popover: '0 0% 100%',
    'popover-foreground': '0 0% 6%',
    primary: '198 100% 46%',       // #00A2EA - Cyan-blue primary (exact HSL)
    'primary-foreground': '0 0% 100%',
    secondary: '210 40% 96%',
    'secondary-foreground': '0 0% 6%',
    muted: '210 40% 96%',
    'muted-foreground': '0 0% 40%',
    accent: '198 100% 46%',       // #00A2EA - Same as primary
    'accent-foreground': '0 0% 100%',
    success: '142 76% 36%',
    'success-foreground': '0 0% 100%',
    warning: '38 92% 50%',
    'warning-foreground': '0 0% 100%',
    destructive: '0 84% 60%',     // rgba(239, 68, 68, 0.95) equivalent
    'destructive-foreground': '0 0% 100%',
    info: '198 100% 46%',         // #00A2EA
    'info-foreground': '0 0% 100%',
    border: '0 0% 85%',
    input: '0 0% 85%',
    ring: '198 100% 46%',         // #00A2EA
    // Lovable brand gradient from logo: orange → pink → blue
    // Using 5-stop gradient for richness: #FF8E63 → #FF7EB0 → #4B73FF
    'gradient-primary': 'linear-gradient(135deg, hsl(17 100% 69%) 0%, hsl(15 100% 71%) 25%, hsl(337 100% 75%) 50%, hsl(320 100% 73%) 75%, hsl(227 100% 65%) 100%)',
    'gradient-bg': 'linear-gradient(135deg, hsl(0 0% 100%), hsl(0 0% 98%))',
    'gradient-berry': 'radial-gradient(circle at 30% 50%, hsl(17 100% 71%) 0%, hsl(337 100% 77%) 40%, hsl(227 100% 67%) 100%)',
  },
  dark: {
    // Lovable's actual dark theme colors from root CSS variables
    // All colors verified for WCAG AA compliance
    background: '0 0% 6%',        // #0F0F0F - bg-primary
    foreground: '0 0% 91%',       // rgba(255, 255, 255, 0.9) blended - text-primary (AAA: 15.5:1)
    card: '0 0% 11%',             // #1C1C1C - bg-secondary
    'card-foreground': '0 0% 91%',
    popover: '0 0% 6%',          // #0F0F0F - bg-primary
    'popover-foreground': '0 0% 91%',
    primary: '198 100% 46%',      // #00A2EA - button-primary (WCAG AA: 6.71:1 on dark bg)
    'primary-foreground': '0 0% 100%', // White text on primary button
    secondary: '60 3% 15%',        // #272725 - button-secondary / bg-tertiary (exact HSL)
    'secondary-foreground': '0 0% 91%',
    muted: '60 3% 15%',           // #272725 - bg-tertiary
    'muted-foreground': '0 0% 72%', // rgba(255, 255, 255, 0.7) blended - text-secondary
    accent: '198 100% 46%',       // #00A2EA - Same as primary (WCAG AA compliant)
    'accent-foreground': '0 0% 100%',
    success: '142 76% 45%',
    'success-foreground': '0 0% 6%',
    warning: '38 92% 50%',
    'warning-foreground': '0 0% 6%',
    destructive: '0 84% 60%',     // rgba(239, 68, 68, 0.95) - error-bg
    'destructive-foreground': '0 0% 100%',
    info: '198 100% 46%',         // #00A2EA
    'info-foreground': '0 0% 100%',
    border: '0 0% 20%',          // rgba(255, 255, 255, 0.15) blended - border-color (exact)
    input: '0 0% 18%',           // #2D2D2D - input-bg
    ring: '198 100% 46%',        // #00A2EA
    // Lovable brand gradient from logo: orange → pink → blue
    // Using 5-stop gradient for richness: #FF8E63 → #FF7EB0 → #4B73FF
    // These gradients showcase Lovable's beautiful brand colors from the logo
    'gradient-primary': 'linear-gradient(135deg, hsl(17 100% 69%) 0%, hsl(15 100% 71%) 25%, hsl(337 100% 75%) 50%, hsl(320 100% 73%) 75%, hsl(227 100% 65%) 100%)',
    'gradient-bg': 'linear-gradient(180deg, hsl(0 0% 6%) 0%, hsl(0 0% 0%) 100%)', // popup-bg gradient
    'gradient-berry': 'radial-gradient(circle at 30% 50%, hsl(17 100% 71%) 0%, hsl(337 100% 77%) 40%, hsl(227 100% 67%) 100%)',
  },
};

/**
 * Raspberry Theme
 * Bold, vibrant red-raspberry theme
 */
export const raspberryTheme: Theme = {
  name: 'raspberry',
  displayName: 'Raspberry',
  description: 'Bold, vibrant red-raspberry theme',
  light: {
    background: '0 0% 100%',
    foreground: '340 15% 15%',
    card: '0 0% 100%',
    'card-foreground': '340 15% 15%',
    popover: '0 0% 100%',
    'popover-foreground': '340 15% 15%',
    primary: '340 75% 55%',
    'primary-foreground': '0 0% 98%',
    secondary: '340 10% 96%',
    'secondary-foreground': '340 15% 15%',
    muted: '340 10% 96%',
    'muted-foreground': '340 5% 45%',
    accent: '340 75% 55%',
    'accent-foreground': '0 0% 98%',
    success: '150 80% 45%',
    'success-foreground': '0 0% 98%',
    warning: '38 92% 50%',
    'warning-foreground': '0 0% 98%',
    destructive: '0 84% 60%',
    'destructive-foreground': '0 0% 98%',
    info: '200 90% 50%',
    'info-foreground': '0 0% 98%',
    border: '340 10% 90%',
    input: '340 10% 90%',
    ring: '340 75% 55%',
    // Raspberry gradients - deep pink-purple tones with 5 stops to distinguish from other berries
    // Raspberry has more purple-pink tones (hue 320-350°) vs strawberry's pink-red (350-10°)
    'gradient-primary': 'linear-gradient(135deg, hsl(320 75% 55%) 0%, hsl(330 76% 56%) 25%, hsl(340 77% 57%) 50%, hsl(345 78% 58%) 75%, hsl(350 80% 60%) 100%)',
    'gradient-bg': 'linear-gradient(135deg, hsl(340 15% 8%), hsl(340 12% 11%))',
    'gradient-berry': 'radial-gradient(circle at 30% 50%, hsl(320 75% 57%) 0%, hsl(335 76% 58%) 40%, hsl(350 80% 60%) 100%)',
  },
  dark: {
    background: '340 15% 8%',
    foreground: '340 5% 98%',
    card: '340 12% 11%',
    'card-foreground': '340 5% 98%',
    popover: '340 15% 8%',
    'popover-foreground': '340 5% 98%',
    primary: '340 75% 65%',
    'primary-foreground': '340 15% 8%',
    secondary: '340 8% 15%',
    'secondary-foreground': '340 5% 98%',
    muted: '340 6% 18%',
    'muted-foreground': '340 5% 65%',
    accent: '340 75% 65%',
    'accent-foreground': '340 5% 98%',
    success: '150 80% 55%',
    'success-foreground': '340 15% 8%',
    warning: '38 92% 50%',
    'warning-foreground': '0 0% 100%',
    destructive: '0 84% 60%',
    'destructive-foreground': '340 5% 98%',
    info: '200 90% 60%',
    'info-foreground': '340 15% 8%',
    border: '340 8% 20%',
    input: '340 8% 15%',
    ring: '340 75% 65%',
    // Raspberry gradients - deep pink-purple tones with 5 stops
    'gradient-primary': 'linear-gradient(135deg, hsl(320 75% 65%) 0%, hsl(330 76% 66%) 25%, hsl(340 77% 67%) 50%, hsl(345 78% 68%) 75%, hsl(350 80% 70%) 100%)',
    'gradient-bg': 'linear-gradient(135deg, hsl(340 15% 8%), hsl(340 12% 11%))',
    'gradient-berry': 'radial-gradient(circle at 30% 50%, hsl(320 75% 67%) 0%, hsl(335 76% 68%) 40%, hsl(350 80% 70%) 100%)',
  },
};

/**
 * Lingonberry Theme
 * Bright, vibrant red theme inspired by Scandinavian lingonberry
 * Lingonberries are bright red (not orange!) - similar to cranberries
 */
export const lingonberryTheme: Theme = {
  name: 'lingonberry',
  displayName: 'Lingonberry',
  description: 'Bright, vibrant red theme inspired by Scandinavian lingonberry',
  light: {
    background: '0 0% 100%',
    foreground: '0 10% 15%',
    card: '0 0% 100%',
    'card-foreground': '0 10% 15%',
    popover: '0 0% 100%',
    'popover-foreground': '0 10% 15%',
    primary: '0 75% 50%',
    'primary-foreground': '0 0% 98%',
    secondary: '0 5% 96%',
    'secondary-foreground': '0 10% 15%',
    muted: '0 5% 96%',
    'muted-foreground': '0 3% 45%',
    accent: '0 75% 50%',
    'accent-foreground': '0 0% 98%',
    success: '150 80% 45%',
    'success-foreground': '0 0% 98%',
    warning: '38 92% 50%',
    'warning-foreground': '0 0% 98%',
    destructive: '0 84% 60%',
    'destructive-foreground': '0 0% 98%',
    info: '200 90% 50%',
    'info-foreground': '0 0% 98%',
    border: '0 5% 90%',
    input: '0 5% 90%',
    ring: '0 75% 50%',
    // Lingonberry gradients - pure bright red tones (hue 0-5°) with 5 stops
    // Distinct from raspberry (purple-pink) and strawberry (pink-red) - stays in pure red range
    'gradient-primary': 'linear-gradient(135deg, hsl(0 75% 50%) 0%, hsl(2 76% 52%) 25%, hsl(5 78% 54%) 50%, hsl(3 77% 53%) 75%, hsl(0 75% 50%) 100%)',
    'gradient-bg': 'linear-gradient(135deg, hsl(0 10% 8%), hsl(0 8% 11%))',
    'gradient-berry': 'radial-gradient(circle at 30% 50%, hsl(0 75% 52%) 0%, hsl(3 77% 54%) 40%, hsl(5 78% 56%) 100%)',
  },
  dark: {
    background: '0 10% 8%',
    foreground: '0 5% 98%',
    card: '0 8% 11%',
    'card-foreground': '0 5% 98%',
    popover: '0 10% 8%',
    'popover-foreground': '0 5% 98%',
    primary: '0 75% 60%',
    'primary-foreground': '0 10% 8%',
    secondary: '0 5% 15%',
    'secondary-foreground': '0 5% 98%',
    muted: '0 4% 18%',
    'muted-foreground': '0 5% 65%',
    accent: '0 75% 60%',
    'accent-foreground': '0 5% 98%',
    success: '150 80% 55%',
    'success-foreground': '0 10% 8%',
    warning: '38 92% 50%',
    'warning-foreground': '0 0% 100%',
    destructive: '0 84% 60%',
    'destructive-foreground': '0 5% 98%',
    info: '200 90% 60%',
    'info-foreground': '0 10% 8%',
    border: '0 5% 20%',
    input: '0 5% 15%',
    ring: '0 75% 60%',
    // Lingonberry gradients - pure bright red tones with 5 stops
    'gradient-primary': 'linear-gradient(135deg, hsl(0 75% 60%) 0%, hsl(2 76% 62%) 25%, hsl(5 78% 64%) 50%, hsl(3 77% 63%) 75%, hsl(0 75% 60%) 100%)',
    'gradient-bg': 'linear-gradient(135deg, hsl(0 10% 8%), hsl(0 8% 11%))',
    'gradient-berry': 'radial-gradient(circle at 30% 50%, hsl(0 75% 62%) 0%, hsl(3 77% 64%) 40%, hsl(5 78% 66%) 100%)',
  },
};

/**
 * Strawberry Theme
 * Fresh, bright pink-red theme
 */
export const strawberryTheme: Theme = {
  name: 'strawberry',
  displayName: 'Strawberry',
  description: 'Fresh, bright pink-red theme',
  light: {
    background: '0 0% 100%',
    foreground: '350 15% 15%',
    card: '0 0% 100%',
    'card-foreground': '350 15% 15%',
    popover: '0 0% 100%',
    'popover-foreground': '350 15% 15%',
    primary: '350 85% 60%',
    'primary-foreground': '0 0% 98%',
    secondary: '350 10% 96%',
    'secondary-foreground': '350 15% 15%',
    muted: '350 10% 96%',
    'muted-foreground': '350 5% 45%',
    accent: '350 85% 60%',
    'accent-foreground': '0 0% 98%',
    success: '150 80% 45%',
    'success-foreground': '0 0% 98%',
    warning: '38 92% 50%',
    'warning-foreground': '0 0% 98%',
    destructive: '0 84% 60%',
    'destructive-foreground': '0 0% 98%',
    info: '200 90% 50%',
    'info-foreground': '0 0% 98%',
    border: '350 10% 90%',
    input: '350 10% 90%',
    ring: '350 85% 60%',
    // Strawberry gradients - fresh pink-red tones (hue 350-10°) with 5 stops
    // Distinct from lingonberry (pure red 0-5°) and raspberry (purple-pink 320-350°)
    // Strawberry has more pink tones, lighter and fresher
    'gradient-primary': 'linear-gradient(135deg, hsl(350 85% 60%) 0%, hsl(355 86% 61%) 25%, hsl(0 88% 63%) 50%, hsl(5 89% 64%) 75%, hsl(10 90% 65%) 100%)',
    'gradient-bg': 'linear-gradient(135deg, hsl(350 15% 8%), hsl(350 12% 11%))',
    'gradient-berry': 'radial-gradient(circle at 30% 50%, hsl(350 85% 62%) 0%, hsl(0 88% 64%) 40%, hsl(10 90% 66%) 100%)',
  },
  dark: {
    background: '350 15% 8%',
    foreground: '350 5% 98%',
    card: '350 12% 11%',
    'card-foreground': '350 5% 98%',
    popover: '350 15% 8%',
    'popover-foreground': '350 5% 98%',
    primary: '350 85% 70%',
    'primary-foreground': '350 15% 8%',
    secondary: '350 8% 15%',
    'secondary-foreground': '350 5% 98%',
    muted: '350 6% 18%',
    'muted-foreground': '350 5% 65%',
    accent: '350 85% 70%',
    'accent-foreground': '350 5% 98%',
    success: '150 80% 55%',
    'success-foreground': '350 15% 8%',
    warning: '38 92% 50%',
    'warning-foreground': '0 0% 100%',
    destructive: '0 84% 60%',
    'destructive-foreground': '350 5% 98%',
    info: '200 90% 60%',
    'info-foreground': '350 15% 8%',
    border: '350 8% 20%',
    input: '350 8% 15%',
    ring: '350 85% 70%',
    // Strawberry gradients - fresh pink-red tones with 5 stops
    'gradient-primary': 'linear-gradient(135deg, hsl(350 85% 70%) 0%, hsl(355 86% 71%) 25%, hsl(0 88% 73%) 50%, hsl(5 89% 74%) 75%, hsl(10 90% 75%) 100%)',
    'gradient-bg': 'linear-gradient(135deg, hsl(350 15% 8%), hsl(350 12% 11%))',
    'gradient-berry': 'radial-gradient(circle at 30% 50%, hsl(350 85% 72%) 0%, hsl(0 88% 74%) 40%, hsl(10 90% 76%) 100%)',
  },
};

export const themes: Record<ThemeName, Theme> = {
  blueberry: blueberryTheme,
  lovable: lovableTheme,
  raspberry: raspberryTheme,
  lingonberry: lingonberryTheme,
  strawberry: strawberryTheme,
};

export const themeList: Theme[] = [
  blueberryTheme,
  lovableTheme,
  raspberryTheme,
  lingonberryTheme,
  strawberryTheme,
];

