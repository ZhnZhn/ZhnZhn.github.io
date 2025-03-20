"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ShowHide = _interopRequireDefault(require("../../zhn/ShowHide"));
var _RowChart = _interopRequireDefault(require("./RowChart"));
var _RowInputSelect = _interopRequireDefault(require("./RowInputSelect"));
var _jsxRuntime = require("react/jsx-runtime");
const RowChartDate = _ref => {
  let {
    refSeriaColor,
    chartType,
    isShowLabels,
    labelStyle,
    selectWidth,
    isShowChart,
    chartOptions,
    chartDefault,
    onSelectChart,
    isShowDate,
    noDate = false,
    dateDefault,
    dateOptions,
    onSelectDate,
    isDim,
    dimOptions,
    onSelectDim
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
      isShow: isShowChart,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowChart.default, {
        refSeriaColor: refSeriaColor,
        chartType: chartType,
        isShowLabels: isShowLabels,
        labelStyle: labelStyle,
        placeholder: chartDefault,
        selectWidth: selectWidth,
        options: chartOptions,
        onSelectChart: onSelectChart
      })
    }), isDim && dimOptions && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
      isShow: isShowDate,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect.default, {
        isShowLabels: isShowLabels,
        caption: "Dim",
        options: dimOptions,
        onSelect: onSelectDim
      })
    }), !noDate && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
      isShow: isShowDate,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect.default, {
        isShowLabels: isShowLabels,
        caption: "For Date",
        placeholder: dateDefault,
        options: dateOptions,
        onSelect: onSelectDate
      })
    })]
  });
};
var _default = exports.default = RowChartDate;
//# sourceMappingURL=RowChartDate.js.map