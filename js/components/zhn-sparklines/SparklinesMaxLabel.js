'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _max2 = require('./dataProcessing/max');

var _max3 = _interopRequireDefault(_max2);

var _SparklinesLabel = require('./SparklinesLabel');

var _SparklinesLabel2 = _interopRequireDefault(_SparklinesLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DF_COLOR = "#8bc34a";
var DF_FONT_SIZE = 14;
var DF_DY = 4;
//const DF_OPACITY = 0.7

var SparklinesMaxLabel = function SparklinesMaxLabel(props) {
  var data = props.data,
      _props$dy = props.dy,
      dy = _props$dy === undefined ? DF_DY : _props$dy,
      _props$color = props.color,
      color = _props$color === undefined ? DF_COLOR : _props$color,
      _props$fontSize = props.fontSize,
      fontSize = _props$fontSize === undefined ? DF_FONT_SIZE : _props$fontSize;

  var _max = (0, _max3.default)(data),
      _y = fontSize - dy;
  return _react2.default.createElement(_SparklinesLabel2.default, {
    title: _max,
    x: 0, y: _y,
    stroke: 'none', fill: color, fontSize: fontSize
  });
};

exports.default = SparklinesMaxLabel;
//# sourceMappingURL=SparklinesMaxLabel.js.map