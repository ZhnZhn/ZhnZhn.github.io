"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _min2 = _interopRequireDefault(require("./dataProcessing/min"));

var _SparklinesLabel = _interopRequireDefault(require("./SparklinesLabel"));

var DF_COLOR = "#f44336";
var DF_FONT_SIZE = 14;
var DF_DY = 3;

var SparklinesMinLabel = function SparklinesMinLabel(props) {
  var data = props.data,
      _props$height = props.height,
      height = _props$height === void 0 ? 0 : _props$height,
      _props$dy = props.dy,
      dy = _props$dy === void 0 ? DF_DY : _props$dy,
      _props$color = props.color,
      color = _props$color === void 0 ? DF_COLOR : _props$color,
      _props$fontSize = props.fontSize,
      fontSize = _props$fontSize === void 0 ? DF_FONT_SIZE : _props$fontSize;

  var _min = (0, _min2["default"])(data),
      _y = height - dy;

  return /*#__PURE__*/_react["default"].createElement(_SparklinesLabel["default"], {
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