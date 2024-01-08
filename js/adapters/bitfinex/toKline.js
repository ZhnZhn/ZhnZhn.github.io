"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _crAdapterOHLCV = _interopRequireDefault(require("../crAdapterOHLCV"));
const _crAddConfig = _ref => {
  let {
    option
  } = _ref;
  return {
    zhConfig: (0, _AdapterFn.crZhConfig)(option)
  };
};
const _compareByDate = (a, b) => a.date - b.date,
  _roundBy = n => {
    if (n > -1 && n < 1) {
      return n;
    }
    return (0, _AdapterFn.roundBy)(n, 2);
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

const _crDataOHLCV = (json, option) => {
  const _data = [];
  json.forEach(arrItem => {
    if ((0, _AdapterFn.isTypeNumber)(arrItem[0])) {
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
const toKline = (0, _crAdapterOHLCV.default)({
  getArr: _crDataOHLCV,
  toDate: date => date,
  crAddConfig: _crAddConfig
});
var _default = exports.default = toKline;
//# sourceMappingURL=toKline.js.map