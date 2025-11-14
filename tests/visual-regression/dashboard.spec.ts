import { test, expect } from '@playwright/test';

test.describe('Dashboard Visual Regression', () => {
  test('dashboard page - full view', async ({ page }) => {
    await page.goto('/');

    // Wait for dashboard to load
    await page.waitForSelector('[data-testid="dashboard"]', { timeout: 10000 });
    await page.waitForTimeout(1000); // Wait for animations

    // Take full page screenshot
    await expect(page).toHaveScreenshot('dashboard-full.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('dashboard page - account cards', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="dashboard"]');

    // Screenshot account cards section
    const accountCards = page.locator('[data-testid="account-cards"]');
    await expect(accountCards).toHaveScreenshot('dashboard-account-cards.png', {
      animations: 'disabled',
    });
  });

  test('dashboard page - transactions list', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="dashboard"]');

    // Screenshot transactions section
    const transactions = page.locator('[data-testid="transactions-list"]');
    await expect(transactions).toHaveScreenshot('dashboard-transactions.png', {
      animations: 'disabled',
    });
  });

  test('dashboard page - spending insights', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="dashboard"]');

    // Screenshot spending insights
    const insights = page.locator('[data-testid="spending-insights"]');
    await expect(insights).toHaveScreenshot('dashboard-spending-insights.png', {
      animations: 'disabled',
    });
  });

  test('dashboard page - responsive mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForSelector('[data-testid="dashboard"]');

    await expect(page).toHaveScreenshot('dashboard-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('dashboard page - responsive tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForSelector('[data-testid="dashboard"]');

    await expect(page).toHaveScreenshot('dashboard-tablet.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});
