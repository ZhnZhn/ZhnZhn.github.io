'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Token = function Token(props) {
   var isFirstBlank = props.isFirstBlank;
   var color = props.color;
   var children = props.children;
   var _firstChart = isFirstBlank ? ' ' : undefined;
   return _react2.default.createElement(
      'span',
      { style: { color: color, fontWeight: 'bold' } },
      _firstChart,
      children
   );
};

exports.default = Token;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\about\Token.js.map