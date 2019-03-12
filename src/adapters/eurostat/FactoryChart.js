
const DF_COLOR = '#7cb5ec';
const _assign = Object.assign;

const _crColumnConfig = ({ seriaColor=DF_COLOR }) => ({
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
    y: -42
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
});
const _crBarConfig = (option) => {
  const config = _crColumnConfig(option);
  _assign(config.chart, {
    type: 'bar',
    marginTop: 75,
    height: 600
  })
  return config;
};
const _crDotConfig = (option) => {
  const { seriaColor } = option;
  const config = _crColumnConfig(option);
  _assign(config.chart, {
    type: 'scatter',
    inverted: true,
    marginTop: 75,
    height: 600,
  })
  _assign(config.xAxis, {
    gridLineDashStyle: "Dot",
    gridLineWidth: 1
  })
  _assign(config.series[0], {
    //color: hexToRgba(seriaColor),
    color: seriaColor,
    marker: {
      symbol: 'circle',
      radius: 5
    }
  })
  return config;
};

const _r = {
  COLUMN_SET: _crColumnConfig,
  BAR_SET: _crBarConfig,
  DOT_SET: _crDotConfig
};

const FactoryChart = {
  createConfig: (option={}) => {
    const _crConfig = _r[option.seriaType];
    return _crConfig
      ? _crConfig(option)
      : {};
  }
};

export default FactoryChart
