/**
 * Theme Utilities
 * 
 * Provides functions to apply and manage themes dynamically.
 * Demonstrates the power of token-based theming - entire color schemes
 * can be switched by updating CSS variables.
 */

import { ThemeName, themes } from '@/tokens/themes';

/**
 * Apply a theme to the document
 * @param themeName - The name of the theme to apply
 * @param mode - 'light' or 'dark'
 */
export function applyTheme(themeName: ThemeName, mode: 'light' | 'dark' = 'dark') {
  const theme = themes[themeName];
  const colors = mode === 'dark' ? theme.dark : theme.light;
  
  const root = document.documentElement;
  
  // Apply all color variables
  Object.entries(colors).forEach(([key, value]) => {
    // Convert camelCase to kebab-case for CSS variables
    // e.g., 'card-foreground' stays as is, 'primary' becomes 'primary'
    const cssVar = `--${key}`;
    root.style.setProperty(cssVar, value);
  });
  
  // Set theme class
  root.setAttribute('data-theme', themeName);
  
  // Set dark/light mode
  if (mode === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
  }
  
  // Store preferences
  localStorage.setItem('theme', themeName);
  localStorage.setItem('theme-mode', mode);
}

/**
 * Get current theme from localStorage or default
 */
export function getCurrentTheme(): ThemeName {
  const stored = localStorage.getItem('theme') as ThemeName;
  return stored && stored in themes ? stored : 'blueberry';
}

/**
 * Get current theme mode from localStorage or system preference
 */
export function getCurrentThemeMode(): 'light' | 'dark' {
  const stored = localStorage.getItem('theme-mode') as 'light' | 'dark';
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  // Check system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

/**
 * Initialize theme on page load
 */
export function initializeTheme() {
  const theme = getCurrentTheme();
  const mode = getCurrentThemeMode();
  applyTheme(theme, mode);
}

