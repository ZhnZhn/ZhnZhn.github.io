"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _toLink = _interopRequireDefault(require("../zhn/toLink"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_LOGO = 'logo-item data-provider-logo';
const LinkLogo = _ref => {
  let {
    className = CL_LOGO,
    href,
    caption,
    ariaLabel = caption
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
    "aria-label": ariaLabel,
    className: className,
    href: (0, _toLink.default)(href),
    children: caption
  });
};
var _default = LinkLogo;
exports.default = _default;
//# sourceMappingURL=LinkLogo.js.map