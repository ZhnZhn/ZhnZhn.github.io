"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _dateFn = require("../../utils/dateFn");
var _SpanValue = _interopRequireDefault(require("../zhn-span/SpanValue"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_ITEM_TIME = 'item-time';
const S_VALUE = {
  paddingLeft: 16
};
const ValueDate = _ref => {
  let {
    value,
    strDate
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [value ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanValue.default, {
      style: S_VALUE,
      value: value
    }) : null, strDate ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: CL_ITEM_TIME,
      children: (0, _dateFn.formatStrDate)(strDate)
    }) : null]
  });
};
var _default = ValueDate;
exports.default = _default;
//# sourceMappingURL=ValueDate.js.map