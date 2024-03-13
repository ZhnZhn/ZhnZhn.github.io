"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _SpanToken = require("../../zhn/SpanToken");
var _InputSearch = _interopRequireDefault(require("../../zhn-search/InputSearch"));
var _crRowProps = _interopRequireDefault(require("./crRowProps"));
var _crRowLabelStyle = _interopRequireDefault(require("./crRowLabelStyle"));
var _RowFlex = require("./RowFlex");
var _jsxRuntime = require("react/jsx-runtime");
const RowInputSearch = props => {
  const [inputProps, caption] = (0, _crRowProps.default)(props);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RowFlex.RowFlex, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanInputLabel, {
      style: (0, _crRowLabelStyle.default)(props),
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSearch.default, {
      ...inputProps
    })]
  });
};
var _default = exports.default = RowInputSearch;
//# sourceMappingURL=RowInputSearch.js.map