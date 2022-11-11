import { fTooltip } from './Chart';
import { tooltipCategory } from './Tooltip';

const DF_COLOR = '#8085e9';

const _assign = Object.assign
, _crPlotOption = (
  pointWidth,
  { seriaColor=DF_COLOR } = {}
) => ({
    pointWidth,
    color: seriaColor ,
    minPointLength: 5,
    pointPadding: 0,
    borderWidth: 0,
    groupPadding: 0.2,
    shadow: false
});

const _crEmptyText = () => ({
  text: ''
});

const _crCategoryConfig = () => ({
  chart: {
    panKey: void 0,
    panning: false,
    spacingTop: 25
  },
  title: _crEmptyText(),
  subtitle: _crEmptyText(),
  tooltip: fTooltip(tooltipCategory),
  xAxis: {
    type: "category",
    categories: [],
    crosshair: true,
    gridLineWidth: 0
  },
  yAxis: {
    //min: 0,
    opposite: true,
    lineWidth: 0,
    tickLength: 0,
    gridLineDashStyle: 'Dot',
    labels: { x: 3 },
    title: _crEmptyText()
  },
  legend: {
    enabled: false,
    align: 'right',
    verticalAlign: 'top',
    layout: 'horizontal',
    x: 0,
    y: -25
  },
  plotOptions: {},
  series: [{ name: 'Column'}]
})

export const crColumnConfig = (
  options
) => {
  const config = _crCategoryConfig();
  _assign(config.chart, {
    type: "column",
    marginTop: 60,
    marginBottom: 100,
  })
  _assign(config.plotOptions, {
    column: _crPlotOption(6, options),
  })
  return config;
}

export const crBarConfig = (
  options
) =>  {
  const config = _crCategoryConfig();
  _assign(config.chart, {
    type: 'bar',
    height: 450,
    marginTop: 50,
    marginBottom: 35
  })
  _assign(config.yAxis, {
    labels: { x: 0, y: 14 },
    opposite: false,
    gridLineDashStyle: 'ShortDot'
  })
  _assign(config.plotOptions, {
    bar: _crPlotOption(4, options)
  })

  return config;
}
