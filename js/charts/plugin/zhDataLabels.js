"use strict";

exports.__esModule = true;
exports.default = void 0;
var _Chart = require("../Chart");
var _pluginFn = require("./pluginFn");
const _crDataLabels = (seriaType, dataLabels) => ({
  plotOptions: {
    [seriaType]: {
      dataLabels
    }
  }
});
const zhDataLabels = function (isEnabled) {
  (0, _pluginFn.tryUpdate)(this, _crDataLabels((0, _pluginFn.getSeriaType)(this), (0, _Chart.crCategoryDataLabels)(isEnabled)));
};
var _default = exports.default = zhDataLabels;
//# sourceMappingURL=zhDataLabels.js.map