"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _DivHtml = _interopRequireDefault(require("./DivHtml"));

var S = {
  INLINE: {
    display: 'inline-block'
  }
};

var InfoPart = function InfoPart(props) {
  var style = props.style,
      caption = props.caption,
      styleCaption = props.styleCaption,
      isHtml = props.isHtml,
      text = props.text,
      classText = props.classText,
      styleText = props.styleText;

  if (!text) {
    return null;
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: style
  }, caption && /*#__PURE__*/_react["default"].createElement("span", {
    style: styleCaption
  }, caption + ":"), isHtml ? /*#__PURE__*/_react["default"].createElement(_DivHtml["default"], {
    className: classText,
    style: (0, _extends2["default"])({}, styleText, S.INLINE),
    str: text
  }) : /*#__PURE__*/_react["default"].createElement("span", {
    className: classText,
    style: styleText
  }, text));
};

var _default = InfoPart;
exports["default"] = _default;
//# sourceMappingURL=InfoPart.js.map