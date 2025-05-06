"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _Link = _interopRequireDefault(require("../zhn/Link"));
var _Svg = require("../zhn/svg/Svg");
var _UseLogoById = _interopRequireDefault(require("./UseLogoById"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_LI = 'logo-item';
const LinkSvgLogo = props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
  className: (0, _styleFn.crCn)(CL_LI, props.className),
  href: props.href,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.Svg100, {
    ...props.svgProps,
    "aria-hidden": "true",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_UseLogoById.default, {
      id: props.id
    })
  })
});
var _default = exports.default = LinkSvgLogo;
//# sourceMappingURL=LinkSvgLogo.js.map