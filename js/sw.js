const CACHE_NAME = 'toot-and-otto-v2'; 
const urlsToCache = [
  '/',
  '/index.html',
  '/style/style.css',
  '/js/GUI.js',
  '/js/TOOT_AND_OTTO.js',
  '/js/Player.js',
  '/js/Cell.js',
  '/js/CellState.js',
  '/js/Winner.js',
  '/js/app.js',
  '/conf/manifest.webmanifest',
  '/conf/images/icon-192.png',
  '/conf/images/icon-512.png',
];

self.addEventListener('install', event => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Cache aberto!');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('Falha ao adicionar arquivos ao cache:', err);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]; 
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(keyList.map(key => {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key); 
        }
      }))
    )
  );
});