"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _fUseKey = require("../hooks/fUseKey");
var _jsxRuntime = require("react/jsx-runtime");
const MenuAriaItem = (0, _uiApi.forwardRef)((_ref, ref) => {
  let {
    className,
    style,
    children,
    onClick
  } = _ref;
  const _hKeyDown = (0, _fUseKey.useKeyEnter)(onClick);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ref: ref,
    className: className,
    style: style,
    role: "menuitem",
    tabIndex: "0",
    onClick: onClick,
    onKeyDown: _hKeyDown,
    children: children
  });
});
var _default = exports.default = MenuAriaItem;
//# sourceMappingURL=MenuAriaItem.js.map