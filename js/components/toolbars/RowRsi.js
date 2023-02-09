"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _IndicatorBuilder = require("../../charts/IndicatorBuilder");
var _RowTaType = _interopRequireDefault(require("./RowTaType1"));
var _helperFn = require("./helperFn");
var _jsxRuntime = require("react/jsx-runtime");
const RSI_MONTH = '14',
  RSI_YEAR = '30';
const _crInitialRsiPeriod = config => (0, _helperFn.crInitialPeriod)(config, RSI_MONTH, RSI_YEAR);
const RowRsi = _ref => {
  let {
    config,
    getChart
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowTaType.default, {
    caption: "RSI",
    config: config,
    getChart: getChart,
    crInitialPeriod: _crInitialRsiPeriod,
    addTaTo: _IndicatorBuilder.addRsiTo
  });
};
var _default = RowRsi;
exports.default = _default;
//# sourceMappingURL=RowRsi.js.map