"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _jsxRuntime = require("react/jsx-runtime");
const Link = props => {
  const _href = (0, _uiApi.toHref)(props.href);
  return _href && props.children ? /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
    target: "_blank",
    href: _href,
    className: props.className,
    style: props.style,
    title: props.title,
    "aria-label": props.title,
    children: props.children
  }) : null;
};
var _default = exports.default = Link;
//# sourceMappingURL=Link.js.map