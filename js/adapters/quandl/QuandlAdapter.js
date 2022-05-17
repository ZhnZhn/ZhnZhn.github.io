"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ChartType = require("../../constants/ChartType");

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _AdapterFn = require("../AdapterFn");

var _compareByFn = require("../compareByFn");

var _QuandlFn = require("./QuandlFn");

var _toArea = _interopRequireDefault(require("./toArea"));

var _toSemiDonut = _interopRequireDefault(require("./toSemiDonut"));

var _toStackedArea = _interopRequireDefault(require("./toStackedArea"));

var _toStackedColumn = _interopRequireDefault(require("./toStackedColumn"));

var _toTreeMap = _interopRequireDefault(require("./toTreeMap"));

var _toYearsByMonths = _interopRequireDefault(require("../toYearsByMonths"));

var _toScatter = _interopRequireDefault(require("./toScatter"));

const _fToConfig = builder => (json, option) => {
  const data = (0, _QuandlFn.getData)(json);
  return {
    config: builder.toConfig(data, option)
  };
};

const _fToSeria = builder => (json, option, chart) => {
  const data = (0, _QuandlFn.getData)(json);
  return builder.toSeria(data, option, chart);
};

const _rToConfig = {
  [_ChartType.CHT_AREA]: _toArea.default,
  [_ChartType.CHT_SEMI_DONUT]: _toSemiDonut.default,
  [_ChartType.CHT_STACKED_AREA]: _toStackedArea.default,
  [_ChartType.CHT_STACKED_AREA_PERCENT]: _toStackedArea.default,
  [_ChartType.CHT_STACKED_COLUMN]: _toStackedColumn.default,
  [_ChartType.CHT_STACKED_COLUMN_PERCENT]: _toStackedColumn.default,
  [_ChartType.CHT_TREE_MAP]: _toTreeMap.default,
  [_ChartType.CHT_YEARLY]: _fToConfig(_toYearsByMonths.default),
  [_ChartType.CHT_SCATTER]: _fToConfig(_toScatter.default),
  [_ChartType.CHT_SCATTER_UP]: _fToConfig(_toScatter.default),
  [_ChartType.CHT_SCATTER_DOWN]: _fToConfig(_toScatter.default)
};

const _crSeriaData = (data, yIndex) => {
  return data.map(p => [(0, _AdapterFn.ymdToUTC)(p[0]), p[yIndex]]).sort(_compareByFn.compareByDate);
};

const _toSeria = (json, option) => {
  const {
    value: chartId
  } = option,
        yPointIndex = (0, _QuandlFn.getDataColumnIndex)(json, option),
        data = _crSeriaData((0, _QuandlFn.getData)(json), yPointIndex);

  return _ChartConfig.default.crSeria({
    name: chartId.substring(0, 12),
    data: data,
    minY: (0, _AdapterFn.findMinY)(data)
  });
};

const _rToSeria = {
  DF: _toSeria,
  [_ChartType.CHT_SCATTER]: _fToSeria(_toScatter.default),
  [_ChartType.CHT_SCATTER_UP]: _fToSeria(_toScatter.default),
  [_ChartType.CHT_SCATTER_DOWN]: _fToSeria(_toScatter.default)
};
const QuandlAdapter = {
  toConfig(json, option) {
    const {
      seriaType = _ChartType.CHT_AREA
    } = option;
    return _rToConfig[seriaType](json, option);
  },

  toSeries(json, option, chart) {
    const {
      seriaType
    } = option,
          _toSeria = _rToSeria[seriaType] || _rToSeria.DF;

    return _toSeria(json, option, chart);
  }

};
var _default = QuandlAdapter;
exports.default = _default;
//# sourceMappingURL=QuandlAdapter.js.map