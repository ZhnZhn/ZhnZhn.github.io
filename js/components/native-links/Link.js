'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Link = require('./Link.Style');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = function Link(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === undefined ? 'native-link' : _ref$className,
      style = _ref.style,
      href = _ref.href,
      _ref$caption = _ref.caption,
      caption = _ref$caption === undefined ? 'Native Link' : _ref$caption;

  if (!href) {
    return null;
  }

  return _react2.default.createElement(
    'a',
    {
      className: className,
      style: (0, _extends3.default)({}, _Link2.default.LINK, style),
      href: href
    },
    caption
  );
};

exports.default = Link;
//# sourceMappingURL=Link.js.map