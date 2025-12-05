/**
 * Brandfetch Utility
 * 
 * Helper functions for fetching brand logos from Brandfetch CDN
 * @see https://brandfetch.com
 */

/**
 * Get Brandfetch CDN URL for a domain's logo
 * @param domain - Domain name (e.g., "alandsbanken.fi", "uu.se")
 * @param width - Logo width in pixels (default: 200)
 * @param height - Logo height in pixels (default: 200)
 * @returns Brandfetch CDN URL
 */
export function getBrandfetchLogo(
  domain: string,
  width: number = 200,
  height: number = 200
): string {
  // Brandfetch CDN pattern: https://cdn.brandfetch.io/{domain}/w/{width}/h/{height}
  // Using a static cache key like in mockData for consistency
  const cacheKey = '1idPVMDlQ6CTx2eeHQ0';
  return `https://cdn.brandfetch.io/${domain}/w/${width}/h/${height}?c=${cacheKey}`;
}

/**
 * Get logo with fallback
 * @param domain - Domain name
 * @param fallback - Fallback image URL or component
 * @param width - Logo width
 * @param height - Logo height
 */
export function getLogoWithFallback(
  domain: string,
  fallback?: string,
  width: number = 200,
  height: number = 200
): string {
  // For now, just return Brandfetch URL
  // In production, you might want to check if image exists first
  return getBrandfetchLogo(domain, width, height);
}

/**
 * Common brand domains mapping
 */
export const BRAND_DOMAINS = {
  alandsbanken: 'alandsbanken.com',
  uppsala: 'uu.se',
  crosskey: 'crosskey.fi',
  sbanken: 's-banken.se',
  marginalen: 'marginalen.se',
  fim: 'fim.com',
} as const;

/**
 * Bank domains for rotation (only Crosskey and Ålandsbanken)
 */
export const BANK_DOMAINS = [
  BRAND_DOMAINS.crosskey,
  BRAND_DOMAINS.alandsbanken,
] as const;

/**
 * Get a random bank logo (for rotation)
 * Uses a simple hash of the current date to ensure consistency per day
 */
export function getRandomBankLogo(width: number = 200, height: number = 200): string {
  // Use day of year to rotate daily (consistent throughout the day)
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  const bankDomain = BANK_DOMAINS[dayOfYear % BANK_DOMAINS.length];
  return getBrandfetchLogo(bankDomain, width, height);
}

