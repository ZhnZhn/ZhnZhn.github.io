'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  ROOT: {
    display: 'inline-block',
    backgroundColor: '#949ab4',
    width: '32px',
    lineHeight: '2.0',
    borderRadius: '50%',
    textAlign: 'center',
    fontWeight: 'bold',
    verticalAlign: 'middle',
    cursor: 'pointer'
  }
};

var ButtonCircle2 = function ButtonCircle2(_ref) {
  var style = _ref.style,
      _ref$caption = _ref.caption,
      caption = _ref$caption === undefined ? '' : _ref$caption,
      onClick = _ref.onClick,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['style', 'caption', 'onClick']);
  return _react2.default.createElement(
    'button',
    (0, _extends3.default)({
      style: (0, _extends3.default)({}, S.ROOT, style),
      onClick: onClick
    }, rest),
    caption
  );
};

exports.default = ButtonCircle2;
//# sourceMappingURL=ButtonCircle2.js.map