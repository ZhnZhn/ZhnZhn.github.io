"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var Link = function Link(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? 'link' : _ref$className,
      style = _ref.style,
      title = _ref.title,
      href = _ref.href,
      children = _ref.children;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
    target: "_blank",
    className: className,
    style: style,
    href: href,
    children: [title, children]
  });
};

var _default = Link;
exports["default"] = _default;
//# sourceMappingURL=Link.js.map