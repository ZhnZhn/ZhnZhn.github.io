"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _crAdapterOHLCV = _interopRequireDefault(require("../crAdapterOHLCV"));

var crZhConfig = _AdapterFn["default"].crZhConfig,
    crItemLink = _AdapterFn["default"].crItemLink;

var _crResearchLink = crItemLink.bind(null, 'Binance Research');

var _crTradeLink = crItemLink.bind(null, 'Binance Trade Chart');

var _crDescription = function _crDescription(_ref) {
  var _researchLink = _ref._researchLink,
      _tradeLink = _ref._tradeLink;
  return _crResearchLink(_researchLink, "padding-bottom: 8px;") + _crTradeLink(_tradeLink);
};

var _crInfo = function _crInfo(option) {
  return {
    name: option.title,
    description: _crDescription(option)
  };
};

var _crAddConfig = function _crAddConfig(_ref2) {
  var option = _ref2.option;
  return {
    zhConfig: crZhConfig(option),
    info: _crInfo(option)
  };
};
/*
From Binance API Documentation
[
    1499040000000,      // Open time
    "0.01634790",       // Open
    "0.80000000",       // High
    "0.01575800",       // Low
    "0.01577100",       // Close
    "148976.11427815",  // Volume
    1499644799999,      // Close time
    "2434.19055334",    // Quote asset volume
    308,                // Number of trades
    "1756.87402397",    // Taker buy base asset volume
    "28.46694368",      // Taker buy quote asset volume
    "17928899.62484339" // Ignore.
  ]
*/


var _crDataOHLCV = function _crDataOHLCV(json) {
  return json.map(function (item) {
    return {
      date: item[6],
      open: parseFloat(item[1]),
      high: parseFloat(item[2]),
      low: parseFloat(item[3]),
      close: parseFloat(item[4]),
      volume: parseFloat(item[5])
    };
  });
};

var toKline = (0, _crAdapterOHLCV["default"])({
  getArr: _crDataOHLCV,
  toDate: function toDate(date) {
    return date;
  },
  crAddConfig: _crAddConfig
});
var _default = toKline;
exports["default"] = _default;
//# sourceMappingURL=toKline.js.map