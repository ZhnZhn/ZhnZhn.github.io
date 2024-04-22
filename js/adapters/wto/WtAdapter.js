"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _compareByFn = require("../compareByFn");
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
const MILLION_US_DOLLAR = "Million US dollar";
const crTitle = option => {
  const {
      items,
      dfT
    } = option,
    _reporting = (0, _AdapterFn.getCaption)(items[0]),
    _product = (0, _AdapterFn.getCaption)(items[1]);
  return {
    title: (0, _AdapterFn.joinBy)(": ", _reporting, dfT),
    subtitle: (0, _AdapterFn.joinBy)(": ", _product, MILLION_US_DOLLAR)
  };
};
const trOption = (option, json) => {
  (0, _AdapterFn.assign)(option, crTitle(option));
};
const _getPeriodCode = periodCode => periodCode === "A" ? "" : (0, _AdapterFn.isStr)(periodCode) ? "-" + periodCode.replace("M", "") : "-NN";
const crData = json => json.Dataset.reduce((data, item) => {
  const {
    Value,
    Year
  } = item;
  if ((0, _AdapterFn.isNumber)(Value) && (0, _AdapterFn.isNumber)(Year)) {
    data.push([(0, _AdapterFn.ymdToUTC)('' + Year + _getPeriodCode(item.PeriodCode)), Value]);
  }
  return data;
}, []).sort(_compareByFn.compareByDate);
const WtAdapter = (0, _crAdapterType.default)({
  crData,
  trOption
});
var _default = exports.default = WtAdapter;
//# sourceMappingURL=WtAdapter.js.map