import { merge } from '../utils/objFn';
import {
  COLOR_HIGH,
  COLOR_LOW
} from '../constants/Color';

import {
  crAreaConfig as _crAreaConfig,
  fEventsMouseOver,
  crType,
  fTooltip,
  fXAxisOpposite,
  fPlotLine
} from './Chart';
import {
  zoomIndicatorCharts,
  afterSetExtremesYAxis
} from './ChartFn';
import { tooltipValueTdmyIf } from './Tooltip';

import handleMouseOver from './handleMouseOver';

const _assign = Object.assign;

const LINE_TYPES = [
  'spline',
  'line',
  'area'
]
, _isLineType = chartType => LINE_TYPES
    .indexOf(chartType) !== -1

export const isLineType = (
  config
) => _isLineType(
  ((config.series||[])[0]||{}).type
)

export const setSeriaDataTo = (
  config,
  data,
  index,
  name,
  options
) => {
  config.series[index] = {
    type: 'area',
    lineWidth: 1,
    name,
    data,
    ...options,
    point: fEventsMouseOver(handleMouseOver)
  }
}

export const crSeriaConfig = ({
  seriaType,
  seriaWidth,
  seriaColor,
  ...restOption
} = {}) => ({
  type: crType(seriaType),
  lineWidth: seriaWidth ?? 1,
  color: seriaColor,
  tooltip: fTooltip(tooltipValueTdmyIf),
  ...restOption
})

export const crAreaConfig = (
  options
) => {
  const config = merge(
    _crAreaConfig(options), {
    chart: {
      zoomType: 'xy',
      xDeltaCrossLabel: 4,
      yDeltaCrossLabel: 20
    },
    zhDetailCharts: []
  });

  config.xAxis = _assign(fXAxisOpposite(config.xAxis), {
    events: {
      afterSetExtremes: zoomIndicatorCharts
    }
  })
  config.yAxis = _assign(config.yAxis, {
    lineWidth: 0,
    tickLength: 0,
    offset: 4,
    labels: {
      x: 8,
      y: 5
    },
    events: {
      afterSetExtremes: afterSetExtremesYAxis
    }
  })

  config.yAxis.plotLines = [
    fPlotLine(COLOR_HIGH, 'max'),
    fPlotLine(COLOR_LOW, 'min')
  ]
  return config;
}
