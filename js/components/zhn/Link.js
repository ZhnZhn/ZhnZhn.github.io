"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _IfTrue = require("./IfTrue");
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_IfTrue.IfTrue, {
    v: _href && (caption || children),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
      target: "_blank",
      className: className,
      style: style,
      href: _href,
      children: [caption, children]
    })
  });
};
var _default = exports.default = Link;
//# sourceMappingURL=Link.js.map