"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

var _useKeyEnter = _interopRequireDefault(require("../hooks/useKeyEnter"));

var MenuAriaItem = /*#__PURE__*/_react["default"].forwardRef(function (_ref, ref) {
  var children = _ref.children,
      onClick = _ref.onClick,
      onReg = _ref.onReg,
      rest = (0, _objectWithoutPropertiesLoose2["default"])(_ref, ["children", "onClick", "onReg"]);

  var _hKeyDown = (0, _useKeyEnter["default"])(onClick);

  return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({}, rest, {
    ref: ref,
    role: "menuitem",
    tabIndex: "0",
    onClick: onClick,
    onKeyDown: _hKeyDown
  }), children);
});
/*
MenuAriaItem.propTypes = {
  onClick: PropTypes.func
}
*/


var _default = MenuAriaItem;
exports["default"] = _default;
//# sourceMappingURL=MenuAriaItem.js.map