# 02 · HB+ Core Design System & UI Kit

Status: approved

## Goal
Every screen in HB+ draws from one visual source of truth: brand fonts, colors, spacing, radii, shadows and motion as tokens, plus a small set of shared components matching the "HB+ Core System & UI Kit" reference sheet (panels 01–15). A showcase screen renders all panels on Web and Android.

## Decisions
- Follow `.agents/skills/expo-design-system`: **one** theme entry point. Tokens live in `src/theme/` (`colors.ts`, `spacing.ts`, `typography.ts`, `radius.ts`, `shadows.ts`, `motion.ts`, `index.ts`) and are mirrored as `@theme` CSS variables in `src/global.css`, so NativeWind `className` utilities and TS imports use the same values.
- Replace the template's competing token file `src/constants/theme.ts` + `use-theme.ts` + template `ThemedText/ThemedView` (never two systems side by side). Template-only files (`explore.tsx`, `app-tabs*`, `animated-icon*`, `hint-row`, `web-badge`, `external-link`, `collapsible`) are removed; root layout becomes a plain `Stack`.
- Light theme only for now (the reference is a light warm-cream system). Dark mode is out of scope.
- Colors (read from panel 02, hex labels estimated from the image):
  | Token | Hex | Use |
  |---|---|---|
  | `terracotta` | `#9F4022` | Primary CTAs, key actions |
  | `rust` | `#7A2E1A` | Pressed/hover states, accents |
  | `cream` | `#FCF8F0` | App background canvas |
  | `charcoal` | `#1A1918` | Headings, primary text |
  | `muted` | `#6B6763` | Body copy, subtitles |
  | `sand` | `#E9E4D8` | Cards dividers, input borders |
  | `forest` | `#2D7A4D` | Verified states, success |
  | `restricted` | `#C53030` | Domain alerts, errors |
  | `gold` | `#D97706` | Clinician & tier badges, rating |
  | `glass` | `rgba(255,255,255,0.7)` | Floating nav bars, sheets |
  | `surface` | `#FFFFFF` | Cards |
  Plus tinted backgrounds for alerts/badges (success/error/gold/terracotta at ~10% tint).
- Typography (panel 03), loaded with `expo-font` + Google Fonts packages:
  - Display 42–52px · **Playfair Display Bold**
  - Heading 24–28px · **Playfair Display SemiBold**
  - Body 15px / 1.5 · **Plus Jakarta Sans** (Regular / Medium / SemiBold / Bold)
  - Caption & Auth mono 12–13px · **JetBrains Mono** (Regular / Medium)
  - Text ramp: `display`, `heading`, `title`, `body`, `bodyStrong`, `label`, `caption`, `mono`, `overline` (uppercase terracotta section labels like "01. BRAND & IDENTITY").
  - Static per-weight font files → weight set via `fontFamily`, never `fontWeight`.
- Spacing: 4-pt grid `xs 4 · sm 8 · md 16 · lg 24 · xl 32 · xxl 48`, plus `12` and `20` as named steps (recur in the sheet).
- Radius: `sm 8` (icon boxes, chips inner), `md 12` (inputs, cards inner), `lg 16`, `xl 20` (panels/cards), `full 9999` (buttons, chips, badges — panel 15 says "Border Radius 9999px"). `borderCurve: "continuous"` on non-capsules.
- Shadows: 3 restrained `boxShadow` levels (`card`, `raised`, `overlay`). Motion: `fast 150`, `base 200` (panel 04 "Hover Tint Transition 200ms"), `slow 400`; press scale `0.98` on buttons only (panel 04 "Active State 0.98 Scale Down"), rows highlight instead.
- Icons: `@expo/vector-icons` Feather (1.75px-ish outline stroke, 24px grid per panel 11).
- Components in `src/components/ui/` (props = variant / size / state / style; content via `children`):
  `Text` (ramp), `Button` (primary terracotta, secondary outline w/ Google icon, ghost; sm/md/lg; loading/disabled), `IconButton`, `Input` (default, search, `status: approved | blocked` with VERIFIED/BLOCKED tag + helper text), `Chip` (filter, active terracotta), `Badge` (tags & protocol badges), `AlertBanner` (success / error, dismissible), `Card` (panel surface), `SegmentedControl`, `Toggle`, `Stepper`, `Avatar` (initials), `ListRow` (profile/account rows), `GlassTabBar` (frosted nav chrome, panel 10 — showcase only; real navigation stays native tabs later).
- Compound demos (pathway card, auth policy card, profile row) are composed in the showcase from primitives, not promoted to shared components until a second screen needs them (skill's extraction rule).
- Showcase: `src/app/index.tsx` becomes a scrollable "HB+ Core System" sheet with sections 01–15, responsive (multi-column grid ≥ 1024px on Web, single column on mobile, max content width 1200).

## Out of scope
- Google OAuth, domain validation logic, protected routes, Firebase (Plan 03+). Auth panels are visual only.
- Dark mode.
- Real navigation tabs.

## Steps

### 1. Install fonts and icons
`npx expo install expo-font @expo-google-fonts/playfair-display @expo-google-fonts/plus-jakarta-sans @expo-google-fonts/jetbrains-mono @expo/vector-icons`. Done when `package.json` lists them and `npx expo-doctor` shows no version mismatch for them.

### 2. Tokens
Create `src/theme/*` and `index.ts`. Add `@theme` block to `src/global.css` (colors `--color-*`, fonts `--font-*`, radius `--radius-*`, extra spacing). Done when `bg-terracotta`, `font-display`, `rounded-xl` work in a test view and `tsc` passes.

### 3. Remove template system
Delete template files listed in Decisions, replace root `_layout.tsx` with font loading (`useFonts`, keep splash until loaded) + `Stack` with `headerShown: false` for the showcase only. Done when the app boots with no imports of `constants/theme`.

### 4. Primitives
Build the components listed in Decisions with pressed feedback, accessibility role/state, and `style`/`className` merged last.

### 5. Showcase
Build sections 01–15 in `src/app/index.tsx` matching the reference layout, copy, and states (interactive chips, toggle, stepper, segmented control, dismissible alerts, input states).

### 6. Verify
`npx tsc --noEmit`, `npx expo lint`, `npx expo export --platform web`, then open on Web (desktop + narrow width) and Android, screenshot, compare with reference, list differences, fix.

## Verification
- [x] `npx tsc --noEmit` and `npx expo lint` pass.
- [x] Web export bundles (`npx expo export --platform web` passed with code 0); fonts render (Playfair headings, Jakarta body, mono captions) on Web and Mobile.
- [x] Grep: no hex colors outside `src/theme/` and `global.css`; no `fontSize`/`fontFamily` literals in screens.
- [x] Interactive: chip select, toggle, stepper +/- bounds, segment switch, alert dismiss, input focus border.
- [x] Panels 01–15 match reference specification.

## Result
Complete HB+ Core System & UI Kit implemented with tokens in `src/theme/`, CSS variables in `src/global.css`, shared primitives in `src/components/ui/`, and an interactive responsive showcase in `src/app/index.tsx` covering all 15 panels. 0 type errors, 0 bundle errors.

Status: done
