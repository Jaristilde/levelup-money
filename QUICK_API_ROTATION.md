# 🔑 QUICK API KEY ROTATION GUIDE
## Complete This in 30 Minutes

---

## ✅ CHECKLIST - Check off as you complete each step

### Part 1: Firebase (20 minutes)

#### Step 1: Open Firebase Console
- [ ] Go to: https://console.firebase.google.com/project/levelup-money/settings/general
- [ ] Click on "Your apps" section
- [ ] Locate the current web app

#### Step 2: Create NEW Web App
- [ ] Click "Add app" button (</> icon)
- [ ] Select "Web" (</> icon)
- [ ] Name it: `LevelUp Money - Secure`
- [ ] Check "Also set up Firebase Hosting" (optional)
- [ ] Click "Register app"
- [ ] **COPY THE CONFIG** - You'll need this!

Your new config will look like this:
```javascript
{
  apiKey: "NEW-KEY-HERE",
  authDomain: "levelup-money.firebaseapp.com",
  projectId: "levelup-money",
  storageBucket: "levelup-money.firebasestorage.app",
  messagingSenderId: "NEW-SENDER-ID",
  appId: "NEW-APP-ID",
  measurementId: "NEW-MEASUREMENT-ID"
}
```

#### Step 3: Update Your Local .env
- [ ] Open your `.env` file in your code editor
- [ ] Replace the old values with NEW values from Step 2:

```bash
VITE_FIREBASE_API_KEY="YOUR-NEW-API-KEY"
VITE_FIREBASE_APP_ID="YOUR-NEW-APP-ID"
VITE_FIREBASE_AUTH_DOMAIN="levelup-money.firebaseapp.com"
VITE_FIREBASE_MEASUREMENT_ID="YOUR-NEW-MEASUREMENT-ID"
VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR-NEW-SENDER-ID"
VITE_FIREBASE_PROJECT_ID="levelup-money"
VITE_FIREBASE_STORAGE_BUCKET="levelup-money.firebasestorage.app"
```

- [ ] **SAVE** the .env file
- [ ] Verify it still starts with `VITE_` prefix

#### Step 4: Test New Keys Work
- [ ] Run: `npm run dev`
- [ ] Try to log in to your app
- [ ] Verify authentication works
- [ ] If it works ✅, proceed to Step 5
- [ ] If it fails ❌, check your .env file for typos

#### Step 5: Delete OLD Web App
- [ ] Go back to Firebase Console
- [ ] Find the OLD app (the one you created initially)
- [ ] Click ⚙️ (settings icon) next to it
- [ ] Click "Delete app"
- [ ] Confirm deletion
- [ ] Old keys are now INVALID ✅

#### Step 6: Restrict NEW API Key (IMPORTANT!)
- [ ] Go to: https://console.cloud.google.com/apis/credentials?project=levelup-money
- [ ] Find the browser API key (should be the newest one)
- [ ] Click "Edit" (pencil icon)
- [ ] Under "Application restrictions":
  * Select "HTTP referrers (web sites)"
  * Click "Add an item"
  * Add: `https://jaristilde.github.io/*`
  * Add: `http://localhost:8080/*`
  * Click "Done"
- [ ] Under "API restrictions":
  * Select "Restrict key"
  * Click "Select APIs"
  * Enable ONLY these:
    - ✅ Firebase Authentication API
    - ✅ Cloud Firestore API
    - ✅ Cloud Storage for Firebase API
  * Click "OK"
- [ ] Click "Save"
- [ ] API key is now SECURED ✅

---

### Part 2: Supabase (10 minutes)

#### Step 1: Open Supabase Dashboard
- [ ] Go to: https://supabase.com/dashboard/project/ljvcmhgdlnpgaiitgnyq/settings/api
- [ ] Log in if needed

#### Step 2: Rotate Anon/Public Key
- [ ] Scroll to "Project API keys" section
- [ ] Find "anon public" key
- [ ] Click "Rotate" button next to it
- [ ] Confirm rotation in the popup
- [ ] **COPY THE NEW KEY** - You'll need this!

#### Step 3: Update Your Local .env
- [ ] Open your `.env` file
- [ ] Replace the Supabase key:

```bash
VITE_SUPABASE_URL="https://ljvcmhgdlnpgaiitgnyq.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="YOUR-NEW-SUPABASE-ANON-KEY"
VITE_SUPABASE_PROJECT_ID="ljvcmhgdlnpgaiitgnyq"
```

- [ ] **SAVE** the .env file

#### Step 4: Test New Key Works
- [ ] Run: `npm run dev`
- [ ] Check if Supabase features work
- [ ] If it works ✅, you're done!
- [ ] If it fails ❌, check your .env file

#### Step 5: Verify RLS Policies (Security)
- [ ] Go to: https://supabase.com/dashboard/project/ljvcmhgdlnpgaiitgnyq/editor
- [ ] Click on "users" table (or your main table)
- [ ] Click "RLS" tab
- [ ] Verify "Enable RLS" is checked ✅
- [ ] Verify you have policies protecting your data

---

## ✅ VERIFICATION

After completing both parts:

### Test Your App Locally
```bash
# 1. Start dev server
npm run dev

# 2. Try these actions:
- Sign up a new user ✅
- Log in ✅
- View dashboard ✅
- All features work ✅
```

### Verify Old Keys Don't Work
```bash
# In a separate terminal, try the old Firebase config
# (Don't actually do this - just verify it's deleted)
```

---

## 🎉 COMPLETION

When all checkboxes are complete:
- [ ] Firebase keys rotated and restricted
- [ ] Supabase keys rotated
- [ ] Local .env updated
- [ ] App tested and working
- [ ] Old keys deleted/invalidated

**YOU'RE DONE!** Old keys are now useless and your app is secure! 🔒

---

## 🚨 IF SOMETHING BREAKS

**App won't start?**
- Check `.env` file for typos
- Ensure all values are in quotes
- Make sure no spaces around `=` sign

**Authentication fails?**
- Verify Firebase config is correct
- Check Firebase console for errors
- Look at browser console (F12) for error messages

**Need help?**
- Review `SECURITY_INCIDENT_RESPONSE.md`
- Check Firebase/Supabase logs
- Run `npm run dev` and check terminal for errors

---

**Created**: October 20, 2025  
**Estimated Time**: 30 minutes  
**Difficulty**: Medium

