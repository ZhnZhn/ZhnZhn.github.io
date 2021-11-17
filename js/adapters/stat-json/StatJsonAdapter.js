"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _arrangeSeriaByCategories = _interopRequireDefault(require("./arrangeSeriaByCategories"));

var _RouterConfig = _interopRequireDefault(require("./RouterConfig"));

const _isArr = Array.isArray;

const _crConfig = (json, option) => {
  const {
    seriaType
  } = option,
        crConfig = _RouterConfig.default.getCrConfig(seriaType);

  return crConfig(json, option);
}; //chart?.xAxis?.[0]?.categories


const _getCategories = chart => ((chart.xAxis || [])[0] || {}).categories;

const _isCategoryCase = (config, categories) => _isArr((config.xAxis || {}).categories) && _isArr(categories);

const StatJsonAdapter = {
  toConfig(json, option) {
    return {
      config: _crConfig(json, option)
    };
  },

  toSeries(json, option, chart) {
    const config = _crConfig(json, option),
          seria = config.series[0],
          categories = _getCategories(chart);

    return _isCategoryCase(config, categories) ? (0, _arrangeSeriaByCategories.default)(seria, categories) : seria;
  }

};
var _default = StatJsonAdapter;
exports.default = _default;
//# sourceMappingURL=StatJsonAdapter.js.map