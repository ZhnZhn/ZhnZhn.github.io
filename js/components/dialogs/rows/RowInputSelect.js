"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _SpanToken = require("../../zhn/SpanToken");
var _InputSelect = _interopRequireDefault(require("../../zhn-select/InputSelect"));
var _crRowProps = _interopRequireDefault(require("./crRowProps"));
var _jsxRuntime = require("react/jsx-runtime");
const RowInputSelect = props => {
  const [rowStyle, labelStyle, selectProps, caption] = (0, _crRowProps.default)(props);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: rowStyle,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanInputLabel, {
      style: labelStyle,
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSelect.default, {
      ...selectProps
    })]
  });
};
var _default = exports.default = RowInputSelect;
//# sourceMappingURL=RowInputSelect.js.map