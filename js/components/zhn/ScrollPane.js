"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const CL_SCROLL = (0, _styleFn.crWithScrollCn)();
const ScrollPane = _ref => {
  let {
    refEl,
    className,
    style,
    children
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ref: refEl,
    className: (0, _styleFn.crCn)(CL_SCROLL, className),
    style: style,
    children: children
  });
};
var _default = exports.default = ScrollPane;
//# sourceMappingURL=ScrollPane.js.map