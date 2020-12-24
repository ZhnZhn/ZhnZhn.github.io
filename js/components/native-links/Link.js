"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _toLink = _interopRequireDefault(require("../zhn/toLink"));

var S = {
  LINK: {
    display: 'inline-block',
    paddingTop: 4
  }
};

var Link = function Link(_ref) {
  var isHttp = _ref.isHttp,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? 'native-link' : _ref$className,
      style = _ref.style,
      href = _ref.href,
      _ref$caption = _ref.caption,
      caption = _ref$caption === void 0 ? 'Native Link' : _ref$caption;

  var _href = (0, _toLink["default"])(href, isHttp),
      _style = (0, _extends2["default"])({}, S.LINK, style);

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
exports["default"] = _default;
//# sourceMappingURL=Link.js.map