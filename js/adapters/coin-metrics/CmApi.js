"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crError = _fnAdapter["default"].crError;
var C = {
  URL: 'https://community-api.coinmetrics.io/v2',
  ERR_FORMAT: 'Unexpected format'
};
var _isArr = Array.isArray;
var CmApi = {
  getRequestUrl: function getRequestUrl(option) {
    var _option$items = option.items,
        items = _option$items === void 0 ? [] : _option$items,
        fromDate = option.fromDate,
        assets = items[0].v,
        metric = items[1].v,
        _start = fromDate ? "&start=" + fromDate : '';

    return C.URL + "/assets/" + assets.toLowerCase() + "/metricdata?metrics=" + metric + _start;
  },
  checkResponse: function checkResponse(json) {
    var _ref = json || {},
        metricData = _ref.metricData,
        _ref2 = metricData || {},
        series = _ref2.series;

    if (!_isArr(series)) {
      throw crError(C.ERR_FORMAT);
    }

    return true;
  }
};
var _default = CmApi;
exports["default"] = _default;
//# sourceMappingURL=CmApi.js.map