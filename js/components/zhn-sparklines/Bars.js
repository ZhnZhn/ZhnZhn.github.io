"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _calcDirection = _interopRequireDefault(require("./dataProcessing/calcDirection"));

var _style2 = _interopRequireDefault(require("./style"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from 'prop-types';
const _crWidth = (points, strokeWidth) => points && points.length > 1 ? Math.ceil(Math.max(0, points[1].x - points[0].x - strokeWidth)) : 0;

const Bars = ({
  points = [],
  height,
  style = _style2.default.BARS,
  barWidth,
  pointIndex = -1,
  barStrokeColors = _style2.default.COLORS
}) => {
  const {
    strokeWidth = 0
  } = style,
        _width = barWidth || _crWidth(points);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    children: points.map((p, i) => {
      const {
        x,
        y
      } = p,
            _style = i === pointIndex ? { ...style,
        ...{
          fill: barStrokeColors[(0, _calcDirection.default)(points, pointIndex)]
        }
      } : style;

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
Bars.propTypes = {
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


var _default = Bars;
exports.default = _default;
//# sourceMappingURL=Bars.js.map