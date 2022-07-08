"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _fnAdapter = require("./fnAdapter");

var _toTreeMap = _interopRequireDefault(require("./toTreeMap"));

var _toCategory = _interopRequireDefault(require("./toCategory"));

var _toSeriesConfig = _interopRequireDefault(require("./toSeriesConfig"));

const toConfig = (json, option) => {
  if (option.two === 'AG2' || (0, _fnAdapter.isTotalByAll)(option)) {
    return option.chart === 'BAR' ? (0, _toCategory.default)(json, option) : (0, _toTreeMap.default)(json, option);
  }

  return (0, _toSeriesConfig.default)(json, option);
};

var _default = toConfig;
exports.default = _default;
//# sourceMappingURL=toConfig.js.map