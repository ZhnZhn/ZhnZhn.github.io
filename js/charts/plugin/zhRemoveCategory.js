"use strict";

exports.__esModule = true;
exports.default = void 0;
var _pluginFn = require("./pluginFn");
const zhRemoveCategory = function (id) {
  const userOptions = this.userOptions,
    {
      xAxis,
      series
    } = userOptions,
    _categories = xAxis.categories;
  if (_categories) {
    const _updatedCategories = _categories.filter(str => str !== id);
    if (_updatedCategories.length < _categories.length) {
      (0, _pluginFn.tryUpdate)(this, {
        xAxis: {
          ...xAxis,
          categories: _updatedCategories
        },
        series: [{
          ...series[0],
          data: series[0].data.filter(p => p.c !== id && p.name !== id && p.id !== id)
        }]
      });
    }
  }
};
var _default = exports.default = zhRemoveCategory;
//# sourceMappingURL=zhRemoveCategory.js.map