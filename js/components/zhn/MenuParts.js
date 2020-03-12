"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _MenuPart = _interopRequireDefault(require("./MenuPart"));

var MenuParts = function MenuParts(_ref) {
  var _ref$menuItems = _ref.menuItems,
      menuItems = _ref$menuItems === void 0 ? [] : _ref$menuItems;
  return menuItems.map(function (menuPart, index) {
    return _react["default"].createElement(_MenuPart["default"], (0, _extends2["default"])({
      key: index
    }, menuPart));
  });
};

var _default = MenuParts;
exports["default"] = _default;
//# sourceMappingURL=MenuParts.js.map