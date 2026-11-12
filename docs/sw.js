/* Service worker: lưu game vào máy để chơi offline sau lần mở đầu tiên.
   Khi cập nhật game, tăng số phiên bản VERSION để điện thoại tải bản mới. */
const VERSION = 'cosmic-relics-v1';
const FILES = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icons/apple-touch-icon.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'fonts/be-vietnam-pro-latin-400-normal.woff2',
  'fonts/be-vietnam-pro-latin-500-normal.woff2',
  'fonts/be-vietnam-pro-latin-600-normal.woff2',
  'fonts/be-vietnam-pro-latin-ext-400-normal.woff2',
  'fonts/be-vietnam-pro-latin-ext-500-normal.woff2',
  'fonts/be-vietnam-pro-latin-ext-600-normal.woff2',
  'fonts/be-vietnam-pro-vietnamese-400-normal.woff2',
  'fonts/be-vietnam-pro-vietnamese-500-normal.woff2',
  'fonts/be-vietnam-pro-vietnamese-600-normal.woff2',
  'fonts/chakra-petch-latin-500-normal.woff2',
  'fonts/chakra-petch-latin-600-normal.woff2',
  'fonts/chakra-petch-latin-700-normal.woff2',
  'fonts/chakra-petch-latin-ext-500-normal.woff2',
  'fonts/chakra-petch-latin-ext-600-normal.woff2',
  'fonts/chakra-petch-latin-ext-700-normal.woff2',
  'fonts/chakra-petch-vietnamese-500-normal.woff2',
  'fonts/chakra-petch-vietnamese-600-normal.woff2',
  'fonts/chakra-petch-vietnamese-700-normal.woff2'
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// Mạng trước (luôn lấy bản mới khi có mạng), không có mạng thì dùng bản đã lưu.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then((res) => {
      if (res.ok && new URL(e.request.url).origin === location.origin) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match('index.html')))
  );
});
