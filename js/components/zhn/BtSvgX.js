"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _SvgX = _interopRequireDefault(require("./svg/SvgX"));

var _jsxRuntime = require("react/jsx-runtime");

const BtSvgX = ({
  className,
  style,
  onClick
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
  tabIndex: "-1",
  className: className,
  style: style,
  onClick: onClick,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgX.default, {})
});

var _default = BtSvgX;
exports.default = _default;
//# sourceMappingURL=BtSvgX.js.map