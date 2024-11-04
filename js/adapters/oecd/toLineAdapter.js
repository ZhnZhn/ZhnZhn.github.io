"use strict";

exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = require("../crAdapterType1");
var _AdapterFn = require("../AdapterFn");
var _compareByFn = require("../compareByFn");
var _fnAdapter = require("./fnAdapter");
const crData = (json, option) => {
  const data = (0, _fnAdapter.getJsonData)(json),
    observations = (0, _AdapterFn.getByPropsFrom)((0, _fnAdapter.getDataSeries)(data), (0, _fnAdapter.crObservationPropName)(option), "observations") || {},
    dates = (0, _AdapterFn.getByPropsFrom)((0, _fnAdapter.getDataDimensions)(data), "observation", 0, "values") || [];
  return (0, _AdapterFn.getObjectKeys)(observations).reduce((_arr, valueKey) => {
    const dateMls = (0, _AdapterFn.ymdToUTC)((dates[valueKey] || {}).id),
      value = parseFloat(observations[valueKey]);
    if ((0, _AdapterFn.isNumber)(dateMls) && (0, _AdapterFn.isNumber)(value)) {
      _arr.push([dateMls, value]);
    }
    return _arr;
  }, []).sort(_compareByFn.compareByDate);
};
const toLineAdapter = (0, _crAdapterType.crAdapterType1)({
  crData
});
var _default = exports.default = toLineAdapter;
//# sourceMappingURL=toLineAdapter.js.map