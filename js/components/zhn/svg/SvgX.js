"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Svg = _interopRequireDefault(require("./Svg100"));

var _jsxRuntime = require("react/jsx-runtime");

const S_SVG = {
  padding: 3
};

const SvgX = () => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Svg.default, {
  w: "12",
  style: S_SVG,
  strokeWidth: "2",
  strokeLinecap: "round",
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M 0,0 L 12,12"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M 12,0 L 0,12"
  })]
});

var _default = SvgX;
exports.default = _default;
//# sourceMappingURL=SvgX.js.map