"use strict";

exports.__esModule = true;
exports.SvgToggleOn = exports.SvgSettings = exports.SvgInfo = void 0;
var _Svg = require("./Svg");
var _jsxRuntime = require("react/jsx-runtime");
const SvgIcon = _ref => {
  let {
    style,
    color = 'currentColor',
    size = '24',
    children
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.Svg, {
    w: size,
    style: style,
    stroke: color,
    fill: _Svg.FILL_NONE,
    ..._Svg.STROKE_LINECAP_ROUND_PROPS,
    strokeLinejoin: "round",
    children: children
  });
};
const SvgInfo = _ref2 => {
  let {
    style
  } = _ref2;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(SvgIcon, {
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
      x1: "12",
      y1: "16",
      x2: "12",
      y2: "12"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
      x1: "12",
      y1: "8",
      x2: "12",
      y2: "8"
    })]
  });
};
exports.SvgInfo = SvgInfo;
const SvgSettings = _ref3 => {
  let {
    style
  } = _ref3;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(SvgIcon, {
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 00 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
    })]
  });
};
exports.SvgSettings = SvgSettings;
const SvgToggleOn = _ref4 => {
  let {
    style
  } = _ref4;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(SvgIcon, {
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
      x: "1",
      y: "5",
      width: "22",
      height: "14",
      rx: "7",
      ry: "7"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
      cx: "15",
      cy: "12",
      r: "4"
    })]
  });
};
exports.SvgToggleOn = SvgToggleOn;
//# sourceMappingURL=SvgIcon.js.map