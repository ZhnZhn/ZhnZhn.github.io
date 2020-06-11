"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var getValue = _fnAdapter["default"].getValue;
var C = {
  URL: 'https://api.coinpaprika.com/v1',
  DF_ID: 'btc-bitcoin'
};
var _isArr = Array.isArray;

var _crUrlDf = function _crUrlDf(option) {
  var _option$items = option.items,
      items = _option$items === void 0 ? [] : _option$items,
      fromDate = option.fromDate,
      value = getValue(items[0], {
    dfValue: C.DF_ID
  });
  return C.URL + "/coins/" + value + "/ohlcv/historical?start=" + fromDate + "&limit=366";
};

var _crUrlTw = function _crUrlTw(option) {
  var _option$items2 = option.items,
      items = _option$items2 === void 0 ? [] : _option$items2,
      value = getValue(items[0], {
    dfValue: C.DF_ID
  });
  return C.URL + "/coins/" + value + "/twitter";
};

var _rApi = {
  DF: _crUrlDf,
  TW: _crUrlTw
};
var CpApi = {
  getRequestUrl: function getRequestUrl(option) {
    var dfRoute = option.dfRoute,
        _crUrl = _rApi[dfRoute] || _rApi.DF;

    return option._itemUrl = _crUrl(option);
  },
  checkResponse: function checkResponse(json, option) {
    return _isArr(json);
  }
};
var _default = CpApi;
exports["default"] = _default;
//# sourceMappingURL=CpApi.js.map