const CACHE = 'novadrop-v1';
const ASSETS = [
  '/', '/index.html', '/manifest.json',
  '/icons/icon-192.png', '/icons/icon-512.png'
];

// Install: cache core assets
self.addEventListener('install', e =>
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  )
);

// Activate: clean old caches
self.addEventListener('activate', e =>
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(k => k !== CACHE)
        .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  )
);

// Fetch: cache-first strategy
self.addEventListener('fetch', e =>
  e.respondWith(
    caches.match(e.request)
      .then(r => r || fetch(e.request))
  )
);