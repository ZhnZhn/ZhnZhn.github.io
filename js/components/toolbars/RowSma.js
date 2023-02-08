"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _IndicatorBuilder = require("../../charts/IndicatorBuilder");
var _RowTaType = _interopRequireDefault(require("./RowTaType1"));
var _jsxRuntime = require("react/jsx-runtime");
const _isArray = Array.isArray,
  SMA_MONTH = '12',
  SMA_YEAR = '50';
const _crInitialSmaPeriod = config => {
  const _d = (((config || {}).series || [])[0] || {}).data;
  return !_isArray(_d) ? '0' : _d.length > 150 ? SMA_YEAR : SMA_MONTH;
};
const RowSma = _ref => {
  let {
    config,
    getChart
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowTaType.default, {
    caption: "SMA",
    config: config,
    getChart: getChart,
    crInitialPeriod: _crInitialSmaPeriod,
    addTaTo: _IndicatorBuilder.addSmaTo
  });
};
var _default = RowSma;
exports.default = _default;
//# sourceMappingURL=RowSma.js.map