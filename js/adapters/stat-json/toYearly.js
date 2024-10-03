"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _pipe = _interopRequireDefault(require("../../utils/pipe"));
var _configBuilderFn = require("../../charts/configBuilderFn");
var _JsonStatFn = require("../JsonStatFn");
var _toYearsByMonths = _interopRequireDefault(require("../toYearsByMonths"));
var _fnAdapter = require("./fnAdapter");
const crYearlyConfig = (json, option) => {
  const {
      title = '',
      subtitle
    } = option,
    data = (0, _JsonStatFn.crYearlyData)(json).reverse();
  return (0, _pipe.default)((0, _toYearsByMonths.default)(data, option), (0, _configBuilderFn.fAdd)('chart', {
    spacingTop: 25
  }), (0, _configBuilderFn.fAddCaption)(title, subtitle), (0, _configBuilderFn.fAdd)('info', (0, _fnAdapter.crInfo)(option, json)), (0, _configBuilderFn.fAdd)('zhConfig', (0, _fnAdapter.crZhConfig)(option)), _configBuilderFn.toConfig);
};
var _default = exports.default = crYearlyConfig;
//# sourceMappingURL=toYearly.js.map