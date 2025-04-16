"use strict";

exports.__esModule = true;
exports.BtSvgClose = exports.BtSvgClear = void 0;
var _styleFn = require("../styleFn");
var _Svg = require("./svg/Svg");
var _jsxRuntime = require("react/jsx-runtime");
const S_SVG_X = {
  padding: 3
};
const _fCrBtSvgX = (className, dfAriaLabel, crProps) => props => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
  ...crProps(props),
  "aria-label": props.ariaLabel || dfAriaLabel,
  type: "button",
  tabIndex: "-1",
  className: className,
  style: props.style,
  onClick: props.onClick,
  children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Svg.Svg100, {
    w: "12",
    style: S_SVG_X,
    ..._Svg.STROKE_LINECAP_ROUND_PROPS,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      d: "M 0,0 L 12,12"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      d: "M 12,0 L 0,12"
    })]
  })
});
const BtSvgClear = exports.BtSvgClear = _fCrBtSvgX((0, _styleFn.crBtSvgCn)("clear"), "Clear input", props => ({
  ref: props.refEl
}));
const BtSvgClose = exports.BtSvgClose = _fCrBtSvgX((0, _styleFn.crBtSvgCn)("close"), "Close", () => {});
//# sourceMappingURL=BtSvgX.js.map