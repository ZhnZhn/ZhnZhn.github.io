
const DF_COLOR = '#7cb5ec';
const FactoryChart = {
  createColumnConfig : ({ seriaColor=DF_COLOR }={}) => {
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
        gridLineWidth : 0
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
      legend : {
        enabled : true,
        align: 'right',
        verticalAlign: 'top',
        layout: 'horizontal',
        x:  0,
        y: -25
      },
      plotOptions: {
        column : {
          color: seriaColor,
          minPointLength : 5,
          pointPlacement: 0,
          pointWidth : 6,
          pointPadding : 0,
          borderWidth : 0,
          groupPadding : 0.2,
          shadow : false
        },
        bar : {
          color: seriaColor,
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
  createBarConfig : (option) => {
    const config = FactoryChart.createColumnConfig(option);
    Object.assign(config.chart, {
      type: 'bar',
      marginTop: 75,
      height: 600
    })

    return config;
  }
};

export default FactoryChart
