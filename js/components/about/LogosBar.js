"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _ThemeContext = _interopRequireDefault(require("../hoc/ThemeContext"));

var _ItemStack = _interopRequireDefault(require("../zhn/ItemStack"));

var _LogoNasdaqDataLink = _interopRequireDefault(require("./LogoNasdaqDataLink"));

var _LogoGitHub = _interopRequireDefault(require("./LogoGitHub"));

var _LogoReact = _interopRequireDefault(require("./LogoReact"));

var _LogoHighcharts = _interopRequireDefault(require("./LogoHighcharts"));

var _jsxRuntime = require("react/jsx-runtime");

const TH_ID = 'LOGOS',
      CL_ROOT = 'logo-container',
      CL_LI = 'logo-item',
      CL_LOGO = 'logo-item data-provider-logo';
const LOGO_CONFS = [{
  caption: 'eurostat',
  title: 'Eurostat',
  href: 'https://ec.europa.eu/eurostat'
}, {
  caption: 'UN Comtrade',
  href: 'https://comtrade.un.org'
}, {
  caption: 'FAOSTAT',
  href: 'https://www.fao.org/faostat/en/#data'
}];

const Logo = _ref => {
  let {
    className = CL_LOGO,
    title,
    caption,
    ...rest
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
    className: className,
    title: title || caption,
    ...rest,
    children: caption
  });
};

const _crLogoItem = config => /*#__PURE__*/(0, _jsxRuntime.jsx)(Logo, { ...config
}, config.caption);

const LogosBar = () => {
  const theme = (0, _react.useContext)(_ThemeContext.default),
        TS = theme.getStyle(TH_ID);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_ROOT,
    style: TS.ROOT,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LogoNasdaqDataLink.default, {
      className: CL_LI
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LogoGitHub.default, {
      className: CL_LI,
      href: "https://github.com/ZhnZhn/ZhnZhn.github.io"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LogoReact.default, {
      className: CL_LI
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LogoHighcharts.default, {
      className: CL_LI
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
      items: LOGO_CONFS,
      crItem: _crLogoItem
    })]
  });
};

var _default = LogosBar;
exports.default = _default;
//# sourceMappingURL=LogosBar.js.map