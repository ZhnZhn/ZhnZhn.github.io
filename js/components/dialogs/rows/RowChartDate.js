"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _Comp = _interopRequireDefault(require("../../Comp"));

var _RowChart = _interopRequireDefault(require("./RowChart"));

var _RowInputSelect = _interopRequireDefault(require("./RowInputSelect"));

var ShowHide = _Comp["default"].ShowHide;

var RowChartDate = function RowChartDate(_ref) {
  var chartType = _ref.chartType,
      isShowLabels = _ref.isShowLabels,
      labelStyle = _ref.labelStyle,
      selectWidth = _ref.selectWidth,
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(ShowHide, {
      isShow: isShowChart,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowChart["default"], {
        chartType: chartType,
        isShowLabels: isShowLabels,
        labelStyle: labelStyle,
        selectWidth: selectWidth,
        options: chartOptions,
        onSelectChart: onSelectChart,
        onRegColor: onRegColor
      })
    }), !noDate && /*#__PURE__*/(0, _jsxRuntime.jsx)(ShowHide, {
      isShow: isShowDate,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect["default"], {
        isShowLabels: isShowLabels,
        caption: "For Date",
        placeholder: dateDefault,
        options: dateOptions,
        onSelect: onSelecDate
      })
    })]
  });
};

var _default = RowChartDate;
exports["default"] = _default;
//# sourceMappingURL=RowChartDate.js.map