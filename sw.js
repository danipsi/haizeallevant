'use strict';

const CACHE_NAME = 'haizeallevant-v1';

const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './assets/css/styles.css',
    './assets/js/data.js',
    './assets/js/chart.js',
    './assets/js/pdf.js',
    './assets/js/main.js',
    './assets/libs/jspdf.umd.min.js',
    './assets/icons/icon-192.png',
    './assets/icons/icon-512.png'
];

// Instal·lació: precaché tots els assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
    );
    self.skipWaiting();
});

// Activació: esborra caches antigues
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

// Fetch: Cache First (sempre serveix des de la cache si existeix)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            return cached || fetch(event.request);
        })
    );
});
