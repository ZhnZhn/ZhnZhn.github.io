"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapterOHLCV = _interopRequireDefault(require("../crAdapterOHLCV"));

var _crZhConfig = function _crZhConfig(_ref) {
  var _itemKey = _ref._itemKey,
      itemCaption = _ref.itemCaption,
      dataSource = _ref.dataSource;
  return {
    id: _itemKey,
    key: _itemKey,
    itemCaption: itemCaption,
    dataSource: dataSource
  };
};

var _crAddConfig = function _crAddConfig(_ref2) {
  var option = _ref2.option;
  return {
    zhConfig: _crZhConfig(option)
  };
};
/*
From Bitstamp API Documentation
  {
     "high": "18638.71",
     "timestamp": "1606723200",
     "volume": "402.30570712",
     "low": "18390.00",
     "close": "18471.42",
     "open": "18633.43"
   }
*/


var _crDataOHLCV = function _crDataOHLCV(json) {
  return json.data.ohlc.map(function (item) {
    return {
      date: parseFloat(item.timestamp) * 1000,
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close),
      volume: parseFloat(item.volume)
    };
  });
};

var BtAdapter = (0, _crAdapterOHLCV["default"])({
  getArr: _crDataOHLCV,
  toDate: function toDate(date) {
    return date;
  },
  crAddConfig: _crAddConfig
});
var _default = BtAdapter;
exports["default"] = _default;
//# sourceMappingURL=BtAdapter.js.map