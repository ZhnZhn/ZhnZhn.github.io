"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

//import PropTypes from 'prop-types';
var SparklinesLine = function SparklinesLine(props) {
  var _props$points = props.points,
      points = _props$points === void 0 ? [] : _props$points,
      height = props.height,
      margin = props.margin,
      color = props.color,
      style = props.style,
      linePoints = points.map(function (p) {
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
  return /*#__PURE__*/_react["default"].createElement("g", null, /*#__PURE__*/_react["default"].createElement("polyline", {
    points: fillPoints.join(' '),
    style: fillStyle
  }), /*#__PURE__*/_react["default"].createElement("polyline", {
    points: linePoints.join(' '),
    style: lineStyle
  }));
};
/*
SparklinesLine.propTypes = {
    color: PropTypes.string,
    style: PropTypes.object
};
*/


SparklinesLine.defaultProps = {
  style: {}
};
var _default = SparklinesLine;
exports["default"] = _default;
//# sourceMappingURL=SparklinesLine.js.map