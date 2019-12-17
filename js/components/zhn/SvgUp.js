"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var CL = {
  ROOT: 'svg-move',
  SVG: 'svg-move__svg svg-up'
};

var SvgUp = function SvgUp() {
  return _react["default"].createElement("span", {
    className: CL.ROOT
  }, _react["default"].createElement("svg", {
    viewBox: "0 0 12 12",
    width: "100%",
    height: "100%",
    className: CL.SVG,
    preserveAspectRatio: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _react["default"].createElement("path", {
    d: "M 0,12 L 6,8 11,12 6,0 0,12"
  })));
};

var _default = SvgUp;
exports["default"] = _default;
//# sourceMappingURL=SvgUp.js.map