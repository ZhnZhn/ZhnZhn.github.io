"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var C = {
  URL: 'https://api.coinlore.net/api'
};
var _isArr = Array.isArray,
    crError = _AdapterFn["default"].crError;
var ClApi = {
  getRequestUrl: function getRequestUrl(option) {
    var _option$items = option.items,
        items = _option$items === void 0 ? [] : _option$items,
        id = items[0].v;
    return C.URL + "/exchange/?id=" + id;
  },
  checkResponse: function checkResponse(json, option) {
    var _ref = json || {},
        pairs = _ref.pairs;

    if (_isArr(pairs)) {
      return true;
    }

    throw crError();
  }
};
var _default = ClApi;
exports["default"] = _default;
//# sourceMappingURL=ClApi.js.map