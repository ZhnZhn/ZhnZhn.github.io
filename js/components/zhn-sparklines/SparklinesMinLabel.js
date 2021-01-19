"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _min2 = _interopRequireDefault(require("./dataProcessing/min"));

var _SparklinesLabel = _interopRequireDefault(require("./SparklinesLabel"));

var SparklinesMinLabel = function SparklinesMinLabel(_ref) {
  var data = _ref.data,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 0 : _ref$height,
      _ref$dy = _ref.dy,
      dy = _ref$dy === void 0 ? 3 : _ref$dy,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? "#f44336" : _ref$color,
      _ref$fontSize = _ref.fontSize,
      fontSize = _ref$fontSize === void 0 ? 14 : _ref$fontSize;

  var _min = (0, _min2["default"])(data),
      _y = height - dy;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SparklinesLabel["default"], {
    title: _min,
    x: 0,
    y: _y,
    stroke: "none",
    fill: color,
    fontSize: fontSize
  });
};

var _default = SparklinesMinLabel;
exports["default"] = _default;
//# sourceMappingURL=SparklinesMinLabel.js.map