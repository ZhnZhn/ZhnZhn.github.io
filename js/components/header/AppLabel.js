'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppLabel = _react2.default.createClass({
  displayName: 'AppLabel',
  render: function render() {
    var _props = this.props;
    var style = _props.style;
    var title = _props.title;
    var caption = _props.caption;

    return _react2.default.createElement(
      'span',
      { style: style, title: title },
      caption
    );
  }
});

exports.default = AppLabel;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\header\AppLabel.js.map