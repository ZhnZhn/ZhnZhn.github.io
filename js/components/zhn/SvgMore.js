"use strict";

exports.__esModule = true;
exports.default = void 0;
var _Svg = require("./svg/Svg");
var _jsxRuntime = require("react/jsx-runtime");
const CL_BT_MORE = 'bt-more';
const SvgMore = _ref => {
  let {
    refEl,
    style,
    svgStyle,
    onClick
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    ref: refEl,
    className: CL_BT_MORE,
    style: style,
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Svg.Svg, {
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
  });
};
var _default = exports.default = SvgMore;
//# sourceMappingURL=SvgMore.js.map