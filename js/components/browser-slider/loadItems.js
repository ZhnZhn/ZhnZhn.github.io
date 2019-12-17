"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _compareByText = function _compareByText(a, b) {
  if (a.text < b.text) return -1;
  if (a.text > b.text) return 1;
  return 0;
};

var loadItems = function loadItems(url, proxy) {
  var _url = proxy ? proxy + url : url;

  return fetch(_url, {
    cache: "default"
  }).then(function (res) {
    return res.json();
  }).then(function (json) {
    if (Array.isArray(json)) {
      json.sort(_compareByText);
    }

    return json;
  });
};

var _default = loadItems;
exports["default"] = _default;
//# sourceMappingURL=loadItems.js.map