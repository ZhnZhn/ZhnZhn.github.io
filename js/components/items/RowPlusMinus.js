'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgPlus = require('../zhn/SvgPlus');

var _SvgPlus2 = _interopRequireDefault(_SvgPlus);

var _SvgMinus = require('../zhn/SvgMinus');

var _SvgMinus2 = _interopRequireDefault(_SvgMinus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  CAPTION: {
    display: 'inline-block',
    color: 'black',
    paddingRight: 8,
    paddingBottom: 6,
    fontWeight: 'bold'
  }
};

var RowPlusMinus = function RowPlusMinus(_ref) {
  var is = _ref.is,
      caption = _ref.caption,
      onMinus = _ref.onMinus,
      onPlus = _ref.onPlus;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'span',
      { style: S.CAPTION },
      caption
    ),
    is ? _react2.default.createElement(_SvgMinus2.default, { onClick: onMinus }) : _react2.default.createElement(_SvgPlus2.default, { onClick: onPlus })
  );
};

exports.default = RowPlusMinus;
//# sourceMappingURL=RowPlusMinus.js.map