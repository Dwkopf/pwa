"use strict";

var _newsApi = require("./newsApi.js");

require("./newsArticle.js");

function fetchNews() {
  var res, json, main;
  return regeneratorRuntime.async(function fetchNews$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(_newsApi.topHeadlinesUrl));

        case 2:
          res = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(res.json());

        case 5:
          json = _context.sent;
          main = document.querySelector('main');
          json.articles.forEach(function (article) {
            var el = document.createElement('news-article');
            el.article = article;
            main.appendChild(el);
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

window.addEventListener('load', function () {
  fetchNews();
  registerSw();
});

function registerSw() {
  return regeneratorRuntime.async(function registerSw$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!('serviceWorker' in navigator)) {
            _context2.next = 9;
            break;
          }

          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(navigator.serviceWorker.register('./sw.js'));

        case 4:
          _context2.next = 9;
          break;

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](1);
          console.log('SW registration failed');

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 6]]);
}