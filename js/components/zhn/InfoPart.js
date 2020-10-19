"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

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

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: style,
    children: [caption && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: styleCaption,
      children: caption + ":"
    }), isHtml ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_DivHtml["default"], {
      className: classText,
      style: (0, _extends2["default"])({}, styleText, S.INLINE),
      str: text
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: classText,
      style: styleText,
      children: text
    })]
  });
};

var _default = InfoPart;
exports["default"] = _default;
//# sourceMappingURL=InfoPart.js.map