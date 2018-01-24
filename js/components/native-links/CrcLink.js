'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = "native-link";
var URL = 'https://www.cryptocompare.com/coins/';

var CrcLink = function CrcLink(_ref) {
  var item = _ref.item,
      style = _ref.style;
  return _react2.default.createElement(_Link2.default, {
    className: CL,
    style: style,
    caption: 'CryptoCompare Overview (' + item + ')',
    href: '' + URL + item + '/overview'
  });
};

exports.default = CrcLink;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\native-links\CrcLink.js.map