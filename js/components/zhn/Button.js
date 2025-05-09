"use strict";

exports.__esModule = true;
exports.default = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const Button = _ref => {
  let {
    ariaLabel,
    children,
    ...restProps
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    ...restProps,
    "aria-label": ariaLabel,
    type: "button",
    children: children
  });
};
var _default = exports.default = Button;
//# sourceMappingURL=Button.js.map