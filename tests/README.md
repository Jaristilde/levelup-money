# 🧪 LevelUp Money - Test Suite

Automated testing for the LevelUp Money fintech application using Playwright.

## 📋 Prerequisites

1. **Install Playwright** (already done):
   ```bash
   npm install -D @playwright/test
   ```

2. **Install Playwright Browsers**:
   ```bash
   npx playwright install
   ```

3. **Create a Test User in Firebase**:
   - Go to Firebase Console → Authentication
   - Create a test user with email: `test@levelupmoney.com` and password: `Test123456!`
   - Or update the credentials in `tests/helpers/auth.ts`

## 🚀 Running Tests

### Run all tests
```bash
npm run test:e2e
```

### Run tests in headed mode (see browser)
```bash
npm run test:e2e:headed
```

### Run tests in UI mode (interactive)
```bash
npm run test:e2e:ui
```

### Run specific test file
```bash
npx playwright test tests/e2e/financial-profile.spec.js
```

### Run tests in a specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## 📁 Test Structure

```
tests/
├── e2e/                    # End-to-end tests
│   └── financial-profile.spec.js
├── integration/            # Integration tests (future)
├── unit/                   # Unit tests (future)
├── helpers/                # Test utilities
│   └── auth.ts            # Authentication helpers
└── README.md              # This file
```

## 🧩 Test Files

### `e2e/financial-profile.spec.js`
Comprehensive tests for the Financial Profile Setup page:
- ✅ Personal Information (SSN, DOB, Address)
- ✅ Credit Score validation
- ✅ Credit Cards (add, edit, delete)
- ✅ Loans (add, edit, delete)
- ✅ Income & Expenses
- ✅ Summary calculations
- ✅ Form submission
- ✅ Data persistence

## 🔐 Authentication

Tests that require authentication use the `loginViaUI()` helper:

```javascript
import { loginViaUI } from '../helpers/auth';

test.beforeEach(async ({ page }) => {
  await loginViaUI(page);
  await page.goto('/financial-profile');
});
```

## 📊 Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

## 🐛 Debugging Tests

### Debug a specific test
```bash
npx playwright test --debug tests/e2e/financial-profile.spec.js
```

### Record a test
```bash
npx playwright codegen http://localhost:8080
```

### View traces
```bash
npx playwright show-trace trace.zip
```

## ✅ Current Test Coverage

### Financial Profile Setup
- [ ] PI-001: Can enter last 4 digits of SSN
- [ ] PI-005: SSN shows as masked when hidden
- [ ] PI-006: Show/Hide SSN toggle works
- [ ] PI-009: Rejects users under 18 years old
- [ ] PI-016: ZIP code accepts exactly 5 digits
- [ ] PI-017: ZIP code rejects less than 5 digits
- [ ] CS-001: Accepts valid credit score
- [ ] CS-002: Placeholder shows "e.g., 720"
- [ ] CS-003: Rejects credit score below 300
- [ ] CS-005: Rejects credit score above 850
- [ ] CC-001: Can click Add Card button
- [ ] CC-002: Can add multiple cards
- [ ] CC-003: Can delete a card
- [ ] CC-006-009: Can enter all card fields
- [ ] LN-001: Can click Add Loan button
- [ ] LN-005: Can select loan type
- [ ] LN-009-011: Can enter all loan fields
- [ ] IE-001-002: Can enter income and expenses
- [ ] SM-002: Total debt calculates correctly (cards)
- [ ] SM-004: Total debt calculates correctly (mixed)
- [ ] FS-003: Successful form submission
- [ ] FS-006: Shows validation errors
- [ ] DP-001: Data persists after save

## 🔧 Configuration

Edit `playwright.config.ts` to:
- Change test timeout
- Add/remove browsers
- Configure screenshots/videos
- Set baseURL

## 📝 Writing New Tests

1. Create a new file in `tests/e2e/` or `tests/integration/`
2. Import the test framework:
   ```javascript
   import { test, expect } from '@playwright/test';
   ```
3. Write your tests using Playwright's API
4. Use helpers from `tests/helpers/` for common tasks

## 🎯 Best Practices

- ✅ Use `getByRole()`, `getByLabel()`, `getByPlaceholder()` over `locator()`
- ✅ Use `test.beforeEach()` for setup
- ✅ Keep tests independent (each test should work in isolation)
- ✅ Use meaningful test names (e.g., "PI-001: Can enter SSN")
- ✅ Add comments explaining complex interactions
- ✅ Use `data-testid` attributes for dynamic content

## 🚨 Known Issues

- **DP-001 (Data Persistence)**: Expected to fail until edit mode is implemented
- **Authentication**: Requires manual creation of test user in Firebase

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright Test Assertions](https://playwright.dev/docs/test-assertions)
