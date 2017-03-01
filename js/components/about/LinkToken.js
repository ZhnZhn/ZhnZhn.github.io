'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LinkToken = function LinkToken(props) {
  var isFirstBlank = props.isFirstBlank,
      color = props.color,
      href = props.href,
      children = props.children,
      _firstChart = isFirstBlank ? ' ' : undefined;

  return _react2.default.createElement(
    'a',
    {
      className: 'descr__quandl-link',
      style: { color: color },
      target: '_blank',
      href: href
    },
    _firstChart,
    children
  );
};

exports.default = LinkToken;
//# sourceMappingURL=LinkToken.js.map