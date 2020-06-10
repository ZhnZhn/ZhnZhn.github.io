"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var RowChart = function RowChart(_ref) {
  var chartType = _ref.chartType,
      isShowLabels = _ref.isShowLabels,
      isShowChart = _ref.isShowChart,
      chartOptions = _ref.chartOptions,
      onSelectChart = _ref.onSelectChart,
      onRegColor = _ref.onRegColor,
      isShowDate = _ref.isShowDate,
      _ref$noDate = _ref.noDate,
      noDate = _ref$noDate === void 0 ? false : _ref$noDate,
      dateDefault = _ref.dateDefault,
      dateOptions = _ref.dateOptions,
      onSelecDate = _ref.onSelecDate;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ShowHide, {
    isShow: isShowChart
  }, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowChart, {
    chartType: chartType,
    isShowLabels: isShowLabels,
    options: chartOptions,
    onSelectChart: onSelectChart,
    onRegColor: onRegColor
  })), !noDate && /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ShowHide, {
    isShow: isShowDate
  }, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowInputSelect, {
    isShowLabels: isShowLabels,
    caption: "For Date",
    placeholder: dateDefault,
    options: dateOptions,
    onSelect: onSelecDate
  })));
};

var _default = RowChart;
exports["default"] = _default;
//# sourceMappingURL=RowChart.js.map