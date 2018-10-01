'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _rUrl2;

var _ChartType = require('./ChartType');

var _ChartType2 = _interopRequireDefault(_ChartType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  BASE_URL: 'https://api.iextrading.com/1.0/stock',
  DF_PERIOD: '1y'
};

var _urlEarnings = function _urlEarnings(option) {
  var _option$value = option.value,
      value = _option$value === undefined ? '' : _option$value;

  return C.BASE_URL + '/' + value;
};

var _urlDividends = function _urlDividends(option) {
  var _option$value2 = option.value,
      value = _option$value2 === undefined ? '' : _option$value2,
      dfPeriod = option.dfPeriod;

  return C.BASE_URL + '/' + value + '/dividends/' + dfPeriod;
};

var _urlChart = function _urlChart(option) {
  var _option$value3 = option.value,
      value = _option$value3 === undefined ? '' : _option$value3,
      _option$dfPeriod = option.dfPeriod,
      dfPeriod = _option$dfPeriod === undefined ? C.DF_PERIOD : _option$dfPeriod;

  return C.BASE_URL + '/' + value + '/chart/' + dfPeriod;
};

var _rUrl = (_rUrl2 = {
  DF: _urlChart
}, (0, _defineProperty3.default)(_rUrl2, _ChartType2.default.ERN, _urlEarnings), (0, _defineProperty3.default)(_rUrl2, _ChartType2.default.DIV, _urlDividends), (0, _defineProperty3.default)(_rUrl2, _ChartType2.default.CHART, _urlChart), _rUrl2);

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
//# sourceMappingURL=IexApi.js.map