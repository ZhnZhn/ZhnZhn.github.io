"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _pipe = _interopRequireDefault(require("../../utils/pipe"));
var _configBuilderFn = require("../../charts/configBuilderFn");
var _toYearsByMonths = _interopRequireDefault(require("../toYearsByMonths"));
var _fnAdapter = require("./fnAdapter");
var _fnUtil = require("./fnUtil");
const _isArr = Array.isArray;
const _toData = (values, times) => {
  const _values = _isArr(values) ? values : [values];
  const data = times.map((time, i) => [(0, _fnUtil.toYMD)(time), _values[i].value]);
  return data.reverse();
};
const crYearlyConfig = (json, option) => {
  const {
      title = '',
      subtitle
    } = option,
    [ds, values, times] = (0, _fnAdapter.crDsValuesTimes)(json, option),
    data = _toData(values, times);
  return (0, _pipe.default)((0, _toYearsByMonths.default)(data, option), (0, _configBuilderFn.fAdd)('chart', {
    spacingTop: 25
  }), (0, _configBuilderFn.fAddCaption)(title, subtitle), (0, _configBuilderFn.fAdd)('info', (0, _fnAdapter.crInfo)(ds, option)), (0, _configBuilderFn.fAdd)('zhConfig', (0, _fnAdapter.crZhConfig)(option)), _configBuilderFn.toConfig);
};
var _default = exports.default = crYearlyConfig;
//# sourceMappingURL=toYearly.js.map