# 04 · Authentication Flow (Sign-in, Verification & Signup)

Status: approved

## Goal
Build the authentication flow matching the attached "HB+ Internal Portal" design:
- Exclude all HIPAA-related mentions/manuals/badges.
- Exclude the 3 security cards below "Forgot access?".
- Build clean Sign-In (`login.tsx`), Verification (`verify.tsx`), and Signup (`signup.tsx`) screens with mocked authentication flow and interactive domain verification demo.

## Decisions
- Visual styling strictly conforms to the uploaded design (`media_1793000488527_5f4402ff.png`):
  - Cream background (`#FCF8F0`), card surface (`#FFFFFF`), sand border (`#E9E4D8`), terracotta CTA (`#9F4022`).
  - Interactive "VERIFICATION STATE DEMO" allows switching between Idle, Success (approved `@hbplus.fit`), and Denied (blocked non-domain) states right on the card.
- Mocked auth state handles valid (`alexandra@hbplus.fit`) and invalid inputs with instant, responsive UI feedback.

## Out of scope
- Real Firebase/Google backend keys connection (comes in Plan 05). Auth is completely mocked with simulated delays and state transitions for now.

## Steps
1. Create `src/app/(auth)/login.tsx` matching the design image pixel-for-pixel.
2. Create `src/app/(auth)/verify.tsx` for 6-digit code verification.
3. Create `src/app/(auth)/signup.tsx` for practitioner onboarding / staff access request.
4. Wire navigation between Login, Verify, and Signup.
5. Verify TypeScript compilation and responsive layout.

## Verification
- [x] `npx tsc --noEmit` passes with 0 errors.
- [x] Sign-In screen matches design image with interactive Verification State Demo bar (Idle, Success, Denied).
- [x] All HIPAA references and the 3 bottom security cards below "Forgot access?" were removed per instruction.
- [x] 6-digit OTP Verification screen built with timer and auto-focus advance.
- [x] Staff clearance Signup screen built with role selector and domain chip.
- [x] Navigation and mocked form interactions connected seamlessly.

## Result
Complete authentication suite implemented matching the design reference without HIPAA mentions or bottom cards. Mocked verification and sign-in flow connected. 0 TypeScript errors.

Status: done
