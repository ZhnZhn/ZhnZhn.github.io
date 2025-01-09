"use strict";

exports.__esModule = true;
exports.klineOptions = exports.crData = void 0;
var _AdapterFn = require("../AdapterFn");
var _compareByFn = require("../compareByFn");
const crData = (json, option) => {
  const {
      dfPn,
      _propName
    } = option,
    _metrics = dfPn ? json[dfPn] : json,
    _data = [];
  _metrics.forEach(item => {
    const _v = parseFloat(item[_propName]);
    if ((0, _AdapterFn.isNumber)(_v)) {
      _data.push([(0, _AdapterFn.ymdToUTC)(item.date), _v]);
    }
  });
  return _data.reverse().sort(_compareByFn.compareByDate);
};
exports.crData = crData;
const klineOptions = exports.klineOptions = {
  isAth: true,
  d: 'date',
  v: 'volume',
  l: 'low',
  h: 'high',
  o: 'open',
  crDate: _AdapterFn.ymdhmsToUTC
};
//# sourceMappingURL=fnAdapter.js.map