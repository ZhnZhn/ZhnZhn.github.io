'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  ROOT_DIV: {
    margin: '5px',
    lineHeight: 2,
    fontWeight: 'bold'
  },
  LABEL_SPAN: {
    color: '#1B75BB',
    display: 'inline-block',
    textAlign: 'right',
    width: '100px',
    paddingRight: '5px',
    fontSize: '16px'
  }
};

var RowText = function RowText(_ref) {
  var caption = _ref.caption,
      text = _ref.text,
      styleRoot = _ref.styleRoot;

  return _react2.default.createElement(
    'div',
    { style: Object.assign({}, STYLE.ROOT_DIV, styleRoot) },
    _react2.default.createElement(
      'span',
      { style: STYLE.LABEL_SPAN },
      caption
    ),
    _react2.default.createElement(
      'span',
      null,
      text
    )
  );
};

exports.default = RowText;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\RowText.js.map