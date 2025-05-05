"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _IfTrue = require("./IfTrue");
var _DivHtml = _interopRequireDefault(require("./DivHtml"));
var _jsxRuntime = require("react/jsx-runtime");
const InfoPart = _ref => {
  let {
    style,
    caption,
    captionStyle,
    isHtml,
    text,
    textCn,
    textStyle
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_IfTrue.IfTrue, {
    v: text,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: style,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_IfTrue.IfTrue, {
        v: caption,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: captionStyle,
          children: caption + ":"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_IfTrue.IfTrueOr, {
        v: isHtml,
        children: ["[", /*#__PURE__*/(0, _jsxRuntime.jsx)(_DivHtml.default, {
          className: textCn,
          style: {
            ...textStyle,
            ..._styleFn.S_INLINE
          },
          str: text
        }), ", ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: textCn,
          style: textStyle,
          children: text
        }), "]"]
      })]
    })
  });
};
var _default = exports.default = InfoPart;
//# sourceMappingURL=InfoPart.js.map