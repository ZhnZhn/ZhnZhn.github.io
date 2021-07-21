"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _crAdapterOHLCV = _interopRequireDefault(require("../crAdapterOHLCV"));

var crZhConfig = _AdapterFn["default"].crZhConfig,
    roundBy = _AdapterFn["default"].roundBy;

var _crAddConfig = function _crAddConfig(_ref) {
  var option = _ref.option;
  return {
    zhConfig: crZhConfig(option)
  };
};

var _isNumber = function _isNumber(n) {
  return typeof n === 'number';
},
    _compareByDate = function _compareByDate(a, b) {
  return a.date - b.date;
},
    _roundBy = function _roundBy(n) {
  if (n > 10) {
    return roundBy(n, 3);
  }

  if (n > 1) {
    return roundBy(n, 4);
  }

  return n;
};
/*
From Bitfinex Documentation
[[
 MTS:	int	millisecond time stamp,
 OPEN:	float	First execution during the time frame,
 CLOSE:	float	Last execution during the time frame,
 HIGH:	float	Highest execution during the time frame,
 LOW:	float	Lowest execution during the timeframe,
 VOLUME:	float	Quantity of symbol traded within the timeframe
]]
*/


var _crDataOHLCV = function _crDataOHLCV(json, option) {
  var _data = [];
  json.forEach(function (arrItem) {
    if (_isNumber(arrItem[0])) {
      _data.push({
        date: arrItem[0],
        open: _roundBy(arrItem[1]),
        high: _roundBy(arrItem[3]),
        low: _roundBy(arrItem[4]),
        close: _roundBy(arrItem[2]),
        volume: arrItem[5]
      });
    }
  });
  return _data.sort(_compareByDate);
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