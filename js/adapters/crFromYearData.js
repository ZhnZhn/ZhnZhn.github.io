"use strict";

exports.__esModule = true;
exports.default = void 0;

var _AdapterFn = require("./AdapterFn");

const crFromYearData = (json, option) => {
  const {
    fromYear,
    data
  } = json,
        _fromYear = parseInt(fromYear, 10);

  return (0, _AdapterFn.isNumber)(_fromYear) ? data.map((v, index) => [(0, _AdapterFn.ymdToUTC)(_fromYear + index + ''), v]) : [];
};

var _default = crFromYearData;
exports.default = _default;
//# sourceMappingURL=crFromYearData.js.map