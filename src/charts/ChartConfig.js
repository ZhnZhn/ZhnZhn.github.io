import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
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
import ChartFn from './ChartFn';
import Tooltip from './Tooltip';

import ChartTheme from './ChartTheme'
import handleMouseOver from './handleMouseOver'

import WithIndicator from './WithIndicatorConfig';
import WithMarkers from './WithMarkers';
import WithPie from './WithPieConfig';
import WithStackedArea from './WithStackedAreaConfig';
import WithStackedColumn from './WithStackedColumnConfig';
import WithTreeMap from './WithTreeMapConfig';

const _merge = Highcharts.merge;
const _assign = Object.assign;
const _isStr = str => typeof str === 'string';

const _crScatterSeria = (color, pointFormatter, data) => ({
  type: 'scatter',
  color: color,
  tooltip: Chart.fTooltip(pointFormatter),
  data: data
});

const _crSeriaOption = (color, option) => _assign({
  type: 'line', visible: false, color,
  marker: {
    radius: 3,
    symbol: "circle"
  }
}, option);


const ChartConfig = {
  ...WithIndicator,
  ...WithMarkers,
  ...WithPie,
  ...WithStackedArea,
  ...WithStackedColumn,
  ...WithTreeMap,

  init(){
    HighchartsMore(Highcharts);
    HighchartsTreemap(Highcharts);
    HighchartsExporting(Highcharts);
    HighchartsOfflineExporting(Highcharts);

    HighchartsZhn(Highcharts)

    Highcharts.setOptions(ChartTheme);
  },

  setSerieData(config, data, index, name, options) {
    config.series[index] = _assign({
      type: 'area',
      name: name,
      data: data,
      lineWidth: 1
    }, options)

    config.series[index].point = Chart.fEventsMouseOver(
      handleMouseOver
    )
  },

  setStockSerias(config, dClose, dHigh, dLow, dOpen, id){
    this.setSerieData(config, dClose, 0, 'Close')
    this.setSerieData(config, dHigh, 1, 'High',
      _crSeriaOption(COLOR.S_HIGH)
    )
    this.setSerieData(config, dLow, 2, 'Low',
      _crSeriaOption(COLOR.S_LOW)
    )
    this.setSerieData(config, dOpen, 3, 'Open',
      _crSeriaOption(COLOR.S_OPEN)
    )
  },

  getColor(seriaIndex) {
    const colors = ChartTheme.colors;
    return colors[seriaIndex % colors.length];
  },

  crDividendSeria: (data) => _crScatterSeria(
    COLOR.EX_DIVIDEND,
    Tooltip.exDividend,
    data
  ),

  crSplitRatioSeria: (data) => _crScatterSeria(
    COLOR.SPLIT_RATIO,
    Tooltip.splitRatio,
    data
  ),

  crSeria: (option={}) => {
    const {
      seriaType, seriaWidth, seriaColor,
      tp,
      ...restOption
    } = option
    , type = _isStr(seriaType)
        ? seriaType.toLowerCase()
        : 'spline'
    , pointFormatter = tp && Tooltip[tp]
        || Tooltip.vDmy;
    return {
      type,
      lineWidth: seriaWidth ?? 1,
      color: seriaColor,
      tooltip: Chart.fTooltip(pointFormatter),
      ...restOption
    };
  },

  crAreaConfig: (options) => {
    const config = _merge(
      Chart.crAreaConfig(options), {
      chart: {
        zoomType: 'xy',
        resetZoomButton: Chart.fResetZoomButton({
          position: {x: -10}
        }),
        xDeltaCrossLabel: 4,
        yDeltaCrossLabel: 20
      },
      zhDetailCharts: []
    });

    config.xAxis = _assign( Chart.fXAxisOpposite(config.xAxis), {
      events: {
        afterSetExtremes : ChartFn.zoomIndicatorCharts
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
        afterSetExtremes: ChartFn.afterSetExtremesYAxis
      }
    })


    config.yAxis.plotLines = [
      Chart.fPlotLine(COLOR.HIGH, 'max'),
      Chart.fPlotLine(COLOR.LOW, 'min')
    ]

    return config;
  }
};

export default ChartConfig
