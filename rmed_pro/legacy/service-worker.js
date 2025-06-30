/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

const CACHE_NAME = 'rmed-medical-tools-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './index.css',
  './index.js',
  './favicon.svg',
  './manifest.json',
  './calculators.js',
  './calculators2.js',
  './abbreviations.js',
  './medical_terminology.js',
  './lab_values.js',
  './mnemonics.js',
  './nutrition_guidelines.js',
  './procedures.js',
  './constants.js'
  // Note: External resources from esm.sh are not cached by this simple service worker.
  // The browser's HTTP cache will handle them based on their own cache headers.
];

// Install event: Cache all specified assets.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache:', CACHE_NAME);
        return cache.addAll(ASSETS_TO_CACHE.map(url => new Request(url, {cache: 'reload'}))); // Force reload from network for initial cache
      })
      .catch(error => {
        console.error('Failed to cache assets during install:', error);
      })
  );
  self.skipWaiting(); // Activate the new service worker immediately.
});

// Activate event: Clean up old caches.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Take control of all open clients.
});

// Fetch event: Serve assets from cache first (Cache-first strategy).
self.addEventListener('fetch', event => {
  // For navigation requests (HTML pages), try network first, then cache.
  // This ensures users get the latest HTML if online, but still works offline.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If successful, clone and cache the response for future offline use.
          if (response.ok) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          return response;
        })
        .catch(() => {
          // If network fails, serve the cached HTML page.
          return caches.match(event.request)
            .then(cachedResponse => {
              return cachedResponse || caches.match('./index.html'); // Fallback to main index.html
            });
        })
    );
    return;
  }

  // For other requests (CSS, JS, images, data files), use cache-first.
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // If the resource is in cache, return it.
        if (cachedResponse) {
          return cachedResponse;
        }
        // If not in cache, fetch from network.
        return fetch(event.request).then(
          networkResponse => {
            // If the fetch is successful, clone and cache the response.
            if (networkResponse && networkResponse.status === 200) {
              // Ensure we don't cache opaque responses for third-party resources
              // unless explicitly handled, but for same-origin this is fine.
              if (ASSETS_TO_CACHE.includes(new URL(event.request.url).pathname.substring(1)) || event.request.url.startsWith(self.location.origin)) {
                 const responseToCache = networkResponse.clone();
                 caches.open(CACHE_NAME)
                  .then(cache => {
                    cache.put(event.request, responseToCache);
                  });
              }
            }
            return networkResponse;
          }
        ).catch(error => {
          console.error('Fetch failed; returning offline fallback or error for:', event.request.url, error);
          // Optionally, you could return a generic offline fallback for images/data if needed.
          // For this app, if a core JS data file isn't cached, it might break functionality.
          // The install step aims to prevent this by pre-caching all core assets.
        });
      })
  );
});