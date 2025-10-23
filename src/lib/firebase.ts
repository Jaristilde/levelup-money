// TOP OF FILE - IMMEDIATE LOG TO VERIFY FILE LOADS
console.log('🔴 FIREBASE.TS FILE IS LOADING - START');

import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

console.log('🔴 FIREBASE IMPORTS COMPLETED');

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

console.log('🔴 FIREBASE CONFIG OBJECT CREATED');

// Debug: Log environment variable loading
console.log('🔵 Firebase Config Loading...');
console.log('🔵 API Key exists:', !!firebaseConfig.apiKey);
console.log('🔵 API Key value:', firebaseConfig.apiKey);
console.log('🔵 Project ID:', firebaseConfig.projectId);
console.log('🔵 Full config:', firebaseConfig);

// Initialize Firebase
console.log('🔴 ABOUT TO CALL initializeApp...');
const app = initializeApp(firebaseConfig);
console.log('✅ Firebase App initialized:', app.name);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

console.log('✅ Firebase Auth initialized');
console.log('✅ Firestore DB initialized');
console.log('✅ Firebase Storage initialized');

// Connect to emulators in development (optional)
if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8081); // Changed from 8080 to avoid conflict with Vite
  connectStorageEmulator(storage, 'localhost', 9199);
  console.log('⚠️ Connected to Firebase emulators');
}

// Database types for user profile
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  first_name?: string;
  last_name?: string;
  avatar_type: 'kevin' | 'jess' | 'david' | 'maria' | 'ben';
  avatar_url?: string;
  email_verified: boolean;
  onboarding_completed?: boolean;
  referral_source?: string;
  primary_financial_goal?: string;
  created_at: string;
  updated_at: string;
  financial_profile?: FinancialProfile;
}

// Financial Profile types
export interface FinancialProfile {
  // Personal Information (encrypted)
  ssn_last_four?: string; // encrypted
  date_of_birth?: string; // ISO date string
  address?: {
    street: string;
    apt?: string;
    city: string;
    state: string;
    zip: string;
  };
  
  // Credit Scores
  credit_score?: number; // Primary score
  credit_scores?: {
    transunion?: number;
    equifax?: number;
    experian?: number;
  };
  
  // Debts
  credit_cards?: CreditCard[];
  loans?: Loan[];
  total_debt?: number;
  
  // Income & Expenses
  monthly_income?: number;
  monthly_expenses?: number;
  
  // Metadata
  profile_completed: boolean;
  last_updated?: string;
}

export interface CreditCard {
  id: string;
  name: string; // e.g., "Chase Sapphire"
  balance: number;
  credit_limit: number;
  apr?: number;
  minimum_payment?: number;
}

export interface Loan {
  id: string;
  type: 'student' | 'auto' | 'personal' | 'mortgage' | 'other';
  name: string; // e.g., "Federal Student Loan"
  balance: number;
  monthly_payment?: number;
  apr?: number;
}

// Auth types
export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  avatarType?: UserProfile['avatar_type'];
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export default app;
