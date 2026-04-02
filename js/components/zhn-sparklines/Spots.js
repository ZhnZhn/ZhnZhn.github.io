"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Colors = _interopRequireDefault(require("./Colors"));
var _jsxRuntime = require("react/jsx-runtime");
if (!Math.sign) {
  Math.sign = x => x > 0 ? 1 : -1;
}
const _calcEndSpotDirection = points => points.length < 2 ? 0 : Math.sign(points[points.length - 2].y - points[points.length - 1].y);
const Spots = _ref => {
  let {
    points,
    size = 2,
    style,
    spotColors = _Colors.default
  } = _ref;
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
        fill: spotColors[_calcEndSpotDirection(points)]
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
var _default = exports.default = Spots;
//# sourceMappingURL=Spots.js.map