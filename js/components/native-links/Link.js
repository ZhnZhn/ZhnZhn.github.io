"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _jsxRuntime = require("react/jsx-runtime");
const S_LINK = {
  display: 'inline-block',
  paddingTop: 4
};
const Link = _ref => {
  let {
    isHttp,
    className = 'native-link',
    style,
    href,
    caption = 'Native Link'
  } = _ref;
  const _href = (0, _uiApi.toHref)(href, isHttp),
    _style = {
      ...S_LINK,
      ...style
    };
  return _href ? /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
    className: className,
    style: _style,
    href: _href,
    children: caption
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: _style,
    children: caption
  });
};
var _default = Link;
exports.default = _default;
//# sourceMappingURL=Link.js.map