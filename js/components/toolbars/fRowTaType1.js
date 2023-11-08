"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.RowSma = exports.RowRsi = void 0;
var _RowTaType = _interopRequireDefault(require("./RowTaType1"));
var _helperFn = require("./helperFn");
var _IndicatorBuilder = require("../../charts/IndicatorBuilder");
var _jsxRuntime = require("react/jsx-runtime");
const _fRowTaType1 = (caption, crInitialPeriod, addTaTo) => _ref => {
  let {
    config,
    getChart
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowTaType.default, {
    caption: caption,
    config: config,
    getChart: getChart,
    crInitialPeriod: crInitialPeriod,
    addTaTo: addTaTo
  });
};
const _fCrInitialPeriod = (month, year) => config => (0, _helperFn.crInitialPeriod)(config, month, year);
const RowRsi = exports.RowRsi = _fRowTaType1("RSI", _fCrInitialPeriod("14", "30"), _IndicatorBuilder.addRsiTo);
const RowSma = exports.RowSma = _fRowTaType1("SMA", _fCrInitialPeriod("12", "50"), _IndicatorBuilder.addSmaTo);
//# sourceMappingURL=fRowTaType1.js.map