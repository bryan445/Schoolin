const CACHE_NAME = 'schoolin-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/index.jsx',
  '/src/App.jsx',
  '/src/HomePage.jsx',
  '/src/SchoolPage.jsx',
  '/src/components/SearchBar.jsx',
  '/src/components/FlashCards.jsx',
  '/src/components/ContactPanel.jsx',
  '/src/components/StudentLogin.jsx',
  '/src/components/StudentDetails.jsx',
  '/src/components/FeeModal.jsx',
  '/src/components/StudentRegistration.jsx',
  '/src/components/SchoolComparison.jsx',
  '/schools/chisomo.json',
  '/schools/ekhaya.json',
  '/schools/ngoms.json',
  '/schools/soba.json',
  '/schools/students-chisomo.json',
  '/schools/students-ekhaya.json',
  '/schools/students-ngoms.json',
  '/schools/students-soba.json'
];

self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});