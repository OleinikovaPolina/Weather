importScripts("https://oleinikovapolina.github.io/Weather/dist/precache-manifest.764fe84fd0c8256d94481a68511d3082.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.setCacheNameDetails({prefix: "weather"});

self.addEventListener('fetch', event => {
    if (event.request.method === 'GET') return event.respondWith(networkFirst(event.request));
});

async function networkFirst(req) {
    const cache = await caches.open("weather");
    try {
        const networkResponse = await fetch(req);
        await cache.put(req, networkResponse.clone());
        return networkResponse;
    } catch (e) {
        return cache.match(req)
    }
}

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
