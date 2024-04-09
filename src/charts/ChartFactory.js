import { COLOR_BLUE } from '../constants/Color';
import { fTooltip } from './Chart';
import { tooltipCategory } from './Tooltip';

const DF_COLOR = '#8085e9';

const _assign = Object.assign
, _crPlotOption = (
  pointWidth
) => ({
    pointWidth,
    color: DF_COLOR,
    minPointLength: 5,
    pointPadding: 0,
    borderWidth: 0,
    groupPadding: 0.2,
    shadow: false
});

const _crEmptyText = () => ({
  text: ''
})
, _crAxisLabels = (
  x,
  y,
  color=COLOR_BLUE
) => ({
  x, y,
  style: { color }
})
, _crCategoryConfig = (
  seriaColor
) => ({
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
    labels: _crAxisLabels(3, 0, seriaColor),
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
  series: [{ name: 'Series 1'}]
})
, _crChartTypeMargin = (
  type,
  marginTop,
  marginBottom
) => ({
  type,
  marginTop,
  marginBottom
});

export const crColumnConfig = (seriaColor) => {
  const config = _crCategoryConfig(seriaColor);
  _assign(config.chart,
    _crChartTypeMargin("column", 60, 100)
  )
  _assign(config.plotOptions, {
    column: _crPlotOption(6)
  })
  return config;
}

export const crBarConfig = (seriaColor) =>  {
  const config = _crCategoryConfig(seriaColor);
  _assign(config.chart,
    _crChartTypeMargin("bar", 50, 35),
    { height: 450 }
  )
  _assign(config.yAxis, {
    opposite: false,
    gridLineDashStyle: 'ShortDot',
    labels: _crAxisLabels(0, 14, seriaColor)
  })
  _assign(config.plotOptions, {
    bar: _crPlotOption(4)
  })
  return config;
}
