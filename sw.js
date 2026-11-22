/* Retired copy (2026-11-22). The app lives at https://flra.pricedev.ca.
   This worker only cleans up: it removes the cached app from devices that had this copy installed, then removes itself.
   Forms saved on the device (localStorage) are not touched. */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil((async()=>{
  const ks=await caches.keys();await Promise.all(ks.filter(k=>/^flra-v/.test(k)).map(k=>caches.delete(k)));
  await self.registration.unregister();
  const cs=await self.clients.matchAll({type:'window'});
  await Promise.all(cs.map(c=>c.navigate(c.url).catch(()=>{})));
})()));
