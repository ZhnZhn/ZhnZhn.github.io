"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _kMeans = _interopRequireDefault(require("../math/k-means"));

const DF_COLORS = ['#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b', '#74c476'];

const _colorItems = function (data, clusters, colors) {
  if (colors === void 0) {
    colors = DF_COLORS;
  }

  clusters.forEach((cluster, colorIndex) => {
    cluster.points.forEach(p => {
      data[p.id].color = colors[colorIndex];
    });
  });
};

const _crPoints = data => data.map((item, index) => {
  const _arrPoint = [item.y, 0];
  _arrPoint.id = index;
  return _arrPoint;
});

const addColorClustersTo = (data, colors) => {
  if (data.length !== 0) {
    const _points = _crPoints(data),
          _clusters = _kMeans.default.crUnarySortedCluster(_points);

    _colorItems(data, _clusters, colors);
  }

  return data;
};

var _default = addColorClustersTo;
exports.default = _default;
//# sourceMappingURL=addColorClustersTo.js.map