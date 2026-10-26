# 05 · Supabase Authentication Integration & Route Protection

Status: done

## Goal
Integrate Supabase as the live authentication backend, replacing mock logic with email OTP verification, persistent secure session storage (Expo SecureStore on mobile, localStorage on web), strict domain restriction (@hbplus.fit for staff), and layout-level route protection for the dashboard.

## Decisions
- Configure Supabase client in `src/services/supabase.ts` with a universal storage adapter (`expo-secure-store` on Android/iOS, `localStorage` on Web).
- Centralize auth state in `src/context/auth-context.tsx` with `AuthProvider` and `useAuth()`.
- Enforce domain checks in `src/utils/domain-validator.ts`: staff must match `@hbplus.fit`, while member portal permits personal emails.
- Route protection: `src/app/(app)/_layout.tsx` blocks unauthenticated users and redirects to `/(auth)/login`.
- Update screens (`login.tsx`, `verify.tsx`, `signup.tsx`, `dashboard.tsx`) to consume `useAuth()`.

## Out of scope
- Database tables for care pathways and biomarker tracking (subsequent plans).
- Production SMTP email provider setup in Supabase dashboard.

## Steps
### 1. Supabase Client & Universal Storage Adapter
Create `src/services/supabase.ts` wrapping `createClient` with a platform-adaptive storage engine.

### 2. Auth Context & State Provider
Create `src/context/auth-context.tsx` managing `user`, `session`, `isLoading`, `signUp`, `sendSignInOtp`, `verifyOtp`, and `signOut`.

### 3. Wire Screens & Protected Dashboard
Connect `login.tsx`, `verify.tsx`, `signup.tsx`, and `dashboard.tsx` to `useAuth()`.
Add route guard in `src/app/(app)/_layout.tsx`.

### 4. Verification
Run `npx tsc --noEmit` to verify type safety.

## Verification
- [x] `npx tsc --noEmit` passes with 0 errors.
- [x] Session persists across app reloads via SecureStore/localStorage.
- [x] Direct navigation to `/dashboard` redirects to `/login` when unauthenticated.
- [x] Staff domain restriction enforces `@hbplus.fit`.

## Result
Replaced mock auth with live Supabase authentication, session persistence, domain enforcement, and protected route layout gates. 0 TypeScript errors.
