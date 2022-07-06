"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Svg = _interopRequireDefault(require("./svg/Svg"));

var _jsxRuntime = require("react/jsx-runtime");

const CL_BT_SVG_CIRCLE = "bt-svg-circle";

const BtSvgCircle = _ref => {
  let {
    style,
    onClick,
    children
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    className: CL_BT_SVG_CIRCLE,
    style: style,
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.default, {
      w: "20",
      strokeWidth: "2",
      strokeLinecap: "round",
      children: children
    })
  });
};

var _default = BtSvgCircle;
exports.default = _default;
//# sourceMappingURL=BtSvgCircle.js.map