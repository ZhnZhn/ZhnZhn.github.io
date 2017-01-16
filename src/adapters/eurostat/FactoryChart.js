
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
        crosshair: true,
        gridLineWidth : 0
      },
      yAxis: {
        min: 0,
        opposite: true,
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
          minPointLength : 5,
          pointWidth : 6,
          pointPadding : 0,
          borderWidth : 0,
          groupPadding : 0.2,
          shadow : false
        },
        bar : {
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
    const config = FactoryChart.createColumnConfig()
    config.chart.type = 'bar';
    config.chart.marginTop = '75';
    config.chart.height = 600;

    return config;
  }
};

export default FactoryChart
