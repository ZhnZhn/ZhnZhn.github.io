'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var C = {
  URL: 'https://api.intrinio.com/historical_data',
  TAIL: 'item=level'
};

var FRQ = {
  A: 'yearly',
  Q: 'quarterly',
  W: 'weekly',
  D: 'daily',
  M: 'monthly',
  DF: 'monthly'
};

var IntrinioApi = {
  crOptionFetch: function crOptionFetch(option) {
    var apiKey = option.apiKey;

    return {
      headers: {
        'X-Authorization-Public-Key': apiKey
      }
    };
  },
  getRequestUrl: function getRequestUrl(option) {
    var value = option.value,
        fromDate = option.fromDate,
        toDate = option.toDate,
        _option$item = option.item,
        item = _option$item === undefined ? {} : _option$item,
        one = option.one,
        two = option.two;


    if (two) {
      return C.URL + '?identifier=' + one + '&item=' + two + '&start_date=' + fromDate + '&end_date=' + toDate + '&frequency=quarterly';
    }

    var _frq = FRQ[item.frq] || FRQ.DF;
    return C.URL + '?identifier=' + value + '&start_date=' + fromDate + '&end_date=' + toDate + '&frequency=' + _frq + '&' + C.TAIL;
  },
  checkResponse: function checkResponse(json) {
    return json && json.data && Array.isArray(json.data);
  }
};

exports.default = IntrinioApi;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\intrinio\IntrinioApi.js.map