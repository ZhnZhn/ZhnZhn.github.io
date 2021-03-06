"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _ThemeContext = _interopRequireDefault(require("../hoc/ThemeContext"));

var _LogoQuandl = _interopRequireDefault(require("./LogoQuandl"));

var _LogoGitHub = _interopRequireDefault(require("./LogoGitHub"));

var _LogoReact = _interopRequireDefault(require("./LogoReact"));

var _LogoHighcharts = _interopRequireDefault(require("./LogoHighcharts"));

var TH_ID = 'LOGOS';
var CL = {
  ROOT: 'logo-container',
  LI: 'logo-item',
  LOGO: 'logo-item data-provider-logo'
};
var LOGO_CONFS = [{
  caption: 'eurostat',
  title: 'Eurostat',
  href: 'http://ec.europa.eu/eurostat'
}, {
  caption: 'UN Comtrade',
  href: 'https://comtrade.un.org'
}, {
  caption: 'FAOSTAT',
  href: 'http://www.fao.org/faostat/en/#data'
}];

var Logo = function Logo(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? CL.LOGO : _ref$className,
      title = _ref.title,
      caption = _ref.caption,
      rest = (0, _objectWithoutPropertiesLoose2["default"])(_ref, ["className", "title", "caption"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("a", (0, _extends2["default"])({
    className: className,
    title: title || caption
  }, rest, {
    children: caption
  }));
};

var LogosBar = function LogosBar() {
  var theme = (0, _react.useContext)(_ThemeContext["default"]),
      TS = theme.getStyle(TH_ID);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL.ROOT,
    style: TS.ROOT,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LogoQuandl["default"], {
      className: CL.LI
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LogoGitHub["default"], {
      className: CL.LI,
      href: "https://github.com/ZhnZhn/ZhnZhn.github.io"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LogoReact["default"], {
      className: CL.LI
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LogoHighcharts["default"], {
      className: CL.LI
    }), LOGO_CONFS.map(function (config) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(Logo, (0, _extends2["default"])({}, config), config.caption);
    })]
  });
};

var _default = LogosBar;
exports["default"] = _default;
//# sourceMappingURL=LogosBar.js.map