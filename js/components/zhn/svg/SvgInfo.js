"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _SvgIcon = _interopRequireDefault(require("./SvgIcon"));

var SvgInfo = function SvgInfo(props) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_SvgIcon["default"], (0, _extends2["default"])({}, props, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
      x1: "12",
      y1: "16",
      x2: "12",
      y2: "12"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
      x1: "12",
      y1: "8",
      x2: "12",
      y2: "8"
    })]
  }));
};

var _default = SvgInfo;
exports["default"] = _default;
//# sourceMappingURL=SvgInfo.js.map