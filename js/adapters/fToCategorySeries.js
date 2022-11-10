"use strict";

exports.__esModule = true;
exports.default = void 0;

var _CategoryFn = require("./CategoryFn");

const fToCategorySeries = crConfig => (json, option, chart) => {
  const config = crConfig(json, option).config,
        seria = config.series[0],
        categories = (0, _CategoryFn.getCategories)(chart);
  return (0, _CategoryFn.isCategoryCase)(config, categories) ? (0, _CategoryFn.arrangeSeriaByCategories)(seria, categories) : seria;
};

var _default = fToCategorySeries;
exports.default = _default;
//# sourceMappingURL=fToCategorySeries.js.map