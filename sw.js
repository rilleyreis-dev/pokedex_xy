const CACHE_VERSION = 'kalos-pokedex-v1.1'; // Increment to update PWA
const PRECACHE_NAME = `kalos-precache-${CACHE_VERSION}`;
const RUNTIME_CACHE_NAME = `kalos-runtime-${CACHE_VERSION}`;

// Assets to be pre-cached
const PRECACHE_ASSETS = [
  '/', // Alias for index.html
  '/index.html',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/constants.ts',
  '/services/pokemonService.ts',
  '/components/LoadingSpinner.tsx',
  '/components/PokemonCard.tsx',
  '/components/PokemonModal.tsx',
  '/components/SearchBar.tsx',
  '/components/RouteFilter.tsx',
  '/components/TypeFilter.tsx',
  '/components/GymLeaderCard.tsx',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  // React via esm.sh as per importmap
  'https://esm.sh/react@^19.1.0',
  'https://esm.sh/react-dom@^19.1.0/client', // More specific to your import
  '/manifest.webmanifest',
  '/icon-192x192.png',
  '/icon-512x512.png',
  // Key static images used in the app
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png', // Header
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png' // Error image
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Pre-caching app shell:', PRECACHE_ASSETS);
        return Promise.all(
          PRECACHE_ASSETS.map(url => {
            return cache.add(url).catch(error => {
              console.error(`[Service Worker] Failed to cache ${url}:`, error);
            });
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] App shell pre-cached successfully.');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[Service Worker] Pre-caching failed:', error);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== PRECACHE_NAME && cacheName !== RUNTIME_CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Activated and old caches cleaned.');
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Strategy 1: Network first, then Cache for navigation requests (HTML)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // If successful, clone and cache for offline (index.html)
          if (response.ok && request.url.endsWith('/')) { // Only cache root/index.html
             const cacheResponse = response.clone();
             caches.open(PRECACHE_NAME).then(cache => cache.put(request, cacheResponse));
          }
          return response;
        })
        .catch(() => {
          // If network fails, try to serve from precache
          return caches.match(PRECACHE_ASSETS.includes('/') ? '/' : '/index.html', { cacheName: PRECACHE_NAME });
        })
    );
    return;
  }

  // Strategy 2: Cache first for pre-cached app shell assets
  const requestUrl = new URL(request.url);
  // Normalize paths for comparison (remove leading slashes for local assets)
  const normalizedPath = requestUrl.origin === self.origin ? requestUrl.pathname : request.url;

  if (PRECACHE_ASSETS.includes(normalizedPath)) {
    event.respondWith(
      caches.match(request, { cacheName: PRECACHE_NAME })
        .then(cachedResponse => {
          return cachedResponse || fetch(request).then(networkResponse => {
            // Optionally update cache if fetched from network, though for precache it should exist
            if (networkResponse.ok) {
              const resClone = networkResponse.clone();
              caches.open(PRECACHE_NAME).then(cache => cache.put(request, resClone));
            }
            return networkResponse;
          });
        })
    );
    return;
  }
  
  // Strategy 3: Cache first, then Network for runtime assets (API, images, dynamic fonts)
  // Particularly for PokeAPI, GitHub sprites, Bulbagarden images, and Google font files (.woff2)
  if (
    request.url.startsWith('https://pokeapi.co/api/v2/') ||
    request.url.startsWith('https://raw.githubusercontent.com/PokeAPI/sprites/') ||
    request.url.startsWith('https://archives.bulbagarden.net/media/upload/') ||
    request.url.startsWith('https://fonts.gstatic.com/s/inter/') // Google font files
  ) {
    event.respondWith(
      caches.match(request, { cacheName: RUNTIME_CACHE_NAME })
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(request)
            .then(networkResponse => {
              if (networkResponse && networkResponse.ok) {
                const responseToCache = networkResponse.clone();
                caches.open(RUNTIME_CACHE_NAME)
                  .then(cache => {
                    cache.put(request, responseToCache);
                  });
              }
              return networkResponse;
            })
            .catch(error => {
              console.error('[Service Worker] Fetch failed for runtime asset:', request.url, error);
              // Optionally return a fallback image/data here if needed
            });
        })
    );
    return;
  }

  // Default: just fetch from network for any other requests
  event.respondWith(fetch(request));
});
