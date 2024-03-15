"use strict";

exports.__esModule = true;
exports.default = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const Button = _ref => {
  let {
    ariaLabel,
    tabIndex,
    className,
    style,
    title,
    dataLoader,
    onClick,
    children
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    "aria-label": ariaLabel,
    tabIndex: tabIndex,
    className: className,
    style: style,
    title: title,
    "data-loader": dataLoader,
    onClick: onClick,
    children: children
  });
};
var _default = exports.default = Button;
//# sourceMappingURL=Button.js.map