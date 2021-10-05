"use strict";

exports.__esModule = true;
exports.default = void 0;

var _jsxRuntime = require("react/jsx-runtime");

const Svg = ({
  w,
  h = w,
  children,
  ...restProps
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: w + "px",
  height: h + "px",
  viewBox: "0 0 " + w + " " + h,
  ...restProps,
  children: children
});

var _default = Svg;
exports.default = _default;
//# sourceMappingURL=Svg.js.map