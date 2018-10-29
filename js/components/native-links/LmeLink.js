'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BASE_URL = 'https://www.lme.com/metals/non-ferrous/';
var LME = 'London Metal Exchange: ';

var LmeLink = function LmeLink(_ref) {
  var _ref$item = _ref.item,
      item = _ref$item === undefined ? {} : _ref$item;

  var _item$caption = item.caption,
      caption = _item$caption === undefined ? '' : _item$caption,
      _path = String(caption).toLowerCase().replace(' ', '-');

  return _react2.default.createElement(_Link2.default, {
    caption: LME + caption,
    href: BASE_URL + _path
  });
};

exports.default = LmeLink;
//# sourceMappingURL=LmeLink.js.map