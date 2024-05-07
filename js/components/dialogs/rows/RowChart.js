"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _RowOcSelect = _interopRequireDefault(require("./RowOcSelect"));
var _SeriaColor = _interopRequireDefault(require("../SeriaColor"));
var _jsxRuntime = require("react/jsx-runtime");
const RowChart = _ref => {
  let {
    refSeriaColor,
    chartType,
    isShowLabels,
    labelStyle,
    placeholder,
    selectWidth,
    options,
    onSelectChart
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowOcSelect.default, {
    isShowLabels: isShowLabels,
    labelStyle: labelStyle,
    caption: "Chart",
    placeholder: placeholder || options[0].caption,
    width: selectWidth,
    options: options,
    onSelect: onSelectChart,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SeriaColor.default, {
      refEl: refSeriaColor,
      isLong: isShowLabels,
      chartType: chartType
    })
  });
};
var _default = exports.default = RowChart;
//# sourceMappingURL=RowChart.js.map