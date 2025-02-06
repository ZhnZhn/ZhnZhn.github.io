"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _InputText = _interopRequireDefault(require("../zhn/InputText"));
var _BtSvgCircle = require("../zhn/BtSvgCircle");
var _SpanToken = require("../zhn/SpanToken");
var _jsxRuntime = require("react/jsx-runtime");
const S_CAPTION = {
    display: 'inline-block',
    width: 48
  },
  S_INPUT_TEXT = {
    width: 56,
    marginRight: 12
  };
const RowCaptionInput = _ref => {
  let {
    refEl,
    isBtAdd = true,
    style,
    captionStyle,
    caption,
    initValue,
    maxLength = 3,
    onAdd
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanBoldBlack, {
      style: {
        ...S_CAPTION,
        ...captionStyle
      },
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
      refEl: refEl,
      type: "number",
      style: S_INPUT_TEXT,
      initValue: initValue,
      maxLength: maxLength,
      onEnter: onAdd
    }), isBtAdd ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgCircle.SvgPlus, {
      onClick: onAdd
    }) : null]
  });
};
var _default = exports.default = RowCaptionInput;
//# sourceMappingURL=RowCaptionInput.js.map