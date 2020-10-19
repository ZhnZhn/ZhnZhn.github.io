"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

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
      startSpot = /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: points[0].x,
    cy: points[0].y,
    r: size,
    style: style
  }),
      endSpot = /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: points[points.length - 1].x,
    cy: points[points.length - 1].y,
    r: size,
    style: style || {
      fill: spotColors[calcEndSpotDirection(points)]
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
    children: [style && startSpot, endSpot]
  });
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