"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _trJsonIfSdn = _interopRequireDefault(require("./trJsonIfSdn"));

const _isArr = Array.isArray;

const _compareByText = (a, b) => {
  if (a.text < b.text) return -1;
  if (a.text > b.text) return 1;
  return 0;
};

const loadItems = (proxy = '', dfProps, id) => {
  const {
    rootUrl,
    dfTi = '',
    lT
  } = dfProps,
        _url = "" + proxy + rootUrl + "/" + id + dfTi;

  return fetch(_url, {
    cache: "default"
  }).then(res => res.json()).then(json => {
    if (_isArr(json)) {
      json = (0, _trJsonIfSdn.default)(json, id, lT);
      json.sort(_compareByText);
    }

    return json;
  });
};

var _default = loadItems;
exports.default = _default;
//# sourceMappingURL=loadItems.js.map