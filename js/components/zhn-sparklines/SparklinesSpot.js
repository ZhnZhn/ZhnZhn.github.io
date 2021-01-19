"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _calcDirection = _interopRequireDefault(require("./dataProcessing/calcDirection"));

var _style = _interopRequireDefault(require("./style"));

//import PropTypes from 'prop-types';
var SparklinesSpot = function SparklinesSpot(_ref) {
  var points = _ref.points,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 2 : _ref$size,
      style = _ref.style,
      _ref$spotColors = _ref.spotColors,
      spotColors = _ref$spotColors === void 0 ? _style["default"].COLORS : _ref$spotColors,
      pointIndex = _ref.pointIndex;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
      cx: points[pointIndex].x,
      cy: points[pointIndex].y,
      r: size,
      style: style || {
        fill: spotColors[(0, _calcDirection["default"])(points, pointIndex)]
      }
    })
  });
};
/*
SparklinesSpot.propTypes = {
    size: PropTypes.number,
    style: PropTypes.object,
    spotColors: PropTypes.object,
    pointIndex: PropTypes.number
};
*/


var _default = SparklinesSpot;
exports["default"] = _default;
//# sourceMappingURL=SparklinesSpot.js.map