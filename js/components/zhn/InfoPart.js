'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InfoPart = _react2.default.createClass({
  displayName: 'InfoPart',
  _renderText: function _renderText(text, classText, styleText, isHtml) {
    if (!isHtml) {
      return _react2.default.createElement(
        'span',
        {
          className: classText,
          style: styleText
        },
        text
      );
    } else {
      return _react2.default.createElement('span', {
        className: classText,
        style: styleText,
        dangerouslySetInnerHTML: { __html: text }
      });
    }
  },
  render: function render() {
    var _props = this.props;
    var caption = _props.caption;
    var text = _props.text;
    var classText = _props.classText;
    var rootStyle = _props.rootStyle;
    var styleCaption = _props.styleCaption;
    var styleText = _props.styleText;
    var isHtml = _props.isHtml;

    return _react2.default.createElement(
      'div',
      { style: rootStyle },
      _react2.default.createElement(
        'span',
        { style: styleCaption },
        caption
      ),
      this._renderText(text, classText, styleText, isHtml)
    );
  }
});

exports.default = InfoPart;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\InfoPart.js.map