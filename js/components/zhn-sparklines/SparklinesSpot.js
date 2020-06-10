"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _calcDirection = _interopRequireDefault(require("./dataProcessing/calcDirection"));

//import PropTypes from 'prop-types';
var SparklinesSpot = function SparklinesSpot(props) {
  var points = props.points,
      size = props.size,
      style = props.style,
      spotColors = props.spotColors,
      pointIndex = props.pointIndex,
      pointSpot = /*#__PURE__*/_react["default"].createElement("circle", {
    cx: points[pointIndex].x,
    cy: points[pointIndex].y,
    r: size,
    style: style || {
      fill: spotColors[(0, _calcDirection["default"])(points, pointIndex)]
    }
  });

  return /*#__PURE__*/_react["default"].createElement("g", null, pointSpot);
};
/*
SparklinesSpot.propTypes = {
    size: PropTypes.number,
    style: PropTypes.object,
    spotColors: PropTypes.object,
    pointIndex: PropTypes.number
};
*/


SparklinesSpot.defaultProps = {
  size: 2,
  spotColors: {
    '-1': 'red',
    '0': 'black',
    '1': 'green'
  }
};
var _default = SparklinesSpot;
exports["default"] = _default;
//# sourceMappingURL=SparklinesSpot.js.map