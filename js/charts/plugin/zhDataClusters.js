"use strict";

exports.__esModule = true;
exports.default = void 0;
var _loadMath = require("../../math/loadMath");
var _pluginFn = require("./pluginFn");
const _removeColors = data => {
  data.forEach(point => {
    point.color = void 0;
  });
  return data;
};
const zhDataClusters = function (isEnabled) {
  (0, _loadMath.loadMath)(_loadMath.JENKS).then(addJenksColorTo => {
    const series = this.options.series,
      seria = series[0],
      transformFn = isEnabled ? addJenksColorTo : _removeColors;
    seria.data = transformFn(seria.data);
    (0, _pluginFn.tryUpdate)(this, {
      series: [seria, ...series.slice(1)]
    });
  }).catch(err => {
    console.log(err);
  });
};
var _default = exports.default = zhDataClusters;
//# sourceMappingURL=zhDataClusters.js.map