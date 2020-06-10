"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

//import PropTypes from 'prop-types'
if (!Math.sign) {
  Math.sign = function (x) {
    return x > 0 ? 1 : -1;
  };
}

var calcEndSpotDirection = function calcEndSpotDirection(points) {
  return points.length < 2 ? 0 : Math.sign(points[points.length - 2].y - points[points.length - 1].y);
};

var SparklinesSpots = function SparklinesSpots(props) {
  var points = props.points,
      size = props.size,
      style = props.style,
      spotColors = props.spotColors,
      startSpot = /*#__PURE__*/_react["default"].createElement("circle", {
    cx: points[0].x,
    cy: points[0].y,
    r: size,
    style: style
  }),
      endSpot = /*#__PURE__*/_react["default"].createElement("circle", {
    cx: points[points.length - 1].x,
    cy: points[points.length - 1].y,
    r: size,
    style: style || {
      fill: spotColors[calcEndSpotDirection(points)]
    }
  });

  return /*#__PURE__*/_react["default"].createElement("g", null, style && startSpot, endSpot);
};
/*
SparklinesSpots.propTypes = {
    size: PropTypes.number,
    style: PropTypes.object,
    spotColors: PropTypes.object
};
*/


SparklinesSpots.defaultProps = {
  size: 2,
  spotColors: {
    '-1': 'red',
    '0': 'black',
    '1': 'green'
  }
};
var _default = SparklinesSpots;
exports["default"] = _default;
//# sourceMappingURL=SparklinesSpots.js.map