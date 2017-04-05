'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  ROOT: {
    color: '#1b75bb',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

var SpanLabel = function SpanLabel(_ref) {
  var label = _ref.label,
      style = _ref.style;
  return _react2.default.createElement(
    'span',
    { style: (0, _extends3.default)({}, STYLE.ROOT, style) },
    label
  );
};

exports.default = SpanLabel;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-span\SpanLabel.js.map