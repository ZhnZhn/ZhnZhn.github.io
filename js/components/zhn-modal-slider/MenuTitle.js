"use strict";

exports.__esModule = true;
exports.default = void 0;
var _a11yFn = require("../a11yFn");
var _styleFn = require("../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const S_ITEM = {
    position: 'relative'
  },
  S_PREV_PAGE = (0, _styleFn.crAbsoluteTopLeftStyle)(0, 16),
  S_TITLE = {
    paddingLeft: 22
  };
const MenuTitle = _ref => {
  let {
    refEl,
    titleCl,
    title,
    onClick
  } = _ref;
  return title ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ref: refEl,
    className: titleCl,
    style: S_ITEM,
    ...(0, _a11yFn.crMenuItemRole)(onClick, "0"),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S_PREV_PAGE,
      children: "<"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S_TITLE,
      children: title
    })]
  }) : null;
};
var _default = exports.default = MenuTitle;
//# sourceMappingURL=MenuTitle.js.map