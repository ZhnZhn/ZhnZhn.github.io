"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _calcDirection = _interopRequireDefault(require("./dataProcessing/calcDirection"));
var _Colors = _interopRequireDefault(require("./Colors"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from 'prop-types';

const S_BARS = {
  fill: 'slategray'
};
const _ceil = Math.ceil,
  _max = Math.max;
const _crWidth = (points, strokeWidth) => points && points.length > 1 ? _ceil(_max(0, points[1].x - points[0].x - (0, _isTypeFn.parseIntBy10)(strokeWidth))) : 0;
const Bars = _ref => {
  let {
    points = [],
    height,
    style = S_BARS,
    barWidth,
    pointIndex = -1,
    barStrokeColors = _Colors.default
  } = _ref;
  const {
      strokeWidth = 0
    } = style,
    _width = barWidth || _crWidth(points, strokeWidth);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    children: points.map((p, i) => {
      const {
          x,
          y
        } = p,
        _style = i === pointIndex ? {
          ...style,
          ...{
            fill: barStrokeColors[(0, _calcDirection.default)(points, pointIndex)]
          }
        } : style;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
        x: _ceil(x - strokeWidth * i),
        y: _ceil(y),
        width: _ceil(_width),
        height: _ceil(_max(0, height - y)),
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
var _default = exports.default = Bars;
//# sourceMappingURL=Bars.js.map