"use strict";

exports.__esModule = true;
exports.default = void 0;
var _fUseKey = require("../hooks/fUseKey");
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
    [_className, _style] = (0, _Style.getMenuItemStyle)(type),
    _hKeyDown = (0, _fUseKey.useKeyEnter)(onClick, [onClick]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ref: innerRef,
    className: _className,
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