'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var C = {
  BASE_URL: 'https://api.iextrading.com/1.0/stock'
};

var IexApi = {
  getRequestUrl: function getRequestUrl(option) {
    var value = option.value;

    return C.BASE_URL + '/' + value;
  },
  checkResponse: function checkResponse() {
    return true;
  }
};

exports.default = IexApi;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\iex\IexApi.js.map