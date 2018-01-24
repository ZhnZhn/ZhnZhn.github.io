'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var C = {
  BASE_URL: 'https://api.iextrading.com/1.0/stock'
};

var _urlEarnings = function _urlEarnings(option) {
  var _option$value = option.value,
      value = _option$value === undefined ? '' : _option$value;

  return C.BASE_URL + '/' + value;
};

var _urlChart = function _urlChart(option) {
  var _option$value2 = option.value,
      value = _option$value2 === undefined ? '' : _option$value2;

  return C.BASE_URL + '/' + value + '/chart/5y';
};

var _rUrl = {
  DF: _urlChart,
  earnings: _urlEarnings,
  chart: _urlChart
};

var IexApi = {
  getRequestUrl: function getRequestUrl(option) {
    var dfType = option.dfType,
        _toUrl = _rUrl[dfType] || _rUrl.DF;

    return _toUrl(option);
  },
  checkResponse: function checkResponse() {
    return true;
  }
};

exports.default = IexApi;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\iex\IexApi.js.map