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
  URL: 'https://data.bls.gov/timeseries'
};

var BslLink = function BslLink(_ref) {
  var _ref$item = _ref.item,
      item = _ref$item === undefined ? '' : _ref$item;
  return _react2.default.createElement(_Link2.default, {
    className: 'native-link',
    href: C.URL + '/' + item,
    caption: 'BSL Data Link'
  });
};

exports.default = BslLink;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\native-links\BslLink.js.map