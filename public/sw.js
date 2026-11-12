/* ============================================================
   SERVICE WORKER — Guardado offline (PWA)
   Este archivo permite que la app abra sin internet.
   ============================================================ */

// Nombre del cache. Si cambias la lógica offline, sube la versión (v2, v3...)
const CACHE_NAME = 'catalogo-d1-v1';

// Archivos que se guardan en el primer uso (shell de la app)
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/imagen192(1).png',
  '/images152.png',
];

/* ------------------------------------------------------------
   INSTALL
   Se ejecuta cuando el Service Worker se instala por primera vez.
   Aquí descargamos y guardamos los archivos básicos en cache.
   ------------------------------------------------------------ */
self.addEventListener('install', (event) => {
  // El navegador espera a que termine de cachear
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Guarda todos los archivos de la lista
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        // Si falta un icono, no rompemos toda la instalación
        console.log('Precache parcial:', err);
      });
    })
  );

  // Activa este SW de inmediato (sin esperar a cerrar pestañas)
  self.skipWaiting();
});

/* ------------------------------------------------------------
   ACTIVATE
   Se ejecuta cuando el SW pasa a controlar la página.
   Aquí borramos caches viejos para no llenar el disco.
   ------------------------------------------------------------ */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME) // solo dejamos el cache actual
          .map((key) => caches.delete(key))
      )
    )
  );

  // Este SW empieza a controlar las pestañas ya abiertas
  self.clients.claim();
});

/* ------------------------------------------------------------
   FETCH
   Se ejecuta en cada petición (HTML, JS, imágenes, etc.).
   Estrategia: primero cache; si no hay, red; si no hay red, fallback.
   ------------------------------------------------------------ */
self.addEventListener('fetch', (event) => {
  // Solo interceptamos GET (no POST de formularios, etc.)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    // 1) ¿Está en cache?
    caches.match(event.request).then((cached) => {
      if (cached) return cached; // sí → devolver cache (funciona offline)

      // 2) No está en cache → pedir a la red
      return fetch(event.request)
        .then((response) => {
          // Solo guardamos respuestas válidas del mismo origen
          if (
            response &&
            response.status === 200 &&
            response.type === 'basic'
          ) {
            const copia = response.clone(); // se puede leer una sola vez
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, copia); // guardar para la próxima
            });
          }
          return response;
        })
        .catch(() => {
          // 3) Sin internet:
          // Si el usuario navegaba a una página, devolvemos index.html
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          return new Response('Sin conexión', {
            status: 503,
            statusText: 'Offline',
          });
        });
    })
  );
});