// Smoke Test - Basic functionality check
import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  
  test('Homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check if the page loaded
    await expect(page).toHaveTitle(/LevelUp Money|Vite/i);
    
    // Check if main content is visible
    const heading = page.getByRole('heading', { level: 1 }).first();
    await expect(heading).toBeVisible();
  });
  
  test('Can navigate to login page', async ({ page }) => {
    await page.goto('/');
    
    // Look for login link/button
    const loginButton = page.getByRole('link', { name: /login|sign in/i });
    
    if (await loginButton.count() > 0) {
      await loginButton.click();
      
      // Verify we're on login page
      await expect(page).toHaveURL(/\/login/);
      
      // Check for email input
      const emailInput = page.getByPlaceholder(/email/i);
      await expect(emailInput).toBeVisible();
    }
  });
  
  test('Can navigate to signup page', async ({ page }) => {
    await page.goto('/');
    
    // Look for signup link/button
    const signupButton = page.getByRole('link', { name: /sign up|get started/i });
    
    if (await signupButton.count() > 0) {
      await signupButton.click();
      
      // Verify we're on signup page
      await expect(page).toHaveURL(/\/signup/);
    }
  });
});

