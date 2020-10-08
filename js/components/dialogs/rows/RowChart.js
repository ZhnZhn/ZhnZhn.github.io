"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _RowOcSelect = _interopRequireDefault(require("./RowOcSelect"));

var _SeriaColor = _interopRequireDefault(require("../SeriaColor"));

var RowChart = function RowChart(_ref) {
  var chartType = _ref.chartType,
      isShowLabels = _ref.isShowLabels,
      labelStyle = _ref.labelStyle,
      placeholder = _ref.placeholder,
      selectWidth = _ref.selectWidth,
      options = _ref.options,
      onSelectChart = _ref.onSelectChart,
      onRegColor = _ref.onRegColor;
  return /*#__PURE__*/_react["default"].createElement(_RowOcSelect["default"], {
    isShowLabels: isShowLabels,
    labelStyle: labelStyle,
    caption: "Chart",
    placeholder: placeholder || options[0].caption,
    width: selectWidth,
    options: options,
    onSelect: onSelectChart
  }, /*#__PURE__*/_react["default"].createElement(_SeriaColor["default"], {
    chartType: chartType,
    isLong: isShowLabels,
    onReg: onRegColor
  }));
};

var _default = RowChart;
exports["default"] = _default;
//# sourceMappingURL=RowChart.js.map