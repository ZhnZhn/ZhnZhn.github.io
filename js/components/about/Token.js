'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Token = function Token(props) {
   var isFirstBlank = props.isFirstBlank,
       color = props.color,
       children = props.children,
       _firstChart = isFirstBlank ? ' ' : undefined;

   return _react2.default.createElement(
      'span',
      { style: { color: color, fontWeight: 'bold' } },
      _firstChart,
      children
   );
};

exports.default = Token;
//# sourceMappingURL=Token.js.map