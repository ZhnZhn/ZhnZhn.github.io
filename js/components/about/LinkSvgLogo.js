"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _toLink = _interopRequireDefault(require("../zhn/toLink"));
var _Svg = _interopRequireDefault(require("../zhn/svg/Svg100"));
var _UseLogoById = _interopRequireDefault(require("./UseLogoById"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_LI = 'logo-item';
const LinkSvgLogo = _ref => {
  let {
    ariaLabel,
    className,
    href,
    id,
    svgProps
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
    "aria-label": ariaLabel,
    className: (0, _styleFn.crCn)(CL_LI, className),
    href: (0, _toLink.default)(href),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.default, {
      ...svgProps,
      "aria-hidden": "true",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_UseLogoById.default, {
        id: id
      })
    })
  });
};
var _default = LinkSvgLogo;
exports.default = _default;
//# sourceMappingURL=LinkSvgLogo.js.map