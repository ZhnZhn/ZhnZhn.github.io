"use strict";

exports.__esModule = true;
exports.default = void 0;
var _Chart = require("../Chart");
const _crDataLabels = (seriaType, dataLabels) => ({
  plotOptions: {
    [seriaType]: {
      dataLabels
    }
  }
});
const _tryUpdate = (inst, options) => {
  try {
    inst.update(options);
  } catch (err) {
    console.log(err);
  }
};
const _getSeriaType = chartInst => chartInst.options.chart.type;
const zhDataLabels = function (isEnabled) {
  _tryUpdate(this, _crDataLabels(_getSeriaType(this), (0, _Chart.crCategoryDataLabels)(isEnabled)));
};
var _default = exports.default = zhDataLabels;
//# sourceMappingURL=zhDataLabels.js.map