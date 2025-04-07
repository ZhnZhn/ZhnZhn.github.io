"use strict";

exports.__esModule = true;
exports.SpanValue = exports.SpanLabel = exports.SpanInputLabel = exports.SpanGap = exports.SpanDate = exports.SpanBoldBlack = exports.SpanBold = exports.SpanBlack = exports.CL_SP_INPUT_LABEL = void 0;
var _styleFn = require("../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const _fSpanToken = className => _ref => {
  let {
    id,
    style,
    children
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    id: id,
    className: className,
    style: style,
    children: children
  });
};
const SpanValue = exports.SpanValue = _fSpanToken((0, _styleFn.crBoldCn)("sp-value"));
const SpanDate = exports.SpanDate = _fSpanToken((0, _styleFn.crBoldCn)("sp-date"));
const CL_SP_LABEL = (0, _styleFn.crCnNotSelected)("sp-label");
const SpanLabel = exports.SpanLabel = _fSpanToken((0, _styleFn.crBoldCn)(CL_SP_LABEL));
const CL_SP_INPUT_LABEL = exports.CL_SP_INPUT_LABEL = `${CL_SP_LABEL} sp-input`;
const SpanInputLabel = exports.SpanInputLabel = _fSpanToken((0, _styleFn.crBoldCn)(CL_SP_INPUT_LABEL));
const SpanBlack = exports.SpanBlack = _fSpanToken(_styleFn.CL_BLACK);
const SpanBoldBlack = exports.SpanBoldBlack = _fSpanToken((0, _styleFn.crBoldCn)(_styleFn.CL_BLACK));
const SpanBold = exports.SpanBold = _fSpanToken((0, _styleFn.crBoldCn)());
const SpanGap = _ref2 => {
  let {
    width
  } = _ref2;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: {
      ..._styleFn.S_INLINE,
      width
    }
  });
};
exports.SpanGap = SpanGap;
//# sourceMappingURL=SpanToken.js.map