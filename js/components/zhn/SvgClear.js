"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _SvgX = _interopRequireDefault(require("./svg/SvgX"));

//import PropTypes from "prop-types";
var CL = "bt-svg-clear";

var SvgClear = function SvgClear(_ref) {
  var style = _ref.style,
      onClick = _ref.onClick;
  return /*#__PURE__*/_react["default"].createElement("button", {
    tabIndex: "-1",
    className: CL,
    style: style,
    onClick: onClick
  }, /*#__PURE__*/_react["default"].createElement(_SvgX["default"], null));
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