"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _Svg = _interopRequireDefault(require("./svg/Svg"));

var _jsxRuntime = require("react/jsx-runtime");

const CL_BT_MORE = 'bt-more';
const SvgMore = /*#__PURE__*/(0, _react.forwardRef)(({
  style,
  svgStyle,
  onClick
}, ref) => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
  ref: ref,
  className: CL_BT_MORE,
  style: style,
  onClick: onClick,
  children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Svg.default, {
    w: "6",
    h: "22",
    style: svgStyle,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
      cx: "3",
      cy: "4",
      r: "2"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
      cx: "3",
      cy: "11",
      r: "2"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
      cx: "3",
      cy: "18",
      r: "2"
    })]
  })
}));
var _default = SvgMore;
exports.default = _default;
//# sourceMappingURL=SvgMore.js.map