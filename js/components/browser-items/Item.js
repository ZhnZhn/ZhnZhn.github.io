"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _a11yFn = require("../a11yFn");
var _DivEllipsis = _interopRequireDefault(require("../zhn/DivEllipsis"));
var _jsxRuntime = require("react/jsx-runtime");
const S_ITEM = {
    position: 'relative',
    minWidth: 350,
    padding: '5px 10px 5px 0',
    lineHeight: 1.4
  },
  S_CAPTION = {
    verticalAlign: 'middle',
    width: '100%'
  };
const Item = _ref => {
  let {
    caption,
    className,
    item,
    onClickItem,
    children
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ...(0, _a11yFn.crMenuItemRole)(() => onClickItem(item), "0"),
    className: className,
    style: S_ITEM,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DivEllipsis.default, {
      style: S_CAPTION,
      text: caption
    }), children]
  });
};
var _default = exports.default = Item;
//# sourceMappingURL=Item.js.map