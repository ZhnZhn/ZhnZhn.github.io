"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ItemStack = _interopRequireDefault(require("../zhn/ItemStack"));
var _Svg = require("../zhn/svg/Svg");
var _LinkSvgLogo = _interopRequireDefault(require("./LinkSvgLogo"));
var _LinkLogo = _interopRequireDefault(require("./LinkLogo"));
var _jsxRuntime = require("react/jsx-runtime");
const _crHref = domain => `https://${domain}`,
  _crAriaLabel = websiteName => `Visit ${websiteName}`,
  _crLogoCn = suffix => `logo-${suffix.toLowerCase()}`,
  CL_ROOT = _crLogoCn('container'),
  GITHUB = 'GitHub',
  REACT = 'React',
  HIGHCHARTS = 'Highcharts',
  LINK_SVG_LOGO_CONFS = [['Nasdaq Data Link', 'ndl', 'data.nasdaq.com', 'NDLSemi', {
    w: '215',
    h: '36'
  }], [`${GITHUB} repository of web app ERC`, GITHUB, 'github.com/ZhnZhn/ZhnZhn.github.io', GITHUB, {
    ..._Svg.EVENODD_PROPS,
    w: '16'
  }], [REACT, REACT, 'react.dev', REACT, {
    ..._Svg.EVENODD_PROPS,
    w: '600'
  }], [HIGHCHARTS, HIGHCHARTS, `www.highcharts.com`, HIGHCHARTS, {
    ..._Svg.EVENODD_PROPS,
    w: '425.197',
    h: '141.732'
  }]].map(_ref => {
    let [ariaLabelSuffix, logoCnSuffix, domain, id, svgProps] = _ref;
    return [_crAriaLabel(ariaLabelSuffix), _crLogoCn(logoCnSuffix), _crHref(domain), id, svgProps];
  }),
  LINK_LOGO_CONFS = [[_crHref('ec.europa.eu/eurostat'), 'eurostat'], [_crHref('comtrade.un.org'), 'UN Comtrade'], [_crHref('www.fao.org/faostat/en/#data'), 'FAOSTAT']];
const _crLinkSvgLogo = _ref2 => {
  let [ariaLabel, className, href, id, svgProps] = _ref2;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LinkSvgLogo.default, {
    id: id,
    ariaLabel: ariaLabel,
    className: className,
    href: href,
    svgProps: svgProps
  }, id);
};
const _crLinkLogo = _ref3 => {
  let [href, caption] = _ref3;
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