"use strict";

exports.__esModule = true;
exports.default = void 0;
const MSG_403 = 'HTTP Code 403: Forbitten.\nMaybe, require API key.';
const MSG_HTTP_CODE = 'HTTP Code';

const loadJson = (url, option) => fetch(url, option).then(res => {
  const {
    status,
    statusText
  } = res;

  if (status >= 200 && status < 400) {
    return res.json();
  } else {
    if (status === 403) {
      throw Error(MSG_403);
    }

    throw Error(MSG_HTTP_CODE + ": " + status + " " + statusText);
  }
});

var _default = loadJson;
exports.default = _default;
//# sourceMappingURL=loadJson.js.map