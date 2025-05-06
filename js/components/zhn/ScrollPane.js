"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const CL_SCROLL = (0, _styleFn.crWithScrollCn)();
const ScrollPane = props => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
  ref: props.refEl,
  className: (0, _styleFn.crCn)(CL_SCROLL, props.className),
  style: props.style,
  children: props.children
});
var _default = exports.default = ScrollPane;
//# sourceMappingURL=ScrollPane.js.map