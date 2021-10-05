"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _SvgIcon = _interopRequireDefault(require("./SvgIcon"));

var _jsxRuntime = require("react/jsx-runtime");

const SvgInfo = ({
  style
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_SvgIcon.default, {
  style: style,
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
});

var _default = SvgInfo;
exports.default = _default;
//# sourceMappingURL=SvgInfo.js.map