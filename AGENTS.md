# Hb+

Cross-platform employee & practitioner portal built with React Native and Expo (React Native for Web). Enforces strict domain-restricted Google OAuth 2.0 login exclusively for `@hbplus.fit` accounts, providing route-guarded access to a responsive administrative and practitioner dashboard across Mobile (iOS/Android) and Web (Browser).

This file is the project's memory: it holds every decision that is still true. Plans in `prompts/` are history.

## Commands

~~~bash
npx expo install <package>  # ALWAYS use instead of npm install: resolves SDK-compatible versions
npx expo start              # dev server (press w for web, a for android, i for iOS)
npx expo start --web        # run web directly on browser
npx expo lint               # lint
npx tsc --noEmit            # type check
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
npx eas-cli@latest <cmd>    # EAS builds, submits, and updates (use instead of bare `eas`)
~~~

## Expo

- Expo ships breaking changes every SDK release, so don't trust memory. Before touching an Expo, EAS, or React Native API, check the `expo` major version in `package.json` and read `https://docs.expo.dev/versions/v<major>.0.0/`. For anything else, start from https://docs.expo.dev/llms.txt and follow its links.
- Universal application: must run seamlessly on Web (browser) and Mobile (Android / iOS) from a single shared codebase.
- Routes live in `src/app/`: every file is a screen and `_layout.tsx` files define navigators and layout route guards. Keep components, hooks, services, and utils outside `src/app/`.
- `ios/` and `android/` are generated. Never create or edit them by hand; configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. When using native modules not in Expo Go, run a development build or web preview (`npx expo start --web`).

## Who owns what

Each tool has one job. Ask before moving a responsibility to a different tool.

- **Authentication & OAuth:** Google OAuth 2.0, Email & Password, and Email Code (OTP) integrated via Clerk Expo (`@clerk/expo`) with hardware token persistence via `expo-secure-store` (mobile) and browser storage (web) managed in `src/context/auth-context.tsx`.
- **Database & Storage:** Supabase PostgreSQL & Storage client configured in `src/services/supabase.ts`.
- **Domain Gatekeeper & Access Control:** `src/utils/domain-validator.ts` strictly enforces:
  - **Staff Portal (`@hbplus.fit`)**: Exclusive domain clearance required. Non-matching domains (e.g. `@gmail.com`) trigger instant token teardown, session revocation, and an explicit inline error alert. Roles: `Clinician`, `Medical`, `Director`.
  - **User Portal (Personal Emails)**: Open member registration with personal emails (e.g. Gmail, Apple, personal domains) for personalized lifestyle assessments, care pathways, and consultations.
- **Route Protection:** Expo Router layout gates in `src/app/(app)/_layout.tsx` guard direct URL tampering on web and deep-links on mobile, redirecting unauthorized users to `/login`.
- **User Database & Persistence:** User profile records (`email`, `name`, `avatar`, `role`, `portalType: 'user' | 'staff'`, `domain`, `lastLoginAt`) stored in Firestore.
- **Role-Based Access Control (RBAC):** Distinct dashboards based on portal type:
  - **Staff Dashboard**: Consultations queue, patient biomarkers, clinical protocol assignments, and administrative oversight based on role (`Clinician` | `Medical` | `Director`).
  - **Member Dashboard**: 3-Pillar Daily Wheel (Body, Mind, Gut), personalized care pathways, 1:1 expert booking, and pause/vacation mode.
- **Styling:** NativeWind v5 (Tailwind CSS v4) with `nativewind/metro` and split layered imports in `src/global.css`.
- **Design System:** Single source of truth in `src/theme/` (`colors.ts`, `spacing.ts`, `typography.ts`, `radius.ts`, `shadows.ts`, `motion.ts`, `index.ts`) mirrored as `@theme` CSS variables in `src/global.css`.
  - Palette: Terracotta (`#9F4022`), Deep Rust (`#7A2E1A`), Warm Cream canvas (`#FCF8F0`), Charcoal (`#1A1918`), Muted Gray (`#6B6763`), Sand Border (`#E9E4D8`), Forest Success (`#2D7A4D`), Restricted Red (`#C53030`), Domain Gold (`#D97706`), Frosted Glass (`rgba(255,255,255,0.7)`).
  - Fonts: Playfair Display Bold/SemiBold (Display & Headings), Plus Jakarta Sans (Body), JetBrains Mono (Captions & Auth Mono).
  - Shared primitives live in `src/components/ui/` (`ThemedText`, `Button`, `IconButton`, `Input`, `Chip`, `Badge`, `AlertBanner`, `Card`, `SegmentedControl`, `Stepper`, `Avatar`, `ListRow`, `GlassTabBar`).
- **Navigation:** Root gateway at `src/app/index.tsx`, auth stack at `src/app/(auth)/` (`login.tsx`, `verify.tsx`, `signup.tsx`), and protected portal at `src/app/(app)/dashboard.tsx`.

## Rules

- Secret keys never reach the app bundle. Never put private service keys behind `EXPO_PUBLIC_`, which is bundled into the app. Never commit `.env`. Keep variable names, without values, in `.env.example`.
- No hex colors, font size literals, or font family strings outside `src/theme/` and `src/global.css`. Components import tokens; screens import components.
- Domain restriction is non-negotiable: an unverified or mismatched domain must never create a persistent session or access protected routes.
- Web URL navigation to `/dashboard` must never flash protected content before auth verification completes; show a clean loading skeleton/spinner state.
- Ask before adding a dependency or service. Prefer official Expo modules (`expo-auth-session`, `expo-secure-store`, `expo-crypto`, `expo-web-browser`) over unmaintained third-party packages.
- Whenever you need input from the user, ask through your tool's built-in question panel so they pick from options instead of typing. Give two to four clear options with the recommended one first. Fall back to plain text only if no such panel exists.

## How we build features

For a new feature or a change across several files. Small fixes and questions skip this.

1. **Understand.** Read the code involved. Open an earlier plan only if this feature builds directly on it (pick by file name). Read the current docs pages for the APIs you'll use, and load a matching skill if one exists. Don't write version-specific APIs from memory.
2. **Ask.** If a real decision is unclear (scope, visible behavior, data shape), ask in the question panel, batching questions into one round and following up only if the answers raise new ones. Pick defaults for the rest and list them. If a decision in this file looks wrong, raise it instead of changing it.
3. **Plan.** Copy `prompts/TEMPLATE.md` to `prompts/NN-feature-name.md` (next number) and fill it in. The plan must be self-contained, so a fresh session can build it from this file plus the plan alone.
4. **IMPORTANT: stop and wait.** Write no app code until the user approves the plan. Ask for approval in the question panel (approve, or request changes). If they request changes, update the plan and ask again. On approval, set `Status: approved`.
5. **Build** step by step, checking each one. If a step turns out wrong, stop and explain instead of redesigning.
6. **Close out.**
   - Run the plan's Verification and give the report described under Reporting.
   - Add a short `## Result` to the plan and set `Status: done`.
   - Update this file: put each lasting decision in the section it belongs to. Replace or remove rules that are no longer true instead of appending. Keep this file under 150 lines.

## Building from designs

Screens must match the HB+ brand system: layout, spacing, sizes, colors, type, radii, icons, and copy.

- Map every color, font, spacing value, and radius to a design-system token. List values with no token in the plan as proposed new tokens instead of hardcoding them.
- Test responsive layouts on both mobile viewport and wide web desktop layouts (max-width card containers on desktop web, fluid safe-areas on mobile).
- Verify dark and light contrast ratios for clinical legibility.
- After building, open the screen in the web browser (`npx expo start --web`) and mobile simulator, compare with specifications, and report differences.

## Reporting

End every piece of work that changes code (features and fixes, not answers to questions) with this report. Use these headings in this order, and leave out any section that would be empty.

- **Done:** one line on the outcome, then the files changed and what changed in each.
- **Verified:** each check with ✅ or ❌ and its evidence (command output, screenshot). List what wasn't checked as ❌ with the reason. Never mark something ✅ without running it.
- **You need to:** numbered actions only the user can take, such as OAuth client IDs, dashboard settings, or keys to provide.
- **Test it yourself:** numbered steps to reproduce the result from a fresh start, ending with `Expected:` and what the user should see.
- **Notes:** defaults picked, trade-offs, and anything left for later.

## Checks

- Lint (`npx expo lint`) and type check (`npx tsc --noEmit`) pass before any task is called done.
- Screens that load data handle loading, error, and empty states.
- Cross-platform verification: runs without bundle errors on both Web (`npx expo start --web`) and Mobile (`npx expo start`).
- Auth edge cases handled: expired tokens, cancelled Google sign-in dialogs, invalid domain rejections, and network timeouts.
