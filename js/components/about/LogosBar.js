"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _ThemeContext = _interopRequireDefault(require("../hoc/ThemeContext"));
var _ItemStack = _interopRequireDefault(require("../zhn/ItemStack"));
var _LinkSvgLogo = _interopRequireDefault(require("./LinkSvgLogo"));
var _LinkLogo = _interopRequireDefault(require("./LinkLogo"));
var _jsxRuntime = require("react/jsx-runtime");
const TH_ID = 'LOGOS',
  CL_ROOT = 'logo-container',
  LOGO_SVG_PROPS = {
    fillRule: "evenodd",
    clipRule: "evenodd",
    strokeLinejoin: "round",
    strokeMiterlimit: "1.414"
  };
const LINK_SVG_LOGO_CONFS = [['Nasdaq Data Link', 'logo-ndl', 'https://data.nasdaq.com', 'NDLSemi', {
    w: '215',
    h: '36'
  }], ['GitHub Repository', 'logo-github', 'https://github.com/ZhnZhn/ZhnZhn.github.io', 'GitHub', {
    ...LOGO_SVG_PROPS,
    w: '16'
  }], ['React', 'logo-react', 'https://reactjs.org', 'React', {
    ...LOGO_SVG_PROPS,
    w: '600'
  }], ['Highcharts', 'logo-highcharts', 'https://www.highcharts.com', 'Highcharts', {
    ...LOGO_SVG_PROPS,
    w: '425.197',
    h: '141.732'
  }]],
  LINK_LOGO_CONFS = [['https://ec.europa.eu/eurostat', 'eurostat', 'Eurostat'], ['https://comtrade.un.org', 'UN Comtrade'], ['https://www.fao.org/faostat/en/#data', 'FAOSTAT']];
const _crLinkSvgLogo = _ref => {
  let [ariaLabel, className, href, id, svgProps] = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LinkSvgLogo.default, {
    ariaLabel: ariaLabel,
    className: className,
    href: href,
    id: id,
    svgProps: svgProps
  }, id);
};
const _crLinkLogo = _ref2 => {
  let [href, caption, ariaLabel] = _ref2;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LinkLogo.default, {
    href: href,
    caption: caption,
    ariaLabel: ariaLabel
  }, caption);
};
const LogosBar = () => {
  const theme = (0, _uiApi.useContext)(_ThemeContext.default),
    TS = theme.getStyle(TH_ID);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_ROOT,
    style: TS.ROOT,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
      items: LINK_SVG_LOGO_CONFS,
      crItem: _crLinkSvgLogo
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
      items: LINK_LOGO_CONFS,
      crItem: _crLinkLogo
    })]
  });
};
var _default = LogosBar;
exports.default = _default;
//# sourceMappingURL=LogosBar.js.map