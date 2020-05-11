/*
const cacheName = 'offline';

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
    './templates/base.html',
    './templates/index.html',
    './templates/delete.html'
];

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
*/
importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts("/static/precache-manifest.js");

workbox.precaching.precacheAndRoute([
  {
    "url": "/",
    "revision": "1"
  }
]);

workbox.core.setCacheNameDetails({prefix: "filemag"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
*/
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
