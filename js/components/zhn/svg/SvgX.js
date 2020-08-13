"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var S = {
  SVG: {
    padding: 3
  }
};

var SvgX = function SvgX() {
  return /*#__PURE__*/_react["default"].createElement("svg", {
    viewBox: "0 0 12 12",
    width: "100%",
    height: "100%",
    style: S.SVG,
    preserveAspectRatio: "none",
    xmlns: "http://www.w3.org/2000/svg",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M 0,0 L 12,12"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M 12,0 L 0,12"
  }));
};

var _default = SvgX;
exports["default"] = _default;
//# sourceMappingURL=SvgX.js.map