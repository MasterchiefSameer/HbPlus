# Progressive Web Apps (PWA) — Complete Handbook & HB+ Architecture

> **Target Project**: HB+ Universal Health Portal (Expo SDK 58 / React Native for Web)  
> **Architecture**: Static Web PWA + Clerk Auth + Vercel Deployment  

---

## 1. What is a PWA (Progressive Web App)?

A **Progressive Web App (PWA)** is a modern web application that combines the broad reach of the web with the rich capabilities of native mobile apps. 

Built using standard web technologies (HTML, CSS, JavaScript, React / React Native for Web), a PWA utilizes **Service Workers**, a **Web App Manifest**, and **Cache Storage** so that:
1. **It can be installed directly onto a mobile phone or desktop**: Users do not need the Google Play Store or Apple App Store.
2. **It launches in Standalone Mode**: When opened from the home screen, it displays in full-screen mode with **no browser address bar, no navigation buttons, and no URL bar**, looking and feeling identical to a native app.
3. **It runs reliably offline or under slow connections**: Core UI layouts, styles, and assets are pre-cached locally.
4. **It updates instantly**: The moment new code is deployed to the server, all installed phone apps receive the update without requiring users to download a new APK or app update.

---

## 2. When Should You Use a PWA?

* **Universal "Deploy Once, Run Everywhere" Projects**: When you want a single unified codebase that delivers a desktop web portal, an Android app, and an iOS app at the same time.
* **Rapid Feature Releases**: When waiting 1 to 3 days for Google Play or Apple App Store manual review cycles delays your business.
* **Zero Store Fees & Friction**: When you want to avoid Google's/Apple's 15%–30% in-app purchase commissions and $99/year developer fees.
* **Low Storage / Data-Sensitive Users**: Native apps often weigh 50 MB to 150 MB. A PWA typically downloads in under 2 MB to 5 MB, drastically reducing drop-offs.
* **SaaS & Institutional Portals**: Ideal for health portals, internal staff gateways (like HB+ `@hbplus.fit` staff), and member dashboards where users can pin the application instantly via a link.

---

## 3. Advantages of PWAs

| Advantage | Explanation |
| :--- | :--- |
| **Instant Installation** | Users tap **"Install App"** directly in their browser. No store passwords or download delays. |
| **Simultaneous Updates** | A single `git push` to your web host (e.g., Vercel) updates the website and every user's installed phone app instantly. |
| **Frictionless Sharing & SEO** | Every screen has a real URL. Pages are crawlable by search engines and can be shared over WhatsApp, email, or SMS. |
| **Tiny Device Footprint** | Extremely lightweight; uses standard browser caching rather than massive native binaries. |
| **Sub-Second Reloads** | Service Workers cache the application shell locally, providing near-instant startup times. |
| **Cross-Platform Parity** | The exact same UI, components, and logic run on Android, iOS, iPadOS, macOS, Windows, and Linux. |

---

## 4. Disadvantages & Platform Limitations

| Limitation | Impact & Workaround |
| :--- | :--- |
| **iOS / Safari Install UX** | iOS Safari does not show an automatic install popup banner. Users must manually tap **Share** $\rightarrow$ **"Add to Home Screen"**. |
| **iOS Push Notifications** | Push notifications on iOS require **iOS 16.4+** and only function after the user has explicitly added the app to their home screen. |
| **Restricted Hardware APIs** | PWAs cannot access background Bluetooth, background geofencing, native NFC tags, or OS-level health kits (Apple HealthKit / Google Health Connect) directly without a native binary wrapper. |
| **Store Discoverability** | PWAs are not listed in the Google Play Store or App Store search results by default (unless wrapped via Google Trusted Web Activity / Capacitor). |
| **Storage Eviction on iOS** | If a user does not open an installed PWA on iOS for a few weeks, Safari may purge cached local assets if the device is under low storage pressure. |

---

## 5. Why Mobile Chrome Showed: *"This app can't be installed"*

When testing on mobile Chrome during development, Chrome often refuses to install the app and only creates a generic browser bookmark. This happens due to two strict browser security requirements:

### Requirement 1: Chrome Strictly Enforces HTTPS
* Chrome **completely disables the PWA install engine over non-secure HTTP** (`http://`).
* When accessing an Expo dev server via local IP (e.g. `http://192.168.1.15:8081`), Chrome marks the origin as **Not Secure** and disables the native installation prompt, showing:
  > *"This app can't be installed"*
* **Solution**: PWA installation requires a secure context (**HTTPS**), such as your live Vercel production URL or an Expo tunnel URL (`npx expo start --tunnel --web`).

### Requirement 2: The Chromium Installability Checklist
Chrome will only trigger an app install dialog if the following 3 files exist and are correctly configured:
1. **Web App Manifest (`manifest.json`)** linked in the HTML `<head>`.
2. **Two specific icon resolutions**: At least a `192x192` PNG and a `512x512` PNG with `purpose: "any maskable"`.
3. **An active Service Worker (`sw.js`)** that has a registered `fetch` event listener for request handling.

---

## 6. Files Created & Configured in HB+

To enable complete PWA capability in the HB+ codebase, the following files were implemented:

### 1. `public/manifest.json`
Tells the operating system how to brand and display the application when installed:
```json
{
  "short_name": "HB+",
  "name": "HB+ | Precision Longevity & Care",
  "icons": [
    {
      "src": "/icon-192.png",
      "type": "image/png",
      "sizes": "192x192",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png",
      "type": "image/png",
      "sizes": "512x512",
      "purpose": "any maskable"
    }
  ],
  "start_url": "/",
  "background_color": "#FCF8F0",
  "theme_color": "#9F4022",
  "display": "standalone",
  "orientation": "portrait"
}
```

### 2. `public/sw.js` (Service Worker)
Handles installation, activates client claims, and caches requests to satisfy Chrome's offline requirement:
```javascript
const CACHE_NAME = 'hbplus-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
```

### 3. PWA Icons (`public/icon-192.png` & `public/icon-512.png`)
* **`icon-192.png`**: High-resolution launcher icon for phone home screens and app switchers.
* **`icon-512.png`**: Large-scale icon used for splash loading screens and desktop taskbars.

### 4. `app.json` (Expo Configuration)
Configured `"web"` for static PWA export and brand theme variables:
```json
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
```

### 5. `src/app/_layout.tsx` (Service Worker Registration & Manifest Injection)
Automatically mounts `<link rel="manifest" href="/manifest.json">` into the web `<head>` and registers `sw.js` when running on the web:
```tsx
useEffect(() => {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .catch((err) => console.log('PWA Service Worker registration failed:', err));
      });
    }
    if (typeof document !== 'undefined' && !document.querySelector('link[rel="manifest"]')) {
      const link = document.createElement('link');
      link.rel = 'manifest';
      link.href = '/manifest.json';
      document.head.appendChild(link);
    }
  }
}, []);
```

### 6. `vercel.json` (Production Single-Page Routing)
Directs Vercel to serve static routes without 404 errors when refreshing `/dashboard`, `/login`, or `/verify`:
```json
{
  "cleanUrls": true,
  "framework": null,
  "outputDirectory": "dist",
  "buildCommand": "npx expo export --platform web"
}
```

---

## 7. How to Test and Install

### A. Testing Locally on Mobile (via HTTPS Tunnel)
1. Run in your terminal:
   ```bash
   npx expo start --tunnel --web
   ```
2. Open the generated **`https://xxxx.ngrok-free.app`** URL in mobile Chrome.
3. Tap the `⋮` menu $\rightarrow$ Tap **"Install App"**.
4. Confirm installation. The HB+ standalone app will appear on your phone's home screen.

### B. Deploying to Vercel (Production)
1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Configure full PWA support"
   git push origin main
   ```
2. Import the repository into [Vercel](https://vercel.com/) and specify `HbPlus` as the root directory.
3. Set your environment variables (`EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`, `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`, `EXPO_PUBLIC_ALLOWED_DOMAIN`).
4. Click **Deploy**. Vercel will serve your app over HTTPS, enabling instant PWA installation for all web visitors.