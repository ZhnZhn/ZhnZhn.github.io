'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ThemeContext = require('../hoc/ThemeContext');

var _ThemeContext2 = _interopRequireDefault(_ThemeContext);

var _LogoQuandl = require('./LogoQuandl');

var _LogoQuandl2 = _interopRequireDefault(_LogoQuandl);

var _LogoGitHub = require('./LogoGitHub');

var _LogoGitHub2 = _interopRequireDefault(_LogoGitHub);

var _LogoReact = require('./LogoReact');

var _LogoReact2 = _interopRequireDefault(_LogoReact);

var _LogoHighcharts = require('./LogoHighcharts');

var _LogoHighcharts2 = _interopRequireDefault(_LogoHighcharts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      className = _ref$className === undefined ? CL.LOGO : _ref$className,
      title = _ref.title,
      caption = _ref.caption,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['className', 'title', 'caption']);
  return _react2.default.createElement(
    'a',
    (0, _extends3.default)({
      className: className,
      title: title || caption
    }, rest),
    caption
  );
};

var LogosBar = function LogosBar() {
  var theme = (0, _react.useContext)(_ThemeContext2.default),
      TS = theme.getStyle(TH_ID);
  return _react2.default.createElement(
    'div',
    { className: CL.ROOT, style: TS.ROOT },
    _react2.default.createElement(_LogoQuandl2.default, { className: CL.LI }),
    _react2.default.createElement(_LogoGitHub2.default, {
      className: CL.LI,
      href: 'https://github.com/ZhnZhn/ZhnZhn.github.io' }),
    _react2.default.createElement(_LogoReact2.default, { className: CL.LI }),
    _react2.default.createElement(_LogoHighcharts2.default, { className: CL.LI }),
    LOGO_CONFS.map(function (config) {
      return _react2.default.createElement(Logo, (0, _extends3.default)({ key: config.caption }, config));
    })
  );
};

exports.default = LogosBar;
//# sourceMappingURL=LogosBar.js.map