# 08 · Complete Clerk Auth Migration: Dual-Portal, Google SSO, Password & OTP Recovery

Status: done

## Result
Replaced Supabase authentication completely with Clerk Expo (`@clerk/expo` v4.14.2) across the application. Successfully implemented all 4 required flows:
1. Google OAuth (SSO) with `useSSO()`, automatic Expo Go deep-linking, and staff domain clearance.
2. Manual email & password login with `signIn.password()` and `signIn.finalize()`.
3. Forgot password / OTP login for existing users with `signIn.emailCode.sendCode()` and `signIn.emailCode.verifyCode()`.
4. New user registration with personal email support, enterprise `@hbplus.fit` domain gating, license ID verification, and Clerk bot protection (`clerk-captcha`).
5. Typecheck passed with 0 errors.

## Goal
Replace Supabase authentication completely with **Clerk Expo (`@clerk/expo`)** in the HB+ mobile/web app according to Clerk's latest SDK patterns and the 4 user specifications:

1. **Google OAuth (SSO)**:
   - Powered by Clerk's `useSSO()` (`strategy: 'oauth_google'`) with clean deep-linking for mobile and browser support on web.
   - For **User Portal**: Allows any personal Google account (e.g. `@gmail.com`).
   - For **Staff Portal**: Enforces strict post-SSO domain clearance for `@hbplus.fit` accounts (blocking unauthorized Google accounts with immediate session revocation).

2. **Manual Email & Password Login**:
   - Uses Clerk's current method-based flow: `signIn.password({ emailAddress, password })` and `signIn.finalize()`.

3. **Forgotten Password / OTP Login for Existing Users**:
   - If a member forgets their password or chooses OTP:
     - Triggers Clerk's `signIn.emailCode.sendCode({ emailAddress })`.
     - Submitting the 6-digit OTP code calls `signIn.emailCode.verifyCode({ code })` and `signIn.finalize()`.

4. **Registration of New Users**:
   - **User Portal**: Allows personal email addresses (e.g. `@gmail.com`). Calls `signUp.password({ emailAddress, password, ... })`, followed by `signUp.verifications.sendEmailCode()` and `signUp.verifications.verifyEmailCode({ code })`.
   - **Staff Portal**: Strictly restricts institutional registration to `@hbplus.fit` handles with Practitioner License ID and Staff Role assignment (`Clinician`, `Medical`, `Director`). External emails blocked before dispatch.
   - Renders `<View nativeID="clerk-captcha" />` for Clerk bot protection.

## Decisions
- **SDK**: Use `@clerk/expo` with `tokenCache` from `@clerk/expo/token-cache` (persisting to `expo-secure-store`).
- **Application Key**: Use application `app_3LFIxSGfr2p70kmR3Roz1UMUdKa` publishable key provided in the environment.
- **Provider Architecture**:
  - Wrap the root layout in `src/app/_layout.tsx` with `<ClerkProvider publishableKey={...} tokenCache={tokenCache}>`.
  - Rewrite `src/context/auth-context.tsx` to wrap Clerk hooks (`useUser`, `useAuth`, `useSignIn`, `useSignUp`, `useSSO`), preserving the application's clean `useAuth()` interface.
  - Route guards in `src/app/(app)/_layout.tsx` use Clerk's `isSignedIn` and `isLoaded`.
- **UI Screen Preservation**:
  - `login.tsx`: Retains the luxury HB+ dual-portal segmented control (`User Portal` vs `Staff Portal`), password input, "Forgot password? Sign in with OTP" toggle, and Google SSO button.
  - `signup.tsx`: Retains the "Sign up with Google" button, Full Name, Email, and Password creation with eye visibility toggle, and Staff credentials tab.
  - `verify.tsx`: 6-digit passcode input wired to Clerk's OTP verification.
- **Design Tokens & Constraints**:
  - Strictly use `HB+` logo monogram.
  - Exclude all HIPAA mentions.
  - Maintain the calm luxury palette (`colors.terracotta`, `colors.cream`, `colors.sand`, `colors.charcoal`).

## Out of Scope
- SMS phone-code auth (Email and Google SSO only).

## Steps
1. Install `@clerk/expo` and dependencies using `npx expo install @clerk/expo`.
2. Configure `.env` with `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`.
3. Wrap `RootLayout` in `src/app/_layout.tsx` with `ClerkProvider` and `tokenCache`.
4. Rewrite `src/context/auth-context.tsx` using Clerk's method-based API (`password`, `emailCode`, `useSSO`, `verifications`).
5. Update `src/app/(auth)/login.tsx` to wire the forgot password / OTP recovery flow and manual password login.
6. Update `src/app/(auth)/signup.tsx` with Clerk signup & captcha mount point.
7. Update `src/app/(auth)/verify.tsx` to verify email codes with Clerk.
8. Run `npx tsc --noEmit` and verify zero errors.
9. Deliver standardized report.
