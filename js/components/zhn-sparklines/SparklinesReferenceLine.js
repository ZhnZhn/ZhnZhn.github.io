"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _index = require("./dataProcessing/index");

//import PropTypes from 'prop-types'
var DF_STYLE = {
  stroke: 'red',
  strokeOpacity: .75,
  strokeDasharray: '2, 2'
};

var SparklinesReferenceLine = function SparklinesReferenceLine(_ref) {
  var points = _ref.points,
      margin = _ref.margin,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? "mean" : _ref$type,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? DF_STYLE : _ref$style,
      value = _ref.value;
  var ypoints = points.map(function (p) {
    return p.y;
  }),
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
SparklinesReferenceLine.propTypes = {
  type: PropTypes.oneOf(['max', 'min', 'mean', 'avg', 'median', 'custom']),
  value: PropTypes.number,
  style: PropTypes.object
};
*/


var _default = SparklinesReferenceLine;
exports["default"] = _default;
//# sourceMappingURL=SparklinesReferenceLine.js.map