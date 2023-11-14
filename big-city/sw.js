
const CACHE_NAME= 'v1-cache';
const CACHE_URLS= [
    './',
                './css/bootstrap.min.css',
                './css/hero-slider-style.css',
                './css/magnific-popup.css',
                'css/tooplate-style.css',

                './img/iconos/icono512.png',
                './img/iconos/icono912.png',
                './img/iconos/otro.png',
                'img/calaverita.jpg',
                './img/comida.jpg',
                './img/desfiles.jpg',
                'img/homeimage.jpg',
                'img/ofrendas.jpg',
                'img/pancito.jpg',
                'img/tapetes.jpg',
                'img/visitas_panteones.jpg',

               'js/bootstrap.min.js',
                'js/hero-slider-main.js',
                'js/isInViewport.min.js',
                'js/jquery-1.11.3.min.js',
                'js/jquery.magnific-popup.min.js',
                'js/tether.min.js',

                'index.html',
                'main.js',
                'manifest.json'
];

//instalacion del service worker 
self.addEventListener('install',(event)=> {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache)=>{
            return cache.addAll(CACHE_URLS);
        })
    );
});

//intercepta las solicitudes y maneja las respuestas desde cache
self.addEventListener('fetch',(event)=>{
    event.respondWith(
        caches.match(event.request).then((response)=>{
            if(response){
                return response;
            }
            return fetch(event.request).then((response)=> {
                if(!response || response.status !==200 || response.type!== 'basic'){
                    return response;
                }
                const responseToCache= response.clone();
                caches.open(CACHE_NAME).then((cache)=> {
                    cache.put(event.request, responseToCache);
                });
                return response;
            });
        })
    );
});


//activacion del service worker
self.addEventListener('activate', (event)=>{
    event.waitUntil(
        caches.keys().then((cacheNames)=>{
            return Promise.all(
                cacheNames.map((cacheName)=>{
                    if(cacheName!== CACHE_NAME){
                    return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});