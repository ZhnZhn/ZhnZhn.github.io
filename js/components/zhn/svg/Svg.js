"use strict";

exports.__esModule = true;
exports.Svg100 = exports.Svg = exports.STROKE_LINECAP_ROUND_PROPS = exports.FILL_NONE = exports.EVENODD_PROPS = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const FILL_NONE = exports.FILL_NONE = "none";
const EVENODD_PROPS = exports.EVENODD_PROPS = {
  fillRule: "evenodd",
  clipRule: "evenodd",
  strokeLinejoin: "round"
};
const STROKE_LINECAP_ROUND_PROPS = exports.STROKE_LINECAP_ROUND_PROPS = {
  strokeWidth: "2",
  strokeLinecap: "round"
};
const _crWidthHeightViewBoxProps = (width, height, viewBox) => ({
  xlmns: "http://www.w3.org/2000/svg",
  width,
  height,
  viewBox
});
const Svg = _ref => {
  let {
    w,
    h = w,
    children,
    ...restProps
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("svg", {
    ..._crWidthHeightViewBoxProps(`${w}px`, `${h}px`, `0 0 ${w} ${h}`),
    ...restProps,
    children: children
  });
};
exports.Svg = Svg;
const Svg100 = _ref2 => {
  let {
    w,
    h = w,
    children,
    ...restProps
  } = _ref2;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("svg", {
    ..._crWidthHeightViewBoxProps("100%", "100%", `0 0 ${w} ${h}`),
    preserveAspectRatio: "none",
    ...restProps,
    children: children
  });
};
exports.Svg100 = Svg100;
//# sourceMappingURL=Svg.js.map