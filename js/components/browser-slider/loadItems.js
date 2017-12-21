"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compareByText = function _compareByText(a, b) {
  if (a.text < b.text) return -1;
  if (a.text > b.text) return 1;
  return 0;
};

var loadItems = function loadItems(url, proxy) {
  var _url = proxy ? proxy + url : url;
  return fetch(_url, { cache: "default" }).then(function (res) {
    return res.json();
  }).then(function (json) {
    if (Array.isArray(json)) {
      json.sort(_compareByText);
    }
    return json;
  });
};

exports.default = loadItems;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\browser-slider\loadItems.js.map