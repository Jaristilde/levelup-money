// ================================================================
// FINANCIAL PROFILE SETUP - AUTOMATED TEST SUITE
// ================================================================
// Framework: Playwright
// Component: src/pages/FinancialProfileSetup.tsx
// ================================================================

import { test, expect } from '@playwright/test';

// ==========================================
// TEST CONFIGURATION
// ==========================================

const BASE_URL = 'http://localhost:8080';
const FINANCIAL_PROFILE_URL = `${BASE_URL}/financial-profile`;
const DASHBOARD_URL = `${BASE_URL}/dashboard`;

const TEST_USER = {
  email: 'test@levelupmoney.com',
  password: 'TestPassword123!'
};

// Test Data
const testData = {
  validSSN: '1234',
  validDOB: { month: 'January', day: '15', year: '2000' },
  underageDOB: { month: 'January', day: '15', year: '2010' },
  validCreditScore: '720',
  invalidCreditScoreLow: '299',
  invalidCreditScoreHigh: '851',
  validAddress: {
    street: '123 Main Street',
    city: 'Miami',
    state: 'FL',
    zip: '33056'
  },
  invalidZip: {
    short: '1234',
    long: '123456',
    letters: 'abcde'
  },
  validCard: {
    name: 'Chase Sapphire',
    balance: '5000',
    limit: '10000',
    apr: '18.99'
  },
  validLoan: {
    type: 'student',
    name: 'Federal Student Loan',
    balance: '25000',
    payment: '350'
  },
  validIncome: '5000',
  validExpenses: '3500'
};

// ==========================================
// AUTHENTICATION HELPER
// ==========================================

async function loginViaUI(page) {
  // Navigate to login page
  await page.goto(`${BASE_URL}/login`);
  
  // Wait for login page to load
  await page.waitForSelector('input[type="email"], input[placeholder*="email" i]', { timeout: 10000 });
  
  // Fill in credentials
  await page.fill('input[type="email"], input[placeholder*="email" i]', TEST_USER.email);
  await page.fill('input[type="password"]', TEST_USER.password);
  
  // Click sign in button
  await page.click('button:has-text("Sign In"), button:has-text("Login")');
  
  // Wait for redirect to dashboard
  await page.waitForURL(/\/(dashboard|home)/, { timeout: 15000 });
  
  // Extra wait to ensure session is established
  await page.waitForTimeout(1000);
}

// ==========================================
// DIAGNOSTIC TEST - Run this first!
// ==========================================

test.describe('🔍 DIAGNOSTIC: Verify Page Loads', () => {
  
  test('DIAG-001: Financial Profile page loads after login', async ({ page }) => {
    // Login first
    await loginViaUI(page);
    
    // Navigate to financial profile
    await page.goto(FINANCIAL_PROFILE_URL, { 
      waitUntil: 'networkidle',
      timeout: 60000
    });
    
    // Take screenshot for debugging
    await page.screenshot({ path: 'test-results/financial-profile-authenticated.png', fullPage: true });
    
    // Check if page loaded
    const pageTitle = await page.title();
    console.log('Page title:', pageTitle);
    
    // Check for main sections
    const sections = [
      'Personal Information',
      'Credit Score',
      'Credit Cards',
      'Loans',
      'Income & Expenses'
    ];
    
    for (const section of sections) {
      const sectionHeader = page.getByRole('heading', { name: section, exact: false });
      const isVisible = await sectionHeader.isVisible().catch(() => false);
      console.log(`✓ Section "${section}": ${isVisible ? 'FOUND' : 'NOT FOUND'}`);
    }
    
    // Try to find key form elements
    const ssnInput = await page.locator('input#ssn').count();
    const creditScoreInput = await page.locator('input#creditScore').count();
    const addCardButton = await page.getByRole('button', { name: 'Add Card' }).count();
    
    console.log(`✓ SSN Input found: ${ssnInput > 0}`);
    console.log(`✓ Credit Score Input found: ${creditScoreInput > 0}`);
    console.log(`✓ Add Card Button found: ${addCardButton > 0}`);
    
    // Assert that key elements are present
    expect(ssnInput).toBeGreaterThan(0);
    expect(creditScoreInput).toBeGreaterThan(0);
  });
});

// ==========================================
// SECTION 1: PERSONAL INFORMATION TESTS
// ==========================================

test.describe('Personal Information Section', () => {
  
  test.beforeEach(async ({ page }) => {
    // Login first
    await loginViaUI(page);
    
    // Navigate to financial profile
    await page.goto(FINANCIAL_PROFILE_URL, { 
      waitUntil: 'networkidle',
      timeout: 60000
    });
    
    // Wait for page to be fully loaded
    await page.waitForSelector('input#ssn', { timeout: 10000 });
  });

  test('PI-001: Can enter last 4 digits of SSN', async ({ page }) => {
    const ssnInput = page.locator('input#ssn');
    await ssnInput.fill(testData.validSSN);
    await expect(ssnInput).toHaveValue(testData.validSSN);
  });

  test('PI-005: SSN shows as masked when hidden', async ({ page }) => {
    const ssnInput = page.locator('input#ssn');
    await ssnInput.fill(testData.validSSN);
    const inputType = await ssnInput.getAttribute('type');
    expect(inputType).toBe('password');
  });

  test('PI-006: Show/Hide SSN toggle works', async ({ page }) => {
    const ssnInput = page.locator('input#ssn');
    const toggleButton = page.locator('div.relative:has(input#ssn) > button[type="button"]');
    
    await ssnInput.fill(testData.validSSN);
    await ssnInput.waitFor({ state: 'visible' });
    
    // Initial state - should be hidden (password type)
    let inputType = await ssnInput.getAttribute('type');
    expect(inputType).toBe('password');
    
    // Click to show
    await toggleButton.click();
    await page.waitForTimeout(300);
    inputType = await ssnInput.getAttribute('type');
    expect(inputType).toBe('text');
    
    // Click to hide again
    await toggleButton.click();
    await page.waitForTimeout(300);
    inputType = await ssnInput.getAttribute('type');
    expect(inputType).toBe('password');
  });

  test('PI-009: Rejects users under 18 years old', async ({ page }) => {
    // Fill SSN and address first (required fields)
    await page.locator('input#ssn').fill(testData.validSSN);
    await page.getByPlaceholder('Street Address').fill(testData.validAddress.street);
    await page.getByPlaceholder('City').fill(testData.validAddress.city);
    await page.getByPlaceholder('ZIP Code').fill(testData.validAddress.zip);
    
    // Select underage DOB - Shadcn UI Select components
    const comboboxes = page.getByRole('combobox');
    
    // Month select
    await comboboxes.nth(0).click();
    await page.getByRole('option', { name: 'January' }).click();
    
    // Day select
    await comboboxes.nth(1).click();
    await page.getByRole('option', { name: '15' }).click();
    
    // Year select
    await comboboxes.nth(2).click();
    await page.getByRole('option', { name: '2010' }).click();
    
    // Fill credit score and income/expenses (other required fields)
    await page.locator('input#creditScore').fill('720');
    await page.locator('input#income').fill('5000');
    await page.locator('input#expenses').fill('3500');
    
    // Try to submit
    await page.getByRole('button', { name: 'Save Profile' }).click();
    
    // Check for error message
    const errorMessage = page.getByText(/must be.*18|18.*older/i);
    await expect(errorMessage).toBeVisible();
  });

  test('PI-016: ZIP code accepts exactly 5 digits', async ({ page }) => {
    const zipInput = page.getByPlaceholder('ZIP Code');
    await zipInput.fill(testData.validAddress.zip);
    await expect(zipInput).toHaveValue(testData.validAddress.zip);
  });

  test('PI-017: ZIP code rejects less than 5 digits', async ({ page }) => {
    const zipInput = page.getByPlaceholder('ZIP Code');
    await zipInput.fill(testData.invalidZip.short);
    
    // Trigger validation by blurring
    await zipInput.blur();
    
    // Fill other required fields and try to submit
    await page.locator('input#creditScore').fill('720');
    await page.locator('input#income').fill('5000');
    await page.getByRole('button', { name: 'Save Profile' }).click();
    
    // Check for error
    const errorMessage = page.getByText(/must be 5 digits/i);
    await expect(errorMessage).toBeVisible();
  });
});

// ==========================================
// SECTION 2: CREDIT SCORE TESTS
// ==========================================

test.describe('Credit Score Section', () => {
  
  test.beforeEach(async ({ page }) => {
    // Login first
    await loginViaUI(page);
    
    // Navigate to financial profile
    await page.goto(FINANCIAL_PROFILE_URL, { 
      waitUntil: 'networkidle',
      timeout: 60000
    });
    
    // Wait for page to be fully loaded
    await page.waitForSelector('input#creditScore', { timeout: 10000 });
  });

  test('CS-002: Placeholder shows "e.g., 720"', async ({ page }) => {
    const creditScoreInput = page.locator('input#creditScore');
    const placeholder = await creditScoreInput.getAttribute('placeholder');
    expect(placeholder).toContain('720');
  });

  test('CS-003: Rejects credit score below 300', async ({ page }) => {
    const creditScoreInput = page.locator('input#creditScore');
    await creditScoreInput.fill(testData.invalidCreditScoreLow);
    await creditScoreInput.blur();
    
    // Try to submit
    await page.getByRole('button', { name: 'Save Profile' }).click();
    
    const errorMessage = page.getByText(/credit score must be between 300 and 850/i);
    await expect(errorMessage).toBeVisible();
  });

  test('CS-005: Rejects credit score above 850', async ({ page }) => {
    const creditScoreInput = page.locator('input#creditScore');
    await creditScoreInput.fill(testData.invalidCreditScoreHigh);
    await creditScoreInput.blur();
    
    // Try to submit
    await page.getByRole('button', { name: 'Save Profile' }).click();
    
    const errorMessage = page.getByText(/credit score must be between 300 and 850/i);
    await expect(errorMessage).toBeVisible();
  });

  test('CS-001: Accepts valid credit score', async ({ page }) => {
    const creditScoreInput = page.locator('input#creditScore');
    await creditScoreInput.fill(testData.validCreditScore);
    await expect(creditScoreInput).toHaveValue(testData.validCreditScore);
  });
});

// ==========================================
// SECTION 3: CREDIT CARDS TESTS
// ==========================================

test.describe('Credit Cards Section', () => {
  
  test.beforeEach(async ({ page }) => {
    // Login first
    await loginViaUI(page);
    
    // Navigate to financial profile
    await page.goto(FINANCIAL_PROFILE_URL, { 
      waitUntil: 'networkidle',
      timeout: 60000
    });
    
    // Wait for page to be fully loaded
    await page.waitForSelector('input#ssn', { timeout: 10000 });
  });

  test('CC-001: Can click Add Card button and form appears', async ({ page }) => {
    const addCardButton = page.getByRole('button', { name: 'Add Card' });
    await addCardButton.click();
    
    // Verify card form appears
    const cardForm = page.getByText('Card Details').first();
    await expect(cardForm).toBeVisible();
  });

  test('CC-002: Can add multiple cards', async ({ page }) => {
    const addCardButton = page.getByRole('button', { name: 'Add Card' });
    
    // Add 3 cards
    await addCardButton.click();
    await addCardButton.click();
    await addCardButton.click();
    
    // Count card forms
    const cardForms = page.getByText('Card Details');
    await expect(cardForms).toHaveCount(3);
  });

  test('CC-003: Can delete a card with trash icon', async ({ page }) => {
    const addCardButton = page.getByRole('button', { name: 'Add Card' });
    await addCardButton.click();
    
    // Wait for card form to appear
    await page.waitForTimeout(500);
    
    // Find and click delete button (first trash icon)
    const deleteButton = page.locator('.bg-slate-50').first().locator('button').filter({ has: page.locator('svg') }).first();
    await deleteButton.click();
    
    // Verify card is removed
    const emptyMessage = page.getByText(/no credit cards added yet/i);
    await expect(emptyMessage).toBeVisible();
  });

  test('CC-006 to CC-009: Can enter all card fields', async ({ page }) => {
    const addCardButton = page.getByRole('button', { name: 'Add Card' });
    await addCardButton.click();
    
    // Wait for form to appear
    await page.waitForTimeout(500);
    
    // Fill in card details using placeholders
    await page.getByPlaceholder(/card name.*chase sapphire/i).fill(testData.validCard.name);
    await page.getByPlaceholder('Current Balance').first().fill(testData.validCard.balance);
    await page.getByPlaceholder('Credit Limit').fill(testData.validCard.limit);
    await page.getByPlaceholder(/apr.*optional/i).fill(testData.validCard.apr);
    
    // Verify values
    await expect(page.getByPlaceholder(/card name/i)).toHaveValue(testData.validCard.name);
    await expect(page.getByPlaceholder('Current Balance').first()).toHaveValue(testData.validCard.balance);
    await expect(page.getByPlaceholder('Credit Limit')).toHaveValue(testData.validCard.limit);
    await expect(page.getByPlaceholder(/apr.*optional/i)).toHaveValue(testData.validCard.apr);
  });
});

// ==========================================
// SECTION 4: LOANS TESTS
// ==========================================

test.describe('Loans Section', () => {
  
  test.beforeEach(async ({ page }) => {
    // Login first
    await loginViaUI(page);
    
    // Navigate to financial profile
    await page.goto(FINANCIAL_PROFILE_URL, { 
      waitUntil: 'networkidle',
      timeout: 60000
    });
    
    // Wait for page to be fully loaded
    await page.waitForSelector('input#ssn', { timeout: 10000 });
  });

  test('LN-001: Can click Add Loan button and form appears', async ({ page }) => {
    const addLoanButton = page.getByRole('button', { name: 'Add Loan' });
    await addLoanButton.click();
    
    const loanForm = page.getByText('Loan Details').first();
    await expect(loanForm).toBeVisible();
  });

  test('LN-005: Can select loan type from dropdown', async ({ page }) => {
    const addLoanButton = page.getByRole('button', { name: 'Add Loan' });
    await addLoanButton.click();
    
    // Wait for form
    await page.waitForTimeout(500);
    
    // Shadcn UI Select - click trigger then select option
    const loanTypeSelect = page.locator('.bg-slate-50').first().getByRole('combobox').first();
    await loanTypeSelect.click();
    await page.getByRole('option', { name: 'Student Loan' }).click();
    
    // Verify selection (button text should change)
    await expect(loanTypeSelect).toContainText(/student loan/i);
  });

  test('LN-009 to LN-011: Can enter all loan fields', async ({ page }) => {
    const addLoanButton = page.getByRole('button', { name: 'Add Loan' });
    await addLoanButton.click();
    
    // Wait for form
    await page.waitForTimeout(500);
    
    // Fill loan details using placeholders
    await page.getByPlaceholder(/loan name.*federal/i).fill(testData.validLoan.name);
    await page.getByPlaceholder('Current Balance').nth(1).fill(testData.validLoan.balance);
    await page.getByPlaceholder(/monthly payment.*optional/i).fill(testData.validLoan.payment);
    
    // Verify values
    await expect(page.getByPlaceholder(/loan name/i)).toHaveValue(testData.validLoan.name);
    await expect(page.getByPlaceholder('Current Balance').nth(1)).toHaveValue(testData.validLoan.balance);
    await expect(page.getByPlaceholder(/monthly payment/i)).toHaveValue(testData.validLoan.payment);
  });
});

// ==========================================
// SECTION 5: INCOME & EXPENSES TESTS
// ==========================================

test.describe('Income & Expenses Section', () => {
  
  test.beforeEach(async ({ page }) => {
    // Login first
    await loginViaUI(page);
    
    // Navigate to financial profile
    await page.goto(FINANCIAL_PROFILE_URL, { 
      waitUntil: 'networkidle',
      timeout: 60000
    });
    
    // Wait for page to be fully loaded
    await page.waitForSelector('input#income', { timeout: 10000 });
  });

  test('IE-001 & IE-002: Can enter monthly income and expenses', async ({ page }) => {
    const incomeInput = page.locator('input#income');
    const expensesInput = page.locator('input#expenses');
    
    await incomeInput.fill(testData.validIncome);
    await expensesInput.fill(testData.validExpenses);
    
    await expect(incomeInput).toHaveValue(testData.validIncome);
    await expect(expensesInput).toHaveValue(testData.validExpenses);
  });
});

// ==========================================
// SECTION 6: SUMMARY CARD TESTS
// ==========================================

test.describe('Summary Card Section', () => {
  
  test.beforeEach(async ({ page }) => {
    // Login first
    await loginViaUI(page);
    
    // Navigate to financial profile
    await page.goto(FINANCIAL_PROFILE_URL, { 
      waitUntil: 'networkidle',
      timeout: 60000
    });
    
    // Wait for page to be fully loaded
    await page.waitForSelector('input#ssn', { timeout: 10000 });
  });
  
  test('SM-002: Total debt calculates correctly (cards only)', async ({ page }) => {
    // Add two cards
    const addCardButton = page.getByRole('button', { name: 'Add Card' });
    await addCardButton.click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Current Balance').first().fill('3000');
    
    await addCardButton.click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Current Balance').nth(1).fill('2000');
    
    // Check summary card total debt
    const totalDebtSection = page.getByText('Total Debt');
    await expect(totalDebtSection).toBeVisible();
    const debtValue = page.getByText('$5,000');
    await expect(debtValue).toBeVisible();
  });

  test('SM-004: Total debt calculates correctly (mixed)', async ({ page }) => {
    // Add one card
    const addCardButton = page.getByRole('button', { name: 'Add Card' });
    await addCardButton.click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Current Balance').first().fill('3000');
    
    // Add one loan
    const addLoanButton = page.getByRole('button', { name: 'Add Loan' });
    await addLoanButton.click();
    await page.waitForTimeout(500);
    await page.getByPlaceholder('Current Balance').nth(1).fill('15000');
    
    // Check summary card total debt (should be 18,000)
    const totalDebtSection = page.getByText('Total Debt');
    await expect(totalDebtSection).toBeVisible();
    const debtValue = page.getByText('$18,000');
    await expect(debtValue).toBeVisible();
  });
});

// ==========================================
// SECTION 7: FORM SUBMISSION TESTS
// ==========================================

test.describe('Form Submission', () => {
  
  test.beforeEach(async ({ page }) => {
    // Login first
    await loginViaUI(page);
    
    // Navigate to financial profile
    await page.goto(FINANCIAL_PROFILE_URL, { 
      waitUntil: 'networkidle',
      timeout: 60000
    });
    
    // Wait for page to be fully loaded
    await page.waitForSelector('input#ssn', { timeout: 10000 });
  });
  
  test('FS-003: Successful form submission with redirect', async ({ page }) => {
    // Fill all required fields
    await page.locator('input#ssn').fill(testData.validSSN);
    
    // Date of Birth
    const comboboxes = page.getByRole('combobox');
    await comboboxes.nth(0).click();
    await page.getByRole('option', { name: 'January' }).click();
    
    await comboboxes.nth(1).click();
    await page.getByRole('option', { name: '15' }).click();
    
    await comboboxes.nth(2).click();
    await page.getByRole('option', { name: '2000' }).click();
    
    // Address
    await page.getByPlaceholder('Street Address').fill(testData.validAddress.street);
    await page.getByPlaceholder('City').fill(testData.validAddress.city);
    
    // State Select
    const stateSelect = page.locator('text=State').locator('..').getByRole('combobox');
    await stateSelect.click();
    await page.getByRole('option', { name: testData.validAddress.state }).click();
    
    await page.getByPlaceholder('ZIP Code').fill(testData.validAddress.zip);
    
    // Credit Score, Income, Expenses
    await page.locator('input#creditScore').fill(testData.validCreditScore);
    await page.locator('input#income').fill(testData.validIncome);
    await page.locator('input#expenses').fill(testData.validExpenses);
    
    // Submit form
    await page.getByRole('button', { name: 'Save Profile' }).click();
    
    // Check for success toast (Sonner toast)
    const successMessage = page.getByText(/saved successfully|success/i);
    await expect(successMessage).toBeVisible({ timeout: 5000 });
    
    // Verify redirect to dashboard
    await page.waitForURL(/\/dashboard/, { timeout: 5000 });
    expect(page.url()).toContain('/dashboard');
  });

  test('FS-006: Submit with invalid data shows errors', async ({ page }) => {
    // Add invalid data
    await page.locator('input#ssn').fill('12'); // Too short
    await page.locator('input#creditScore').fill('999'); // Out of range
    await page.getByPlaceholder('ZIP Code').fill('123'); // Too short
    
    // Submit form
    await page.getByRole('button', { name: 'Save Profile' }).click();
    
    // Check for validation errors
    const errorMessages = page.getByText(/must be exactly 4 digits|must be between 300 and 850|must be 5 digits/i);
    await expect(errorMessages.first()).toBeVisible();
  });
});

// ==========================================
// HELPER FUNCTIONS
// ==========================================

async function fillCompleteForm(page) {
  // Personal Info - SSN
  await page.locator('input#ssn').fill(testData.validSSN);
  
  // Date of Birth (Shadcn UI Selects)
  const comboboxes = page.getByRole('combobox');
  
  await comboboxes.nth(0).click();
  await page.getByRole('option', { name: 'January' }).click();
  
  await comboboxes.nth(1).click();
  await page.getByRole('option', { name: '15' }).click();
  
  await comboboxes.nth(2).click();
  await page.getByRole('option', { name: '2000' }).click();
  
  // Address
  await page.getByPlaceholder('Street Address').fill(testData.validAddress.street);
  await page.getByPlaceholder('City').fill(testData.validAddress.city);
  
  // State (Shadcn UI Select)
  const stateSelect = page.locator('text=State').locator('..').getByRole('combobox');
  await stateSelect.click();
  await page.getByRole('option', { name: testData.validAddress.state }).click();
  
  await page.getByPlaceholder('ZIP Code').fill(testData.validAddress.zip);
  
  // Credit Score
  await page.locator('input#creditScore').fill(testData.validCreditScore);
  
  // Income & Expenses
  await page.locator('input#income').fill(testData.validIncome);
  await page.locator('input#expenses').fill(testData.validExpenses);
}

// Export for use in other test files
export { testData, fillCompleteForm };
