"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var C = {
  URL: "https://api.coinmarketcap.com/v1/ticker/"
};
var CrcApi = {
  getRequestUrl: function getRequestUrl(option) {
    var one = option.one,
        two = option.two;
    return C.URL + "?start=" + one + "&limit=" + two;
  },
  checkResponse: function checkResponse(json) {
    if (!Array.isArray(json)) {
      return false;
    }

    return true;
  }
};
var _default = CrcApi;
exports["default"] = _default;
//# sourceMappingURL=CmcApi.js.map