"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _trJsonSdn = _interopRequireDefault(require("./trJsonSdn"));

var _trJsonSir = _interopRequireDefault(require("./trJsonSir"));

const _isArr = Array.isArray;

const _compareByText = (a, b) => {
  if (a.text < b.text) return -1;
  if (a.text > b.text) return 1;
  return 0;
};

const _hmTr = {
  SDN: _trJsonSdn.default,
  SIR: _trJsonSir.default
};

const loadItems = function (proxy, dfProps, id) {
  if (proxy === void 0) {
    proxy = '';
  }

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
      const _trJson = _hmTr[lT];

      if (_trJson) {
        json = _trJson(json, id);
      }

      json.sort(_compareByText);
    }

    return json;
  });
};

var _default = loadItems;
exports.default = _default;
//# sourceMappingURL=loadItems.js.map