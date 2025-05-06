"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Link = _interopRequireDefault(require("../zhn/Link"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_LOGO = 'logo-item data-provider-logo';
const LinkLogo = props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
  className: props.className || CL_LOGO,
  href: props.href,
  children: props.caption
});
var _default = exports.default = LinkLogo;
//# sourceMappingURL=LinkLogo.js.map