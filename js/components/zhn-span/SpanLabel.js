"use strict";

exports.__esModule = true;
exports.default = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const S = {
  color: '#1b75bb',
  fontSize: '16px',
  fontWeight: 'bold'
};
const SpanLabel = _ref => {
  let {
    label,
    style
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: {
      ...S,
      ...style
    },
    children: label
  });
};
var _default = SpanLabel;
exports.default = _default;
//# sourceMappingURL=SpanLabel.js.map