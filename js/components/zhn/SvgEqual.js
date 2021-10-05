"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _SvgMove = _interopRequireDefault(require("./SvgMove"));

var _jsxRuntime = require("react/jsx-runtime");

const CL_SVG_EQUAL = 'svg-equal';

const SvgEqual = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgMove.default, {
  className: CL_SVG_EQUAL,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M 0,3 L 12,3 M 0,7 L 12,7"
  })
});

var _default = SvgEqual;
exports.default = _default;
//# sourceMappingURL=SvgEqual.js.map