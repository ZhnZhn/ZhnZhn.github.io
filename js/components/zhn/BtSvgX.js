"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.BtSvgClose = exports.BtSvgClear = void 0;
var _styleFn = require("../styleFn");
var _SvgX = _interopRequireDefault(require("./svg/SvgX"));
var _jsxRuntime = require("react/jsx-runtime");
const _fCrBtSvgX = (className, dfAriaLabel, crProps) => props => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
  ...crProps(props),
  "aria-label": props.ariaLabel || dfAriaLabel,
  type: "button",
  tabIndex: "-1",
  className: className,
  style: props.style,
  onClick: props.onClick,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgX.default, {})
});
const BtSvgClear = exports.BtSvgClear = _fCrBtSvgX((0, _styleFn.crBtSvgCn)("clear"), "Clear input", props => ({
  ref: props.refEl
}));
const BtSvgClose = exports.BtSvgClose = _fCrBtSvgX((0, _styleFn.crBtSvgCn)("close"), "Close", () => {});
//# sourceMappingURL=BtSvgX.js.map