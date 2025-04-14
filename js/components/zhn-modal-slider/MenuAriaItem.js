"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _uiApi = require("../uiApi");
var _fUseKey = require("../hooks/fUseKey");
var _jsxRuntime = require("react/jsx-runtime");
const MenuAriaItem = _ref => {
  let {
    refEl,
    className,
    style,
    isInitial,
    children,
    onClick
  } = _ref;
  const [is, setIs] = (0, _uiApi.useState)(isInitial),
    _onClick = (0, _isTypeFn.isBool)(isInitial) ? () => {
      onClick();
      setIs(is => !is);
    } : onClick,
    _hKeyDown = (0, _fUseKey.fOnKeyEnter)(_onClick);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ref: refEl,
    className: className,
    style: style,
    role: "menuitem",
    tabIndex: "0",
    onClick: _onClick,
    onKeyDown: _hKeyDown,
    children: (0, _uiApi.renderChildren)(children, is)
  });
};
var _default = exports.default = MenuAriaItem;
//# sourceMappingURL=MenuAriaItem.js.map