"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (points, pointIndex) {
  Math.sign = Math.sign || function (x) {
    return x > 0 ? 1 : -1;
  };

  return points.length < 2 || pointIndex === 0 ? 0 : Math.sign(points[pointIndex - 1].y - points[pointIndex].y);
};
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhnSparklines\dataProcessing\calcDirection.js.map