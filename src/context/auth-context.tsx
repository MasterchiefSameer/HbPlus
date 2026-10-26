import {
  useAuth as useClerkAuth,
  useClerk,
  useSignIn,
  useSignUp,
  useSSO,
  useUser,
} from '@clerk/expo';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import * as Linking from 'expo-linking';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { Platform } from 'react-native';

import { isAllowedStaffDomain } from '@/utils/domain-validator';

function getOAuthRedirectUrl(): string {
  if (Platform.OS === 'web') {
    return Linking.createURL('/sso-callback');
  }

  const isExpoGo =
    (typeof globalThis !== 'undefined' && !!(globalThis as any).expo?.modules?.ExpoGo) ||
    Constants.appOwnership === 'expo' ||
    Constants.executionEnvironment === ExecutionEnvironment.StoreClient ||
    !!Constants.expoGoConfig;

  const hostUri =
    Constants.expoConfig?.hostUri ||
    (Constants.expoGoConfig as { debuggerHost?: string } | null)?.debuggerHost;

  if (isExpoGo && hostUri) {
    return `exp://${hostUri}/--/sso-callback`;
  }

  return 'hbplus://sso-callback';
}

function extractErrorMessage(err: any): string {
  if (!err) return 'An unexpected error occurred.';
  if (typeof err === 'string') return err;
  if (err.errors && Array.isArray(err.errors) && err.errors.length > 0) {
    return err.errors[0]?.longMessage || err.errors[0]?.message || 'Authentication error.';
  }
  return err.message || 'Authentication error.';
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  portalType: 'user' | 'staff';
  role?: string;
  licenseId?: string | null;
  domain: string;
  isVerifiedStaff: boolean;
}

export type AuthFlowType = 'sign_up' | 'sign_in_otp' | 'reset_password';

export interface AuthContextType {
  user: UserProfile | null;
  isSignedIn: boolean;
  isLoaded: boolean;
  isLoading: boolean;
  pendingEmail: string | null;
  pendingPortalType: 'user' | 'staff';
  flowType: AuthFlowType | null;

  // Actions
  signUp: (params: {
    fullName: string;
    email: string;
    password?: string;
    portalType: 'user' | 'staff';
    staffRole?: string;
    licenseId?: string;
  }) => Promise<{ success: boolean; error?: string }>;

  signInWithPassword: (
    email: string,
    password: string,
    portalType?: 'user' | 'staff'
  ) => Promise<{ success: boolean; error?: string; needsVerification?: boolean }>;

  sendSignInOtp: (
    email: string,
    portalType?: 'user' | 'staff'
  ) => Promise<{ success: boolean; error?: string }>;

  verifyOtp: (code: string) => Promise<{ success: boolean; error?: string }>;

  resendOtp: () => Promise<{ success: boolean; error?: string }>;

  signInWithGoogle: (
    portalType: 'user' | 'staff'
  ) => Promise<{ success: boolean; error?: string; cancelled?: boolean }>;

  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user: clerkUser, isLoaded: isUserLoaded } = useUser();
  const { isSignedIn, isLoaded: isAuthLoaded } = useClerkAuth();
  const { signOut: clerkSignOut } = useClerk();
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();
  const { startSSOFlow } = useSSO();

  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [pendingPortalType, setPendingPortalType] = useState<'user' | 'staff'>('user');
  const [flowType, setFlowType] = useState<AuthFlowType | null>(null);

  const isLoaded = isUserLoaded && isAuthLoaded;

  // Unified User Profile
  const userProfile = useMemo<UserProfile | null>(() => {
    if (!clerkUser) return null;

    const email =
      clerkUser.primaryEmailAddress?.emailAddress ||
      clerkUser.emailAddresses?.[0]?.emailAddress ||
      '';

    const unsafeMetadata = (clerkUser.unsafeMetadata || {}) as Record<string, any>;
    const publicMetadata = (clerkUser.publicMetadata || {}) as Record<string, any>;

    const portalType: 'user' | 'staff' =
      publicMetadata.portalType ||
      unsafeMetadata.portalType ||
      (email.endsWith('@hbplus.fit') ? 'staff' : 'user');

    const fullName =
      clerkUser.fullName ||
      `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() ||
      unsafeMetadata.fullName ||
      email.split('@')[0] ||
      'Member';

    return {
      id: clerkUser.id,
      email,
      fullName,
      avatarUrl: clerkUser.imageUrl,
      portalType,
      role:
        publicMetadata.role ||
        unsafeMetadata.role ||
        (portalType === 'staff' ? 'Clinician' : 'Member'),
      licenseId: publicMetadata.licenseId || unsafeMetadata.licenseId || null,
      domain: email.split('@')[1] || '',
      isVerifiedStaff: portalType === 'staff' && isAllowedStaffDomain(email),
    };
  }, [clerkUser]);

  // 1. Sign Up (Manual Full Name, Email, Password)
  const handleSignUp = async ({
    fullName,
    email,
    password,
    portalType,
    staffRole,
    licenseId,
  }: {
    fullName: string;
    email: string;
    password?: string;
    portalType: 'user' | 'staff';
    staffRole?: string;
    licenseId?: string;
  }) => {
    try {
      const cleanEmail = email.trim().toLowerCase();

      // Guard: Staff portal MUST use @hbplus.fit
      if (portalType === 'staff' && !isAllowedStaffDomain(cleanEmail)) {
        return {
          success: false,
          error: 'Access restricted. Staff accounts must use an official @hbplus.fit email address.',
        };
      }

      // If user has an existing session, sign out to permit new account registration
      if (isSignedIn) {
        await clerkSignOut();
      }

      setPendingEmail(cleanEmail);
      setPendingPortalType(portalType);
      setFlowType('sign_up');

      // Reset any previous attempt
      if (signUp.id) {
        await signUp.reset();
      }

      const nameParts = fullName.trim().split(' ');
      const firstName = nameParts[0] || fullName;
      const lastName = nameParts.slice(1).join(' ') || undefined;

      // Method-based Clerk password sign-up
      const { error: signUpError } = await signUp.password({
        emailAddress: cleanEmail,
        password: password || 'HbPlus2026!Secure',
        firstName,
        lastName,
      });

      if (signUpError) {
        return { success: false, error: extractErrorMessage(signUpError) };
      }

      // Send 6-digit email code
      const { error: sendCodeError } = await signUp.verifications.sendEmailCode();
      if (sendCodeError) {
        return { success: false, error: extractErrorMessage(sendCodeError) };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: extractErrorMessage(err) };
    }
  };

  // 2. Sign In with Password
  const handleSignInWithPassword = async (
    email: string,
    password: string,
    portalType: 'user' | 'staff' = 'user'
  ) => {
    try {
      const cleanEmail = email.trim().toLowerCase();

      if (portalType === 'staff' && !isAllowedStaffDomain(cleanEmail)) {
        return {
          success: false,
          error: 'Access restricted. Please login using your official @hbplus.fit domain email.',
        };
      }

      // If already signed in with this account, return success immediately
      if (isSignedIn) {
        if (userProfile?.email?.toLowerCase() === cleanEmail) {
          return { success: true, needsVerification: false };
        }
        await clerkSignOut();
      }

      if (signIn.id) {
        await signIn.reset();
      }

      const { error: passwordError } = await signIn.password({
        emailAddress: cleanEmail,
        password,
      });

      if (passwordError) {
        return { success: false, error: extractErrorMessage(passwordError) };
      }

      if (signIn.status === 'complete') {
        const { error: finalizeError } = await signIn.finalize();
        if (finalizeError) {
          return { success: false, error: extractErrorMessage(finalizeError) };
        }
        setPendingEmail(null);
        setFlowType(null);
        return { success: true, needsVerification: false };
      }

      if (signIn.status === 'needs_first_factor') {
        const { error: codeError } = await signIn.emailCode.sendCode();
        if (codeError) {
          return { success: false, error: extractErrorMessage(codeError) };
        }
        setPendingEmail(cleanEmail);
        setFlowType('sign_in_otp');
        return { success: true, needsVerification: true };
      }

      return {
        success: false,
        error: `Sign-in incomplete (status: ${signIn.status}).`,
      };
    } catch (err: any) {
      return { success: false, error: extractErrorMessage(err) };
    }
  };

  // 3. Send Sign-In OTP / Forgot Password Recovery Code
  const handleSendSignInOtp = async (
    email: string,
    portalType: 'user' | 'staff' = 'user'
  ) => {
    try {
      const cleanEmail = email.trim().toLowerCase();

      if (portalType === 'staff' && !isAllowedStaffDomain(cleanEmail)) {
        return {
          success: false,
          error: 'Access restricted. Please login using your official @hbplus.fit domain email.',
        };
      }

      // If already signed in with this account, return success immediately
      if (isSignedIn) {
        if (userProfile?.email?.toLowerCase() === cleanEmail) {
          return { success: true, needsVerification: false };
        }
        await clerkSignOut();
      }

      if (signIn.id) {
        await signIn.reset();
      }

      setPendingEmail(cleanEmail);
      setPendingPortalType(portalType);
      setFlowType('sign_in_otp');

      const { error } = await signIn.emailCode.sendCode({
        emailAddress: cleanEmail,
      });

      if (error) {
        return { success: false, error: extractErrorMessage(error) };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: extractErrorMessage(err) };
    }
  };

  // 4. Verify 6-digit OTP
  const handleVerifyOtp = async (code: string) => {
    try {
      const trimmed = code.trim();

      if (flowType === 'sign_up') {
        const { error: verifyError } = await signUp.verifications.verifyEmailCode({
          code: trimmed,
        });

        if (verifyError) {
          return { success: false, error: extractErrorMessage(verifyError) };
        }

        if (signUp.status === 'complete') {
          const { error: finalizeError } = await signUp.finalize();
          if (finalizeError) {
            return { success: false, error: extractErrorMessage(finalizeError) };
          }
          setPendingEmail(null);
          setFlowType(null);
          return { success: true };
        }

        return {
          success: false,
          error: `Additional sign-up steps required (${signUp.status}).`,
        };
      }

      // sign_in_otp or reset_password flow
      const { error: verifyError } = await signIn.emailCode.verifyCode({
        code: trimmed,
      });

      if (verifyError) {
        return { success: false, error: extractErrorMessage(verifyError) };
      }

      if (signIn.status === 'complete') {
        const { error: finalizeError } = await signIn.finalize();
        if (finalizeError) {
          return { success: false, error: extractErrorMessage(finalizeError) };
        }
        setPendingEmail(null);
        setFlowType(null);
        return { success: true };
      }

      return {
        success: false,
        error: `Sign-in incomplete (${signIn.status}).`,
      };
    } catch (err: any) {
      return { success: false, error: extractErrorMessage(err) };
    }
  };

  // 5. Resend OTP
  const handleResendOtp = async () => {
    try {
      if (flowType === 'sign_up') {
        const { error } = await signUp.verifications.sendEmailCode();
        if (error) return { success: false, error: extractErrorMessage(error) };
        return { success: true };
      }

      if (signIn.id) {
        const { error } = await signIn.emailCode.sendCode();
        if (error) return { success: false, error: extractErrorMessage(error) };
        return { success: true };
      }

      return { success: false, error: 'No active verification session.' };
    } catch (err: any) {
      return { success: false, error: extractErrorMessage(err) };
    }
  };

  // 6. Google OAuth (SSO)
  const handleSignInWithGoogle = async (portalType: 'user' | 'staff') => {
    try {
      if (isSignedIn) {
        return { success: true };
      }

      const redirectUrl = getOAuthRedirectUrl();

      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl,
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        return { success: true };
      }

      return { success: false, cancelled: true };
    } catch (err: any) {
      if (err?.code === 'SIGN_IN_CANCELLED' || err?.code === '-5') {
        return { success: false, cancelled: true };
      }
      return { success: false, error: extractErrorMessage(err) };
    }
  };

  // 7. Sign Out
  const handleSignOut = async () => {
    await clerkSignOut();
    setPendingEmail(null);
    setFlowType(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user: userProfile,
        isSignedIn: !!isSignedIn,
        isLoaded,
        isLoading: !isLoaded,
        pendingEmail,
        pendingPortalType,
        flowType,
        signUp: handleSignUp,
        signInWithPassword: handleSignInWithPassword,
        sendSignInOtp: handleSendSignInOtp,
        verifyOtp: handleVerifyOtp,
        resendOtp: handleResendOtp,
        signInWithGoogle: handleSignInWithGoogle,
        signOut: handleSignOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
