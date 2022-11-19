const CACHE_NAME = 'SW-001';
const toCache = [
  '/',
  'manifest.json',
  '/js/register.js',
  'assets/images/Glosir.png',
  'assets/css/style.css',
  'assets/css/bootstrap.min.css',
  'assets/css/bootstrap.min.css.map',
  'assets/images/favicon.ico',
  'assets/images/Glosir.png',
  'assets/images/Glosir1.jpg',
  'js/apps.js',
  'js/boostrap.min.js',
  'js/boostrap.min.js.map',
  'js/jautocalc.js',
  'js/jautocalc.js.map',
  'js/jautocalc.min.js',
  'js/jquery.min.js',
  'js/script.js',
  'index.html',



];
self.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  showInstallPromotion();
});
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      return cache.addAll(toCache)
    })
    .then(self.skipWaiting())
  )
})
self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request)
    .catch(() => {
      return caches.open(CACHE_NAME)
        .then((cache) => {
          return cache.match(event.request)
        })
    })
  )
})
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
    .then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Hapus cache lama',
            key)
          return caches.delete(key)
        }
      }))
    })
    .then(() => self.clients.claim())
  )
})
// const cacheName = 'SW-001';
// const ToCache = [
//   '/',
//   'manifest.json',
//   'assets/js/register.js',
//   'assets/img/icon.png',
// ];
// self.addEventListener("beforeinstallprompt", (e) => () => {
//   e.preventDefault();
//   deferredPrompt = e;

//   showInstallPromotion();
// });
// self.addEventListener('install', function (event) {
//   event.waitUntil(
//     caches.open(cacheName)
//     .then(function (cache) {
//       return cache.addAll(ToCache);
//     })
//     .then(self.skipWaiting())
//   )
// })
// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     fetch(event.request)
//     .catch(() => {
//       return caches.open(cacheName)
//         .then((cache) => {
//           return cache.match(event.request)
//         })
//     })
//   )
// })
// self.addEventListener('activate', function (event) {
//   event.waitUntil(
//     caches.keys()
//     .then((keyList) => {
//       return Promise.all(keyList.map((key) => {
//         if (key !== cacheName) {
//           console.log('[ServiceWorker] Hapus cache lama',
//             key)
//           return caches.delete(key)
//         }
//       }))
//     })
//     .then(() => self.clients.claim())
//   )
// })