"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _calcDirection = _interopRequireDefault(require("./dataProcessing/calcDirection"));

var _style = _interopRequireDefault(require("./style"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from 'prop-types';
const Spot = ({
  points,
  size = 2,
  style,
  spotColors = _style.default.COLORS,
  pointIndex
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: points[pointIndex].x,
    cy: points[pointIndex].y,
    r: size,
    style: style || {
      fill: spotColors[(0, _calcDirection.default)(points, pointIndex)]
    }
  })
});
/*
Spot.propTypes = {
    size: PropTypes.number,
    style: PropTypes.object,
    spotColors: PropTypes.object,
    pointIndex: PropTypes.number
};
*/


var _default = Spot;
exports.default = _default;
//# sourceMappingURL=Spot.js.map