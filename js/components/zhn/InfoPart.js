"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _DivHtml = _interopRequireDefault(require("./DivHtml"));

var _jsxRuntime = require("react/jsx-runtime");

const S_INLINE = {
  display: 'inline-block'
};

const InfoPart = ({
  style,
  caption,
  captionStyle,
  isHtml,
  text,
  textCn,
  textStyle
}) => {
  if (!text) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: style,
    children: [caption && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: captionStyle,
      children: caption + ":"
    }), isHtml ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_DivHtml.default, {
      className: textCn,
      style: { ...textStyle,
        ...S_INLINE
      },
      str: text
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: textCn,
      style: textStyle,
      children: text
    })]
  });
};

var _default = InfoPart;
exports.default = _default;
//# sourceMappingURL=InfoPart.js.map