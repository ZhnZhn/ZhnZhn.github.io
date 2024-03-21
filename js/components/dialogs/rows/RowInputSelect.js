"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _SpanToken = require("../../zhn/SpanToken");
var _InputSelect = _interopRequireDefault(require("../../zhn-select/InputSelect"));
var _crRowProps = _interopRequireDefault(require("./crRowProps"));
var _crRowLabelStyle = _interopRequireDefault(require("./crRowLabelStyle"));
var _RowFlex = require("./RowFlex");
var _useLabelId = _interopRequireDefault(require("./useLabelId"));
var _jsxRuntime = require("react/jsx-runtime");
const RowInputSelect = props => {
  const labelId = (0, _useLabelId.default)(props),
    [selectProps, caption] = (0, _crRowProps.default)(props);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RowFlex.RowFlex, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanInputLabel, {
      id: labelId,
      style: (0, _crRowLabelStyle.default)(props),
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSelect.default, {
      ...selectProps,
      labelId: labelId
    })]
  });
};
var _default = exports.default = RowInputSelect;
//# sourceMappingURL=RowInputSelect.js.map