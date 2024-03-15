"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.SvgPlus = exports.SvgMinus = void 0;
var _a11yFn = require("../a11yFn");
var _styleFn = require("../styleFn");
var _Button = _interopRequireDefault(require("./Button"));
var _Svg = _interopRequireDefault(require("./svg/Svg"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_BT_SVG_CIRCLE = (0, _styleFn.crBtSvgCn)("circle"),
  _fBtCircleSvg = (pathElement, dfAriaLabel) => props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
    ...(0, _a11yFn.crAriaLabelProp)(props, dfAriaLabel),
    className: CL_BT_SVG_CIRCLE,
    style: props.style,
    onClick: props.onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.default, {
      w: "20",
      strokeWidth: "2",
      strokeLinecap: "round",
      children: pathElement
    })
  });
const SvgMinus = exports.SvgMinus = _fBtCircleSvg( /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  d: "M 4,10 L 16,10"
}), "Subtract");
const SvgPlus = exports.SvgPlus = _fBtCircleSvg( /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  d: "M 10,4 L 10,16 M 4,10 L 16,10"
}), "Add");
//# sourceMappingURL=BtSvgCircle.js.map