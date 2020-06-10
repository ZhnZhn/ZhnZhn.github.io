"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = require("./dataProcessing/index");

//import PropTypes from 'prop-types'
var SparklinesReferenceLine = function SparklinesReferenceLine(props) {
  var points = props.points,
      margin = props.margin,
      type = props.type,
      style = props.style,
      value = props.value,
      ypoints = points.map(function (p) {
    return p.y;
  }),
      y = type === 'custom' ? value : _index.hm[type](ypoints);
  return /*#__PURE__*/_react["default"].createElement("line", {
    x1: points[0].x,
    y1: y + margin,
    x2: points[points.length - 1].x,
    y2: y + margin,
    style: style
  });
};
/*
SparklinesReferenceLine.propTypes = {
    type: PropTypes.oneOf(['max', 'min', 'mean', 'avg', 'median', 'custom']),
    value: PropTypes.number,
    style: PropTypes.object
};
*/


SparklinesReferenceLine.defaultProps = {
  type: 'mean',
  style: {
    stroke: 'red',
    strokeOpacity: .75,
    strokeDasharray: '2, 2'
  }
};
var _default = SparklinesReferenceLine;
exports["default"] = _default;
//# sourceMappingURL=SparklinesReferenceLine.js.map