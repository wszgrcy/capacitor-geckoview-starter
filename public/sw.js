// Service Worker
// 拦截随机图片网站 (picsum.photos) 的请求，始终返回同一个固定图片，
// 用于验证 SW 已经生效。

const FIXED_IMAGE = 'https://picsum.photos/seed/sw-fixed/400/300'
const CACHE = 'fixed-image-v1'

self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.add(FIXED_IMAGE))
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  // 拦截随机图片网站的请求
  if (url.hostname.includes('picsum.photos')) {
    event.respondWith(
      caches.match(FIXED_IMAGE).then((r) => r || fetch(FIXED_IMAGE))
    )
  }
})
