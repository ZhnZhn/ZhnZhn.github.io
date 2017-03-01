'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Link = require('./Link.Style');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EURONEXT_BASE = 'https://www.euronext.com/en/products/equities/',
    CAPTION = 'Euronext Link';

var EuronextLink = function EuronextLink(_ref) {
  var _ref$item = _ref.item,
      item = _ref$item === undefined ? {} : _ref$item,
      _ref$caption = _ref.caption,
      caption = _ref$caption === undefined ? CAPTION : _ref$caption;
  return _react2.default.createElement(
    'a',
    {
      className: 'native-link',
      style: _Link2.default.LINK,
      href: '' + EURONEXT_BASE + item.isin + '-' + item.market
    },
    caption + ' ' + item.caption
  );
};

exports.default = EuronextLink;
//# sourceMappingURL=EuronextLink.js.map