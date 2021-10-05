"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Svg = _interopRequireDefault(require("./svg/Svg"));

var _jsxRuntime = require("react/jsx-runtime");

const CL_BUTTON_CIRCLE = "button-circle";

const BtSvgCircle = ({
  style,
  onClick,
  children
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
  className: CL_BUTTON_CIRCLE,
  style: style,
  onClick: onClick,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.default, {
    w: "20",
    strokeWidth: "2",
    strokeLinecap: "round",
    children: children
  })
});

var _default = BtSvgCircle;
exports.default = _default;
//# sourceMappingURL=BtSvgCircle.js.map