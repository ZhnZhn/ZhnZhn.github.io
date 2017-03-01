'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppLabel = function AppLabel(_ref) {
  var className = _ref.className,
      caption = _ref.caption,
      title = _ref.title;
  return _react2.default.createElement(
    'span',
    {
      className: className,
      title: title
    },
    caption
  );
};

exports.default = AppLabel;
//# sourceMappingURL=AppLabel.js.map