'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _A = require('../zhn/A');

var _A2 = _interopRequireDefault(_A);

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
      styleCaption = _ref.styleCaption,
      caption = _ref.caption,
      onMinus = _ref.onMinus,
      onPlus = _ref.onPlus;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'span',
      { style: (0, _extends3.default)({}, S.CAPTION, styleCaption) },
      caption
    ),
    is ? _react2.default.createElement(_A2.default.SvgMinus, { onClick: onMinus }) : _react2.default.createElement(_A2.default.SvgPlus, { onClick: onPlus })
  );
};

exports.default = RowPlusMinus;
//# sourceMappingURL=RowPlusMinus.js.map