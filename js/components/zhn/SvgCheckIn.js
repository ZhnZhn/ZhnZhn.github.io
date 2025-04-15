"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Svg = _interopRequireDefault(require("./svg/Svg"));
var _Path = require("./svg/Path");
var _jsxRuntime = require("react/jsx-runtime");
const CL_CHECK_IN = "check-in";
const SvgCheckIn = _ref => {
  let {
    is,
    cn
  } = _ref;
  return is ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: cn,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.default, {
      w: "16",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Path.PathCheckIn, {
        cn: CL_CHECK_IN,
        sw: "3"
      })
    })
  }) : null;
};
var _default = exports.default = SvgCheckIn;
//# sourceMappingURL=SvgCheckIn.js.map