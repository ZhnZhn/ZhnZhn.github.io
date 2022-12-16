"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _MenuAriaItem = _interopRequireDefault(require("./MenuAriaItem"));
var _jsxRuntime = require("react/jsx-runtime");
const S_ITEM = {
    position: 'relative'
  },
  S_PREV_PAGE = {
    position: 'absolute',
    top: 0,
    left: 16
  },
  S_TITLE = {
    paddingLeft: 16
  };
const MenuTitle = (0, _uiApi.forwardRef)((_ref, ref) => {
  let {
    titleCl,
    title,
    onClick
  } = _ref;
  return title ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_MenuAriaItem.default, {
    ref: ref,
    className: titleCl,
    style: S_ITEM,
    onClick: onClick,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S_PREV_PAGE,
      children: "<"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S_TITLE,
      children: title
    })]
  }) : null;
});
var _default = MenuTitle;
exports.default = _default;
//# sourceMappingURL=MenuTitle.js.map