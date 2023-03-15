"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _DialogStyles = require("../../styles/DialogStyles");
var _InputPattern = _interopRequireDefault(require("../../zhn/InputPattern"));
var _jsxRuntime = require("react/jsx-runtime");
const RowPattern = (0, _uiApi.forwardRef)((_ref, ref) => {
  let {
    isShowLabels,
    captionStyle,
    caption,
    ...rest
  } = _ref;
  const [rowStyle, labelStyle] = (0, _DialogStyles.crRowLabelStyle)(isShowLabels, captionStyle);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: rowStyle,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: labelStyle,
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputPattern.default, {
      ref: ref,
      ...rest
    })]
  });
});
var _default = RowPattern;
exports.default = _default;
//# sourceMappingURL=RowPattern.js.map