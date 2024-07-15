"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("./AdapterFn");
const FN_TRUE = () => true;
const crFromYearData = (json, option) => {
  const _fromYear = parseInt(json.fromYear, 10),
    _fromDateUTC = (0, _AdapterFn.ymdToUTC)(option.fromDate),
    _isPoint = (0, _AdapterFn.isNumber)(_fromDateUTC) ? mls => mls > _fromDateUTC : FN_TRUE;
  return (0, _AdapterFn.isNumber)(_fromYear) ? json.data.reduce((arr, v, index) => {
    const _mls = (0, _AdapterFn.ymdToUTC)(_fromYear + index);
    if (_isPoint(_mls)) {
      arr.push([_mls, v]);
    }
    return arr;
  }, []) : [];
};
var _default = exports.default = crFromYearData;
//# sourceMappingURL=crFromYearData.js.map