# 07 · Dual-Mode User Registration & Flexible Sign-In

Status: done

## Goal
1. **User Registration Enhancements (`signup.tsx`)**:
   - Provide two clear options for User registration:
     1. **Option 1 (Manual form)**: Full Name, Email, and Password with validation, sending an OTP confirmation code.
     2. **Option 2 (Google OAuth)**: One-click "Continue with Google" OAuth button directly on the signup screen for members.
   - For Staff registration: keep the institutional credential workflow (`@hbplus.fit` handle + Role + Practitioner License ID).

2. **User & Staff Sign-In Enhancements (`login.tsx`)**:
   - For User Portal: provide flexible sign-in:
     - **Option A**: Email + Password sign-in (`signInWithPassword`).
     - **Option B**: One-time Passcode (`sendSignInOtp`) tab or toggle ("Sign in with OTP / Magic Code").
     - **Option C**: Google OAuth 2.0 single sign-on.
   - For Staff Portal: keep the strict `@hbplus.fit` domain security check with OTP/SSO verification.

3. **Auth Context Support (`auth-context.tsx`)**:
   - Add `signInWithPassword(email, password, portalType)` method wrapping `supabase.auth.signInWithPassword`.
   - Update `AuthContextType` interface and provider.

## Decisions
- Maintain the calm, luxury brand design language (`colors.terracotta`, `colors.cream`, `colors.sand`, `colors.surface`).
- Use accessible tabs or sub-toggle on User Sign-In for switching between "Password" and "Passcode / OTP" to keep the UI clean, uncluttered, and intuitive.
- Provide password visibility toggle (eye icon) on both signup and login password inputs.
- Ensure strict zero-tolerance domain check for staff accounts.

## Out of Scope
- Password reset flow via deep link (handled in a separate prompt).

## Steps
1. Add `signInWithPassword` to `src/context/auth-context.tsx`.
2. Update `src/app/(auth)/signup.tsx`:
   - Add Google OAuth button on User Portal tab.
   - Add Password field with toggle visibility for manual registration.
   - Wire registration to pass the user's chosen password to `signUp()`.
3. Update `src/app/(auth)/login.tsx`:
   - Add password input & sign-in mode toggle (Password vs One-Time Code) for User Portal.
   - Call `signInWithPassword` when password mode is active.
4. Run TypeScript check (`node_modules\.bin\tsc.cmd --noEmit`) to verify 0 errors.
5. Provide user guidance and standardized completion report.
