"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../utils/isTypeFn");
var _AdapterFn = require("./AdapterFn");
const FN_TRUE = () => true;
const crFromYearData = (json, option) => {
  const _fromYear = (0, _isTypeFn.parseIntBy10)(json.fromYear),
    _fromDateUTC = (0, _AdapterFn.ymdToUTC)(option.fromDate),
    _isPoint = (0, _isTypeFn.isNumber)(_fromDateUTC) ? mls => mls > _fromDateUTC : FN_TRUE;
  return (0, _isTypeFn.isNumber)(_fromYear) ? json.data.reduce((arr, v, index) => {
    const _mls = (0, _AdapterFn.ymdToUTC)(_fromYear + index);
    if (_isPoint(_mls)) {
      arr.push([_mls, v]);
    }
    return arr;
  }, []) : [];
};
var _default = exports.default = crFromYearData;
//# sourceMappingURL=crFromYearData.js.map