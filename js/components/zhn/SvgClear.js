"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _SvgX = _interopRequireDefault(require("./svg/SvgX"));

//import PropTypes from "prop-types";
var CL = "bt-svg-clear";

var SvgClear = function SvgClear(_ref) {
  var style = _ref.style,
      onClick = _ref.onClick;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    tabIndex: "-1",
    className: CL,
    style: style,
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgX["default"], {})
  });
};
/*
SvgClear.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func
}
*/


var _default = SvgClear;
exports["default"] = _default;
//# sourceMappingURL=SvgClear.js.map