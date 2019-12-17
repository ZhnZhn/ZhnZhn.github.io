"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("./SvgIcon"));

var SvgInfo = function SvgInfo(props) {
  return _react["default"].createElement(_SvgIcon["default"], props, _react["default"].createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), _react["default"].createElement("line", {
    x1: "12",
    y1: "16",
    x2: "12",
    y2: "12"
  }), _react["default"].createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "8"
  }));
};

var _default = SvgInfo;
exports["default"] = _default;
//# sourceMappingURL=SvgInfo.js.map