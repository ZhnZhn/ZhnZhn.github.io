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
    color: '#2F7ED8',
    fontWeight: 'bold',
    whiteSpace: 'nowrap'
  }
};

var SpanValue = function SpanValue(_ref) {
  var value = _ref.value,
      style = _ref.style;
  return _react2.default.createElement(
    'span',
    { style: (0, _extends3.default)({}, STYLE.ROOT, style) },
    value
  );
};

exports.default = SpanValue;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-span\SpanValue.js.map