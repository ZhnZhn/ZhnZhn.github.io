"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _isKeyEnter = _interopRequireDefault(require("../zhn/isKeyEnter"));

var _Style = _interopRequireDefault(require("./Style"));

var CL = {
  ITEM: 'menu-item'
};

var MenuItem = function MenuItem(_ref) {
  var innerRef = _ref.innerRef,
      item = _ref.item,
      onClick = _ref.onClick;

  var text = item.text,
      type = item.type,
      _style = type === 'l' ? _Style["default"].ITEM_L : _Style["default"].ITEM_T,
      _hKeyDown = (0, _react.useCallback)(function (evt) {
    if ((0, _isKeyEnter["default"])(evt)) {
      evt.preventDefault();
      onClick();
    }
  }, [onClick]);

  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: innerRef,
    className: CL.ITEM,
    style: _style,
    tabIndex: "0",
    role: "menuitem",
    onClick: onClick,
    onKeyDown: _hKeyDown
  }, text);
};

var _default = MenuItem;
exports["default"] = _default;
//# sourceMappingURL=MenuItem.js.map