import { Page } from '@playwright/test';

/**
 * Authentication Helper for Playwright Tests
 * 
 * This module provides utility functions for authenticating users in tests.
 * Since Firebase Auth state is stored in browser storage, we can set it up
 * programmatically or use the UI to log in.
 */

export interface TestUser {
  email: string;
  password: string;
}

// Test user credentials (you should create this user in Firebase first)
export const TEST_USER: TestUser = {
  email: 'test@levelupmoney.com',
  password: 'Test123456!',
};

/**
 * Logs in a user via the UI
 * Use this for e2e tests that need to test the full login flow
 */
export async function loginViaUI(page: Page, user: TestUser = TEST_USER) {
  await page.goto('/login');
  
  // Fill in email and password
  await page.getByPlaceholder(/email/i).fill(user.email);
  await page.getByPlaceholder(/password/i).fill(user.password);
  
  // Click login button
  await page.getByRole('button', { name: /sign in|login/i }).click();
  
  // Wait for navigation to complete
  await page.waitForURL(/\/dashboard|\/financial-profile/, { timeout: 10000 });
}

/**
 * Signs up a new user via the UI
 * Use this if you need to test the signup flow
 */
export async function signupViaUI(page: Page, user: TestUser) {
  await page.goto('/signup');
  
  // Fill in email and password
  await page.getByPlaceholder(/email/i).fill(user.email);
  await page.getByPlaceholder(/password/i).first().fill(user.password);
  
  // Confirm password (if field exists)
  const confirmPasswordField = page.getByPlaceholder(/confirm.*password/i);
  if (await confirmPasswordField.count() > 0) {
    await confirmPasswordField.fill(user.password);
  }
  
  // Click signup button
  await page.getByRole('button', { name: /sign up|create account/i }).click();
  
  // Wait for navigation
  await page.waitForURL(/\/dashboard|\/onboarding/, { timeout: 10000 });
}

/**
 * Logs out the current user
 */
export async function logout(page: Page) {
  // Click logout button (adjust selector based on your app)
  await page.getByRole('button', { name: /logout|sign out/i }).click();
  
  // Wait for redirect to login/landing page
  await page.waitForURL(/\/login|\//, { timeout: 5000 });
}

/**
 * Checks if user is currently authenticated
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
  // Check if we're on a protected route or if user info is visible
  const url = page.url();
  return url.includes('/dashboard') || url.includes('/financial-profile');
}

/**
 * Sets up authentication state by injecting Firebase auth tokens
 * This is faster than UI login but requires you to have valid tokens
 * 
 * NOTE: This is an advanced technique - for now, use loginViaUI instead
 */
export async function setupAuthState(page: Page, authTokens: any) {
  await page.goto('/');
  
  // Inject Firebase auth state into localStorage/sessionStorage
  await page.evaluate((tokens) => {
    // This would require actual Firebase auth tokens
    // For now, this is a placeholder
    localStorage.setItem('firebase:authUser', JSON.stringify(tokens));
  }, authTokens);
  
  await page.reload();
}

