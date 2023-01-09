"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _SeriaRow = _interopRequireDefault(require("./SeriaRow"));
var _jsxRuntime = require("react/jsx-runtime");
const PasteToSeriaList = _ref => {
  let {
    chartId,
    series,
    options,
    onReg,
    onUnReg
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: (series || []).filter(seria => seria.visible).map((seria, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_SeriaRow.default, {
      seria: seria,
      compIndex: index,
      yAxisOptions: options,
      onReg: onReg,
      onUnReg: onUnReg
    }, chartId + "_" + (seria.name || '') + "_" + index))
  });
};
var _default = PasteToSeriaList;
exports.default = _default;
//# sourceMappingURL=PasteToSeriaList.js.map