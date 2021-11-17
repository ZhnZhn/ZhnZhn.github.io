"use strict";

exports.__esModule = true;
exports.default = void 0;

var _index = require("./dataProcessing/index");

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from 'prop-types'
const DF_STYLE = {
  stroke: 'red',
  strokeOpacity: .75,
  strokeDasharray: '2, 2'
};

const ReferenceLine = ({
  points,
  margin,
  type = "mean",
  style = DF_STYLE,
  value
}) => {
  const ypoints = points.map(p => p.y),
        y = type === 'custom' ? value : _index.hm[type](ypoints);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
    x1: points[0].x,
    y1: y + margin,
    x2: points[points.length - 1].x,
    y2: y + margin,
    style: style
  });
};
/*
ReferenceLine.propTypes = {
  type: PropTypes.oneOf(['max', 'min', 'mean', 'avg', 'median', 'custom']),
  value: PropTypes.number,
  style: PropTypes.object
};
*/


var _default = ReferenceLine;
exports.default = _default;
//# sourceMappingURL=ReferenceLine.js.map