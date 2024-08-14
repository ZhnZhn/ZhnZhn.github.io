"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _fnAdapter = require("./fnAdapter");
const crData = (json, options) => {
  const seriesId = (0, _fnAdapter.getSeriesId)(options);
  return (0, _fnAdapter.getObservationsData)(json).reduce((data, item) => {
    const dateMls = (0, _AdapterFn.ymdToUTC)(item.d),
      value = parseFloat(item[seriesId].v);
    if ((0, _AdapterFn.isNumber)(dateMls) && (0, _AdapterFn.isNumber)(value)) {
      data.push([dateMls, value]);
    }
    return data;
  }, []);
};
const BocAdapter = (0, _crAdapterType.default)({
  crData
});
var _default = exports.default = BocAdapter;
//# sourceMappingURL=BocAdapter.js.map