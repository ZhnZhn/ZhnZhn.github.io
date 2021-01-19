"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

//import PropTypes from 'prop-types';
var SparklinesLine = function SparklinesLine(_ref) {
  var _ref$points = _ref.points,
      points = _ref$points === void 0 ? [] : _ref$points,
      height = _ref.height,
      margin = _ref.margin,
      color = _ref.color,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style;
  var linePoints = points.map(function (p) {
    return [p.x, p.y];
  }).reduce(function (a, b) {
    return a.concat(b);
  }),
      closePolyPoints = [points[points.length - 1].x, height - margin, margin, height - margin, margin, points[0].y],
      fillPoints = linePoints.concat(closePolyPoints),
      lineStyle = {
    stroke: color || style.stroke || 'slategray',
    strokeWidth: style.strokeWidth || '1',
    strokeLinejoin: style.strokeLinejoin || 'round',
    strokeLinecap: style.strokeLinecap || 'round',
    fill: 'none'
  },
      fillStyle = {
    stroke: style.stroke || 'none',
    strokeWidth: '0',
    fillOpacity: style.fillOpacity || '.1',
    fill: style.fill || color || 'slategray'
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("polyline", {
      points: fillPoints.join(' '),
      style: fillStyle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("polyline", {
      points: linePoints.join(' '),
      style: lineStyle
    })]
  });
};
/*
SparklinesLine.propTypes = {
  points: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  })),
  height: PropTypes.number,
  margin: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object
};
*/


var _default = SparklinesLine;
exports["default"] = _default;
//# sourceMappingURL=SparklinesLine.js.map