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
      placeholder = _ref.placeholder,
      options = _ref.options,
      onSelectChart = _ref.onSelectChart,
      onRegColor = _ref.onRegColor;
  return _react["default"].createElement(_RowOcSelect["default"], {
    isShowLabels: isShowLabels,
    caption: "Chart",
    placeholder: placeholder || options[0].caption,
    options: options,
    onSelect: onSelectChart
  }, _react["default"].createElement(_SeriaColor["default"], {
    chartType: chartType,
    isLong: isShowLabels,
    onReg: onRegColor
  }));
};

var _default = RowChart;
exports["default"] = _default;
//# sourceMappingURL=RowChart.js.map