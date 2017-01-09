'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Link = require('./Link.Style');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QUANDL_DATA_BASE = 'https://www.quandl.com/data/',
    CAPTION = 'Quandl Data Link';

var QuandlLink = function QuandlLink(_ref) {
  var _ref$dbCode = _ref.dbCode,
      dbCode = _ref$dbCode === undefined ? '' : _ref$dbCode,
      _ref$dsCode = _ref.dsCode,
      dsCode = _ref$dsCode === undefined ? '' : _ref$dsCode,
      _ref$caption = _ref.caption,
      caption = _ref$caption === undefined ? CAPTION : _ref$caption;
  return _react2.default.createElement(
    'a',
    {
      className: 'descr__quandl-link',
      style: _Link2.default.LINK,
      href: '' + QUANDL_DATA_BASE + dbCode + '/' + dsCode
    },
    caption + ' ' + dbCode + '/' + dsCode
  );
};

exports.default = QuandlLink;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\native-links\QuandlLink.js.map