"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var CL = "button-circle";

var SvgPlus = function SvgPlus(_ref) {
  var style = _ref.style,
      onClick = _ref.onClick;
  return /*#__PURE__*/_react["default"].createElement("button", {
    className: CL,
    style: style,
    onClick: onClick
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    width: "20px",
    height: "20px",
    viewBox: "0 0 20 20",
    preserveAspectRatio: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeWidth: "2",
    strokeLinecap: "round",
    d: "M 10,4 L 10,16 M 4,10 L 16,10"
  })));
};

var _default = SvgPlus;
exports["default"] = _default;
//# sourceMappingURL=SvgPlus.js.map