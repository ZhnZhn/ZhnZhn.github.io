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
  var caption = props.caption,
      text = props.text,
      classText = props.classText,
      rootStyle = props.rootStyle,
      styleCaption = props.styleCaption,
      styleText = props.styleText,
      isHtml = props.isHtml;

  return _react2.default.createElement(
    'div',
    { style: rootStyle },
    _react2.default.createElement(
      'span',
      { style: styleCaption },
      caption
    ),
    _renderText(text, classText, styleText, isHtml)
  );
};

exports.default = InfoPart;
//# sourceMappingURL=InfoPart.js.map