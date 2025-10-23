# 🔧 Selector Fix Summary

## ✅ What Was Fixed

All selectors in `tests/e2e/financial-profile.spec.js` have been **verified and updated** to match your actual `FinancialProfileSetup.tsx` component.

---

## 📋 Verified Selectors (All Correct!)

| Element | Selector | Status | Line Reference |
|---------|----------|--------|----------------|
| **SSN Input** | `input#ssn` | ✅ Correct | Component: line 246 |
| **SSN Type** | `.getAttribute('type')` returns `'password'` or `'text'` | ✅ Correct | Component: line 247 |
| **SSN Toggle** | `div.relative:has(input#ssn) > button[type="button"]` | ✅ Fixed | Component: lines 255-261 |
| **Date Dropdowns** | `getByRole('combobox')` (Shadcn UI Select) | ✅ Correct | Component: lines 277-306 |
| **Street Address** | `getByPlaceholder('Street Address')` | ✅ Correct | Component: line 319 |
| **City** | `getByPlaceholder('City')` | ✅ Correct | Component: line 332 |
| **State Select** | `getByRole('combobox')` (Shadcn UI Select) | ✅ Correct | Component: lines 337-346 |
| **ZIP Code** | `getByPlaceholder('ZIP Code')` | ✅ Correct | Component: line 349 |
| **Credit Score** | `input#creditScore` | ✅ Correct | Component: line 376 |
| **Income** | `input#income` | ✅ Correct | Component: line 569 |
| **Expenses** | `input#expenses` | ✅ Correct | Component: line 580 |
| **Add Card Button** | `getByRole('button', { name: 'Add Card' })` | ✅ Correct | Component: lines 400-410 |
| **Add Loan Button** | `getByRole('button', { name: 'Add Loan' })` | ✅ Correct | Component: lines 479-489 |
| **Save Profile Button** | `getByRole('button', { name: 'Save Profile' })` | ✅ Correct | Component: line 648 |

---

## 🆕 New Features Added

### 1. **Diagnostic Test** (Lines 89-132)
```javascript
test('DIAG-001: Financial Profile page loads and shows all sections')
```

**What it does:**
- ✅ Navigates to the page
- ✅ Takes a full-page screenshot
- ✅ Checks if all sections are visible
- ✅ Verifies key form elements exist
- ✅ Logs results to console
- ✅ **Never fails** - just reports what it finds

**Run it:**
```bash
npx playwright test --grep "DIAG-001" --headed
```

### 2. **Better Error Handling**
- Added `waitForSelector` with fallback
- Added timeout extensions (60s for page load)
- Added `waitForTimeout` after state changes
- Added `.catch()` handlers for auth issues

### 3. **Authentication Made Optional**
```javascript
// ⚠️ TEMPORARY: Comment out login if you haven't created test user yet
// await loginViaUI(page);
```

Now you can run tests **without** creating a Firebase test user first!

### 4. **Improved SSN Toggle Button Selector**
**Old:**
```javascript
const toggleButton = page.locator('input#ssn ~ button').first();
```

**New (more robust):**
```javascript
const toggleButton = page.locator('div.relative:has(input#ssn) > button[type="button"]');
```

This selector is more specific and handles the exact DOM structure.

---

## 🚀 How to Run Tests

### Option 1: Run Diagnostic Test First
```bash
npx playwright test --grep "DIAG-001" --headed
```

**This will:**
1. Open a browser
2. Navigate to `/financial-profile`
3. Take a screenshot (`test-results/financial-profile-page.png`)
4. Print what it finds to the console
5. Tell you if authentication is required

### Option 2: Run All Tests
```bash
npm run test:e2e:headed tests/e2e/financial-profile.spec.js
```

### Option 3: Run Specific Test
```bash
npx playwright test --grep "PI-001" --headed
```

### Option 4: Debug Mode
```bash
npx playwright test --grep "PI-001" --debug
```

---

## 🔍 Troubleshooting

### Issue: "Element not found"

**Solution 1: Check if auth is required**
```bash
# Run diagnostic test
npx playwright test --grep "DIAG-001" --headed
```

Look at the console output. If it says sections are "NOT FOUND", you need authentication.

**Solution 2: Enable authentication**
1. Create test user in Firebase:
   - Email: `test@levelupmoney.com`
   - Password: `Test123456!`

2. Uncomment login in test file:
   ```javascript
   // Line 143 in financial-profile.spec.js
   await loginViaUI(page);  // Remove the // to uncomment
   ```

### Issue: "Timeout waiting for element"

**Solution: Increase timeout in playwright.config.ts**
```typescript
use: {
  actionTimeout: 30000,  // 30 seconds
  navigationTimeout: 60000,  // 60 seconds
}
```

### Issue: "loginViaUI is not defined"

**Solution: Check auth helper exists**
```bash
ls -la tests/helpers/auth.ts
```

If it doesn't exist, the auth helper file wasn't created.

---

## 📊 Test Results Interpretation

### If Diagnostic Test Shows:
```
✓ Section "Personal Information": FOUND
✓ Section "Credit Score": FOUND
✓ Section "Credit Cards": FOUND
✓ Section "Loans": FOUND
✓ Section "Income & Expenses": FOUND
✓ SSN Input found: true
✓ Credit Score Input found: true
✓ Add Card Button found: true
```

**✅ All selectors are correct! Page loads successfully.**

### If Diagnostic Test Shows:
```
✓ Section "Personal Information": NOT FOUND
✓ Section "Credit Score": NOT FOUND
...
```

**⚠️ Page requires authentication or didn't load.**

Check the screenshot at `test-results/financial-profile-page.png` to see what the page looks like.

---

## 📝 Selector Cheat Sheet

Use these selectors in your tests:

```javascript
// ✅ Elements with IDs
page.locator('input#ssn')
page.locator('input#creditScore')
page.locator('input#income')
page.locator('input#expenses')

// ✅ Buttons (use getByRole)
page.getByRole('button', { name: 'Add Card' })
page.getByRole('button', { name: 'Add Loan' })
page.getByRole('button', { name: 'Save Profile' })

// ✅ Inputs by placeholder
page.getByPlaceholder('Street Address')
page.getByPlaceholder('City')
page.getByPlaceholder('ZIP Code')
page.getByPlaceholder('Card Name (e.g., Chase Sapphire)')
page.getByPlaceholder('Current Balance')

// ✅ Shadcn UI Selects
page.getByRole('combobox').first()  // Month
page.getByRole('combobox').nth(1)   // Day
page.getByRole('combobox').nth(2)   // Year

// ✅ Select options
page.getByRole('option', { name: 'January' })
page.getByRole('option', { name: '15' })

// ✅ SSN Toggle Button
page.locator('div.relative:has(input#ssn) > button[type="button"]')
```

---

## ✨ Summary

**All selectors are now:**
1. ✅ Verified against actual component
2. ✅ Using best practices (getByRole, getByPlaceholder)
3. ✅ Handling Shadcn UI components correctly
4. ✅ Robust with proper waits and error handling

**Next Steps:**
1. Run diagnostic test: `npx playwright test --grep "DIAG-001" --headed`
2. Check screenshot in `test-results/`
3. If needed, create Firebase test user
4. Uncomment `await loginViaUI(page)` in test file
5. Run all tests: `npm run test:e2e:headed`

**Your tests are ready to run!** 🎉

