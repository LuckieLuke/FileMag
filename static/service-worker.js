
const cacheName = 'v1';

const files2Cache = [
    './css/style.css',
    './js/app.js',
    './js/contentsHeight.js',
    './js/corgi.js',
    './js/fadingSearch.js',
    './js/openSideNav.js',
    './img/corgi.png',
    './img/directory.png',
    './img/dots1.png',
    './img/pencil.png',
    './img/plus.png',
    './img/trash.png',
    './img/wand2cp.png',
    './offline.html',
    './offline-base.html',
    '/'
];
/*
self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    evt.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(files2Cache);
        })
    );
  
    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
*/
self.addEventListener("install", function(event) {
    event.waitUntil(preLoad());
  });
  
  var preLoad = function(){
    console.log("Installing web app");
    return caches.open("offline").then(function(cache) {
      console.log("caching index and important routes");
      return cache.addAll(files2Cache);
    });
  };
  
  self.addEventListener("fetch", function(event) {
    event.respondWith(checkResponse(event.request).catch(function() {
      return returnFromCache(event.request);
    }));
    event.waitUntil(addToCache(event.request));
  });
  
  var checkResponse = function(request){
    return new Promise(function(fulfill, reject) {
      fetch(request).then(function(response){
        if(response.status !== 404) {
          fulfill(response);
        } else {
          reject();
        }
      }, reject);
    });
  };
  
  var addToCache = function(request){
    return caches.open("offline").then(function (cache) {
      return fetch(request).then(function (response) {
        console.log(response.url + " was cached");
        return cache.put(request, response);
      });
    });
  };
  
  var returnFromCache = function(request){
    return caches.open("offline").then(function (cache) {
      return cache.match(request).then(function (matching) {
       if(!matching || matching.status == 404) {
         return cache.match("offline.html");
       } else {
         return matching;
       }
      });
    });
  };