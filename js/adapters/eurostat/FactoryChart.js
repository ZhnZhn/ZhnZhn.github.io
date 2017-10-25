'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var FactoryChart = {
  createColumnConfig: function createColumnConfig() {
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
        crosshair: true,
        gridLineWidth: 0
      },
      yAxis: {
        min: 0,
        opposite: true,
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
          color: '#8085e9',
          minPointLength: 5,
          pointWidth: 6,
          pointPadding: 0,
          borderWidth: 0,
          groupPadding: 0.2,
          shadow: false
        },
        bar: {
          color: '#8085e9',
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
  createBarConfig: function createBarConfig() {
    var config = FactoryChart.createColumnConfig();
    Object.assign(config.chart, {
      type: 'bar',
      marginTop: 75,
      height: 600
    });

    return config;
  }
};

exports.default = FactoryChart;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\eurostat\FactoryChart.js.map