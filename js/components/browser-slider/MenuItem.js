"use strict";

exports.__esModule = true;
exports.default = void 0;
var _a11yFn = require("../a11yFn");
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
    [_className, _style] = (0, _Style.getMenuItemStyle)(type);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ...(0, _a11yFn.crMenuItemRole)(onClick, "0"),
    ref: innerRef,
    className: _className,
    style: _style,
    children: text
  });
};
var _default = exports.default = MenuItem;
//# sourceMappingURL=MenuItem.js.map