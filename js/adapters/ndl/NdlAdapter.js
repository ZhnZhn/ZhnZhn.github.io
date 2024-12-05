"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ChartType = require("../../constants/ChartType");
var _ChartConfigFn = require("../../charts/ChartConfigFn");
var _AdapterFn = require("../AdapterFn");
var _compareByFn = require("../compareByFn");
var _NdlFn = require("./NdlFn");
var _toArea = _interopRequireDefault(require("./toArea"));
var _toYearsByMonths = _interopRequireDefault(require("../toYearsByMonths"));
const _fToConfig = crConfig => (json, option) => ({
  config: crConfig((0, _NdlFn.getData)(json), option)
});
const _toYearlyByMonth = _fToConfig(_toYearsByMonths.default),
  _getCrConfig = (0, _AdapterFn.crGetRoute)({
    [_ChartType.CHT_AREA]: _toArea.default,
    [_ChartType.CHT_SPLINE]: _toArea.default,
    [_ChartType.CHT_LINE]: _toArea.default,
    [_ChartType.CHT_COLUMN]: _toArea.default,
    [_ChartType.CHT_YEARLY]: _toYearlyByMonth,
    [_ChartType.CHT_AREA_YEARLY]: _toYearlyByMonth
  }, _toArea.default);
const _crSeriaData = data => data.map(p => [(0, _AdapterFn.ymdToUTC)(p[0]), p[1]]).sort(_compareByFn.compareByDate);
const _toSeria = (json, option) => {
  const {
      value: chartId
    } = option,
    data = _crSeriaData((0, _NdlFn.getData)(json));
  return (0, _ChartConfigFn.crSeriaConfig)({
    name: chartId.substring(0, 12),
    data: data,
    minY: (0, _AdapterFn.findMinY)(data)
  });
};
const NdlAdapter = {
  toConfig(json, option) {
    return _getCrConfig(option.seriaType)(json, option);
  },
  toSeries(json, option, chart) {
    return _toSeria(json, option, chart);
  }
};
var _default = exports.default = NdlAdapter;
//# sourceMappingURL=NdlAdapter.js.map