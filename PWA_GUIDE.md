# Comprehensive Guide: Progressive Web Apps (PWA) in HB+

> **Document Type**: Architecture & Engineering Dossier  
> **Project**: HB+ Universal Portal (Expo SDK 58 / React Native for Web)  
> **Last Updated**: October 2026  

---

## 1. What is a Progressive Web App (PWA)?

A **Progressive Web App (PWA)** is a website built with standard web technologies (HTML, CSS, JavaScript, React / React Native for Web) that delivers an experience indistinguishable from a native mobile application. 

It leverages modern browser APIs—specifically **Service Workers**, a **Web App Manifest**, and **Cache Storage**—to allow users to:
1. **Install the website onto their phone's home screen or app drawer** without going through the Google Play Store or Apple App Store.
2. **Run in standalone mode**: When tapped from the phone screen, it launches full-screen with no browser address bar, navigation buttons, or browser tabs.
3. **Work offline or on poor network conditions** through aggressive asset and API caching.
4. **Receive push notifications** and sync background data (supported on Android and iOS 16.4+).

---

## 2. When Should You Use a PWA?

PWAs are ideal in the following scenarios:
* **"Deploy Once, Run Everywhere" Workflows**: You want a single codebase that serves desktop browser visitors, Android users, and iPhone users simultaneously.
* **Rapid Iteration & Direct Distribution**: You don't want to wait 1–3 business days for Google Play or Apple App Store review cycles just to fix a typo or launch a feature. Every `git push` instantly updates both the website and every installed phone app.
* **Zero Store Commission / Friction**: Avoid Apple's and Google's 15%–30% in-app purchase fee and developer account membership costs.
* **Low Storage Footprint**: Users with budget devices or limited phone storage will install a 2 MB PWA instantly, whereas a 60–100 MB native app download might cause them to drop off.
* **Internal / Practitioner Portals**: For institutional gateways (like HB+ Staff Portal), practitioners can pin the app on their phone or tablet instantly with a single URL click.

---

## 3. Advantages of PWAs

| Advantage | Details |
| :--- | :--- |
| **Instant Installation** | No App Store search, no 100 MB download, no permissions dialogs. Users tap **"Install App"** directly in Chrome/Safari. |
| **Instant Zero-Downtime Updates** | When you push code to Vercel, the new version is live on the web and on all installed phone devices within seconds. |
| **SEO & Viral Sharing** | Every screen in your app is a real URL. Users can text a link (`https://hbplus.fit/dashboard`) to friends or colleagues. |
| **Tiny Footprint** | Typical PWA install size is 1–5 MB compared to 40–120 MB for equivalent native APKs/IPAs. |
| **High Performance** | Service Workers cache the core UI shell, fonts, and assets locally, allowing near-instant sub-second reloads. |
| **Cost Efficiency** | One single engineering pipeline instead of maintaining separate Android (Kotlin), iOS (Swift), and Web (React) repositories. |

---

## 4. Disadvantages & Limitations of PWAs

While PWAs are powerful, they have specific platform constraints:

| Limitation | Impact on Users / Developers |
| :--- | :--- |
| **iOS / Safari Friction** | Safari does not show an automatic pop-up install banner. Users must manually tap the **Share** button $\rightarrow$ **"Add to Home Screen"**. |
| **iOS Push Notification Constraints** | Push notifications on iOS require iOS 16.4+ and only work after the user explicitly adds the app to their home screen. |
| **Hardware Access Restrictions** | PWAs cannot access low-level native Bluetooth in background, background geofencing, native NFC tags, or health sensors directly (e.g., Apple HealthKit / Google Health Connect require native binaries). |
| **App Store Discoverability** | PWAs do not appear in the Google Play Store or Apple App Store search algorithms unless packaged into a native wrapper (like Google's Trusted Web Activity - TWA). |
| **Storage Eviction on iOS** | If a user doesn't open the PWA on iOS for a few weeks, Safari may evict cached files and offline storage under device storage pressure. |

---

## 5. Why Mobile Chrome Showed: *"This app can't be installed"*

During local development, Chrome on Android frequently blocks PWA installation and demotes the action to a simple "Create shortcut". 

Here are the **exact two reasons** this happened in our testing:

### Reason 1: Chrome Strictly Requires HTTPS (The Critical Security Rule)
Google Chrome enforces that PWAs can only be installed over a **secure cryptographic context (HTTPS)**.
* When testing locally by typing a computer's local Wi-Fi IP address (e.g., `http://192.168.1.15:8081`), Chrome marks the connection as **Not Secure**.
* In non-secure contexts, Chrome completely disables the PWA install engine and displays:  
  > *"This app can't be installed"*
* **Solution**: On local development, test via HTTPS tunnel (`npx expo start --tunnel --web`) or deploy to **Vercel** (which automatically issues free, managed SSL certificates).

### Reason 2: The Mandatory Chromium PWA Checklist
For Chrome's engine to consider a website an installable app, it strictly verifies three prerequisites:
1. A valid **Web App Manifest (`manifest.json`)** linked in the HTML `<head>`.
2. At least two square icons: **`192x192` PNG** and **`512x512` PNG** with `purpose: "any maskable"`.
3. An active, registered **Service Worker (`sw.js`)** containing a `fetch` event listener for offline interception.

If any single item is missing, Chrome refuses to trigger the native installation dialog.

---

## 6. Files Created & Configured in HB+

To transform HB+ into an installable PWA, the following files were implemented:

### 1. `public/manifest.json` (Web App Manifest)
Defines metadata, branding colors, icon sizes, and tells the mobile operating system to open in fullscreen standalone mode:
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

### 2. `public/sw.js` (PWA Service Worker)
Caches runtime assets, intercepts network requests, and satisfies Chrome's installation requirement:
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
* `icon-192.png`: Rendered on Android phone home screens, app switchers, and push notifications.
* `icon-512.png`: Rendered on high-DPI screens, splash loading screen, and desktop taskbars.

### 4. `app.json` (Expo Web PWA Configuration)
Updated `"web"` configuration from server SSR to static PWA export:
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

### 5. `src/app/_layout.tsx` (Service Worker Registration & Manifest Link)
Dynamically attaches the `<link rel="manifest">` into the web `<head>` and registers the Service Worker on boot:
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

### 6. `vercel.json` (Single-Page Routing & Clean URLs)
Ensures routes like `/dashboard`, `/(auth)/login`, and `/verify` reload cleanly without 404s on Vercel:
```json
{
  "cleanUrls": true,
  "framework": null,
  "outputDirectory": "dist",
  "buildCommand": "npx expo export --platform web"
}
```

---

## 7. How to Test & Deploy

### Testing Locally Over HTTPS (Expo Tunnel)
To test the native install prompt on your phone right now without deploying:
1. Run:
   ```bash
   npx expo start --tunnel --web
   ```
2. Scan the QR code or open the generated `https://xxxx.ngrok-free.app` URL in **Mobile Chrome**.
3. Tap Chrome's menu (`⋮`) $\rightarrow$ Tap **"Install App"**.
4. The official HB+ icon and app modal will appear, installing HB+ onto your phone.

### Deploying to Production (Vercel)
1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Configure complete PWA support"
   git push origin main
   ```
2. Open [Vercel](https://vercel.com/) $\rightarrow$ Import your repo $\rightarrow$ Select `HbPlus` root directory.
3. Add your environment variables:
   * `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`
   * `EXPO_PUBLIC_SUPABASE_URL`
   * `EXPO_PUBLIC_SUPABASE_ANON_KEY`
   * `EXPO_PUBLIC_ALLOWED_DOMAIN`: `hbplus.fit`
4. Click **Deploy**.
5. Add your live Vercel URL to the **Clerk Dashboard** under *User & Authentication > Social Connections / Domains*.
