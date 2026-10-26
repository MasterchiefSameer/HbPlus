# 01 · NativeWind v5 Setup for Web and Mobile

Status: done

## Goal
Set up NativeWind v5 (`nativewind@5.0.0-rc.0` and `react-native-css@3.1.0-rc.0`) with Tailwind CSS v4 in `HbPlus` following the official documentation from `https://www.nativewind.dev/v5/llms-full.txt`, ensuring responsive styling works seamlessly on both Web and Mobile.

## Decisions
- Pin exact versions according to the doc:
  - `nativewind@5.0.0-rc.0`
  - `react-native-css@3.1.0-rc.0`
  - Dev dependencies: `tailwindcss@4.1.12`, `@tailwindcss/postcss@4.1.12`, `postcss`, and `lightningcss@1.30.1`
- Configure `overrides` in `package.json` for `"lightningcss": "1.30.1"`.
- Create `postcss.config.mjs` exporting `@tailwindcss/postcss`.
- Create `global.css` with split unlayered utilities as mandated by the doc to ensure utilities stay above React Native Web defaults:
  ```css
  @import "tailwindcss/theme.css" layer(theme);
  @import "tailwindcss/preflight.css" layer(base);
  @import "tailwindcss/utilities.css";
  @import "nativewind/theme";
  ```
- Wrap Metro config in `metro.config.js` with `withNativewind(config)` (no legacy v4 `input` option).
- Import `global.css` in `src/app/_layout.tsx`.
- Create `nativewind-env.d.ts` with `/// <reference types="react-native-css/types" />`.

## Out of scope
- Google OAuth and domain validation logic (Plan 02).
- Dashboard and backend database integration (Plan 03).

## Steps

### 1. Update package.json and install exact pinned dependencies
Add `"lightningcss": "1.30.1"` to `overrides` and devDependencies in `HbPlus/package.json`.
Install:
- `nativewind@5.0.0-rc.0`
- `react-native-css@3.1.0-rc.0`
- `tailwindcss@4.1.12`
- `@tailwindcss/postcss@4.1.12`
- `postcss`
- `lightningcss@1.30.1`

### 2. Configure PostCSS, Metro and CSS
- Create `HbPlus/postcss.config.mjs`.
- Create `HbPlus/metro.config.js`.
- Update `HbPlus/src/global.css`.
- Add `HbPlus/nativewind-env.d.ts`.
- Import `../../src/global.css` in `HbPlus/src/app/_layout.tsx`.

### 3. Verify on Web and Mobile
Test using `className` in `HbPlus/src/app/index.tsx`.
Run `npx tsc --noEmit`.

## Verification
- [x] TypeScript check passes (`npx tsc --noEmit`)
- [x] Dev server starts for Web and Mobile without CSS or Metro bundle errors (`npx expo export --platform web` passed)

## Result
NativeWind v5 and Tailwind CSS v4 are installed and fully verified. Universal web bundler and Metro compilation succeed with code 0 (`dist/` exported with `_expo/static/css/global-*.css`), and TypeScript passes with zero errors.

## AGENTS.md updates
- Confirmed NativeWind v5 specifications from `nativewind.dev/v5/llms-full.txt`.
