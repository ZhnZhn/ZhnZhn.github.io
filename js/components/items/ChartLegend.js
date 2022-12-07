"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));

var _Legend = _interopRequireDefault(require("../zhn/Legend"));

var _jsxRuntime = require("react/jsx-runtime");

const ChartLegend = _ref => {
  let {
    isShow,
    legend,
    onClickItem
  } = _ref;
  return legend ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
    isShow: isShow,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Legend.default, {
      legend: legend,
      onClickItem: onClickItem
    })
  }) : null;
};

var _default = ChartLegend;
exports.default = _default;
//# sourceMappingURL=ChartLegend.js.map