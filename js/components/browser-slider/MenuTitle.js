"use strict";

exports.__esModule = true;
exports.default = void 0;
var _a11yFn = require("../a11yFn");
var _Svg = require("../zhn/svg/Svg");
var _Style = require("./Style");
var _jsxRuntime = require("react/jsx-runtime");
const MenuTitle = ({
  refEl,
  title,
  onClick
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
  ...(0, _a11yFn.crMenuItemRole)(onClick, "0"),
  ref: refEl,
  className: _Style.CL_MENU_ITEM,
  style: _Style.S_TITLE,
  children: [title, /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.SvgArrowLeft, {
    style: _Style.S_TITLE_ARROW
  })]
});
var _default = exports.default = MenuTitle;
//# sourceMappingURL=MenuTitle.js.map