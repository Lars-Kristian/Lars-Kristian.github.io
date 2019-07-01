const cacheName = "version1"

let preCacheFiles = [
    "/",
    "index.html",
    "index.js",
    "index.css",
    "images/icon-512.png",
    "manifest.json",
    "vendor/dexie.min.js"
];

self.addEventListener("install", event => {
    caches.open(cacheName).then(function (cache) {
        return cache.addAll(preCacheFiles);
    });
});

self.addEventListener("fetch", event => {
    event.respondWith(fromCache(event.request));
});

function fromCache(request) {
    return caches.open(cacheName).then(function (cache) {
        return cache.match(request).then(response => {
            if (!response) return fetch(request); //fallback to network fetch
            return response;
        })
    })
}

self.addEventListener('message', event => {
    if (event.data === 'skip-waiting') {
        self.skipWaiting();
    }
});