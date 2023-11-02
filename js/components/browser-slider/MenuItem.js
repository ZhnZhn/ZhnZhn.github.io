"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _useKeyEnter = _interopRequireDefault(require("../hooks/useKeyEnter"));
var _Style = require("./Style");
var _jsxRuntime = require("react/jsx-runtime");
const MenuItem = _ref => {
  let {
    innerRef,
    item,
    onClick
  } = _ref;
  const {
      text,
      type
    } = item,
    _style = type === 'l' ? _Style.S_ITEM_L : (0, _Style.crItemTStyle)(),
    _hKeyDown = (0, _useKeyEnter.default)(onClick, [onClick]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ref: innerRef,
    className: _Style.CL_MENU_ITEM,
    style: _style,
    tabIndex: "0",
    role: "menuitem",
    onClick: onClick,
    onKeyDown: _hKeyDown,
    children: text
  });
};
var _default = exports.default = MenuItem;
//# sourceMappingURL=MenuItem.js.map