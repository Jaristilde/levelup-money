import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updatePassword as firebaseUpdatePassword,
  onAuthStateChanged,
  updateEmail,
  sendEmailVerification,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { auth, db, UserProfile, SignUpData, LoginData } from '@/lib/firebase';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (data: SignUpData) => Promise<{ error: Error | null }>;
  signIn: (data: LoginData) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signInWithApple: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: Error | null }>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);

  // Session timeout (30 minutes)
  const SESSION_TIMEOUT = 30 * 60 * 1000;
  const WARNING_TIME = 2 * 60 * 1000; // 2 minutes before timeout

  // Fetch user profile from Firestore
  const fetchUserProfile = async (userId: string) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        setProfile({
          id: userId,
          email: data.email,
          full_name: data.full_name,
          avatar_type: data.avatar_type,
          avatar_url: data.avatar_url,
          email_verified: data.email_verified,
          created_at: data.created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
          updated_at: data.updated_at?.toDate?.()?.toISOString() || new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Reset inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }

    const timer = setTimeout(() => {
      // Show warning 2 minutes before logout
      toast.warning('You will be logged out in 2 minutes due to inactivity.', {
        duration: WARNING_TIME,
        action: {
          label: 'Stay logged in',
          onClick: () => resetInactivityTimer()
        }
      });

      // Auto logout after warning period
      setTimeout(() => {
        signOut();
        toast.error('You have been logged out due to inactivity.');
      }, WARNING_TIME);
    }, SESSION_TIMEOUT - WARNING_TIME);

    setInactivityTimer(timer);
  };

  // Track user activity
  useEffect(() => {
    if (user) {
      const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];

      events.forEach(event => {
        window.addEventListener(event, resetInactivityTimer);
      });

      resetInactivityTimer();

      return () => {
        events.forEach(event => {
          window.removeEventListener(event, resetInactivityTimer);
        });
        if (inactivityTimer) {
          clearTimeout(inactivityTimer);
        }
      };
    }
  }, [user]);

  // Initialize auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        await fetchUserProfile(firebaseUser.uid);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (data: SignUpData) => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: data.email,
        full_name: data.fullName,
        avatar_type: data.avatarType || 'david',
        avatar_url: null,
        email_verified: false,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      });

      toast.success('Account created! Please check your email to verify your account.');
      return { error: null };
    } catch (error: any) {
      console.error('Error signing up:', error);
      return { error: new Error(error.message || 'Failed to create account') };
    }
  };

  const signIn = async (data: LoginData) => {
    try {
      // Set persistence based on rememberMe
      if (data.rememberMe) {
        await setPersistence(auth, browserLocalPersistence);
      } else {
        await setPersistence(auth, browserSessionPersistence);
      }

      // Sign in with email and password
      await signInWithEmailAndPassword(auth, data.email, data.password);

      toast.success('Welcome back!');
      return { error: null };
    } catch (error: any) {
      console.error('Error signing in:', error);

      // Handle specific Firebase errors
      let errorMessage = 'Failed to sign in';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled';
      }

      return { error: new Error(errorMessage) };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user profile exists, if not create it
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Create profile for new Google user
        await setDoc(userDocRef, {
          email: user.email,
          full_name: user.displayName || 'User',
          avatar_type: 'david',
          avatar_url: user.photoURL,
          email_verified: user.emailVerified,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp()
        });
      }

      toast.success('Welcome back!');
      return { error: null };
    } catch (error: any) {
      console.error('Error signing in with Google:', error);

      let errorMessage = 'Failed to sign in with Google';
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in popup was closed';
      } else if (error.code === 'auth/cancelled-popup-request') {
        return { error: null }; // User cancelled, don't show error
      }

      return { error: new Error(errorMessage) };
    }
  };

  const signInWithApple = async () => {
    try {
      const provider = new OAuthProvider('apple.com');
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user profile exists, if not create it
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Create profile for new Apple user
        await setDoc(userDocRef, {
          email: user.email,
          full_name: user.displayName || 'User',
          avatar_type: 'david',
          avatar_url: user.photoURL,
          email_verified: user.emailVerified,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp()
        });
      }

      toast.success('Welcome back!');
      return { error: null };
    } catch (error: any) {
      console.error('Error signing in with Apple:', error);

      let errorMessage = 'Failed to sign in with Apple';
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in popup was closed';
      } else if (error.code === 'auth/cancelled-popup-request') {
        return { error: null }; // User cancelled, don't show error
      }

      return { error: new Error(errorMessage) };
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);

      setUser(null);
      setProfile(null);

      // Clear localStorage
      localStorage.removeItem('hasCompletedOnboarding');
      localStorage.removeItem('awarenessLevel');

      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out. Please try again.');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/login`,
        handleCodeInApp: false
      });

      toast.success('Password reset email sent! Check your inbox.');
      return { error: null };
    } catch (error: any) {
      console.error('Error resetting password:', error);

      let errorMessage = 'Failed to send reset email';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      }

      return { error: new Error(errorMessage) };
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      if (!user) throw new Error('No user logged in');

      await firebaseUpdatePassword(user, newPassword);

      toast.success('Password updated successfully!');
      return { error: null };
    } catch (error: any) {
      console.error('Error updating password:', error);

      let errorMessage = 'Failed to update password';
      if (error.code === 'auth/requires-recent-login') {
        errorMessage = 'Please sign in again to update your password';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak';
      }

      return { error: new Error(errorMessage) };
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!user) throw new Error('No user logged in');

      const userDocRef = doc(db, 'users', user.uid);

      // Prepare updates
      const firestoreUpdates: any = {
        ...updates,
        updated_at: serverTimestamp()
      };

      // Remove fields that shouldn't be updated directly
      delete firestoreUpdates.id;
      delete firestoreUpdates.created_at;

      // Update Firestore document
      await updateDoc(userDocRef, firestoreUpdates);

      // Update email in Firebase Auth if changed
      if (updates.email && updates.email !== user.email) {
        await updateEmail(user, updates.email);
        await sendEmailVerification(user);
        toast.info('Verification email sent to your new address');
      }

      // Refresh profile
      await fetchUserProfile(user.uid);

      toast.success('Profile updated successfully!');
      return { error: null };
    } catch (error: any) {
      console.error('Error updating profile:', error);

      let errorMessage = 'Failed to update profile';
      if (error.code === 'auth/requires-recent-login') {
        errorMessage = 'Please sign in again to update your email';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email is already in use';
      }

      return { error: new Error(errorMessage) };
    }
  };

  const refreshSession = async () => {
    try {
      // Force token refresh
      if (user) {
        await user.getIdToken(true);
        await fetchUserProfile(user.uid);
      }
    } catch (error) {
      console.error('Error refreshing session:', error);
    }
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithApple,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    refreshSession
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
