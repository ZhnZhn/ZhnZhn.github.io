"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Svg = _interopRequireDefault(require("../zhn/svg/Svg100"));
var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));
var _StyleLogo = require("./StyleLogo");
var _UseLogoById = _interopRequireDefault(require("./UseLogoById"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_NDL = "logo-ndl",
  NDL = "Nasdaq Data Link",
  HREF = "https://data.nasdaq.com";
const LogoNasdaqDataLink = _ref => {
  let {
    ariaLabel = NDL,
    className
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
    "aria-label": ariaLabel,
    className: (0, _crCn.default)(className, CL_NDL),
    href: HREF,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.default, {
      ..._StyleLogo.ARIA_HIDDEN_PROPS,
      w: "215",
      h: "36",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_UseLogoById.default, {
        id: "NDLSemi"
      })
    })
  });
};
var _default = LogoNasdaqDataLink;
exports.default = _default;
//# sourceMappingURL=LogoNasdaqDataLink.js.map