"use strict";

exports.__esModule = true;
exports.default = void 0;
var _Svg = require("../zhn/svg/Svg");
var _jsxRuntime = require("react/jsx-runtime");
const _crRect = (rx, y, x, height, width, color) => /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
  ry: "2",
  rx: rx,
  y: y,
  x: x,
  height: height,
  width: width,
  fill: color,
  stroke: color
});
const IconLogoErc = props => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
  className: props.className,
  title: props.title,
  children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Svg.Svg, {
    ..._Svg.EVENODD_PROPS,
    w: "32",
    strokeWidth: "2",
    children: [_crRect(194, 1.5, 19, 12.5, 11, "#8ecc2d"), _crRect(204.5, 17.5, 9, 13.5, 18, "#232f3b"), _crRect(204.5, 3.5, 2.5, 11, 10, "#a487d4")]
  })
});
var _default = exports.default = IconLogoErc;
//# sourceMappingURL=IconLogoErc.js.map