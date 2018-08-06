
const DF_COLOR = '#8085e9';

const ChartFactory = {
  crColumnConfig({ seriaColor }={}) {
    const _color = seriaColor || DF_COLOR;
    return {
      chart: {
        type: "column",
        marginTop: 60,
        panKey: undefined,
        panning: false,
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
        gridLineWidth : 0
      },
      yAxis: {
        //min: 0,
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
      legend : {
        enabled : false,
        align: 'right',
        verticalAlign: 'top',
        layout: 'horizontal',
        x:  0,
        y: -25
      },
      plotOptions: {
        column : {
          color: _color,
          minPointLength : 5,
          pointWidth : 6,
          pointPadding : 0,
          borderWidth : 0,
          groupPadding : 0.2,
          shadow : false
        },
        bar : {
          color: _color,
          minPointLength : 5,
          pointWidth : 4,
          pointPadding : 0,
          borderWidth : 0,
          groupPadding : 0.2,
          shadow : false
        }
      },
      series: [{ name: 'Column'}]
    }
  },

  crBarConfig(option) {
    const config = this.crColumnConfig(option);
    Object.assign(config.chart, {
      type: 'bar',
      //marginTop: 75,
      marginTop: 50,
      height: 450
    })
    //config.yAxis.labels = { x: 0, y: -7 }
    Object.assign(config.yAxis, {
      labels: { x: 0, y: 14 },
      opposite: false,
      gridLineDashStyle: 'ShortDot'
    })

    return config;
  }
};

export default ChartFactory
