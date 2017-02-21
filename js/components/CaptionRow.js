'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgClose = require('./SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  ROOT: {
    backgroundColor: '#232F3B',
    color: 'rgba(164, 135, 212, 1)',
    height: '28px',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    paddingTop: '4px',
    paddingLeft: '10px',
    marginRight: '5px',
    marginBottom: '10px'
  },
  CAPTION: {
    fontSize: '18px',
    fontWeight: '500',
    paddingRight: '8px'
  }
};

var CaptionRow = function CaptionRow(_ref) {
  var caption = _ref.caption,
      children = _ref.children,
      onClose = _ref.onClose;
  return _react2.default.createElement(
    'div',
    { style: STYLE.ROOT },
    _react2.default.createElement(
      'span',
      {
        className: 'not-selected',
        style: STYLE.CAPTION
      },
      caption
    ),
    children,
    _react2.default.createElement(_SvgClose2.default, { onClose: onClose })
  );
};

exports.default = CaptionRow;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\CaptionRow.js.map