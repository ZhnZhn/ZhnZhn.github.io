"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _fToKline = require("../fToKline");
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

const _isDailyTimeframe = (0, _AdapterFn.isInArrStr)(["86400", "259200"]),
  _isHourlyTimeframe = (0, _AdapterFn.isInArrStr)(["3600", "7200", "14400", "21600", "43200"]);
const DAILY_TIME_DELTA = 86_394_000; //1000*60*60*24 - 1000*60
const HOURLY_TIME_DELTA = 3_540_000; //1000*60*59

const _parseFloat = parseFloat,
  _toMls = timestamp => _parseFloat(timestamp) * 1000,
  _fToMls = delta => (timestamp, isRecent) => isRecent ? Date.now() - 6000 //1000*60
  : _toMls(timestamp) + delta,
  _toDailyMls = _fToMls(DAILY_TIME_DELTA),
  _toHourlyMls = _fToMls(HOURLY_TIME_DELTA),
  _fToDate = _ref => {
    let {
      timeframe
    } = _ref;
    return _isDailyTimeframe(timeframe) ? _toDailyMls : _isHourlyTimeframe(timeframe) ? _toHourlyMls : _toMls;
  };
const _crDataOHLCV = (json, option) => {
  const {
      ohlc
    } = json.data,
    _recentIndex = ohlc.length - 1,
    _toDate = _fToDate(option);
  return ohlc.map((item, index) => ({
    date: _toDate(item.timestamp, index === _recentIndex),
    open: _parseFloat(item.open),
    high: _parseFloat(item.high),
    low: _parseFloat(item.low),
    close: _parseFloat(item.close),
    volume: _parseFloat(item.volume)
  }));
};
const toKline = (0, _fToKline.fToKline)({
  getArr: _crDataOHLCV
});
var _default = exports.default = toKline;
//# sourceMappingURL=toKline.js.map