# Official HB+ Logo, App Icons & Branding Implementation

> **Target Project**: HB+ Universal Health Portal (Expo SDK 58 / React Native for Web)  
> **Topic**: Logo Assets, App Icons, PWA Icons, and In-App Branding Lockups  
> **Last Updated**: October 2026  

---

## 1. Overview & Purpose

Previously, the application utilized plain text monograms (`<ThemedText>HB+</ThemedText>`) and default placeholder Expo icons. 

To elevate the user experience to the official **HB+ (Hop with HB)** luxury wellness standard, the application was upgraded to integrate the official high-resolution **`Hb+.png`** (2400×2400) brand asset across all mobile platforms (iOS & Android), the web browser, Progressive Web App (PWA) installation packages, and all in-app authentication and dashboard screens.

---

## 2. Asset Pipeline & File Mapping

The master high-resolution logo (`assets/Hb+.png`, 2400×2400) was propagated across all required resolution targets:

| Target File Path | Resolution | Usage / Platform |
| :--- | :--- | :--- |
| `assets/Hb+.png` | $2400 \times 2400$ | **Master Source File**: Original uncompressed brand asset. |
| `assets/images/hbplus-logo.png` | $1024 \times 1024$ | **In-App Component**: Rendered by the shared `<HbLogo />` UI component. |
| `assets/images/icon.png` | $1024 \times 1024$ | **Primary App Icon**: Mobile home screen launcher & iOS app icon. |
| `assets/images/android-icon-foreground.png` | $1024 \times 1024$ | **Android Adaptive Icon**: Foreground layer for Android devices. |
| `assets/images/favicon.png` | $1024 \times 1024$ | **Web Favicon**: Rendered in desktop browser tabs. |
| `public/icon-192.png` | $1024 \times 1024$ | **PWA Mobile Launcher**: App drawer & notification icon on Android phones. |
| `public/icon-512.png` | $1024 \times 1024$ | **PWA Splash & Desktop Launcher**: High-DPI PWA launch screen & taskbar icon. |

---

## 3. The Reusable `<HbLogo />` Component

A dedicated, cross-platform logo primitive lives at [`src/components/ui/hb-logo.tsx`](file:///f:/Web_D/React_Native/Hb/HbPlus/src/components/ui/hb-logo.tsx).

### Component Implementation:
```tsx
import { Image } from 'expo-image';
import { View } from 'react-native';

const darkLogo = require('@/../assets/images/hbplus-logo.png');
const whiteLogo = require('@/../assets/images/hbplus-logo-white.png');

interface HbLogoProps {
  size?: number;
  variant?: 'dark' | 'white';
}

export function HbLogo({ size = 36, variant = 'dark' }: HbLogoProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={variant === 'white' ? whiteLogo : darkLogo}
        style={{ width: size, height: size }}
        contentFit="contain"
        accessibilityLabel="HB+ Official Logo"
      />
    </View>
  );
}
```

### Key Architectural Benefits:
1. **`expo-image` Optimization**: Employs hardware-accelerated image decoding and aggressive in-memory caching to eliminate image flicker on screen transitions.
2. **Dynamic Sizing**: Any screen can scale the logo proportionally by providing a single `size` prop (e.g. `size={26}`, `size={42}`).
3. **Accessibility**: Built with `accessibilityLabel="HB+ Official Logo"` for clinical screen-reader compliance.

---

## 4. Screen-by-Screen Brand Integrations

The official `HbLogo` is active across every major portal entry point:

### 1. Landing Page Navbar (`src/components/landing/navbar.tsx`)
* **Location**: Top-left brand lockup.
* **Component**: `<HbLogo size={26} variant="dark" />`
* **Interaction**: Wrapped in a `Pressable` that smoothly scrolls the user back to the top of the landing page.

### 2. Landing Page Footer (`src/components/landing/footer.tsx`)
* **Location**: Footer copyright and regulatory credentials block.
* **Component**: `<HbLogo size={20} variant="dark" />`

### 3. Member & Staff Login Screen (`src/app/(auth)/login.tsx`)
* **Location**: Circular monogram lockup above the "Member Access / Secure Staff Gateway" badge.
* **Component**: `<HbLogo size={42} variant="dark" />`
* **Interaction**: Interactive button that safely returns the user to the universal landing page.

### 4. Member & Staff Registration Screen (`src/app/(auth)/signup.tsx`)
* **Location**: Top header monogram circular card.
* **Component**: `<HbLogo size={42} variant="dark" />`

### 5. Member & Staff Dashboard (`src/app/(app)/dashboard.tsx`)
* **Location**: Top-left brand row adjacent to "Clinical Portal / Member Portal" heading.
* **Component**: Replaced plain-text placeholder `<ThemedText>HB+</ThemedText>` with `<HbLogo size={28} variant="dark" />`.

---

## 5. Application Configuration (`app.json`)

The master configuration file [`app.json`](file:///f:/Web_D/React_Native/Hb/HbPlus/app.json) binds the brand identity to all native OS runners:

```json
{
  "expo": {
    "name": "HbPlus",
    "slug": "HbPlus",
    "version": "1.0.0",
    "icon": "./assets/images/icon.png",
    "ios": {
      "icon": "./assets/images/icon.png"
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#FCF8F0",
        "foregroundImage": "./assets/images/android-icon-foreground.png"
      },
      "predictiveBackGestureEnabled": false
    },
    "web": {
      "output": "static",
      "favicon": "./assets/images/favicon.png",
      "name": "HB+ | Precision Longevity & Care",
      "shortName": "HB+",
      "themeColor": "#9F4022",
      "backgroundColor": "#FCF8F0",
      "display": "standalone",
      "orientation": "portrait"
    }
  }
}
```

* **Android Adaptive Icon Background**: Set to `#FCF8F0` (the official HB+ Warm Cream canvas token) rather than generic blue `#E6F4FE`.
* **iOS Icon**: Directly maps to `./assets/images/icon.png`.
* **Web & PWA**: Themes the browser chrome with Terracotta (`#9F4022`) and sets launch canvas to Warm Cream (`#FCF8F0`).

---

## 6. How to Update or Replace the Logo in the Future

If the brand design evolves or marketing supplies a refreshed logo:

1. Place the new uncompressed PNG at `assets/Hb+.png`.
2. Run the asset sync command in your terminal:
   ```powershell
   Copy-Item "assets/Hb+.png" "assets/images/hbplus-logo.png" -Force;
   Copy-Item "assets/Hb+.png" "assets/images/icon.png" -Force;
   Copy-Item "assets/Hb+.png" "assets/images/android-icon-foreground.png" -Force;
   Copy-Item "assets/Hb+.png" "assets/images/favicon.png" -Force;
   Copy-Item "assets/Hb+.png" "public/icon-192.png" -Force;
   Copy-Item "assets/Hb+.png" "public/icon-512.png" -Force;
   ```
3. Commit and push: Every screen, native build, browser tab, and installed PWA will automatically inherit the new logo.
