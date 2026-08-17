'use strict';

const CACHE_NAME = 'haizeallevant-2026.08.2';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './assets/css/styles.css',
    './assets/js/data.js',
    './assets/js/logic.js',
    './assets/js/chart.js',
    './assets/js/pdf.js',
    './assets/js/main.js',
    './assets/libs/jspdf.umd.min.js',
    './assets/icons/icon-192.png',
    './assets/icons/icon-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE)));
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        ))
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
    event.respondWith(
        fetch(event.request)
            .then(response => {
                if (response.ok) {
                    const copia = response.clone();
                    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(event.request, copia)));
                }
                return response;
            })
            .catch(async () => {
                const cached = await caches.match(event.request);
                if (cached) return cached;
                if (event.request.mode === 'navigate') return caches.match('./index.html');
                return new Response('', { status: 504, statusText: 'Recurs no disponible fora de línia' });
            })
    );
});
