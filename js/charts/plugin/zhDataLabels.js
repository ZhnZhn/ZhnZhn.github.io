"use strict";

exports.__esModule = true;
exports.default = void 0;
var _Chart = require("../Chart");
var _pluginFn = require("./pluginFn");
const zhDataLabels = function (isEnabled) {
  (0, _pluginFn.tryUpdate)(this, (0, _pluginFn.crPlotOptions)(this, "dataLabels", (0, _Chart.crCategoryDataLabels)(isEnabled)));
};
var _default = exports.default = zhDataLabels;
//# sourceMappingURL=zhDataLabels.js.map