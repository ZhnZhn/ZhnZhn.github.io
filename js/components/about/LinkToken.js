'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LinkToken = _react2.default.createClass({
  displayName: 'LinkToken',
  render: function render() {
    var _props = this.props;
    var isFirstBlank = _props.isFirstBlank;
    var color = _props.color;
    var href = _props.href;
    var children = _props.children;
    var _firstChart = isFirstBlank ? ' ' : undefined;
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
  }
});

exports.default = LinkToken;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\about\LinkToken.js.map