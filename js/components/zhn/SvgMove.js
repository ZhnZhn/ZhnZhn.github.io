"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Svg = _interopRequireDefault(require("./svg/Svg100"));

var _jsxRuntime = require("react/jsx-runtime");

const CL_MOVE = 'svg-move',
      CL_SVG = 'svg-move__svg';

const SvgMove = ({
  className,
  children
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
  className: CL_MOVE,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.default, {
    w: "12",
    className: CL_SVG + " " + className,
    children: children
  })
});

var _default = SvgMove;
exports.default = _default;
//# sourceMappingURL=SvgMove.js.map