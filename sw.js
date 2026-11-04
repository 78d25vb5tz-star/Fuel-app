/* FUEL v5: no session data, user HTML, API calls or health data cached. */
const NAME='fuel-static-v6';
const ASSETS=['/fuel-logo.svg','/apple-touch-icon.png','/icon-192.png','/icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(NAME).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==NAME).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin)return;
 if(!ASSETS.includes(url.pathname))return; // HTML altijd online vers ophalen, geen oude demo.
 event.respondWith(caches.match(request).then(c=>c||fetch(request)));
});
