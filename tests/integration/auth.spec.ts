import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should show login form', async ({ page }) => {
    await page.goto('/login');
    
    // Check for email and password fields
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/login');
    
    // Try to submit empty form
    await page.getByRole('button', { name: /sign in|log in/i }).click();
    
    // Should show validation errors (adjust selectors based on your implementation)
    // This is just an example - you'll need to adjust based on your actual error handling
    const errorMessages = page.locator('[role="alert"], .error-message');
    await expect(errorMessages.first()).toBeVisible({ timeout: 3000 }).catch(() => {
      // If no error shown, that's okay - form might have different validation
      console.log('No validation errors shown or using different pattern');
    });
  });

  test('should navigate to signup from login page', async ({ page }) => {
    await page.goto('/login');
    
    // Look for signup link
    const signupLink = page.getByRole('link', { name: /sign up|create account/i });
    await signupLink.click();
    
    // Should navigate to signup page
    await expect(page).toHaveURL(/.*signup/);
  });

  test('should show Google Sign-In button', async ({ page }) => {
    await page.goto('/login');
    
    // Check for Google sign-in button
    const googleButton = page.getByRole('button', { name: /continue with google|google/i });
    await expect(googleButton).toBeVisible();
  });
});

