"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _InputText = _interopRequireDefault(require("../zhn/InputText"));
var _BtSvgCircle = require("../zhn/BtSvgCircle");
var _SpanBlack = _interopRequireDefault(require("../zhn/SpanBlack"));
var _jsxRuntime = require("react/jsx-runtime");
const S_CAPTION = {
    display: 'inline-block',
    width: 48,
    fontWeight: 'bold'
  },
  S_INPUT_TEXT = {
    width: 56,
    marginRight: 12
  };
const RowCaptionInput = _ref => {
  let {
    caption,
    forwardRef,
    initValue,
    maxLength = 3,
    onAdd
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanBlack.default, {
      style: S_CAPTION,
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
      ref: forwardRef,
      type: "number",
      style: S_INPUT_TEXT,
      initValue: initValue,
      maxLength: maxLength,
      onEnter: onAdd
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgCircle.SvgPlus, {
      onClick: onAdd
    })]
  });
};
var _default = exports.default = RowCaptionInput;
//# sourceMappingURL=RowCaptionInput.js.map