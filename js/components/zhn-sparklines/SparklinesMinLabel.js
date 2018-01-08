'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _min2 = require('./dataProcessing/min');

var _min3 = _interopRequireDefault(_min2);

var _SparklinesLabel = require('./SparklinesLabel');

var _SparklinesLabel2 = _interopRequireDefault(_SparklinesLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DF_COLOR = "#f44336";
var DF_FONT_SIZE = 14;
var DF_DY = 3;

var SparklinesMinLabel = function SparklinesMinLabel(props) {
  var data = props.data,
      _props$height = props.height,
      height = _props$height === undefined ? 0 : _props$height,
      _props$dy = props.dy,
      dy = _props$dy === undefined ? DF_DY : _props$dy,
      _props$color = props.color,
      color = _props$color === undefined ? DF_COLOR : _props$color,
      _props$fontSize = props.fontSize,
      fontSize = _props$fontSize === undefined ? DF_FONT_SIZE : _props$fontSize;

  var _min = (0, _min3.default)(data),
      _y = height - dy;
  return _react2.default.createElement(_SparklinesLabel2.default, {
    title: _min,
    x: 0, y: _y,
    stroke: 'none', fill: color, fontSize: fontSize
  });
};

exports.default = SparklinesMinLabel;
//# sourceMappingURL=SparklinesMinLabel.js.map