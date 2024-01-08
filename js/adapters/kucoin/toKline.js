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
From KuCoin Documentation
[[
 MTS:	string	millisecond time stamp,
 OPEN:	string	First execution during the time frame,
 CLOSE:	string	Last execution during the time frame,
 HIGH:	string	Highest execution during the time frame,
 LOW:	string	Lowest execution during the timeframe,
 VOLUME:	string	Quantity of symbol traded within the timeframe
]]
*/

const _parseFloat = parseFloat;
const _crDataOHLCV = (json, option) => {
  const _data = [];
  try {
    json.forEach(arrItem => {
      _data.push({
        date: _parseFloat(arrItem[0]) * 1000,
        open: _roundBy(_parseFloat(arrItem[1])),
        high: _roundBy(_parseFloat(arrItem[3])),
        low: _roundBy(_parseFloat(arrItem[4])),
        close: _roundBy(_parseFloat(arrItem[2])),
        volume: _parseFloat(arrItem[5])
      });
    });
  } catch (err) {
    throw (0, _AdapterFn.crError)();
  }
  return _data.sort(_compareByDate);
};
const toKline = (0, _crAdapterOHLCV.default)({
  getArr: _crDataOHLCV,
  toDate: date => date,
  crAddConfig: _crAddConfig
});
var _default = exports.default = toKline;
//# sourceMappingURL=toKline.js.map