"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _BtSvgCircle = _interopRequireDefault(require("./BtSvgCircle"));

var _jsxRuntime = require("react/jsx-runtime");

const SvgPlus = ({
  style,
  onClick
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgCircle.default, {
  style: style,
  onClick: onClick,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M 10,4 L 10,16 M 4,10 L 16,10"
  })
});

var _default = SvgPlus;
exports.default = _default;
//# sourceMappingURL=SvgPlus.js.map