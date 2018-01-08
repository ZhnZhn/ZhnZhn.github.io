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
    color: '#FDB316',
    fontWeight: 'bold'
  }
};

var SpanDate = function SpanDate(_ref) {
  var date = _ref.date,
      style = _ref.style;
  return _react2.default.createElement(
    'span',
    { style: (0, _extends3.default)({}, STYLE.ROOT, style) },
    date
  );
};

exports.default = SpanDate;
//# sourceMappingURL=SpanDate.js.map