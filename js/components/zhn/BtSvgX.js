"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.BtSvgClose = exports.BtSvgClear = void 0;
var _Button = _interopRequireDefault(require("./Button"));
var _SvgX = _interopRequireDefault(require("./svg/SvgX"));
var _jsxRuntime = require("react/jsx-runtime");
const _fBtSvgX = (className, dfAriaLabel) => _ref => {
  let {
    ariaLabel,
    style,
    onClick
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
    ariaLabel: ariaLabel || dfAriaLabel,
    tabIndex: "-1",
    className: className,
    style: style,
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgX.default, {})
  });
};
const BT_SVG = "bt-svg",
  CL_BT_SVG_CLEAR = BT_SVG + "-clear",
  CL_BT_SVG_CLOSE = BT_SVG + "-close";
const BtSvgClear = exports.BtSvgClear = _fBtSvgX(CL_BT_SVG_CLEAR, "Clear input");
const BtSvgClose = exports.BtSvgClose = _fBtSvgX(CL_BT_SVG_CLOSE, "Close");
//# sourceMappingURL=BtSvgX.js.map