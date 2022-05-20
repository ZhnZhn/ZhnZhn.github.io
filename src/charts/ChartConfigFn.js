import Highcharts from 'highcharts';
import HighchartsTreemap from 'highcharts/modules/treemap';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';

import HighchartsZhn from './plugin/zhn-highcharts'

//import HighchartsMore from 'highcharts/lib/highcharts-more';
//import HighchartsTreemap from 'highcharts/lib/modules/treemap';
//import HighchartsExporting from 'highcharts/lib/modules/exporting';
//import HighchartsOfflineExporting from 'highcharts/lib/modules/offline-exporting';

import COLOR from '../constants/Color';
import Chart from './Chart';
import {
  zoomIndicatorCharts,
  afterSetExtremesYAxis
} from './ChartFn';
import { tooltipValueTdmyIf } from './Tooltip';

import ChartTheme from './ChartTheme';
import handleMouseOver from './handleMouseOver';

const _merge = Highcharts.merge
, _assign = Object.assign;

export const initChartConfig = () => {
  HighchartsTreemap(Highcharts);
  HighchartsExporting(Highcharts);
  HighchartsOfflineExporting(Highcharts);

  HighchartsZhn(Highcharts)

  Highcharts.setOptions(ChartTheme);
}

export const setSeriaDataTo = (
  config,
  data,
  index,
  name,
  options
) => {
    const {
      type='area',
      lineWidth=1,
      ...restOptions
    } = options || {};
    config.series[index] = _assign({
      type,
      lineWidth,
      name,
      data,
    }, restOptions, {
      point: Chart.fEventsMouseOver(handleMouseOver)
    })
}

export const getSeriaColorByIndex = (seriaIndex) => {
  const colors = ChartTheme.colors;
  return colors[seriaIndex % colors.length];
}

export const crSeriaConfig = (
  option
) => {
  const {
    seriaType,
    seriaWidth,
    seriaColor,
    //tp,
    ...restOption
  } = option || {}
  , type = Chart.crType(seriaType)
  , pointFormatter = tooltipValueTdmyIf
  /*
  , pointFormatter = tp && Tooltip[tp]
      || tooltipValueTdmyIf;
  */
  return {
    type,
    lineWidth: seriaWidth ?? 1,
    color: seriaColor,
    tooltip: Chart.fTooltip(pointFormatter),
    ...restOption
  };
}

export const crAreaConfig = (
  options
) => {
  const config = _merge(
    Chart.crAreaConfig(options), {
    chart: {
      zoomType: 'xy',
      xDeltaCrossLabel: 4,
      yDeltaCrossLabel: 20
    },
    zhDetailCharts: []
  });

  config.xAxis = _assign( Chart.fXAxisOpposite(config.xAxis), {
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
    Chart.fPlotLine(COLOR.HIGH, 'max'),
    Chart.fPlotLine(COLOR.LOW, 'min')
  ]
  return config;
}
