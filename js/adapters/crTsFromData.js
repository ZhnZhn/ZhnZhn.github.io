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
  const _fromYear = (0, _isTypeFn.parseIntBy10)(json.fromYear);
  if ((0, _isTypeFn.isNumber)(_fromYear)) {
    return _crTsFromYearData(_fromYear, data);
  }
  const _dmy = json.from;
  if ((0, _dateFn.isDmy)(_dmy)) {
    return _crTsFromMonthData(_dmy, data);
  }
  return [];
};
var _default = exports.default = crTsFromData;
//# sourceMappingURL=crTsFromData.js.map