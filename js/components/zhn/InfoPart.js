'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InfoPart = _react2.default.createClass({
  displayName: 'InfoPart',
  render: function render() {
    var _props = this.props;
    var caption = _props.caption;
    var text = _props.text;
    var rootStyle = _props.rootStyle;
    var styleCaption = _props.styleCaption;

    return _react2.default.createElement(
      'div',
      { style: rootStyle },
      _react2.default.createElement(
        'span',
        { style: styleCaption },
        caption
      ),
      _react2.default.createElement(
        'span',
        null,
        text
      )
    );
  }
});

exports.default = InfoPart;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\InfoPart.js.map