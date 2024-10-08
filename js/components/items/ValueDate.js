"use strict";

exports.__esModule = true;
exports.default = void 0;
var _dateFn = require("../../utils/dateFn");
var _SpanToken = require("../zhn/SpanToken");
var _jsxRuntime = require("react/jsx-runtime");
const PL_16 = {
  paddingLeft: 16
};
const ValueDate = _ref => {
  let {
    value,
    strDate
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [value ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanValue, {
      style: PL_16,
      children: value
    }) : null, strDate ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanDate, {
      style: PL_16,
      children: (0, _dateFn.formatStrDate)(strDate)
    }) : null]
  });
};
var _default = exports.default = ValueDate;
//# sourceMappingURL=ValueDate.js.map