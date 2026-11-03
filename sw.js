/* FUEL demo PWA, no user data or API calls are cached. */
const CACHE='fuel-demo-v1';
const STATIC=['/','/index.html','/manifest.webmanifest','/fuel-app-icon-dark-180.png','/fuel-app-icon-dark-192.png','/fuel-app-icon-dark-512.png','/fuel-logo-primary.svg','/fuel-logo-inverse.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
 e.respondWith(fetch(e.request).then(response=>{
   if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});}
   return response;
 }).catch(()=>caches.match(e.request).then(x=>x||caches.match('/index.html'))));
});
