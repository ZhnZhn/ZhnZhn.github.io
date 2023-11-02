"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _A = _interopRequireDefault(require("../zhn/A"));
var _SpanBlack = _interopRequireDefault(require("../zhn/SpanBlack"));
var _jsxRuntime = require("react/jsx-runtime");
const S_CAPTION = {
    display: 'inline-block',
    width: 120,
    fontWeight: 'bold'
  },
  S_INPUT_TEXT = {
    width: 46,
    marginRight: 12
  };
const RowTypeB = _ref => {
  let {
    forwardRef,
    caption,
    initValue,
    min,
    max,
    maxLength,
    onAdd
  } = _ref;
  const [isPlus, setIsPlus] = (0, _uiApi.useState)(true),
    _onAdd = isPlus ? () => {
      setIsPlus(!onAdd());
    } : void 0;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanBlack.default, {
      style: S_CAPTION,
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_A.default.InputText, {
      ref: forwardRef,
      type: "number",
      style: S_INPUT_TEXT,
      initValue: initValue,
      maxLength: maxLength,
      min: min,
      max: max,
      onEnter: _onAdd
    }), isPlus && /*#__PURE__*/(0, _jsxRuntime.jsx)(_A.default.SvgPlus, {
      onClick: _onAdd
    })]
  });
};
var _default = exports.default = RowTypeB;
//# sourceMappingURL=RowTypeB.js.map