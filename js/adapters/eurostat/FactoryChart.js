"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _pipe = _interopRequireDefault(require("../../utils/pipe"));
var _Chart = require("../../charts/Chart");
var _configBuilderFn = require("../../charts/configBuilderFn");
var _ChartType = require("../../constants/ChartType");
const _assign = Object.assign;
const CHART_HEIGHT = {
  height: 600,
  marginTop: 75,
  marginBottom: 20
};
const BAR_CHART = {
  ...CHART_HEIGHT,
  type: 'bar'
};
const SCATTER_CHART = {
  ...CHART_HEIGHT,
  type: 'scatter',
  inverted: true
};
const _crLegend = function (y) {
  if (y === void 0) {
    y = 10;
  }
  return {
    y,
    x: 0,
    enabled: true,
    align: 'right',
    verticalAlign: 'top',
    layout: 'horizontal'
  };
};
const PLOT_OPTIONS = {
  minPointLength: 5,
  pointPadding: 0,
  borderWidth: 0,
  groupPadding: 0.2,
  shadow: false
};
const _crPlotOptionsColumn = _ref => {
  let {
    seriaColor
  } = _ref;
  return {
    column: {
      color: seriaColor,
      pointPlacement: 0,
      pointWidth: 6,
      ...PLOT_OPTIONS
    }
  };
};
const _crPlotOptionsBar = _ref2 => {
  let {
    seriaColor
  } = _ref2;
  return {
    bar: {
      color: seriaColor,
      pointWidth: 4,
      ...PLOT_OPTIONS
    }
  };
};
const _crBarYAxis = () => ({
  opposite: true,
  labels: {
    x: 3
  }
});
const _crColumnConfig = (option, categories) => (0, _pipe.default)((0, _configBuilderFn.crBarOrColumnConfig)(void 0, categories), (0, _configBuilderFn.fAdd)({
  legend: _crLegend(),
  plotOptions: _crPlotOptionsColumn(option)
}), _configBuilderFn.toConfig);
const _crBarYAxisLegend = () => ({
  yAxis: _crBarYAxis(),
  legend: _crLegend(28)
});
const _crBarConfig = (option, categories) => {
  const config = (0, _pipe.default)((0, _configBuilderFn.crBarOrColumnConfig)('BAR', categories), (0, _configBuilderFn.fAdd)({
    ..._crBarYAxisLegend(),
    chart: {
      ...BAR_CHART
    },
    plotOptions: _crPlotOptionsBar(option)
  }), _configBuilderFn.toConfig);
  if (option.seriaType === _ChartType.CHT_BAR_WITH_LABELS) {
    config.plotOptions.bar.dataLabels = (0, _Chart.crCategoryDataLabels)(true);
  }
  return config;
};
const _crDotConfig = option => {
  const {
    seriaColor
  } = option;
  const config = (0, _pipe.default)((0, _configBuilderFn.crBarOrColumnConfig)(), (0, _configBuilderFn.fAdd)({
    ..._crBarYAxisLegend(),
    chart: {
      ...SCATTER_CHART
    }
  }), _configBuilderFn.toConfig);
  _assign(config.series[0], {
    color: seriaColor,
    marker: {
      symbol: 'circle',
      radius: 5
    }
  });
  return config;
};
const _r = {
  [_ChartType.CHT_COLUMN_SET]: _crColumnConfig,
  [_ChartType.CHT_BAR_SET]: _crBarConfig,
  [_ChartType.CHT_BAR_WITH_LABELS]: _crBarConfig,
  [_ChartType.CHT_DOT_SET]: _crDotConfig
};
const FactoryChart = {
  createConfig: function (option) {
    const {
        seriaType
      } = option || {},
      _crConfig = seriaType && _r[seriaType];
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return _crConfig ? _crConfig(option, ...args) : {};
  }
};
var _default = exports.default = FactoryChart;
//# sourceMappingURL=FactoryChart.js.map