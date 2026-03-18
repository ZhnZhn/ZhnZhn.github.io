"use strict";

exports.__esModule = true;
exports.default = _default;
var _loadMath = require("../../math/loadMath");
var _pluginFn = require("./pluginFn");
function _default(isEnabled) {
  (0, _loadMath.loadJenks)().then(jenksModule => {
    const series = this.options.series,
      seria = series[0],
      transformFn = isEnabled ? jenksModule.addJenksColorTo : jenksModule.removeJenksColorFrom;
    seria.data = transformFn(seria.data);
    (0, _pluginFn.tryUpdate)(this, {
      series: [seria, ...series.slice(1)]
    });
  }).catch(err => {
    console.log(err);
  });
}
//# sourceMappingURL=zhJenksGroup.js.map