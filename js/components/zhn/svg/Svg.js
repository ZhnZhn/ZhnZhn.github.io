"use strict";

exports.__esModule = true;
exports.Svg100 = exports.Svg = exports.STROKE_LINECAP_ROUND_PROPS = exports.PathCheckIn = exports.FILL_NONE = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const FILL_NONE = exports.FILL_NONE = "none";
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
const _crStrokeLinecapRound = function (sw) {
  if (sw === void 0) {
    sw = "2";
  }
  return {
    strokeWidth: sw,
    strokeLinecap: "round"
  };
};
const STROKE_LINECAP_ROUND_PROPS = exports.STROKE_LINECAP_ROUND_PROPS = _crStrokeLinecapRound();
const PathCheckIn = _ref3 => {
  let {
    cn,
    sw = "2"
  } = _ref3;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    className: cn,
    d: "M 2,5 L 8,14 M 8,14 L 14,1",
    ..._crStrokeLinecapRound(sw)
  });
};
exports.PathCheckIn = PathCheckIn;
//# sourceMappingURL=Svg.js.map