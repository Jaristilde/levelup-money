# 🚨 SECURITY INCIDENT RESPONSE GUIDE
## API Key Rotation & Secret Exposure Protocol

**Date Created**: October 20, 2025  
**Status**: ACTIVE - IMMEDIATE ACTION REQUIRED

---

## ⚠️ SITUATION OVERVIEW

**CRITICAL SECURITY BREACH DETECTED:**
- Firebase and Supabase API keys were committed to git history
- Repository is PUBLIC on GitHub
- Secrets exposed in commits: `ecde98b`, `f7fdfaf`
- Multiple team members may have access to exposed credentials

**IMMEDIATE RISK:**
- Unauthorized access to Firebase project
- Unauthorized access to Supabase database
- Potential data breach
- Unauthorized API usage and billing

---

## 🔥 PRIORITY 1: ROTATE ALL API KEYS (DO THIS FIRST!)

### A. Firebase API Key Rotation

**Current Exposed Keys:**
- API Key: `AIzaSyDGFk0AB_kYY4PM26lK8k-aNrrFoIJzLmU`
- App ID: `1:1087641772753:web:65c83ee160942749401bf0`
- Project ID: `levelup-money`

**Steps to Rotate:**

1. **Go to Firebase Console**
   ```
   https://console.firebase.google.com/project/levelup-money/settings/general
   ```

2. **Create New Web App**
   - Click "Add app" → Select Web (</>) icon
   - Name: `LevelUp Money - Production (New)`
   - Register app
   - Copy the NEW configuration

3. **Delete Old Web App**
   - Find the old app: `LevelUp Money`
   - Click ⚙️ (settings) → Delete app
   - Confirm deletion

4. **Restrict API Keys**
   - Go to: Google Cloud Console → API & Services → Credentials
   - Find the browser API key
   - Click "Edit"
   - Under "Application restrictions":
     * Select "HTTP referrers"
     * Add: `https://yourdomain.com/*`
     * Add: `http://localhost:8080/*` (dev only)
   - Under "API restrictions":
     * Select "Restrict key"
     * Enable only:
       - Firebase Authentication API
       - Cloud Firestore API
       - Cloud Storage API
   - Save

5. **Update Firestore Security Rules**
   ```javascript
   // Verify these rules are in place
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

6. **Update Local .env File**
   ```bash
   VITE_FIREBASE_API_KEY="YOUR-NEW-API-KEY"
   VITE_FIREBASE_APP_ID="YOUR-NEW-APP-ID"
   VITE_FIREBASE_AUTH_DOMAIN="levelup-money.firebaseapp.com"
   # ... other values
   ```

---

### B. Supabase API Key Rotation

**Current Exposed Keys:**
- Project: `ljvcmhgdlnpgaiitgnyq`
- Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**Steps to Rotate:**

1. **Go to Supabase Dashboard**
   ```
   https://supabase.com/dashboard/project/ljvcmhgdlnpgaiitgnyq/settings/api
   ```

2. **Rotate Anon/Public Key**
   - Scroll to "Project API keys"
   - Click "Rotate" next to anon/public key
   - Confirm rotation
   - Copy the NEW anon key

3. **Update RLS (Row Level Security) Policies**
   ```sql
   -- Verify these policies exist
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Users can only see their own data"
   ON users FOR SELECT
   USING (auth.uid() = id);
   
   CREATE POLICY "Users can only update their own data"
   ON users FOR UPDATE
   USING (auth.uid() = id);
   ```

4. **Review Database Permissions**
   - Go to: Database → Tables
   - For each table, verify RLS is enabled
   - Review all policies

5. **Update Local .env File**
   ```bash
   VITE_SUPABASE_PUBLISHABLE_KEY="YOUR-NEW-ANON-KEY"
   VITE_SUPABASE_URL="https://ljvcmhgdlnpgaiitgnyq.supabase.co"
   VITE_SUPABASE_PROJECT_ID="ljvcmhgdlnpgaiitgnyq"
   ```

---

## 🔒 PRIORITY 2: SECURE THE REPOSITORY

### Step 1: Make Repository Private

**Via GitHub Web:**
1. Go to: https://github.com/Jaristilde/levelup-money
2. Click "Settings" (top right)
3. Scroll to "Danger Zone"
4. Click "Change visibility"
5. Select "Make private"
6. Type repository name to confirm
7. Click "I understand, make this repository private"

**Via GitHub CLI (if installed):**
```bash
gh repo edit Jaristilde/levelup-money --visibility private
```

### Step 2: Clean Git History

**ONLY run this AFTER rotating all API keys:**

```bash
cd /Users/joanearistilde/Desktop/levelup-money/levelup-money

# Run the cleanup script
./scripts/clean-git-history.sh

# After cleanup, force push (DESTRUCTIVE!)
git push --force --all origin
git push --force --tags origin
```

### Step 3: Verify Secrets Are Gone

```bash
# Check git history for .env
git log --all --full-history -- .env

# Should return: nothing

# Search for exposed keys in history
git log --all -p | grep -i "AIzaSyDGFk0AB_kYY4PM26lK8k-aNrrFoIJzLmU"

# Should return: nothing
```

---

## 🔍 PRIORITY 3: AUDIT & MONITOR

### A. Review Firebase Usage

1. **Check Authentication Activity**
   - Firebase Console → Authentication → Users
   - Look for suspicious accounts
   - Check sign-in timestamps

2. **Review Firestore Activity**
   - Firebase Console → Firestore → Usage
   - Look for unusual spikes in reads/writes

3. **Check Cloud Storage**
   - Firebase Console → Storage → Files
   - Look for unauthorized uploads

4. **Review Logs**
   - Firebase Console → Logs
   - Filter by: Last 7 days
   - Look for errors or suspicious activity

### B. Review Supabase Usage

1. **Check Database Activity**
   - Supabase Dashboard → Reports
   - Review API requests
   - Check for unusual patterns

2. **Review Auth Activity**
   - Supabase Dashboard → Authentication → Users
   - Look for suspicious accounts

3. **Check Billing**
   - Supabase Dashboard → Billing
   - Look for unexpected charges

---

## 📋 PRIORITY 4: ENABLE GITHUB SECURITY FEATURES

### Enable Dependabot

1. Go to: https://github.com/Jaristilde/levelup-money/settings/security_analysis
2. Under "Dependabot":
   - ✅ Enable "Dependabot alerts"
   - ✅ Enable "Dependabot security updates"
   - ✅ Enable "Dependabot version updates"

3. Create `.github/dependabot.yml`:
   ```yaml
   version: 2
   updates:
     - package-ecosystem: "npm"
       directory: "/"
       schedule:
         interval: "weekly"
       open-pull-requests-limit: 10
   ```

### Enable Secret Scanning

1. Go to: https://github.com/Jaristilde/levelup-money/settings/security_analysis
2. Under "Secret scanning":
   - ✅ Enable "Secret scanning"
   - ✅ Enable "Push protection"

### Enable Code Scanning

1. Go to: https://github.com/Jaristilde/levelup-money/security/code-scanning
2. Click "Set up code scanning"
3. Choose "GitHub CodeQL" → "Set up"
4. The workflow file will be created automatically

---

## ✅ VERIFICATION CHECKLIST

After completing all steps, verify:

- [ ] Firebase API keys rotated
- [ ] Supabase API keys rotated
- [ ] Local .env file updated with NEW keys
- [ ] Old keys confirmed non-functional
- [ ] Repository made private
- [ ] Git history cleaned (no .env files)
- [ ] Force push completed
- [ ] Team members notified
- [ ] Dependabot enabled
- [ ] Secret scanning enabled
- [ ] Code scanning enabled
- [ ] Firebase usage reviewed (no suspicious activity)
- [ ] Supabase usage reviewed (no suspicious activity)
- [ ] Security workflow running (.github/workflows/security-scan.yml)

---

## 🚨 IF BREACH IS CONFIRMED

If you find evidence of unauthorized access:

1. **Immediately disable ALL API keys**
2. **Contact Firebase Support**: https://firebase.google.com/support
3. **Contact Supabase Support**: https://supabase.com/dashboard/support
4. **Document everything**:
   - Timestamps of suspicious activity
   - IP addresses
   - Actions taken
5. **Inform stakeholders**
6. **Consider filing a security incident report**

---

## 📞 CONTACTS

- **Security Lead**: security@levelupmoney.com
- **Firebase Support**: https://firebase.google.com/support
- **Supabase Support**: https://supabase.com/dashboard/support
- **GitHub Support**: https://support.github.com

---

## 📝 POST-INCIDENT REVIEW

After resolving the incident, document:

1. Root cause analysis
2. Timeline of events
3. Actions taken
4. Lessons learned
5. Process improvements

**Update this document** with any new procedures or insights.

---

**Last Updated**: October 20, 2025  
**Next Review**: After incident resolution

