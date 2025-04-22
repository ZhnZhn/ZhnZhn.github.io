"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _jsxRuntime = require("react/jsx-runtime");
const Link = _ref => {
  let {
    className,
    style,
    caption,
    href,
    children
  } = _ref;
  const _href = (0, _uiApi.toHref)(href);
  return _href && (caption || children) ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
    target: "_blank",
    className: className,
    style: style,
    href: _href,
    children: [caption, children]
  }) : null;
};
var _default = exports.default = Link;
//# sourceMappingURL=Link.js.map