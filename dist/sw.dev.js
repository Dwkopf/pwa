"use strict";

var cacheName = 'news-v1';
var staticAssets = ['./', './index2.html', './index.js', './newsApi.js', './manifest.webmanifest', './newsArticle.js'];
self.addEventListener('install', function _callee(e) {
  var cache;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(caches.open(cacheName));

        case 2:
          cache = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(cache.addAll(staticAssets));

        case 5:
          return _context.abrupt("return", self.skipWaiting());

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
self.addEventListener('activate', function (e) {
  self.clients.claim();
});
self.addEventListener('fetch', function _callee2(e) {
  var req, url;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          req = e.request;
          url = new URL(req.url);

          if (url.origin === location.origin) {
            e.respondWith(cacheFirst(req));
          } else {
            e.respondWith(newtworkAndCache(req));
          }

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
});

function cacheFirst(req) {
  var cache, cached;
  return regeneratorRuntime.async(function cacheFirst$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(caches.open(cacheName));

        case 2:
          cache = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(cache.match(req));

        case 5:
          cached = _context3.sent;
          return _context3.abrupt("return", cached || fetch(req));

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function newtworkAndCache(req) {
  var cache, fresh, cached;
  return regeneratorRuntime.async(function newtworkAndCache$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(caches.open(cacheName));

        case 2:
          cache = _context4.sent;
          _context4.prev = 3;
          _context4.next = 6;
          return regeneratorRuntime.awrap(fetch(req));

        case 6:
          fresh = _context4.sent;
          _context4.next = 9;
          return regeneratorRuntime.awrap(cache.put(req, fresh.clone()));

        case 9:
          return _context4.abrupt("return", fresh);

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](3);
          _context4.next = 16;
          return regeneratorRuntime.awrap(cache.match(req));

        case 16:
          cached = _context4.sent;
          return _context4.abrupt("return", cached);

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 12]]);
}