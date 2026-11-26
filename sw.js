const CACHE="stock-manager-cache-v2.1";
const FILES=["./","./index.html","./manifest.webmanifest"];
self.addEventListener("install",e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(FILES);await Promise.allSettled(["./icons/icon-192.png","./icons/icon-512.png"].map(f=>c.add(f)));await self.skipWaiting();})()));
self.addEventListener("activate",e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith("stock-manager-cache-")&&k!==CACHE)await caches.delete(k);await self.clients.claim();})()));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET"||new URL(e.request.url).origin!==self.location.origin)return;if(e.request.mode==="navigate"){e.respondWith(fetch(e.request).then(async r=>{if(r.ok){const c=await caches.open(CACHE);await c.put(e.request,r.clone());}return r;}).catch(async()=>await caches.match(e.request)||await caches.match("./index.html")));return;}e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
