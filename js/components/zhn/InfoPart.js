'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _renderText = function _renderText(text, classText, styleText, isHtml) {
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
};

var InfoPart = function InfoPart(props) {
  var rootStyle = props.rootStyle,
      caption = props.caption,
      styleCaption = props.styleCaption,
      text = props.text,
      classText = props.classText,
      styleText = props.styleText,
      isHtml = props.isHtml;

  if (!text) {
    return null;
  }
  return _react2.default.createElement(
    'div',
    { style: rootStyle },
    caption && _react2.default.createElement(
      'span',
      { style: styleCaption },
      caption
    ),
    _renderText(text, classText, styleText, isHtml)
  );
};

exports.default = InfoPart;
//# sourceMappingURL=InfoPart.js.map