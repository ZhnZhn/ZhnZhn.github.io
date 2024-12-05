"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _compareByFn = require("../compareByFn");
var _NdlFn = require("./NdlFn");
const crAreaData = (json, option) => {
  const points = (0, _NdlFn.getData)(json).sort(_compareByFn.compareByDate),
    seria = [];
  let minY = Number.POSITIVE_INFINITY,
    maxY = Number.NEGATIVE_INFINITY;
  for (const point of points) {
    const value = point[1];
    if ((0, _AdapterFn.isNumber)(value)) {
      seria.push([(0, _AdapterFn.ymdToUTC)(point[0]), value]);
      if (value > maxY) {
        maxY = value;
      }
      if (value < minY) {
        minY = value;
      }
    }
  }
  return {
    seria,
    minY,
    maxY,
    zhPoints: points
  };
};
var _default = exports.default = crAreaData;
//# sourceMappingURL=crAreaData.js.map