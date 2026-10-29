# 09 · Universal Responsive Landing Page (Web & Mobile)

Status: done

## Result
Successfully created a modular, responsive landing page for HB+ that runs seamlessly on both Website and Mobile (APK/Expo Go).
- Built 6 dedicated components under `src/components/landing/`: `navbar.tsx`, `hero-section.tsx`, `achievements-section.tsx`, `pillars-section.tsx`, `cta-section.tsx`, and `footer.tsx`.
- Integrated real clinical pillars from hbplus.fit (Body, Gut, Mind) and doctor-verified metrics.
- Connected all CTA and Navbar buttons to Clerk authentication flow (`/(auth)/login` and `/(auth)/signup`).
- Verified with TypeScript: 0 errors.

## Goal
Build a curated, modular, responsive landing page for HB+ that runs seamlessly on both **Website (Browser)** and **Mobile App (Android APK / iOS)**.
1. **Modular Architecture**: Separate components for each section into a dedicated folder (`src/components/landing/`):
   - `navbar.tsx`: Responsive navigation header with HB+ logo, desktop menu links, and auth trigger buttons ("Sign In" and "Get Started").
   - `hero-section.tsx`: Headline display, value proposition, action buttons ("Start Assessment", "Sign In"), and doctor-led trust badges.
   - `achievements-section.tsx`: Real statistical impact & trust metrics (e.g. 94% biomarker optimization, 1:1 expert consultations, 3-Pillar care model).
   - `pillars-section.tsx`: The 3 core pillars from hbplus.fit (Body: functional strength & movement; Gut: microbiome & nutrition; Mind: NLP & mental resilience).
   - `cta-section.tsx`: Pre-auth conversion banner encouraging sign up with an APK download badge for Android users.
   - `footer.tsx`: Professional institutional footer with privacy links, copyright, and IT helpdesk info.
2. **Universal Flow Integration**:
   - Running in **Browser**: Expands smoothly to full desktop width (max-w-6xl container, responsive flex/grid layouts, top navigation bar).
   - Running in **App (APK/Expo Go)**: Adapts fluidly to mobile viewport with clean touch-friendly cards and buttons.
   - **Pre-Auth**: Visitors explore the full landing page without being blocked.
   - **Triggering Auth**: Clicking "Sign In", "Get Started", or "Start Assessment" navigates to `/(auth)/login` or `/(auth)/signup`.
   - **Post-Auth**: If a user is already signed in, `index.tsx` automatically routes to `/(app)/dashboard`.

## Design & Inspiration (hbplus.fit)
- Incorporate authentic core concepts from hbplus.fit:
  - 3 Pillars: Body (Movement & Longevity), Gut (Microbiome & Nutrition), Mind (NLP & Stress Regulation).
  - Flexible care with human accountability (1:1 live sessions with doctors, physical therapists, & specialists).
- Adhere strictly to the HB+ Design System in `src/theme/`:
  - Palette: Terracotta (`#9F4022`), Rust (`#7A2E1A`), Warm Cream (`#FCF8F0`), Charcoal (`#1A1918`), Forest (`#2D7A4D`), Sand (`#E9E4D8`).
  - Fonts: Playfair Display Bold/SemiBold for headings, Plus Jakarta Sans for body, JetBrains Mono for badges.
  - Strict **`HB+`** monogram mark (never `H3+`).
  - Zero HIPAA badges or mentions.

## Folder Structure
```text
src/
  components/
    landing/
      index.ts                  # Clean barrel export
      navbar.tsx                # Responsive Header & Monogram
      hero-section.tsx          # Hero Headline, CTAs & Visual Banner
      achievements-section.tsx  # Stats / Proven Outcomes Grid
      pillars-section.tsx       # Body, Gut, Mind 3-Pillar Deep Dive
      cta-section.tsx           # Pre-Auth Action & APK Download Callout
      footer.tsx                # Institutional Footer
  app/
    index.tsx                   # Assembles sections & manages auth redirection
```

## Decisions
- Use React Native for Web primitives (`View`, `ScrollView`, `Pressable`, `Image`, `ThemedText`, `Button`) with `useWindowDimensions()` to deliver responsive desktop vs. mobile layouts without web-only DOM dependencies.
- No bulky external web libraries; pure React Native universal components compatible with Android APK, iOS, and Web.
- All CTA buttons route to `/(auth)/signup` or `/(auth)/login` via Expo Router `useRouter()`.

## Steps
1. Create `src/components/landing/` directory.
2. Build `navbar.tsx` with responsive layout and Auth triggers.
3. Build `hero-section.tsx` with headline and dual CTAs.
4. Build `achievements-section.tsx` with statistics and clinical outcomes.
5. Build `pillars-section.tsx` with Body, Gut, and Mind cards.
6. Build `cta-section.tsx` with pre-auth conversion and APK download badge.
7. Build `footer.tsx` with copyright and organizational credentials.
8. Wire all sections in `src/app/index.tsx` with automatic `isSignedIn` dashboard redirection.
9. Verify with `npx tsc --noEmit` (0 errors).
10. Deliver standardized completion report.
