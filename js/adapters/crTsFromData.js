"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../utils/isTypeFn");
var _dateFn = require("../utils/dateFn");
const _crTsFromYearData = (fromYear, data) => data.reduce((arr, v, index) => {
  const _mls = (0, _dateFn.ymdToUTC)(fromYear + index);
  arr.push([_mls, v]);
  return arr;
}, []);
const _crTsFromMonthData = (dmy, data) => data.reduce((arr, value) => {
  arr.push([(0, _dateFn.dmyToUTC)(dmy), value]);
  dmy = (0, _dateFn.getNextMonthDmy)(dmy);
  return arr;
}, []);
const crTsFromData = (json, option) => {
  const data = json.data;
  if (!(0, _isTypeFn.isArr)(data)) {
    return [];
  }
  const _fromYear = (0, _isTypeFn.parseIntBy10)(json.fromYear),
    _from = json.from,
    _tsFromYear = (0, _isTypeFn.isNumber)(_fromYear) ? _fromYear : (0, _isTypeFn.isNumber)(_from) ? _from : !1;
  if ((0, _isTypeFn.isNumber)(_tsFromYear)) {
    return _crTsFromYearData(_tsFromYear, data);
  }
  if ((0, _dateFn.isDmy)(_from)) {
    return _crTsFromMonthData(_from, data);
  }
  return [];
};
var _default = exports.default = crTsFromData;
//# sourceMappingURL=crTsFromData.js.map