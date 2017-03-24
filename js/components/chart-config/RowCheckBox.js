'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgCheckBox = require('../zhn/SvgCheckBox');

var _SvgCheckBox2 = _interopRequireDefault(_SvgCheckBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  ROOT: {
    paddingTop: '6px',
    paddingLeft: '16px'
  },
  CAPTION: {
    display: 'inline-block',
    //color: '#a487d4',
    color: 'black',
    paddingLeft: '12px',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

var RowCheckBox = function RowCheckBox(_ref) {
  var caption = _ref.caption,
      onCheck = _ref.onCheck,
      onUnCheck = _ref.onUnCheck;
  return _react2.default.createElement(
    'div',
    { style: STYLE.ROOT },
    _react2.default.createElement(_SvgCheckBox2.default, {
      onCheck: onCheck,
      onUnCheck: onUnCheck
    }),
    _react2.default.createElement(
      'span',
      { style: STYLE.CAPTION },
      caption
    )
  );
};

process.env.NODE_ENV !== "production" ? RowCheckBox.propTypes = {
  caption: _react.PropTypes.string,
  onCheck: _react.PropTypes.func,
  onUnCheck: _react.PropTypes.func
} : void 0;

exports.default = RowCheckBox;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\chart-config\RowCheckBox.js.map