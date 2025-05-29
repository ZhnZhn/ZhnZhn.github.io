"use strict";

exports.__esModule = true;
exports.SpanValue = exports.SpanMove = exports.SpanLabel = exports.SpanInputLabel = exports.SpanGap = exports.SpanDate = exports.SpanBoldBlack = exports.MarkBlack = exports.CL_SP_INPUT_LABEL = void 0;
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
const _crVmTokenCn = (0, _styleFn.getScreenCase)(_styleFn.crFs18Cn, _styleFn.crBold16Cn);
const SpanValue = exports.SpanValue = _fSpanToken(_crVmTokenCn("sp-value"));
const SpanMove = exports.SpanMove = _fSpanToken(_crVmTokenCn());
const SpanDate = exports.SpanDate = _fSpanToken(_crVmTokenCn("sp-date"));
const CL_SP_LABEL = (0, _styleFn.crNotSelectedCn)("sp-label");
const SpanLabel = exports.SpanLabel = _fSpanToken((0, _styleFn.crBoldCn)(CL_SP_LABEL));
const CL_SP_INPUT_LABEL = exports.CL_SP_INPUT_LABEL = `${CL_SP_LABEL} sp-input`;
const SpanInputLabel = exports.SpanInputLabel = _fSpanToken((0, _styleFn.crBoldCn)(CL_SP_INPUT_LABEL));
const SpanBoldBlack = exports.SpanBoldBlack = _fSpanToken((0, _styleFn.crBoldCn)(_styleFn.CL_BLACK));
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
const MarkBlack = _ref3 => {
  let {
    children
  } = _ref3;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("mark", {
    className: "tk-black",
    children: children
  });
};
exports.MarkBlack = MarkBlack;
//# sourceMappingURL=SpanToken.js.map