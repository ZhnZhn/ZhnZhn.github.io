"use strict";

exports.__esModule = true;
exports.default = _default;
var _Chart = require("../Chart");
var _pluginFn = require("./pluginFn");
function _default(isEnabled) {
  (0, _pluginFn.tryUpdate)(this, (0, _pluginFn.crPlotOptions)(this, "dataLabels", (0, _Chart.crCategoryDataLabels)(isEnabled)));
}
//# sourceMappingURL=zhItemLabels.js.map