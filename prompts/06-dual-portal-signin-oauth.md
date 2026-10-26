# 06 · Dual Portal Sign-In & Supabase OAuth Integration

Status: done

## Goal
1. Add interactive `User Portal` vs `Staff Portal` toggle to the Sign-In screen (`login.tsx`).
   - `User Portal`: Full personal email address input (`you@gmail.com`), password or OTP sign-in, and Google OAuth.
   - `Staff Portal`: Institutional handle input with `@hbplus.fit` domain chip, strict domain checking, and staff role assignment.
2. In User registration / login:
   - When registering with Name, Email & Password: automatically trigger email confirmation via 6-digit OTP sent by Supabase.
   - When registering / logging in with Google OAuth: seamless Supabase Google OAuth integration.
3. Provide clear step-by-step instructions for what settings to configure in the Supabase Dashboard (Email OTP templates, Google Provider).

## Decisions
- Update `src/app/(auth)/login.tsx` to include the same clean segmented toggle from `signup.tsx` (`User Portal` | `Staff Portal`).
- In `src/context/auth-context.tsx`, add `signInWithGoogle(portalType: 'user' | 'staff')` using Supabase's `signInWithOAuth({ provider: 'google', ... })` with platform-specific redirects (Web + Expo Linking on mobile).
- For User OTP, `sendSignInOtp` with `shouldCreateUser: true` allows users to register and sign in seamlessly via OTP passcode.
- In `verify.tsx`, upon verification, inspect user metadata or domain:
  - If `portalType === 'staff'` and domain matches `@hbplus.fit` -> Staff Dashboard.
  - If `portalType === 'user'` (personal email) -> Member Dashboard.

## Out of scope
- Production custom email SMTP server (defaults to Supabase built-in mail service for testing).

## Steps
### 1. Update Auth Context for Google OAuth
In `src/context/auth-context.tsx`, implement `signInWithGoogle` handling Web window location / WebBrowser redirect on mobile, with domain validation for staff.

### 2. Update Sign-In Screen (`login.tsx`)
Add the `User Portal` vs `Staff Portal` toggle:
- When `User Portal`: title says "HB+ Member Portal", badge says "MEMBER ACCESS", input is "Personal Email Address" with keyboard type email, and Google button signs in as member.
- When `Staff Portal`: title says "HB+ Internal Portal", badge says "SECURE STAFF GATEWAY", handle input with `@hbplus.fit` chip, and strict domain check.

### 3. Verify OTP Flow for Registration
Ensure `verify.tsx` accepts both user and staff OTP verification, creating the user profile seamlessly.

### 4. Verification
Run `npx tsc --noEmit` to verify type safety.

## Verification
- [ ] `npx tsc --noEmit` passes with 0 errors.
- [ ] Login screen toggles between User Portal (personal email) and Staff Portal (@hbplus.fit).
- [ ] User can input personal email and request 6-digit OTP code to verify and enter.

## AGENTS.md updates
- Document User vs Staff sign-in toggle and Supabase Google OAuth flow.
