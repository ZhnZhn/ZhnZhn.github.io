"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

var SvgIcon = function SvgIcon(_ref) {
  var color = _ref.color,
      size = _ref.size,
      children = _ref.children,
      restProps = (0, _objectWithoutPropertiesLoose2["default"])(_ref, ["color", "size", "children"]);
  return _react["default"].createElement("svg", (0, _extends2["default"])({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, restProps), children);
};

SvgIcon.defaultProps = {
  color: 'currentColor',
  size: '24'
};
var _default = SvgIcon;
exports["default"] = _default;
//# sourceMappingURL=SvgIcon.js.map