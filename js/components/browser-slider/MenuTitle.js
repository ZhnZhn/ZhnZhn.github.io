"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _useKeyEnter = _interopRequireDefault(require("../hooks/useKeyEnter"));

var _Style = require("./Style");

var _jsxRuntime = require("react/jsx-runtime");

const CL_MENU_ITEM = 'menu-item';

const MenuTitle = _ref => {
  let {
    innerRef,
    title,
    onClick
  } = _ref;

  const _hKeyDown = (0, _useKeyEnter.default)(onClick);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ref: innerRef,
    className: CL_MENU_ITEM,
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

var _default = MenuTitle;
exports.default = _default;
//# sourceMappingURL=MenuTitle.js.map