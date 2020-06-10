"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _Link = _interopRequireDefault(require("./Link.Style"));

var Link = function Link(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? 'native-link' : _ref$className,
      style = _ref.style,
      href = _ref.href,
      _ref$caption = _ref.caption,
      caption = _ref$caption === void 0 ? 'Native Link' : _ref$caption;

  if (!href) {
    return null;
  }

  return /*#__PURE__*/_react["default"].createElement("a", {
    className: className,
    style: (0, _extends2["default"])({}, _Link["default"].LINK, style),
    href: href
  }, caption);
};

var _default = Link;
exports["default"] = _default;
//# sourceMappingURL=Link.js.map