
const FactoryChart = {
  createColumnConfig : () => {
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
          color: '#8085e9',
          minPointLength : 5,
          pointWidth : 6,
          pointPadding : 0,
          borderWidth : 0,
          groupPadding : 0.2,
          shadow : false
        },
        bar : {
          color: '#8085e9',
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
  createBarConfig : () => {
    const config = FactoryChart.createColumnConfig();
    Object.assign(config.chart, {
      type: 'bar',
      marginTop: 75,
      height: 600
    })

    return config;
  }
};

export default FactoryChart
