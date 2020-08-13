"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _SvgX = _interopRequireDefault(require("./svg/SvgX"));

//import PropTypes from "prop-types";
var CL = "bt-svg-close";

var SvgClose = function SvgClose(_ref) {
  var style = _ref.style,
      onClose = _ref.onClose;
  return /*#__PURE__*/_react["default"].createElement("button", {
    tabIndex: "-1",
    className: CL,
    style: style,
    onClick: onClose
  }, /*#__PURE__*/_react["default"].createElement(_SvgX["default"], null));
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