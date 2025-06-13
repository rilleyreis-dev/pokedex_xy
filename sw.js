const CACHE_VERSION = 'v2'; // Increment this to trigger updates
const APP_SHELL_CACHE_NAME = `kalos-pokedex-app-shell-${CACHE_VERSION}`;
const API_DATA_CACHE_NAME = `kalos-pokedex-api-data-${CACHE_VERSION}`; // For PokeAPI JSON
const IMAGE_CACHE_NAME = `kalos-pokedex-images-${CACHE_VERSION}`; // For Pokemon sprites and badges

// --- App Shell Assets ---
// This list must be comprehensive for your no-bundler setup.
const APP_SHELL_FILES = [
  '/', // Usually serves index.html
  '/index.html',

  // Your TSX/TS application files
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

  // CDN Resources (CSS, Fonts, React)
  'https://cdn.tailwindcss.com', // Tailwind CSS
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', // Google Fonts CSS
  // React & ReactDOM from esm.sh (as per your import map)
  'https://esm.sh/react@^19.1.0',
  'https://esm.sh/react-dom@^19.1.0/client', // Specifically for createRoot

  // Manifest & PWA Icons
  '/manifest.webmanifest',
  '/icon-192x192.png',
  '/icon-512x512.png',

  // Other static images used in the app
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png', // Header pokeball
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png'  // Unknown Pokemon image
];

// Domains for specific caching strategies
const POKEAPI_HOSTNAME = 'pokeapi.co';
const GITHUB_SPRITES_HOSTNAME = 'raw.githubusercontent.com';
const BULBAGARDEN_HOSTNAME = 'archives.bulbagarden.net';

// --- Service Worker Lifecycle ---

self.addEventListener('install', event => {
  console.log('[SW] Install event - Caching App Shell');
  event.waitUntil(
    caches.open(APP_SHELL_CACHE_NAME)
      .then(cache => {
        const cachePromises = APP_SHELL_FILES.map(urlToCache => {
          return cache.add(urlToCache).catch(err => {
            console.warn(`[SW] Failed to cache during install ${urlToCache}:`, err);
          });
        });
        return Promise.all(cachePromises);
      })
      .then(() => {
        console.log('[SW] App Shell cached successfully.');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[SW] App Shell caching failed during install:', error);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('[SW] Activate event - Cleaning old caches');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (
            cacheName !== APP_SHELL_CACHE_NAME &&
            cacheName !== API_DATA_CACHE_NAME &&
            cacheName !== IMAGE_CACHE_NAME
          ) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
          return null; // Return null for items not being deleted
        })
      );
    }).then(() => {
      console.log('[SW] Old caches cleaned.');
      return self.clients.claim();
    })
  );
});

// --- Fetch Event: Cache Strategies ---

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Strategy for PokeAPI data (JSON)
  if (url.hostname === POKEAPI_HOSTNAME && request.destination !== 'image') {
    event.respondWith(cacheFirstElseNetwork(request, API_DATA_CACHE_NAME));
    return;
  }

  // Strategy for images (Pokemon sprites, badges)
  if (request.destination === 'image' && 
      (url.hostname === GITHUB_SPRITES_HOSTNAME || url.hostname === BULBAGARDEN_HOSTNAME)) {
    event.respondWith(cacheFirstElseNetwork(request, IMAGE_CACHE_NAME));
    return;
  }
  
  // Strategy for App Shell assets (local files & specified CDNs)
  const isAppShellUrl = APP_SHELL_FILES.some(shellUrl => {
    try {
      // Normalize URLs for comparison, especially for CDN resources
      const normalizedRequestUrl = new URL(request.url, self.location.origin).href;
      const normalizedShellUrl = new URL(shellUrl, self.location.origin).href;
      return normalizedRequestUrl === normalizedShellUrl;
    } catch (e) {
      // Handle cases where shellUrl might not be a full URL (e.g. just a path)
      return request.url.endsWith(shellUrl);
    }
  });

  if (isAppShellUrl) {
    event.respondWith(
      caches.match(request, { ignoreSearch: true, cacheName: APP_SHELL_CACHE_NAME }).then(cachedResponse => {
        return cachedResponse || fetch(request).then(networkResponse => {
          // Optionally cache successfully fetched app shell files again if missed during install
          if (networkResponse.ok) {
            const responseToCache = networkResponse.clone();
            caches.open(APP_SHELL_CACHE_NAME).then(cache => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }


  // Strategy for navigation (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // If response is good, cache it in app shell (it's likely index.html)
          if (response.ok) {
            const responseToCache = response.clone();
            caches.open(APP_SHELL_CACHE_NAME).then(cache => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        })
        .catch(async () => {
          // Fallback to cached index.html if network fails for navigation
          const cachedIndex = await caches.match('/', { cacheName: APP_SHELL_CACHE_NAME }) 
                 || await caches.match('/index.html', { cacheName: APP_SHELL_CACHE_NAME });
          return cachedIndex || new Response("Offline page not available", { status: 404, headers: { 'Content-Type': 'text/plain' }});
        })
    );
    return;
  }

  // Default: For other requests not specifically handled, try network.
  event.respondWith(fetch(request).catch(() => {
    // console.warn('[SW] Unhandled fetch failed, no fallback:', request.url);
    // Return a generic offline response for unhandled failed fetches
    // This part is optional and depends on how strictly you want to handle failures
    // return new Response("Network error.", { status: 503, statusText: "Network Error", headers: { 'Content-Type': 'text/plain' } });
  }));
});


// --- Helper: Cache First, then Network ---
async function cacheFirstElseNetwork(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request, { ignoreSearch: true }); // ignoreSearch can be helpful for API calls

  if (cachedResponse) {
    // console.log(`[SW] Serving from ${cacheName} cache: ${request.url}`);
    return cachedResponse;
  }

  // console.log(`[SW] Fetching from network & caching into ${cacheName}: ${request.url}`);
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.ok) {
      if (networkResponse.type === 'basic' || networkResponse.type === 'cors') {
        const responseToCache = networkResponse.clone();
        await cache.put(request, responseToCache);
      }
    }
    return networkResponse;
  } catch (error) {
    console.error(`[SW] Network fetch failed for ${request.url}:`, error);
    // For images, you might want to return a placeholder from cache
    // if (request.destination === 'image') {
    //   return caches.match('/placeholder-image.png', { cacheName: APP_SHELL_CACHE_NAME });
    // }
    throw error;
  }
}
