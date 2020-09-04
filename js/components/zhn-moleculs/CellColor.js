"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

//import PropTypes from 'prop-types'
var CellColor = /*#__PURE__*/_react["default"].forwardRef(function (_ref, ref) {
  var style = _ref.style,
      color = _ref.color,
      onClick = _ref.onClick,
      children = _ref.children;

  var _styleColor = color ? {
    backgroundColor: color
  } : void 0,
      _onClick = onClick ? function (event) {
    return onClick(color, event);
  } : void 0;

  return /*#__PURE__*/_react["default"].createElement("span", {
    ref: ref,
    style: (0, _extends2["default"])({}, style, _styleColor),
    onClick: _onClick
  }, children);
});
/*
CellColor.propTypes = {
  style: PropTypes.object,
  color: PropTypes.string,
  onClick: PropTypes.func,
}
*/


var _default = CellColor;
exports["default"] = _default;
//# sourceMappingURL=CellColor.js.map