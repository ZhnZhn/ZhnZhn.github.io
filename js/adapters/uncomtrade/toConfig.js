"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _fnAdapter = require("./fnAdapter");
var _toTreeMap = _interopRequireDefault(require("./toTreeMap"));
var _toCategory = _interopRequireDefault(require("./toCategory"));
var _toSeriesConfig = _interopRequireDefault(require("./toSeriesConfig"));
const _fToConfig = toConfig => (json, option) => ({
  config: toConfig(json, option)
});
const toConfig = option => {
  const toConfig = (0, _fnAdapter.isAggr)(option.two) || (0, _fnAdapter.isAggrByTotalWorld)(option) ? option.chart === 'BAR' ? _toCategory.default : _toTreeMap.default : _toSeriesConfig.default;
  return {
    toConfig: _fToConfig(toConfig)
  };
};
var _default = toConfig;
exports.default = _default;
//# sourceMappingURL=toConfig.js.map