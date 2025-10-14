# LevelUp Money - Firebase Setup Guide

## Overview

Your LevelUp Money app now uses Firebase for authentication and data storage with:
- Firebase Authentication (email/password and Google Sign-In)
- Cloud Firestore NoSQL database
- Firebase Storage for profile pictures
- Secure Firebase Security Rules

## Quick Start

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: **"LevelUp Money"** (or your preferred name)
4. Enable Google Analytics (optional but recommended)
5. Click **"Create project"**

### 2. Get Firebase Configuration

1. In your Firebase project, click the **gear icon** → **Project settings**
2. Scroll down to **"Your apps"** section
3. Click the **web icon** (`</>`) to add a web app
4. Register your app:
   - App nickname: **"LevelUp Money Web"**
   - Check **"Also set up Firebase Hosting"** (optional)
   - Click **"Register app"**
5. Copy the `firebaseConfig` object values
6. Update your `.env` file with these values:

```bash
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### 3. Enable Firebase Authentication

1. In Firebase Console, go to **Build** → **Authentication**
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Enable **Email/Password**:
   - Click on **"Email/Password"**
   - Toggle **"Enable"** to ON
   - Click **"Save"**

5. Enable **Google Sign-In** (optional but recommended):
   - Click on **"Google"**
   - Toggle **"Enable"** to ON
   - Enter **Project support email**
   - Click **"Save"**

6. Configure **Authorized domains**:
   - Go to **Settings** → **Authorized domains**
   - Add your production domain (e.g., `levelupmoney.com`)
   - `localhost` is already authorized for development

### 4. Create Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click **"Create database"**
3. Select **production mode** (we'll deploy security rules next)
4. Choose your Cloud Firestore location:
   - Recommended: Choose closest to your users
   - **US**: `us-central1` or `us-east1`
   - **Europe**: `europe-west1`
   - **Asia**: `asia-southeast1`
5. Click **"Enable"**

### 5. Enable Firebase Storage

1. In Firebase Console, go to **Build** → **Storage**
2. Click **"Get started"**
3. Click **"Next"** (we'll deploy security rules in the next step)
4. Select the same location as your Firestore database
5. Click **"Done"**

### 6. Deploy Security Rules

Install Firebase CLI if you haven't already:

```bash
npm install -g firebase-tools
```

Login to Firebase:

```bash
firebase login
```

Initialize Firebase in your project (if not done):

```bash
firebase init
```

Select:
- **Firestore**: Configure security rules
- **Storage**: Configure security rules
- **Hosting** (optional): For deployment

Use existing project: **Select your project**

Deploy security rules:

```bash
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
```

### 7. Configure Email Templates (Optional)

1. Go to **Authentication** → **Templates** tab
2. Customize email templates:
   - **Email address verification**
   - **Password reset**
   - **Email address change**

3. Customize action URL:
   - Development: `http://localhost:5173/login`
   - Production: `https://your-domain.com/login`

## Features Implemented

### 🔐 Authentication

- **Email/Password Authentication**: Secure user registration and login
- **Google Sign-In**: One-click authentication with Google
- **Email Verification**: Automatic verification emails on signup
- **Password Reset**: Email-based password recovery
- **Session Persistence**: Remember me functionality
- **Auto Logout**: 30-minute inactivity timeout

### 🗄️ Firestore Database

Collections structure:
```
users/{userId}
  ├── profile data (email, full_name, avatar_type, etc.)
  ├── accounts/{accountId}
  ├── budgets/{budgetId}
  ├── debts/{debtId}
  ├── goals/{goalId}
  ├── milestones/{milestoneId}
  ├── retirement/{retirementId}
  ├── transactions/{transactionId}
  ├── credit_reports/{reportId}
  ├── dispute_letters/{letterId}
  ├── chat_messages/{messageId}
  └── settings/{settingId}
```

### 🔒 Security Rules

**Firestore Rules** (`firestore.rules`):
- Users can only read/write their own data
- Profile data validation (email, full_name, avatar_type)
- Prevents profile deletion
- Secure subcollections for financial data

**Storage Rules** (`storage.rules`):
- Profile pictures: User can upload their own (max 5MB, images only)
- Documents: User can upload/download their own documents
- Read access: Users can view any avatar for UI display

### 📦 Storage Structure

```
avatars/{userId}/{filename}  - Profile pictures
documents/{userId}/{filename}  - User documents (reports, letters)
```

## Testing the Setup

### 1. Start Development Server

```bash
npm run dev
```

Open http://localhost:5173

### 2. Test User Registration

1. Go to `/signup`
2. Fill in the form:
   - Full Name: "Test User"
   - Email: "test@example.com"
   - Password: "Test123!@#"
   - Check terms & conditions
3. Click **"Create Account"**
4. Check your email for verification link
5. You should be automatically logged in

### 3. Test Login

1. Log out using sidebar button
2. Go to `/login`
3. Enter credentials:
   - Email: "test@example.com"
   - Password: "Test123!@#"
4. Click **"Sign In"**
5. You should be redirected to dashboard

### 4. Test Google Sign-In

1. Go to `/login`
2. Click **"Continue with Google"** button
3. Select your Google account
4. You should be automatically logged in

### 5. Test Password Reset

1. Go to `/forgot-password`
2. Enter your email
3. Check your email for reset link
4. Click link and enter new password
5. Log in with new password

### 6. Verify Firestore Data

1. In Firebase Console, go to **Firestore Database**
2. Navigate to **users** collection
3. You should see your user document with profile data

### 7. Test Profile Update

1. Go to `/profile`
2. Update your name
3. Change dashboard type
4. Upload profile picture (optional)
5. Changes should save successfully

## Firebase CLI Commands

### Deploy Everything

```bash
firebase deploy
```

### Deploy Only Firestore Rules

```bash
firebase deploy --only firestore:rules
```

### Deploy Only Storage Rules

```bash
firebase deploy --only storage:rules
```

### Deploy Only Hosting

```bash
firebase deploy --only hosting
```

### View Firebase Logs

```bash
firebase functions:log
```

### Run Local Emulators (for testing)

```bash
firebase emulators:start
```

Then update `.env`:
```bash
VITE_USE_FIREBASE_EMULATOR=true
```

## Troubleshooting

### Issue: "Firebase: Error (auth/configuration-not-found)"

**Solution**: Verify all environment variables in `.env` are correct
```bash
# Check your .env file has all 6 variables
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Restart dev server after updating:
```bash
npm run dev
```

### Issue: "Firebase: Error (auth/unauthorized-domain)"

**Solution**: Add your domain to authorized domains
1. Go to **Authentication** → **Settings** → **Authorized domains**
2. Add your domain (e.g., `localhost` for dev, your production domain)

### Issue: "Missing or insufficient permissions"

**Solution**: Deploy Firestore security rules
```bash
firebase deploy --only firestore:rules
```

Verify rules in Firebase Console:
1. Go to **Firestore Database** → **Rules** tab
2. Check that rules are published

### Issue: "User created but profile not found"

**Solution**: Check Firestore rules allow user to create their profile
1. Verify `firestore.rules` is deployed
2. Check browser console for detailed error
3. Verify user UID matches document ID in Firestore

### Issue: "Password reset email not received"

**Solution**:
1. Check spam/junk folder
2. Verify email is correct in Firebase Console
3. Check **Authentication** → **Templates** for email configuration
4. For development, check Firebase Console → **Authentication** → **Users** → Click user → **View email log**

### Issue: "Google Sign-In not working"

**Solution**:
1. Verify Google Sign-In is enabled in **Authentication** → **Sign-in method**
2. Check that you've set a support email
3. Add authorized domains if on production
4. Clear browser cache and try again

## Security Best Practices

### 1. Environment Variables

- **Never commit `.env` to git**
- Add `.env` to `.gitignore`
- Use different Firebase projects for dev/prod
- Rotate API keys if accidentally exposed

### 2. Firestore Rules

- Always deploy rules in production mode
- Test rules thoroughly before deploying
- Never use `allow read, write: if true` in production
- Use the Rules Playground in Firebase Console to test

### 3. Firebase Storage

- Limit file sizes (currently 5MB max)
- Validate file types on upload
- Use Cloud Functions for server-side validation (advanced)
- Regularly audit storage usage

### 4. Authentication

- Enforce strong passwords (min 8 chars, special chars)
- Enable email verification
- Consider adding 2FA in the future
- Monitor **Authentication** → **Users** for suspicious activity

### 5. Database Structure

- Keep user data isolated by userId
- Don't store sensitive data in Firestore (use encryption)
- Implement data validation in security rules
- Use subcollections to organize related data

## Deployment

### Deploy to Firebase Hosting

1. Build your app:
```bash
npm run build
```

2. Deploy to Firebase:
```bash
firebase deploy --only hosting
```

3. Your app will be live at:
```
https://your-project-id.web.app
```

### Custom Domain (Optional)

1. Go to **Hosting** → **Add custom domain**
2. Enter your domain name
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)

## Cost Estimates

Firebase has a generous free tier:

### Spark Plan (Free)
- **Authentication**: Unlimited users
- **Firestore**: 1GB storage, 50K reads/day, 20K writes/day
- **Storage**: 5GB storage, 1GB downloads/day
- **Hosting**: 10GB storage, 360MB/day transfer

For most small to medium apps, this is sufficient!

### Blaze Plan (Pay as you go)
Upgrade when you exceed free tier limits:
- **Firestore**: $0.18/GB storage, $0.06 per 100K reads, $0.18 per 100K writes
- **Storage**: $0.026/GB storage, $0.12/GB downloads
- **Hosting**: $0.026/GB storage, $0.15/GB transfer

## Files Created

- `src/lib/firebase.ts` - Firebase configuration
- `firestore.rules` - Firestore security rules
- `storage.rules` - Storage security rules
- `firebase.json` - Firebase project configuration
- `firestore.indexes.json` - Firestore indexes
- `.env` - Firebase credentials (not in git)
- `.env.example` - Template for environment variables

## Files Modified

- `src/contexts/AuthContext.tsx` - Updated for Firebase Auth & Firestore
- `package.json` - Removed Supabase, added Firebase

## Files Removed

- `src/lib/supabase.ts` - Old Supabase configuration
- `supabase-setup.sql` - Old Supabase database setup

---

Your Firebase integration is complete and ready to use! 🎉

For more information, visit the [Firebase Documentation](https://firebase.google.com/docs).
