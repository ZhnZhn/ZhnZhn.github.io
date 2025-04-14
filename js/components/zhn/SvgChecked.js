"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Svg = _interopRequireDefault(require("./svg/Svg"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_CHECK_IN = "check-in";
const SvgChecked = _ref => {
  let {
    className
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.default, {
      w: "16",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        className: CL_CHECK_IN,
        d: "M 2,5 L 8,14 14,1",
        stroke: "currentColor",
        fill: "transparent",
        strokeWidth: "3",
        strokeLinecap: "round"
      })
    })
  });
};
var _default = exports.default = SvgChecked;
//# sourceMappingURL=SvgChecked.js.map