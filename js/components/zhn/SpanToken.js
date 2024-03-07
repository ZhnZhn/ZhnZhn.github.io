"use strict";

exports.__esModule = true;
exports.SpanValue = exports.SpanLabel = exports.SpanDate = exports.SpanBlack = void 0;
var _styleFn = require("../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const _fSpanToken = className => _ref => {
  let {
    style,
    children
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: className,
    style: style,
    children: children
  });
};
const SpanValue = exports.SpanValue = _fSpanToken((0, _styleFn.crBoldCn)("sp-value"));
const SpanLabel = exports.SpanLabel = _fSpanToken((0, _styleFn.crBoldCn)("sp-label"));
const SpanDate = exports.SpanDate = _fSpanToken((0, _styleFn.crBoldCn)("sp-date"));
const SpanBlack = exports.SpanBlack = _fSpanToken(_styleFn.CL_BLACK);
//# sourceMappingURL=SpanToken.js.map