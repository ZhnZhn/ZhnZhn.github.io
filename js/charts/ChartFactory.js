'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ChartFactory = {
  crColumnConfig: function crColumnConfig() {
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
        lineWidth: 0,
        tickLength: 0,
        gridLineDashStyle: 'Dot',
        labels: {
          x: 3
        },
        title: {
          text: ''
        }
      },
      legend: {
        enabled: false,
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
  crBarConfig: function crBarConfig() {
    var config = this.crColumnConfig();
    Object.assign(config.chart, {
      type: 'bar',
      //marginTop: 75,
      marginTop: 50,
      height: 450
    });
    //config.yAxis.labels = { x: 0, y: -7 }
    Object.assign(config.yAxis, {
      labels: { x: 0, y: 14 },
      opposite: false,
      gridLineDashStyle: 'ShortDot'
    });

    return config;
  }
};

exports.default = ChartFactory;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\charts\ChartFactory.js.map