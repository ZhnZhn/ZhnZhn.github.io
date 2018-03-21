'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var C = {
  URL: 'https://api.worldbank.org/v2'
};

var api = {
  getRequestUrl: function getRequestUrl(option) {
    var one = option.one,
        two = option.two;

    return C.URL + '/countries/' + one + '/indicators/' + two + '?date=1990:2017&format=json';
  },
  checkResponse: function checkResponse(json) {
    return Array.isArray(json);
  }
};

exports.default = api;
//# sourceMappingURL=api.js.map