"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (points, pointIndex) {
  /*
  Math.sign = Math.sign || function(x) { return x > 0 ? 1 : -1; }
    return ( points.length < 2  || pointIndex === 0)
      ? 0
      : Math.sign(points[pointIndex - 1].y - points[pointIndex].y);
    */
  if (points.length < 2 || pointIndex === 0) {
    return 0;
  }
  var _diff = points[pointIndex - 1].y - points[pointIndex].y;
  if (_diff === 0) {
    return 0;
  } else if (_diff > 0) {
    return 1;
  } else {
    return -1;
  }
};
//# sourceMappingURL=calcDirection.js.map