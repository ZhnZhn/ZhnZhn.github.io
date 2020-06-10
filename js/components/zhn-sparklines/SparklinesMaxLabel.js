"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _max2 = _interopRequireDefault(require("./dataProcessing/max"));

var _SparklinesLabel = _interopRequireDefault(require("./SparklinesLabel"));

var DF_COLOR = "#8bc34a";
var DF_FONT_SIZE = 14;
var DF_DY = 4; //const DF_OPACITY = 0.7

var SparklinesMaxLabel = function SparklinesMaxLabel(props) {
  var data = props.data,
      _props$dy = props.dy,
      dy = _props$dy === void 0 ? DF_DY : _props$dy,
      _props$color = props.color,
      color = _props$color === void 0 ? DF_COLOR : _props$color,
      _props$fontSize = props.fontSize,
      fontSize = _props$fontSize === void 0 ? DF_FONT_SIZE : _props$fontSize;

  var _max = (0, _max2["default"])(data),
      _y = fontSize - dy;

  return /*#__PURE__*/_react["default"].createElement(_SparklinesLabel["default"], {
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