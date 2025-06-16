
const CACHE_VERSION = 'kalos-pokedex-v1.3'; // Incremented version for theme and modal changes
const PRECACHE_NAME = `kalos-precache-${CACHE_VERSION}`;
const RUNTIME_CACHE_NAME = `kalos-runtime-${CACHE_VERSION}`;

// Assets to be pre-cached
const PRECACHE_ASSETS = [
  '/', 
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
  '/components/GymLeaderModal.tsx', // Added
  '/components/ThemeSwitcher.tsx',  // Added
  '/components/LanguageSwitcher.tsx', // Ensure it's listed
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://esm.sh/react@^19.1.0',
  'https://esm.sh/react-dom@^19.1.0/client',
  '/public/manifest.json', 
  '/public/icons/icon-192x192.png', 
  '/public/icons/icon-512x512.png', 
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Pre-caching app shell:', PRECACHE_ASSETS);
        const cachePromises = PRECACHE_ASSETS.map(url => {
          return cache.add(url).catch(error => { 
            console.error(`[Service Worker] Failed to cache ${url}:`, error);
          });
        });
        return Promise.all(cachePromises);
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
  const requestUrl = new URL(request.url);

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok && (request.url.endsWith('/index.html') || request.url === self.registration.scope || request.url.endsWith('/'))) {
             const cacheResponse = response.clone();
             caches.open(PRECACHE_NAME).then(cache => cache.put(request, cacheResponse));
          }
          return response;
        })
        .catch(() => {
           return caches.match(request, { cacheName: PRECACHE_NAME })
            .then(cachedResponse => {
                return cachedResponse || caches.match('/index.html', { cacheName: PRECACHE_NAME });
            });
        })
    );
    return;
  }

  const normalizedPath = requestUrl.origin === self.origin ? requestUrl.pathname : request.url;
  if (PRECACHE_ASSETS.includes(normalizedPath)) {
    event.respondWith(
      caches.match(request, { cacheName: PRECACHE_NAME })
        .then(cachedResponse => {
          return cachedResponse || fetch(request).then(networkResponse => {
            if (networkResponse.ok) {
              const resClone = networkResponse.clone();
              caches.open(PRECACHE_NAME).then(cache => cache.put(request, resClone));
            }
            return networkResponse;
          }).catch(err => {
            console.error('[Service Worker] Network fetch failed for precached asset:', request.url, err);
          });
        })
    );
    return;
  }
  
  if (
    request.url.startsWith('https://pokeapi.co/api/v2/') ||
    request.url.startsWith('https://raw.githubusercontent.com/PokeAPI/sprites/') ||
    request.url.startsWith('https://img.pokemondb.net/sprites/') || // For Gym Leader images
    request.url.startsWith('https://archives.bulbagarden.net/media/upload/') ||
    request.url.startsWith('https://fonts.gstatic.com/s/inter/')
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
            });
        })
    );
    return;
  }

  event.respondWith(fetch(request).catch(err => {
    console.error('[Service Worker] General fetch failed:', request.url, err);
  }));
});
