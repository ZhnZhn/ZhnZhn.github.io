"use strict";

exports.__esModule = true;
exports.default = void 0;
var _BtSvgCircle = require("../zhn/BtSvgCircle");
var _SpanToken = require("../zhn/SpanToken");
var _Row = require("./Row.Style");
var _jsxRuntime = require("react/jsx-runtime");
const S_CAPTION = {
  ..._Row.S_INLINE_BLOCK_BOLD,
  padding: '0 8px 6px 0'
};
const RowPlusMinus = _ref => {
  let {
    is,
    styleCaption,
    caption,
    onMinus,
    onPlus
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBlack, {
      style: {
        ...S_CAPTION,
        ...styleCaption
      },
      children: caption
    }), is ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgCircle.SvgMinus, {
      onClick: onMinus
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgCircle.SvgPlus, {
      onClick: onPlus
    })]
  });
};
var _default = exports.default = RowPlusMinus;
//# sourceMappingURL=RowPlusMinus.js.map