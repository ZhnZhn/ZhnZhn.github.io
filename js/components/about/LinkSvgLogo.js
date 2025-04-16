"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _Svg = require("../zhn/svg/Svg");
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
    href: (0, _uiApi.toHref)(href),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.Svg100, {
      ...svgProps,
      "aria-hidden": "true",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_UseLogoById.default, {
        id: id
      })
    })
  });
};
var _default = exports.default = LinkSvgLogo;
//# sourceMappingURL=LinkSvgLogo.js.map