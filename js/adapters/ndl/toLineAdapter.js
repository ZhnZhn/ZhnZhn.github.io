"use strict";

exports.__esModule = true;
exports.toLineAdapter = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _AdapterFn = require("../AdapterFn");
var _compareByFn = require("../compareByFn");
var _crAdapterType = require("../crAdapterType1");
var _NdlFn = require("./NdlFn");
const crData = (json, option) => {
  const points = (0, _NdlFn.getData)(json).sort(_compareByFn.compareByDate),
    data = [];
  for (const point of points) {
    const value = point[1];
    if ((0, _isTypeFn.isNumber)(value)) {
      data.push([(0, _AdapterFn.ymdToUTC)(point[0]), value]);
    }
  }
  return data;
};
const toLineAdapter = exports.toLineAdapter = (0, _crAdapterType.crAdapterType1)({
  crData,
  crConfOption: option => ({
    zhConfig: (0, _NdlFn.crZhConfig)(option)
  })
});
//# sourceMappingURL=toLineAdapter.js.map