'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Token = _react2.default.createClass({
  displayName: 'Token',
  render: function render() {
    var _props = this.props;
    var isFirstBalnk = _props.isFirstBalnk;
    var color = _props.color;
    var children = _props.children;

    return _react2.default.createElement(
      'span',
      { style: { color: color, fontWeight: 'bold' } },
      isFirstBalnk ? ' ' + children : children
    );
  }
});

exports.default = Token;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\about\Token.js.map