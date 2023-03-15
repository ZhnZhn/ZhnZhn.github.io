"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _InputSearch = _interopRequireDefault(require("../../zhn-search/InputSearch"));
var _crRowOptions = _interopRequireDefault(require("./crRowOptions"));
var _jsxRuntime = require("react/jsx-runtime");
const RowInputSearch = props => {
  const [rowStyle, labelStyle, caption, options] = (0, _crRowOptions.default)(props);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: rowStyle,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: labelStyle,
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSearch.default, {
      ...options
    })]
  });
};
var _default = RowInputSearch;
exports.default = _default;
//# sourceMappingURL=RowInputSearch.js.map