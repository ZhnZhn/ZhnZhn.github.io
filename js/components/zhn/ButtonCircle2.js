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

var CL = 'zhn-bt-circle2';

var ButtonCircle2 = function ButtonCircle2(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className,
      style = _ref.style,
      _ref$caption = _ref.caption,
      caption = _ref$caption === undefined ? '' : _ref$caption,
      onClick = _ref.onClick,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['className', 'style', 'caption', 'onClick']);
  return _react2.default.createElement(
    'button',
    (0, _extends3.default)({
      className: CL + ' ' + className,
      style: style,
      onClick: onClick
    }, rest),
    _react2.default.createElement(
      'div',
      null,
      caption
    )
  );
};

exports.default = ButtonCircle2;
//# sourceMappingURL=ButtonCircle2.js.map