'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DF_COLOR = '#7cb5ec';
var _assign = Object.assign;

var BAR_CHART = {
  type: 'bar',
  marginTop: 75,
  height: 600
};
var DATA_LABELS = {
  enabled: true,
  color: 'black',
  crop: false,
  overflow: 'allow',
  zIndex: 10,
  style: {
    fontSize: '14px'
  }
};
var SCATTER_CHART = {
  type: 'scatter',
  inverted: true,
  marginTop: 75,
  height: 600
};

var _crColumnConfig = function _crColumnConfig(_ref) {
  var _ref$seriaColor = _ref.seriaColor,
      seriaColor = _ref$seriaColor === undefined ? DF_COLOR : _ref$seriaColor;
  return {
    chart: {
      type: 'column',
      marginTop: 60,
      panKey: undefined,
      panning: false
    },
    title: {
      text: ''
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      categories: [],
      type: "category",
      crosshair: true,
      gridLineWidth: 0
    },
    yAxis: {
      min: 0,
      opposite: true,
      lineWidth: 0,
      tickLength: 0,
      labels: {
        x: 3
      },
      title: {
        text: ''
      },
      gridLineDashStyle: 'Solid',
      gridLineWidth: 0.2
    },
    legend: {
      enabled: true,
      align: 'right',
      verticalAlign: 'top',
      layout: 'horizontal',
      x: 0,
      y: -42
    },
    plotOptions: {
      column: {
        color: seriaColor,
        minPointLength: 5,
        pointPlacement: 0,
        pointWidth: 6,
        pointPadding: 0,
        borderWidth: 0,
        groupPadding: 0.2,
        shadow: false
      },
      bar: {
        color: seriaColor,
        minPointLength: 5,
        pointWidth: 4,
        pointPadding: 0,
        borderWidth: 0,
        groupPadding: 0.2,
        shadow: false
      }
    },
    series: [{ name: 'Column' }]
  };
};
var _crBarConfig = function _crBarConfig(option) {
  var config = _crColumnConfig(option);
  _assign(config.chart, BAR_CHART);
  if (option.seriaType === 'BAR_WITH_LABELS') {
    config.plotOptions.bar.dataLabels = (0, _extends3.default)({}, DATA_LABELS);
  }
  return config;
};
var _crDotConfig = function _crDotConfig(option) {
  var seriaColor = option.seriaColor;

  var config = _crColumnConfig(option);
  _assign(config.chart, SCATTER_CHART);
  /*
  _assign(config.xAxis, {
    gridLineDashStyle: "Dot",
    gridLineWidth: 1
  })
  */
  _assign(config.series[0], {
    //color: hexToRgba(seriaColor),
    color: seriaColor,
    marker: {
      symbol: 'circle',
      radius: 5
    }
  });
  return config;
};

var _r = {
  COLUMN_SET: _crColumnConfig,
  BAR_SET: _crBarConfig,
  BAR_WITH_LABELS: _crBarConfig,
  DOT_SET: _crDotConfig
};

var FactoryChart = {
  createConfig: function createConfig() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _crConfig = _r[option.seriaType];
    return _crConfig ? _crConfig(option) : {};
  }
};

exports.default = FactoryChart;
//# sourceMappingURL=FactoryChart.js.map