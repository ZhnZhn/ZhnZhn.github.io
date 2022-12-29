"use strict";

exports.__esModule = true;
exports.default = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const S = {
  color: '#fdb316',
  fontWeight: 'bold'
};
const SpanDate = _ref => {
  let {
    date,
    style
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: {
      ...S,
      ...style
    },
    children: date
  });
};
var _default = SpanDate;
exports.default = _default;
//# sourceMappingURL=SpanDate.js.map