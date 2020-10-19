"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _SvgX = _interopRequireDefault(require("./svg/SvgX"));

//import PropTypes from "prop-types";
var CL = "bt-svg-close";

var SvgClose = function SvgClose(_ref) {
  var style = _ref.style,
      onClose = _ref.onClose;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    tabIndex: "-1",
    className: CL,
    style: style,
    onClick: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgX["default"], {})
  });
};
/*
SvgClose.propTypes = {
  style: PropTypes.object,
  onClose: PropTypes.func
}
*/


var _default = SvgClose;
exports["default"] = _default;
//# sourceMappingURL=SvgClose.js.map