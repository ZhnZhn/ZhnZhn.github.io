"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _pipe = _interopRequireDefault(require("../../utils/pipe"));
var _configBuilderFn = require("../../charts/configBuilderFn");
var _ChartType = require("../../constants/ChartType");
var _EuroStatFn = require("./EuroStatFn");
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
const _crBarDataLabels = () => ({
  enabled: true,
  color: (0, _EuroStatFn.getColorBlack)(),
  crop: false,
  overflow: 'allow',
  zIndex: 10,
  style: {
    fontSize: '14px'
  }
});
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
const _crColumnConfig = option => (0, _pipe.default)((0, _configBuilderFn.crBarOrColumnConfig)(), (0, _configBuilderFn.fAdd)({
  legend: _crLegend(),
  plotOptions: _crPlotOptionsColumn(option)
}), _configBuilderFn.toConfig);
const _crBarConfig = option => {
  const config = (0, _pipe.default)((0, _configBuilderFn.crBarOrColumnConfig)('BAR'), (0, _configBuilderFn.fAdd)({
    chart: {
      ...BAR_CHART
    },
    yAxis: _crBarYAxis(),
    legend: _crLegend(28),
    plotOptions: _crPlotOptionsBar(option)
  }), _configBuilderFn.toConfig);
  if (option.seriaType === _ChartType.CHT_BAR_WITH_LABELS) {
    config.plotOptions.bar.dataLabels = _crBarDataLabels();
  }
  return config;
};
const _crDotConfig = option => {
  const {
    seriaColor
  } = option;
  const config = (0, _pipe.default)((0, _configBuilderFn.crBarOrColumnConfig)(), (0, _configBuilderFn.fAdd)({
    chart: {
      ...SCATTER_CHART
    },
    legend: _crLegend(28)
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
  createConfig: option => {
    const {
        seriaType
      } = option || {},
      _crConfig = seriaType && _r[seriaType];
    return _crConfig ? _crConfig(option) : {};
  }
};
var _default = exports.default = FactoryChart;
//# sourceMappingURL=FactoryChart.js.map