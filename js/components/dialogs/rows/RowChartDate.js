"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Comp = _interopRequireDefault(require("../../Comp"));

var _RowChart = _interopRequireDefault(require("./RowChart"));

var _RowInputSelect = _interopRequireDefault(require("./RowInputSelect"));

var _jsxRuntime = require("react/jsx-runtime");

const {
  ShowHide
} = _Comp.default;

const RowChartDate = ({
  chartType,
  isShowLabels,
  labelStyle,
  selectWidth,
  isShowChart,
  chartOptions,
  onSelectChart,
  onRegColor,
  isShowDate,
  noDate = false,
  dateDefault,
  dateOptions,
  onSelecDate,
  isDim,
  dimOptions,
  onSelecDim
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(ShowHide, {
    isShow: isShowChart,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowChart.default, {
      chartType: chartType,
      isShowLabels: isShowLabels,
      labelStyle: labelStyle,
      selectWidth: selectWidth,
      options: chartOptions,
      onSelectChart: onSelectChart,
      onRegColor: onRegColor
    })
  }), isDim && dimOptions && /*#__PURE__*/(0, _jsxRuntime.jsx)(ShowHide, {
    isShow: isShowDate,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect.default, {
      isShowLabels: isShowLabels,
      caption: "Dim",
      options: dimOptions,
      onSelect: onSelecDim
    })
  }), !noDate && /*#__PURE__*/(0, _jsxRuntime.jsx)(ShowHide, {
    isShow: isShowDate,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect.default, {
      isShowLabels: isShowLabels,
      caption: "For Date",
      placeholder: dateDefault,
      options: dateOptions,
      onSelect: onSelecDate
    })
  })]
});

var _default = RowChartDate;
exports.default = _default;
//# sourceMappingURL=RowChartDate.js.map