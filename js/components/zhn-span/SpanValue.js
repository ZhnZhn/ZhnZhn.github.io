"use strict";

exports.__esModule = true;
exports.default = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const S = {
  color: '#2f7ed8',
  fontWeight: 'bold',
  whiteSpace: 'nowrap'
};
const SpanValue = _ref => {
  let {
    value,
    style
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: {
      ...S,
      ...style
    },
    children: value
  });
};
var _default = SpanValue;
exports.default = _default;
//# sourceMappingURL=SpanValue.js.map