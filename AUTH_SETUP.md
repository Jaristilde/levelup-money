# LevelUp Money - Authentication Overview

## System Overview

LevelUp Money uses **Firebase Authentication** and **Cloud Firestore** for a complete, secure authentication system.

## Features

### 🔐 Authentication Methods

1. **Email/Password Authentication**
   - Secure user registration with email verification
   - Password strength validation (8+ chars, uppercase, lowercase, number, special char)
   - Login with remember me functionality
   - Rate limiting protection (built into Firebase)

2. **Google Sign-In**
   - One-click authentication with Google accounts
   - Automatic profile creation for new users
   - No password management needed

### 🛡️ Security Features

- **Email Verification**: Automatic verification emails on signup
- **Password Reset**: Secure email-based password recovery
- **Session Management**: 30-minute inactivity auto-logout with 2-minute warning
- **Session Persistence**: Remember me for extended sessions
- **Firebase Security Rules**: Row-level security for all user data
- **Automatic Token Refresh**: Seamless session renewal

### 📱 User Experience

- **Loading States**: Visual feedback during all operations
- **Error Handling**: Clear, user-friendly error messages
- **Success Notifications**: Toast notifications for successful actions
- **Password Visibility**: Show/hide password toggles
- **Real-time Validation**: Instant feedback on form inputs
- **Responsive Design**: Works on all devices

## Pages

### Authentication Pages

| Page | Path | Description |
|------|------|-------------|
| Landing | `/landing` | Marketing page with "Get Off The Rat Race" theme |
| Sign Up | `/signup` | User registration with password strength indicator |
| Log In | `/login` | Login with email/password or Google |
| Forgot Password | `/forgot-password` | Request password reset email |
| Reset Password | `/reset-password` | Set new password from email link |
| Profile | `/profile` | Account management and settings |

### Protected Pages

All app pages require authentication:
- Dashboard (`/`)
- Credit Report (`/credit-report`)
- Accounts (`/accounts`)
- Budget (`/budget`)
- Debts (`/debt`)
- Goals (`/goals`)
- Retirement (`/retirement`)
- AI Assistant (`/chat`)
- Settings (`/settings`)

## Firebase Configuration

### Required Setup

1. **Create Firebase Project** at https://console.firebase.google.com
2. **Enable Authentication**:
   - Email/Password
   - Google Sign-In (optional)
3. **Create Firestore Database** in production mode
4. **Enable Firebase Storage** for profile pictures
5. **Deploy Security Rules**:
   ```bash
   firebase deploy --only firestore:rules
   firebase deploy --only storage:rules
   ```

### Environment Variables

Update `.env` with your Firebase credentials:

```bash
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## Data Structure

### Firestore Database

```
users/{userId}
  ├── email: string
  ├── full_name: string
  ├── avatar_type: 'kevin' | 'jess' | 'david' | 'maria' | 'ben'
  ├── avatar_url: string | null
  ├── email_verified: boolean
  ├── created_at: timestamp
  └── updated_at: timestamp
```

### Subcollections (User-specific data)

Each user has private subcollections:
- `accounts/` - Financial accounts
- `budgets/` - Budget tracking
- `debts/` - Debt management
- `goals/` - Financial goals
- `milestones/` - Progress tracking
- `retirement/` - Retirement planning
- `transactions/` - Transaction history
- `credit_reports/` - Credit report data
- `dispute_letters/` - Generated letters
- `chat_messages/` - AI chat history
- `settings/` - User preferences

## Authentication Flow

### Registration Flow

```
1. User visits /signup
2. Fills in: Full Name, Email, Password
3. Password strength validated (5 requirements)
4. Click "Create Account"
   ↓
5. Firebase creates auth account
6. Sends verification email
7. Creates Firestore user document
8. Auto-login (email not verified yet)
   ↓
9. User checks email
10. Clicks verification link
11. Email verified status updated
```

### Login Flow

```
1. User visits /login
2. Enters email and password
3. Optionally checks "Remember Me"
4. Click "Sign In"
   ↓
5. Firebase validates credentials
6. Sets session persistence (local or session)
7. Fetches user profile from Firestore
8. Redirects to dashboard
   ↓
9. User activity tracked
10. Auto-logout after 30 min inactivity
```

### Google Sign-In Flow

```
1. User clicks "Continue with Google"
2. Google popup opens
3. User selects account
   ↓
4. Firebase authenticates with Google
5. Checks if profile exists in Firestore
6. If new user: creates profile with Google data
7. If existing user: loads profile
8. Redirects to dashboard
```

### Password Reset Flow

```
1. User visits /forgot-password
2. Enters email address
3. Click "Send Reset Link"
   ↓
4. Firebase sends password reset email
5. User checks email
6. Clicks reset link
   ↓
7. Opens /reset-password with token
8. Enters new password
9. Password strength validated
10. Click "Reset Password"
    ↓
11. Firebase updates password
12. User redirected to /login
13. User logs in with new password
```

## Session Management

### Inactivity Timeout

```
User active (30 min timer starts)
       ↓
No activity for 28 minutes
       ↓
Toast warning: "You will be logged out in 2 minutes"
  User can click "Stay logged in" to reset timer
       ↓
No activity for 2 more minutes
       ↓
Auto-logout
User redirected to /login
Toast: "You have been logged out due to inactivity"
```

### Activity Detection

These events reset the inactivity timer:
- Mouse clicks (`mousedown`)
- Keyboard input (`keydown`)
- Scrolling (`scroll`)
- Touch interactions (`touchstart`)

## Dashboard Personalization

Users can select their financial journey in `/profile`:

| Avatar | Journey Type | Description |
|--------|-------------|-------------|
| Kevin | Getting Started | New to financial management |
| Jess | Debt Fighter | Focused on debt reduction |
| David | Comprehensive Planner | Detailed financial tracking |
| Maria | Optimizer | Efficiency focused |
| Ben | Advanced Investor | Investment tracking |

Changing avatar type:
1. Updates Firestore profile
2. Updates localStorage awareness level
3. Customizes dashboard content
4. User must refresh to see changes

## Testing

### Test User Registration

```bash
npm run dev
```

1. Navigate to http://localhost:5173/signup
2. Fill in form:
   - Full Name: "Test User"
   - Email: "test@example.com"
   - Password: "Test123!@#"
3. Check all 5 password requirements are met (✓ green)
4. Check "I agree to Terms & Conditions"
5. Click "Create Account"
6. Should see success toast and auto-login

### Test Login

1. Log out (sidebar button)
2. Navigate to http://localhost:5173/login
3. Enter credentials
4. Check "Remember Me" (optional)
5. Click "Sign In"
6. Should redirect to dashboard

### Test Google Sign-In

1. Navigate to http://localhost:5173/login
2. Click "Continue with Google"
3. Select Google account in popup
4. Should auto-login and redirect to dashboard

### Verify Firestore Data

1. Open Firebase Console
2. Go to Firestore Database
3. Navigate to `users` collection
4. Find your user document by UID
5. Verify all profile fields are present

## Troubleshooting

### Common Issues

**"Firebase configuration not found"**
- Check `.env` file has all 6 Firebase variables
- Restart dev server: `npm run dev`

**"Unauthorized domain"**
- Add domain to Firebase Console → Authentication → Settings → Authorized domains

**"Missing or insufficient permissions"**
- Deploy Firestore rules: `firebase deploy --only firestore:rules`

**"User created but profile not found"**
- Check Firestore rules allow user creation
- Verify UID matches document ID in Firestore

**"Email verification not sent"**
- Check Firebase Console → Authentication → Templates
- Configure email action URL
- Check spam folder

**"Password reset not working"**
- Verify email exists in Firebase Authentication
- Check email templates configuration
- Check browser console for errors

**"Google Sign-In popup blocked"**
- Enable popups for localhost
- Try different browser
- Check Firebase Console → Authentication → Sign-in method → Google is enabled

## Security Best Practices

1. **Never commit `.env` to git** - Add to `.gitignore`
2. **Use different Firebase projects** for dev/staging/production
3. **Deploy security rules** before going to production
4. **Enable email verification** for new users
5. **Monitor Firebase Console** → Authentication → Users for suspicious activity
6. **Set password requirements** (already implemented)
7. **Implement rate limiting** (built into Firebase)
8. **Use HTTPS in production** (required by Firebase)

## Files

### Created
- `src/lib/firebase.ts` - Firebase configuration
- `src/contexts/AuthContext.tsx` - Auth state management
- `src/pages/Signup.tsx` - Registration page
- `src/pages/Login.tsx` - Login page
- `src/pages/ForgotPassword.tsx` - Password reset request
- `src/pages/ResetPassword.tsx` - Password reset form
- `src/pages/Profile.tsx` - Account management
- `firestore.rules` - Database security rules
- `storage.rules` - Storage security rules
- `firebase.json` - Firebase project config

### Modified
- `src/App.tsx` - Auth routes and providers
- `src/components/AppSidebar.tsx` - User info and logout
- `.env` - Firebase credentials
- `package.json` - Firebase dependencies

## Documentation

- **`FIREBASE_SETUP.md`** - Complete Firebase setup guide
- **`AUTH_SETUP.md`** - This file - Authentication overview
- **`PROJECT_STATUS.md`** - Project status and next steps
- **`LANDING_PAGE.md`** - Landing page design documentation

---

For detailed setup instructions, see `FIREBASE_SETUP.md`.

For Firebase documentation, visit https://firebase.google.com/docs
