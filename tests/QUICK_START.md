# 🚀 Quick Start - Playwright Testing

## ✅ What's Already Done

Your Playwright testing setup is **COMPLETE**! Here's what you have:

### 📁 Files Created
- ✅ `playwright.config.ts` - Main configuration
- ✅ `tests/e2e/financial-profile.spec.js` - 24 tests for Financial Profile
- ✅ `tests/e2e/smoke.spec.js` - 3 basic tests (all passing!)
- ✅ `tests/helpers/auth.ts` - Authentication utilities
- ✅ `tests/README.md` - Full documentation
- ✅ `tests/QUICK_START.md` - This file

### ✅ Test Scripts (in package.json)
```json
"test:e2e": "playwright test",
"test:e2e:headed": "playwright test --headed",
"test:e2e:ui": "playwright test --ui"
```

---

## 🎯 Run Tests Right Now

### 1️⃣ Run Smoke Tests (3 tests - already passing!)
```bash
npm run test:e2e:headed tests/e2e/smoke.spec.js
```
This will open a browser so you can watch the tests run!

### 2️⃣ View Test Report
After running tests, view the beautiful HTML report:
```bash
npx playwright show-report
```

### 3️⃣ Run in UI Mode (Interactive!)
```bash
npm run test:e2e:ui
```
This opens an interactive UI where you can:
- See all tests
- Run individual tests
- Watch tests in slow motion
- Time-travel debug

---

## 🔐 To Run Financial Profile Tests

**IMPORTANT:** The financial profile tests require authentication.

### Step 1: Create Test User in Firebase
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **levelup-money**
3. Go to **Authentication** → **Users**
4. Click **Add User**
5. Enter:
   - Email: `test@levelupmoney.com`
   - Password: `Test123456!`
6. Click **Add User**

### Step 2: Run Financial Profile Tests
```bash
npm run test:e2e:headed tests/e2e/financial-profile.spec.js
```

---

## 📊 Current Test Coverage

### ✅ Smoke Tests (3/3 passing)
- [x] Homepage loads successfully
- [x] Can navigate to login page
- [x] Can navigate to signup page

### 📋 Financial Profile Tests (24 tests total)
**Requires test user account**

#### Personal Information (6 tests)
- SSN input and masking
- Date of Birth validation
- Address validation
- ZIP code validation

#### Credit Score (4 tests)
- Valid score acceptance
- Range validation (300-850)
- Placeholder text

#### Credit Cards (4 tests)
- Add/remove cards
- Enter card details
- Multiple cards

#### Loans (3 tests)
- Add/remove loans
- Loan type selection
- Enter loan details

#### Income & Expenses (1 test)
- Enter monthly income/expenses

#### Summary Card (2 tests)
- Total debt calculation
- Mixed debt calculation

#### Form Submission (2 tests)
- Successful submission
- Validation errors

#### Data Persistence (1 test)
- Save and reload data

---

## 🐛 Debugging Failed Tests

If a test fails:

### 1. Run in Debug Mode
```bash
npx playwright test --debug tests/e2e/financial-profile.spec.js
```
This opens the **Playwright Inspector** where you can step through the test.

### 2. View Screenshots
Failed tests automatically save screenshots in:
```
test-results/
```

### 3. View Trace
```bash
npx playwright show-trace test-results/.../trace.zip
```

---

## 📝 Test Selectors Cheat Sheet

Your tests now use **Playwright's best practices**:

```javascript
// ✅ CORRECT (what we use)
page.locator('input#ssn')                          // By ID
page.getByRole('button', { name: 'Save Profile' }) // By role
page.getByPlaceholder('ZIP Code')                  // By placeholder
page.getByText('Total Debt')                       // By text

// ❌ AVOID (old way)
page.locator('[name="ssn"]')                       // Brittle
page.locator('.some-class')                        // Not semantic
```

---

## 🎨 Test Structure Example

```javascript
test('CS-001: Accepts valid credit score', async ({ page }) => {
  const creditScoreInput = page.locator('input#creditScore');
  await creditScoreInput.fill('720');
  await expect(creditScoreInput).toHaveValue('720');
});
```

---

## 🔥 Common Commands

```bash
# Run all tests
npm run test:e2e

# Run all tests (watch the browser)
npm run test:e2e:headed

# Run specific test file
npx playwright test tests/e2e/smoke.spec.js

# Run specific test by name
npx playwright test -g "Can enter SSN"

# Run only on Chrome
npx playwright test --project=chromium

# Generate code for new tests
npx playwright codegen http://localhost:8080
```

---

## ✨ What Makes Your Tests Great

1. ✅ **Accessibility-first selectors** (`getByRole`, `getByLabel`)
2. ✅ **Component-aware** (handles Shadcn UI Select, Input, etc.)
3. ✅ **Real browser testing** (not just unit tests)
4. ✅ **Auto-screenshots on failure**
5. ✅ **Trace recording for debugging**
6. ✅ **Multi-browser support** (Chrome, Firefox, Safari, Mobile)
7. ✅ **Parallel test execution**
8. ✅ **Authentication helper** for protected routes

---

## 🎯 Next Steps

### 1. Run Your First Test
```bash
npm run test:e2e:headed tests/e2e/smoke.spec.js
```

### 2. Create Firebase Test User
Follow **Step 1** above to enable financial profile tests

### 3. Explore UI Mode
```bash
npm run test:e2e:ui
```

### 4. Write More Tests
Copy the pattern from `financial-profile.spec.js` for other pages!

---

## 📚 Resources

- **Playwright Docs**: https://playwright.dev
- **Best Practices**: https://playwright.dev/docs/best-practices
- **Debugging**: https://playwright.dev/docs/debug
- **Selectors**: https://playwright.dev/docs/selectors

---

## 🆘 Troubleshooting

### "Browser not installed"
```bash
npx playwright install
```

### "Port 8080 in use"
Make sure your dev server is running:
```bash
npm run dev
```

### "Test timeout"
Increase timeout in `playwright.config.ts`:
```typescript
timeout: 60000, // 60 seconds
```

### "Can't find element"
Use the Inspector to find the right selector:
```bash
npx playwright test --debug
```

---

**You're all set! 🎉**

Run your first test now:
```bash
npm run test:e2e:headed tests/e2e/smoke.spec.js
```

