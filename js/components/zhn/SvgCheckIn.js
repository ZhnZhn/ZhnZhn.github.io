"use strict";

exports.__esModule = true;
exports.default = void 0;
var _Svg = require("./svg/Svg");
var _jsxRuntime = require("react/jsx-runtime");
const CL_CHECK_IN = "check-in";
const SvgCheckIn = props => props.is ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
  className: props.cn,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.Svg, {
    w: "16",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.PathCheckIn, {
      cn: CL_CHECK_IN,
      sw: "3"
    })
  })
}) : null;
var _default = exports.default = SvgCheckIn;
//# sourceMappingURL=SvgCheckIn.js.map