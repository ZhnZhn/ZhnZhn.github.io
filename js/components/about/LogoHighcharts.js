"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Svg = _interopRequireDefault(require("../zhn/svg/Svg100"));
var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));
var _StyleLogo = require("./StyleLogo");
var _UseLogoById = _interopRequireDefault(require("./UseLogoById"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_LOGO_HIGHCHARTS = 'logo-highcharts',
  DF_ARIA_LABEL = 'Highcharts',
  HREF = 'https://www.highcharts.com';
const IconHighcharts = _ref => {
  let {
    ariaLabel = DF_ARIA_LABEL,
    className
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
    "aria-label": ariaLabel,
    className: (0, _crCn.default)(className, CL_LOGO_HIGHCHARTS),
    href: HREF,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.default, {
      ..._StyleLogo.LOGO_SVG_PROPS,
      w: "425.197",
      h: "141.732",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_UseLogoById.default, {
        id: "Highcharts"
      })
    })
  });
};
var _default = IconHighcharts;
exports.default = _default;
//# sourceMappingURL=LogoHighcharts.js.map