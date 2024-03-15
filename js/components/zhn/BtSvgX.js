"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.BtSvgClose = exports.BtSvgClear = void 0;
var _a11yFn = require("../a11yFn");
var _styleFn = require("../styleFn");
var _Button = _interopRequireDefault(require("./Button"));
var _SvgX = _interopRequireDefault(require("./svg/SvgX"));
var _jsxRuntime = require("react/jsx-runtime");
const _fBtSvgX = (className, dfAriaLabel) => props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
  ...(0, _a11yFn.crAriaLabelProp)(props, dfAriaLabel),
  tabIndex: "-1",
  className: className,
  style: props.style,
  onClick: props.onClick,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgX.default, {})
});
const BtSvgClear = exports.BtSvgClear = _fBtSvgX((0, _styleFn.crBtSvgCn)("clear"), "Clear input");
const BtSvgClose = exports.BtSvgClose = _fBtSvgX((0, _styleFn.crBtSvgCn)("close"), "Close");
//# sourceMappingURL=BtSvgX.js.map