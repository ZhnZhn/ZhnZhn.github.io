"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _calcDirection = _interopRequireDefault(require("./dataProcessing/calcDirection"));

//import PropTypes from 'prop-types';
var _crWidth = function _crWidth(points, strokeWidth) {
  return points && points.length >= 2 ? Math.ceil(Math.max(0, points[1].x - points[0].x - strokeWidth)) : 0;
};

var SparklinesBars = function SparklinesBars(props) {
  var _props$points = props.points,
      points = _props$points === void 0 ? [] : _props$points,
      height = props.height,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      barWidth = props.barWidth,
      _props$pointIndex = props.pointIndex,
      pointIndex = _props$pointIndex === void 0 ? -1 : _props$pointIndex,
      barStrokeColors = props.barStrokeColors,
      _style$strokeWidth = style.strokeWidth,
      strokeWidth = _style$strokeWidth === void 0 ? 0 : _style$strokeWidth,
      _width = barWidth || _crWidth(points);

  return _react["default"].createElement("g", null, points.map(function (p, i) {
    var x = p.x,
        y = p.y,
        _style = i === pointIndex ? (0, _extends2["default"])({}, style, {}, {
      fill: barStrokeColors[(0, _calcDirection["default"])(points, pointIndex)]
    }) : style;

    return _react["default"].createElement("rect", {
      key: i,
      x: Math.ceil(x - strokeWidth * i),
      y: Math.ceil(y),
      width: Math.ceil(_width),
      height: Math.ceil(Math.max(0, height - y)),
      style: _style
    });
  }));
};
/*
SparklinesBars.propTypes = {
    points: PropTypes.arrayOf(PropTypes.object),
    height: PropTypes.number,
    style: PropTypes.object,
    barWidth: PropTypes.number
};
*/


SparklinesBars.defaultProps = {
  style: {
    fill: 'slategray'
  },
  barStrokeColors: {
    '-1': 'red',
    '0': 'black',
    '1': 'green'
  }
};
var _default = SparklinesBars;
exports["default"] = _default;
//# sourceMappingURL=SparklinesBars.js.map