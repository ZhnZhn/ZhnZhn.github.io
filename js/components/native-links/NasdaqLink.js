'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NASDAQ_BASE = 'https://www.nasdaq.com/symbol/',
    CAPTION = 'NASDAQ Link';

var NasdaqLink = function NasdaqLink(_ref) {
  var _ref$item = _ref.item,
      item = _ref$item === undefined ? {} : _ref$item,
      _ref$caption = _ref.caption,
      caption = _ref$caption === undefined ? CAPTION : _ref$caption,
      style = _ref.style;

  var _item$text = item.text,
      text = _item$text === undefined ? '' : _item$text,
      value = item.value,
      _ticket = value ? value.trim() : text.split('-')[0].trim();

  return _react2.default.createElement(_Link2.default, {
    className: 'native-link',
    style: style,
    href: '' + NASDAQ_BASE + _ticket,
    caption: caption + ' ' + _ticket
  });
};

exports.default = NasdaqLink;
//# sourceMappingURL=NasdaqLink.js.map