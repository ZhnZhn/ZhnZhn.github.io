"use strict";

exports.__esModule = true;
exports.default = void 0;
var _fUseKey = require("../hooks/fUseKey");
var _Style = require("./Style");
var _jsxRuntime = require("react/jsx-runtime");
const MenuTitle = _ref => {
  let {
    innerRef,
    title,
    onClick
  } = _ref;
  const _hKeyDown = (0, _fUseKey.useKeyEnter)(onClick);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ref: innerRef,
    className: _Style.CL_MENU_ITEM,
    style: _Style.S_TITLE,
    role: "menuitem",
    tabIndex: "0",
    onClick: onClick,
    onKeyDown: _hKeyDown,
    children: [title, /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: _Style.S_TITLE_ARROW,
      children: '<'
    })]
  });
};
var _default = exports.default = MenuTitle;
//# sourceMappingURL=MenuTitle.js.map