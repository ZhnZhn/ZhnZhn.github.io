"use strict";

exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = require("../crAdapterType1");
var _AdapterFn = require("../AdapterFn");
var _compareByFn = require("../compareByFn");
const crData = (json, option) => {
  const {
      data
    } = json || {},
    observations = (0, _AdapterFn.getByPropsFrom)(data, "dataSets", 0, "series", "0:0:0:0", "observations") || {},
    dates = (0, _AdapterFn.getByPropsFrom)(data, "structures", 0, "dimensions", "observation", 0, "values") || [];
  return (0, _AdapterFn.getObjectKeys)(observations).reduce((_arr, valueKey) => {
    const dateMls = (0, _AdapterFn.ymdToUTC)((dates[valueKey] || {}).id),
      value = parseFloat(observations[valueKey]);
    if ((0, _AdapterFn.isNumber)(dateMls) && (0, _AdapterFn.isNumber)(value)) {
      _arr.push([dateMls, value]);
    }
    return _arr;
  }, []).sort(_compareByFn.compareByDate);
};
const _toLineAdapter = (0, _crAdapterType.crAdapterType1)({
  crData
});
const OecdAdapter = _toLineAdapter;
var _default = exports.default = OecdAdapter;
//# sourceMappingURL=OecdAdapter.js.map