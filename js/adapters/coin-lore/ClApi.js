"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var C = {
  URL: 'https://api.coinlore.net/api'
};
var _isArr = Array.isArray;
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

    throw {
      errCaption: "Response Empty"
    };
  }
};
var _default = ClApi;
exports["default"] = _default;
//# sourceMappingURL=ClApi.js.map