"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var MSG_403 = 'HTTP Code 403: Forbitten.\nMaybe, require API key.';
var MSG_HTTP_CODE = 'HTTP Code';

var loadJson = function loadJson(url, option) {
  return fetch(url, option).then(function (res) {
    var status = res.status,
        statusText = res.statusText;

    if (status >= 200 && status < 400) {
      return res.json();
    } else {
      if (status === 403) {
        throw Error(MSG_403);
      }

      throw Error(MSG_HTTP_CODE + ": " + status + " " + statusText);
    }
  });
};

var _default = loadJson;
exports["default"] = _default;
//# sourceMappingURL=loadJson.js.map