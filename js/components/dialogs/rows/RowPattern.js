"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _SpanToken = require("../../zhn/SpanToken");
var _InputPattern = _interopRequireDefault(require("../../zhn/InputPattern"));
var _crRowLabelStyle = _interopRequireDefault(require("./crRowLabelStyle"));
var _RowFlex = require("./RowFlex");
var _jsxRuntime = require("react/jsx-runtime");
const RowPattern = _ref => {
  let {
    refEl,
    isShowLabels,
    captionStyle,
    caption,
    ...inputPatternProps
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RowFlex.RowFlex, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanInputLabel, {
      style: (0, _crRowLabelStyle.default)({
        isShowLabels,
        captionStyle
      }),
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputPattern.default, {
      refEl: refEl,
      ...inputPatternProps
    })]
  });
};
var _default = exports.default = RowPattern;
//# sourceMappingURL=RowPattern.js.map