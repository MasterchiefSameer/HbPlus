# 01 - Agent Skills Reference Guide

This document provides a complete overview and breakdown of all specialized skills configured in the `.agents/skills` directory of the **HB+** repository.

---

## Architecture Overview

The `.agents/skills` system equips the AI coding agent with domain-specific knowledge, schemas, official documentation patterns, and battle-tested code conventions. They are divided into three core domains:

1. **Clerk Authentication Suite** (8 skills) — User identity, token persistence, OTPs, OAuth, and metadata.
2. **Expo & React Native Core Suite** (14 skills) — Navigation, design systems, animation, native bridges, and cross-platform UI.
3. **Supabase & Postgres Suite** (2 skills) — Database schema, Row-Level Security (RLS), and database queries.

```
.agents/skills/
├── clerk/
│   ├── clerk (Master Router)
│   ├── clerk-expo
│   ├── clerk-cli
│   ├── clerk-setup
│   ├── clerk-backend-api
│   ├── clerk-webhooks
│   ├── clerk-android
│   └── clerk-react-router-patterns
├── expo/
│   ├── expo-overview (Master Router)
│   ├── expo-router
│   ├── expo-design-system
│   ├── expo-native-ui
│   ├── expo-ui
│   ├── expo-animation
│   ├── expo-data-fetching
│   ├── expo-project-structure
│   ├── expo-dev-client
│   ├── expo-module
│   ├── expo-dom
│   ├── expo-web-to-native
│   ├── expo-app-clip
│   └── expo-skill-eval
└── supabase/
    ├── supabase
    └── supabase-postgres-best-practices
```

---

## 1. Clerk Authentication Suite

### 1.1 `clerk` (Master Router)
- **Path:** `.agents/skills/clerk/SKILL.md`
- **Purpose:** The entry point for all Clerk inquiries. Inspects the user's intent and directs the agent to the optimal sub-skill (SDK, CLI, webhooks, or architecture patterns).

### 1.2 `clerk-expo`
- **Path:** `.agents/skills/clerk-expo/SKILL.md`
- **Purpose:** The core skill used by the HB+ app.
- **Key Capabilities:**
  - Configures `@clerk/expo` with `expo-secure-store` hardware token caching on iOS/Android and localStorage on web.
  - Custom sign-up, sign-in, and 6-digit OTP verification flows.
  - Google OAuth / SSO integration using `useSSO` and custom redirect schemes (`hbplus://sso-callback`).
  - Route-guard integration with Expo Router (`<Redirect />` layouts).

### 1.3 `clerk-cli`
- **Path:** `.agents/skills/clerk-cli/SKILL.md`
- **Purpose:** Automates interactions with the official Clerk CLI (`clerk`).
- **Key Capabilities:**
  - Pulling environment variables (`clerk env pull`).
  - Running health diagnostics (`clerk doctor`).
  - Direct user management, impersonation, and feature flag management.

### 1.4 `clerk-setup`
- **Path:** `.agents/skills/clerk-setup/SKILL.md`
- **Purpose:** Scaffolding and initial configuration of Clerk in any newly initialized project or framework.

### 1.5 `clerk-backend-api`
- **Path:** `.agents/skills/clerk-backend-api/SKILL.md`
- **Purpose:** Reference and executor for Clerk's REST Backend API.
- **Key Capabilities:**
  - Server-side user query execution.
  - Updating public and unsafe metadata (e.g. `portalType: 'staff'`, `role: 'Clinician'`).
  - Revoking active sessions and managing user access tiers.

### 1.6 `clerk-webhooks`
- **Path:** `.agents/skills/clerk-webhooks/SKILL.md`
- **Purpose:** Manages webhook reception (via Svix) to sync Clerk auth events with external databases like Supabase or Firestore.
- **Key Events Handled:** `user.created`, `user.updated`, `user.deleted`, `session.created`.

### 1.7 `clerk-android`
- **Path:** `.agents/skills/clerk-android/SKILL.md`
- **Purpose:** Native Android integration patterns using Kotlin and Jetpack Compose. (Used when building standalone native Android extensions).

### 1.8 `clerk-react-router-patterns`
- **Path:** `.agents/skills/clerk-react-router-patterns/SKILL.md`
- **Purpose:** Web/SSR patterns for React Router v7/v8 (`rootAuthLoader`, `clerkMiddleware`, SSR session hydration).

---

## 2. Expo & React Native Core Suite

### 2.1 `expo-overview` (Master Router)
- **Path:** `.agents/skills/expo-overview/SKILL.md`
- **Purpose:** Master gateway for any Expo task. Detects SDK version from `package.json`, reads `app.json`, and loads relevant sub-skills without relying on outdated documentation.

### 2.2 `expo-router`
- **Path:** `.agents/skills/expo-router/SKILL.md`
- **Purpose:** Enforces modern file-based routing in `src/app/`.
- **Key Capabilities:**
  - Route groups: `(auth)` for login/signup/verify and `(app)` for protected portals.
  - Layout definitions: `_layout.tsx` for navigation headers, modals, and route authentication gates.
  - Deep linking and universal web URL parity.

### 2.3 `expo-design-system`
- **Path:** `.agents/skills/expo-design-system/SKILL.md`
- **Purpose:** Enforces tokenized UI design across the HB+ platform.
- **Key Capabilities:**
  - Forbids hardcoded hex colors, font sizes, and spacings outside `src/theme/`.
  - Maps design tokens to NativeWind v5 / Tailwind v4 and CSS variables.
  - Standardizes shared UI component variants (`Button`, `Card`, `Badge`, `ThemedText`).

### 2.4 `expo-native-ui`
- **Path:** `.agents/skills/expo-native-ui/SKILL.md`
- **Purpose:** Ensures the application adheres to Apple Human Interface Guidelines (HIG) and Android Material standards (safe areas, semantic colors, system haptics, responsive viewports).

### 2.5 `expo-ui`
- **Path:** `.agents/skills/expo-ui/SKILL.md`
- **Purpose:** Utilizes the `@expo/ui` package to render native SwiftUI controls on iOS and Jetpack Compose controls on Android for sheets, pickers, and grouped forms.

### 2.6 `expo-animation`
- **Path:** `.agents/skills/expo-animation/SKILL.md`
- **Purpose:** High-performance, 60fps/120fps UI animations using `react-native-reanimated`, `react-native-gesture-handler`, and `expo-haptics`.

### 2.7 `expo-data-fetching`
- **Path:** `.agents/skills/expo-data-fetching/SKILL.md`
- **Purpose:** Robust data fetching, caching, error boundaries, skeleton loaders, and offline recovery.

### 2.8 `expo-project-structure`
- **Path:** `.agents/skills/expo-project-structure/SKILL.md`
- **Purpose:** Architectural boundaries: keeps screens strictly in `src/app/` while UI primitives, hooks, services, and domain validators live in separate directories.

### 2.9 `expo-dev-client`
- **Path:** `.agents/skills/expo-dev-client/SKILL.md`
- **Purpose:** Building and testing custom development builds with EAS or local tools when native libraries cannot run inside Expo Go.

### 2.10 `expo-module`
- **Path:** `.agents/skills/expo-module/SKILL.md`
- **Purpose:** Writing custom native Swift (iOS) and Kotlin (Android) modules via the Expo Modules API.

### 2.11 `expo-dom`
- **Path:** `.agents/skills/expo-dom/SKILL.md`
- **Purpose:** Running DOM/web-dependent components inside isolated webview bridges on native platforms.

### 2.12 `expo-web-to-native`
- **Path:** `.agents/skills/expo-web-to-native/SKILL.md`
- **Purpose:** Migration guide for mapping web browser APIs (localStorage, window, CSS DOM) to React Native cross-platform primitives.

### 2.13 `expo-app-clip`
- **Path:** `.agents/skills/expo-app-clip/SKILL.md`
- **Purpose:** Configuring lightweight iOS App Clips and Apple App Site Association (AASA) for frictionless app launches.

### 2.14 `expo-skill-eval`
- **Path:** `.agents/skills/expo-skill-eval/SKILL.md`
- **Purpose:** Automated evaluation harness for checking code quality, runtime health, and UI rendering.

---

## 3. Supabase & Database Suite

### 3.1 `supabase`
- **Path:** `.agents/skills/supabase/SKILL.md`
- **Purpose:** Client configuration, querying, Realtime subscriptions, Edge Functions, and file storage via `@supabase/supabase-js`.

### 3.2 `supabase-postgres-best-practices`
- **Path:** `.agents/skills/supabase-postgres-best-practices/SKILL.md`
- **Purpose:** Database integrity guidelines:
  - Row-Level Security (RLS) policies to protect patient and clinical data.
  - Migration script standards.
  - Foreign key and indexing strategies for optimized querying.
