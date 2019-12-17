"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _renderText = function _renderText(text, classText, styleText, isHtml) {
  return !isHtml ? _react["default"].createElement("span", {
    className: classText,
    style: styleText
  }, text) : _react["default"].createElement("span", {
    className: classText,
    style: styleText,
    dangerouslySetInnerHTML: {
      __html: text
    }
  });
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

  return _react["default"].createElement("div", {
    style: rootStyle
  }, caption && _react["default"].createElement("span", {
    style: styleCaption
  }, caption), _renderText(text, classText, styleText, isHtml));
};

var _default = InfoPart;
exports["default"] = _default;
//# sourceMappingURL=InfoPart.js.map