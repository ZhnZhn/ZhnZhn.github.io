"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Button = _interopRequireDefault(require("./Button"));
var _SvgX = _interopRequireDefault(require("./svg/SvgX"));
var _jsxRuntime = require("react/jsx-runtime");
const BtSvgX = _ref => {
  let {
    className,
    style,
    onClick
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
    tabIndex: "-1",
    className: className,
    style: style,
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgX.default, {})
  });
};
var _default = BtSvgX;
exports.default = _default;
//# sourceMappingURL=BtSvgX.js.map