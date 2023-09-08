"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const CL_SCROLL = 'with-scroll scroll';
const ScrollPane = (0, _uiApi.forwardRef)((_ref, ref) => {
  let {
    className,
    style,
    children
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ref: ref,
    className: (0, _styleFn.crCn)(CL_SCROLL, className),
    style: style,
    children: children
  });
});
var _default = ScrollPane;
exports.default = _default;
//# sourceMappingURL=ScrollPane.js.map