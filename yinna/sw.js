/* Service worker — hace que la app abra sin internet.
   El generador reemplaza app-mis-finanzas-a3aca-v1.3 y ["./", "./index.html", "./manifest.json", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png", "./img/logo.jpg"] para cada cliente. */
const CACHE = 'app-mis-finanzas-a3aca-v1.3';
const PREFIJO = CACHE.replace(/-v[^-]*$/, '-');
const ARCHIVOS = ["./", "./index.html", "./manifest.json", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png", "./img/logo.jpg"];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k.startsWith(PREFIJO) && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // Páginas: primero la red (para recibir actualizaciones), si no hay internet, la copia guardada
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(r => { const copia = r.clone(); caches.open(CACHE).then(c => c.put('./index.html', copia)); return r; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  // Todo lo demás (íconos, fuentes, librería de Excel): primero la copia guardada
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r && (r.ok || r.type === 'opaque')) { const copia = r.clone(); caches.open(CACHE).then(c => c.put(req, copia)); }
      return r;
    }).catch(() => hit))
  );
});
