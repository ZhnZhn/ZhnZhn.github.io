"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _max2 = _interopRequireDefault(require("./dataProcessing/max"));

var _SparklinesLabel = _interopRequireDefault(require("./SparklinesLabel"));

var SparklinesMaxLabel = function SparklinesMaxLabel(_ref) {
  var data = _ref.data,
      _ref$dy = _ref.dy,
      dy = _ref$dy === void 0 ? 4 : _ref$dy,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? "#8bc34a" : _ref$color,
      _ref$fontSize = _ref.fontSize,
      fontSize = _ref$fontSize === void 0 ? 14 : _ref$fontSize;

  var _max = (0, _max2["default"])(data),
      _y = fontSize - dy;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SparklinesLabel["default"], {
    title: _max,
    x: 0,
    y: _y,
    stroke: "none",
    fill: color,
    fontSize: fontSize
  });
};

var _default = SparklinesMaxLabel;
exports["default"] = _default;
//# sourceMappingURL=SparklinesMaxLabel.js.map