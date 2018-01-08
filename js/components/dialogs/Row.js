'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  ROOT_DIV: {
    margin: '5px',
    lineHeight: 2,
    fontWeight: 'bold'
  },
  LABEL_SPAN: {
    display: 'inline-block',
    color: '#1B75BB',
    width: '100px',
    paddingRight: '5px',
    textAlign: 'right',
    fontSize: '16px'
  }
};

var Plain = function Plain(_ref) {
  var style = _ref.style,
      children = _ref.children;
  return _react2.default.createElement(
    'div',
    { style: (0, _extends3.default)({}, _DialogStyles2.default.rowDiv, style) },
    children
  );
};

var Text = function Text(_ref2) {
  var caption = _ref2.caption,
      text = _ref2.text,
      styleRoot = _ref2.styleRoot;

  return _react2.default.createElement(
    'div',
    { style: (0, _extends3.default)({}, S.ROOT_DIV, styleRoot) },
    _react2.default.createElement(
      'span',
      { style: S.LABEL_SPAN },
      caption
    ),
    _react2.default.createElement(
      'span',
      null,
      text
    )
  );
};

exports.default = { Plain: Plain, Text: Text };
//# sourceMappingURL=Row.js.map