# 03 · Onboarding Screen & Auth Flow Transition

Status: approved

## Goal
Build the pixel-accurate HB+ Onboarding screen from the attached mobile design reference, featuring an Unsplash editorial header image with glass status pills, paginated progress indicator, 3 numbered protocol value cards, primary CTA ("Continue with HB+ →"), secondary sign-in button ("Already a member? Sign in"), and wire it to transition seamlessly to the authentication flow (`/login`) without the HIPAA security badge.

## Decisions
- Follow the visual specifications from the attached reference (`media_1792999721622_75d5046c.png`):
  - **Top Bar**: HB+ monogram mark on the left, 3-step carousel pagination bars in center (active terracotta pill, 2 inactive dots), and "Skip to Login" text button on the right.
  - **Hero Image**: Rich editorial wellness photo from Unsplash with rounded corners (`rounded-2xl` / `radius.lg` continuous).
  - **Hero Floating Overlay Pills**:
    - Left Pill: Frosted glass badge with verified badge icon + `"DOCTOR & SPECIALIST-LED"`.
    - Right Pill: Translucent dark pill with green glowing status dot + `"Longevity Engine Active"`.
  - **Overline Row**: `"HOLISTIC CLINICAL CONTINUUM"` (terracotta) • `"HB+ PROTOCOLS"` (terracotta).
  - **Headline**: `"Elevate your vitality through precision wellness."` in `PlayfairDisplay_700Bold` (Display ramp).
  - **Body Description**: `"Experience bespoke clinical care combining cellular regeneration, gut microbiome health, and posture restoration — guided by licensed medical practitioners."` in `PlusJakartaSans_400Regular`.
  - **3 Value Feature Cards** (Inset rounded cards):
    - `01`: Pulse/vital icon in terracotta tint + `"Personalized Protocols"` + `"Microbiome restoration, pain..."`
    - `02`: Stethoscope/care icon in forest tint + `"Verified Care Network"` + `"Direct 1-on-1 consultations with..."`
    - `03`: Shield/lock icon in neutral tint + `"Domain-Governed Security"` + `"Encrypted @hbplus.fit practitioner..."`
  - **Actions**:
    - Primary CTA: `"Continue with HB+ →"` (Terracotta background, white text, active press scale 0.98).
    - Secondary Action: `"Already a member? Sign in"` (Sand border/cream surface with lock icon).
    - Security Footer: Shield icon + `"HIPAA Compliant • 256-Bit Domain Encryption"`.
- Routing Architecture:
  - Put Onboarding on root screen `src/app/index.tsx` (the first screen users see).
  - Create the authentication screen at `src/app/(auth)/login.tsx` for the sign-in destination.
  - Wire both "Skip to Login" and "Already a member? Sign in" (and the completion of onboarding) to navigate directly to `/(auth)/login`.
  - Preserve the design system showcase by moving it or providing a developer shortcut/route if needed.
- Image Asset: High-resolution portrait from Unsplash with warm editorial lighting and face/hair detail matching the reference.

## Out of scope
- Full backend Google OAuth execution (covered in the login screen implementation).
- Multi-step onboarding carousel slides swipe gesture (plan 03 delivers this first core screen and navigation hook).

## Steps

### 1. Set up Auth route structure
- Create `src/app/(auth)/_layout.tsx` and `src/app/(auth)/login.tsx`.
- Configure stack transitions between Onboarding (`index`) and Login.

### 2. Build the Onboarding Screen
- Implement the exact layout, typography, and spacing in `src/app/index.tsx` using the design tokens from `src/theme/` and components from `src/components/ui/`.
- Add responsive constraints so it looks flawless on mobile screens while maintaining centered max-width on web.
- Include Unsplash editorial image with floating dual status badges.
- Render the 3 numbered protocol feature cards.
- Add "Continue with HB+" and "Already a member? Sign in" action buttons.

### 3. Connect Navigation to Auth Flow
- Wire "Skip to Login" and "Already a member? Sign in" to navigate using `router.push('/(auth)/login')`.

### 4. Verification & Type Check
- Run `npx tsc --noEmit`.
- Check on Web and Android viewport to ensure visual alignment, spacing, and button press feedback.

## Verification
- [x] `npx tsc --noEmit` passes with 0 errors.
- [x] Onboarding screen matches mobile reference with Unsplash editorial photography and floating status pills.
- [x] HIPAA badge removed per user direction.
- [x] "Skip to Login", "Already a member? Sign in", and "Continue with HB+ →" transition to `/(auth)/login`.

## Result
Built the pixel-accurate HB+ Onboarding screen with Unsplash imagery, status badges, protocol cards, action buttons, and connected authentication flow navigation. 0 TypeScript errors.

Status: done
