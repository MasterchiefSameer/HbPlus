// Service worker for HB+ Progressive Web App (PWA)
const CACHE_NAME = 'hbplus-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Let network handle requests
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
