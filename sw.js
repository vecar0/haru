const C='haru-v42',F=['./','index.html','manifest.json','icon-180.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 const fresh=e.request.mode==='navigate'||/\.html$|\/$/.test(u.pathname)?new Request(e.request.url,{cache:'no-store'}):e.request;
 e.respondWith(fetch(fresh).then(r=>{if(r.ok){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))))});
self.addEventListener('push',e=>{let d={title:'하루',body:''};try{d=e.data.json()}catch(x){d.body=e.data?e.data.text():''}
 e.waitUntil(self.registration.showNotification(d.title||'하루',{body:d.body,icon:'icon-180.png',badge:'icon-180.png',tag:'haru-'+Date.now()}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l)if('focus' in c)return c.focus();return clients.openWindow('./')}))});
