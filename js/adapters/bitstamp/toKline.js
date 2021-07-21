"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _crAdapterOHLCV = _interopRequireDefault(require("../crAdapterOHLCV"));

var crZhConfig = _AdapterFn["default"].crZhConfig,
    isInArrStr = _AdapterFn["default"].isInArrStr;

var _crAddConfig = function _crAddConfig(_ref) {
  var option = _ref.option;
  return {
    zhConfig: crZhConfig(option)
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


var _isDailyTimeframe = isInArrStr(["86400", "259200"]),
    _isHourlyTimeframe = isInArrStr(["3600", "7200", "14400", "21600", "43200"]);

var DAILY_TIME_DELTA = 86394000; //1000*60*60*24 - 1000*60

var HOURLY_TIME_DELTA = 3540000; //1000*60*59

var _toMls = function _toMls(timestamp) {
  return parseFloat(timestamp) * 1000;
},
    _fToMls = function _fToMls(delta) {
  return function (timestamp, isRecent) {
    return isRecent ? Date.now() - 6000 //1000*60
    : _toMls(timestamp) + delta;
  };
},
    _toDailyMls = _fToMls(DAILY_TIME_DELTA),
    _toHourlyMls = _fToMls(HOURLY_TIME_DELTA);

var _crDataOHLCV = function _crDataOHLCV(json, option) {
  var ohlc = json.data.ohlc,
      _recentIndex = ohlc.length - 1,
      timeframe = option.timeframe,
      _toDate = _isDailyTimeframe(timeframe) ? _toDailyMls : _isHourlyTimeframe(timeframe) ? _toHourlyMls : _toMls;

  return ohlc.map(function (item, index) {
    return {
      date: _toDate(item.timestamp, index === _recentIndex),
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close),
      volume: parseFloat(item.volume)
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