"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.SvgUp = exports.SvgEqual = exports.SvgDown = void 0;
var _Svg = _interopRequireDefault(require("./svg/Svg100"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_SVG_MOVE = 'svg-move',
  CL_SVG = `${CL_SVG_MOVE}__svg`,
  CL_SVG_DOWN = `${CL_SVG} svg-down`,
  CL_SVG_EQUAL = `${CL_SVG} svg-equal`,
  CL_SVG_UP = `${CL_SVG} svg-up`;
const _fSpanMoveSvg = (className, pathElement) => () => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
  className: CL_SVG_MOVE,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.default, {
    w: "12",
    className: className,
    children: pathElement
  })
});
const SvgDown = exports.SvgDown = _fSpanMoveSvg(CL_SVG_DOWN, /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  d: "M 0,0 L 6,4 11,0 6,12, 0,0"
}));
const SvgEqual = exports.SvgEqual = _fSpanMoveSvg(CL_SVG_EQUAL, /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  d: "M 0,3 L 12,3 M 0,7 L 12,7"
}));
const SvgUp = exports.SvgUp = _fSpanMoveSvg(CL_SVG_UP, /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  d: "M 0,12 L 6,8 11,12 6,0 0,12"
}));
//# sourceMappingURL=SvgMove.js.map