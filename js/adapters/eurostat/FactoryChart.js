'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var DF_COLOR = '#7cb5ec';
var FactoryChart = {
  createColumnConfig: function createColumnConfig() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$seriaColor = _ref.seriaColor,
        seriaColor = _ref$seriaColor === undefined ? DF_COLOR : _ref$seriaColor;

    return {
      chart: {
        type: 'column',
        marginTop: 60
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
        }
      },
      legend: {
        enabled: true,
        align: 'right',
        verticalAlign: 'top',
        layout: 'horizontal',
        x: 0,
        y: -25
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
  },
  createBarConfig: function createBarConfig(option) {
    var config = FactoryChart.createColumnConfig(option);
    Object.assign(config.chart, {
      type: 'bar',
      marginTop: 75,
      height: 600
    });

    return config;
  }
};

exports.default = FactoryChart;
//# sourceMappingURL=FactoryChart.js.map