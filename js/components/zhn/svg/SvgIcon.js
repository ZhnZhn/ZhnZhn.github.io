"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Svg = _interopRequireDefault(require("./Svg"));

var _jsxRuntime = require("react/jsx-runtime");

const SvgIcon = ({
  style,
  color = 'currentColor',
  size = '24',
  children
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.default, {
  w: size,
  style: style,
  stroke: color,
  fill: "none",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  children: children
});

var _default = SvgIcon;
exports.default = _default;
//# sourceMappingURL=SvgIcon.js.map