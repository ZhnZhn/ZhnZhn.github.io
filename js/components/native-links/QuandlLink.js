'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  ROOT_URI: 'https://www.quandl.com/data/',
  CAPTION: 'Quandl Data Link',
  STYLE: {
    color: '#e05927'
  }
};

var QuandlLink = function QuandlLink(_ref) {
  var _ref$dbCode = _ref.dbCode,
      dbCode = _ref$dbCode === undefined ? '' : _ref$dbCode,
      _ref$dsCode = _ref.dsCode,
      dsCode = _ref$dsCode === undefined ? '' : _ref$dsCode,
      _ref$caption = _ref.caption,
      caption = _ref$caption === undefined ? C.CAPTION : _ref$caption;
  return _react2.default.createElement(_Link2.default, {
    style: C.STYLE,
    href: '' + C.ROOT_URI + dbCode + '/' + dsCode,
    caption: caption + ' ' + dbCode + '/' + dsCode
  });
};

exports.default = QuandlLink;
//# sourceMappingURL=QuandlLink.js.map