const preCacheName = "pre-cache-hbp"

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
    caches.open(preCacheName).then(function (cache) {
        return cache.addAll(preCacheFiles);
    });
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (!response) {
                //fall back to the network fetch
                return fetch(event.request);
            }
            return response;
        })
    )
});