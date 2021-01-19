"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _calcDirection = _interopRequireDefault(require("./dataProcessing/calcDirection"));

var _style2 = _interopRequireDefault(require("./style"));

//import PropTypes from 'prop-types';
var _crWidth = function _crWidth(points, strokeWidth) {
  return points && points.length > 1 ? Math.ceil(Math.max(0, points[1].x - points[0].x - strokeWidth)) : 0;
};

var SparklinesBars = function SparklinesBars(_ref) {
  var _ref$points = _ref.points,
      points = _ref$points === void 0 ? [] : _ref$points,
      height = _ref.height,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? _style2["default"].BARS : _ref$style,
      barWidth = _ref.barWidth,
      _ref$pointIndex = _ref.pointIndex,
      pointIndex = _ref$pointIndex === void 0 ? -1 : _ref$pointIndex,
      _ref$barStrokeColors = _ref.barStrokeColors,
      barStrokeColors = _ref$barStrokeColors === void 0 ? _style2["default"].COLORS : _ref$barStrokeColors;

  var _style$strokeWidth = style.strokeWidth,
      strokeWidth = _style$strokeWidth === void 0 ? 0 : _style$strokeWidth,
      _width = barWidth || _crWidth(points);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    children: points.map(function (p, i) {
      var x = p.x,
          y = p.y,
          _style = i === pointIndex ? (0, _extends2["default"])({}, style, {
        fill: barStrokeColors[(0, _calcDirection["default"])(points, pointIndex)]
      }) : style;

      return /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
        x: Math.ceil(x - strokeWidth * i),
        y: Math.ceil(y),
        width: Math.ceil(_width),
        height: Math.ceil(Math.max(0, height - y)),
        style: _style
      }, i);
    })
  });
};
/*
SparklinesBars.propTypes = {
    points: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    })),
    height: PropTypes.number,
    style: PropTypes.object,
    barWidth: PropTypes.number,
    pointIndex: PropTypes.number
    barStrokeColors: PropTypes.arrayOf(PropTypes.object)
};
*/


var _default = SparklinesBars;
exports["default"] = _default;
//# sourceMappingURL=SparklinesBars.js.map