const CACHE_NAME = 'rayvisto-cache-v1';
const ASSETS = [
  '/images/cover-tiny.jpg',
  '/images/cover-1920.webp',
  '/images/cover-1280.webp',
  '/images/cover-640.webp',
  '/critical-styles.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('message', event => {
  if (event.data.type === 'CACHE_COVER') {
    caches.open(CACHE_NAME)
      .then(cache => cache.add(event.data.url));
  }
});
