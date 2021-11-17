"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _style = _interopRequireDefault(require("./style"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from 'prop-types'
if (!Math.sign) {
  Math.sign = function (x) {
    return x > 0 ? 1 : -1;
  };
}

const calcEndSpotDirection = function (points) {
  return points.length < 2 ? 0 : Math.sign(points[points.length - 2].y - points[points.length - 1].y);
};

const Spots = ({
  points,
  size = 2,
  style,
  spotColors = _style.default.COLORS
}) => {
  const startSpot = /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
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
Spots.propTypes = {
    size: PropTypes.number,
    style: PropTypes.object,
    spotColors: PropTypes.object
};
*/


var _default = Spots;
exports.default = _default;
//# sourceMappingURL=Spots.js.map