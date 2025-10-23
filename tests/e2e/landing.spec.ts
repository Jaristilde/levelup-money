import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check that the landing page loads
    await expect(page).toHaveTitle(/LevelUp Money/i);
  });

  test('should have "Get Started" button', async ({ page }) => {
    await page.goto('/');
    
    // Find the Get Started button
    const getStartedButton = page.getByRole('link', { name: /get started/i });
    await expect(getStartedButton).toBeVisible();
  });

  test('should navigate to signup when clicking Get Started', async ({ page }) => {
    await page.goto('/');
    
    // Click Get Started
    await page.getByRole('link', { name: /get started/i }).first().click();
    
    // Should navigate to signup page
    await expect(page).toHaveURL(/.*signup/);
  });

  test('should have login link', async ({ page }) => {
    await page.goto('/');
    
    // Check for login link
    const loginLink = page.getByRole('link', { name: /log in|sign in/i });
    await expect(loginLink).toBeVisible();
  });
});

