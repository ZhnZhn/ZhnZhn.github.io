"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.default = CrcApi;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\coin-market-cap\CmcApi.js.map