"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ItemStack = _interopRequireDefault(require("../zhn/ItemStack"));
var _LinkSvgLogo = _interopRequireDefault(require("./LinkSvgLogo"));
var _LinkLogo = _interopRequireDefault(require("./LinkLogo"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_ROOT = 'logo-container',
  LOGO_SVG_PROPS = {
    fillRule: "evenodd",
    clipRule: "evenodd",
    strokeLinejoin: "round",
    strokeMiterlimit: "1.414"
  };
const LINK_SVG_LOGO_CONFS = [['logo-ndl', 'https://data.nasdaq.com', 'NDLSemi', {
    w: '215',
    h: '36'
  }], ['logo-github', 'https://github.com/ZhnZhn/ZhnZhn.github.io', 'GitHub', {
    ...LOGO_SVG_PROPS,
    w: '16'
  }], ['logo-react', 'https://reactjs.org', 'React', {
    ...LOGO_SVG_PROPS,
    w: '600'
  }], ['logo-highcharts', 'https://www.highcharts.com', 'Highcharts', {
    ...LOGO_SVG_PROPS,
    w: '425.197',
    h: '141.732'
  }]],
  LINK_LOGO_CONFS = [['https://ec.europa.eu/eurostat', 'eurostat'], ['https://comtrade.un.org', 'UN Comtrade'], ['https://www.fao.org/faostat/en/#data', 'FAOSTAT']];
const _crLinkSvgLogo = _ref => {
  let [className, href, id, svgProps] = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LinkSvgLogo.default, {
    id: id,
    className: className,
    href: href,
    svgProps: svgProps
  }, id);
};
const _crLinkLogo = _ref2 => {
  let [href, caption] = _ref2;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LinkLogo.default, {
    href: href,
    caption: caption
  }, caption);
};
const LogosBar = () => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
  className: CL_ROOT,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
    items: LINK_SVG_LOGO_CONFS,
    crItem: _crLinkSvgLogo
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
    items: LINK_LOGO_CONFS,
    crItem: _crLinkLogo
  })]
});
var _default = exports.default = LogosBar;
//# sourceMappingURL=LogosBar.js.map