"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _style = _interopRequireDefault(require("./style"));

//import PropTypes from 'prop-types'
if (!Math.sign) {
  Math.sign = function (x) {
    return x > 0 ? 1 : -1;
  };
}

var calcEndSpotDirection = function calcEndSpotDirection(points) {
  return points.length < 2 ? 0 : Math.sign(points[points.length - 2].y - points[points.length - 1].y);
};

var SparklinesSpots = function SparklinesSpots(_ref) {
  var points = _ref.points,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 2 : _ref$size,
      style = _ref.style,
      _ref$spotColors = _ref.spotColors,
      spotColors = _ref$spotColors === void 0 ? _style["default"].COLORS : _ref$spotColors;
  var startSpot = /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
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


var _default = SparklinesSpots;
exports["default"] = _default;
//# sourceMappingURL=SparklinesSpots.js.map