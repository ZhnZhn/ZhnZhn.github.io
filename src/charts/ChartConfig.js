import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsTreemap from 'highcharts/modules/treemap';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';

import HighchartsZhn from './plugin/zhn-highcharts'
import HighchartsFix from './plugin/fix-highcharts'

//import HighchartsMore from 'highcharts/lib/highcharts-more';
//import HighchartsTreemap from 'highcharts/lib/modules/treemap';
//import HighchartsExporting from 'highcharts/lib/modules/exporting';
//import HighchartsOfflineExporting from 'highcharts/lib/modules/offline-exporting';

//import merge from 'lodash.merge';

import COLOR from '../constants/Color';
import Chart from './Chart';
import ChartFn from './ChartFn';
import Tooltip from './Tooltip';

import ChartTheme from './ChartTheme'
import handleMouseOver from './handleMouseOver'

import WithIndicator from './WithIndicatorConfig';
import WithPie from './WithPieConfig';
import WithStackedArea from './WithStackedAreaConfig';
import WithStackedColumn from './WithStackedColumnConfig';
import WithTreeMap from './WithTreeMapConfig';

const merge = Highcharts.merge;

const ChartConfig = {
  ...WithIndicator,
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
    HighchartsFix(Highcharts)

    Highcharts.setOptions(ChartTheme);
  },

  seriaOption(color, option) {
    return Object.assign({
      type: 'line', visible: false, color,
      marker: {
        radius: 3,
        symbol: "circle"
      }
    }, option)
  },

  setSerieData(config, data, index, name, options) {
    config.series[index] = Object.assign({
      type: 'area',
      name: name,
      data: data,
      lineWidth: 1
    }, options)

    config.series[index].point = Chart.fEventsMouseOver(
      handleMouseOver
    )
  },

  _zhSeriaId(id){
    return { zhSeriaId: id };
  },

  setStockSerias(config, dClose, dHigh, dLow, dOpen, id){
    this.setSerieData(config, dClose, 0, 'Close',
      this._zhSeriaId(id)
    )
    this.setSerieData(config, dHigh, 1, 'High',
      this.seriaOption(COLOR.S_HIGH, this._zhSeriaId(id+'H'))
    )
    this.setSerieData(config, dLow, 2, 'Low',
      this.seriaOption(COLOR.S_LOW, this._zhSeriaId(id+'L'))
    )
    this.setSerieData(config, dOpen, 3, 'Open',
      this.seriaOption(COLOR.S_OPEN, this._zhSeriaId(id+'O'))
    )
  },

  setMinMax(config, minValue, maxValue) {
    const plotLines = config.yAxis.plotLines;
    plotLines[0].value = maxValue;
    plotLines[0].label.text = `${ChartConfig.fnNumberFormat(maxValue)}`;
    plotLines[1].value = minValue;
    plotLines[1].label.text = `${ChartConfig.fnNumberFormat(minValue)}`;

    Object.assign(config.yAxis, {
      min: Chart.calcMinY({ minPoint: minValue, maxPoint: maxValue}),
      maxPadding: 0.15,
      minPadding: 0.15,
      endOnTick: false,
      startOnTick: false
    })
  },

  getColor(seriaIndex) {
    const colors = ChartTheme.colors;
    return colors[seriaIndex % colors.length];
  }

};

ChartConfig.fnNumberFormat = function(value){
  const arrSplit = (value+'').split('.')
      , decimal = ( arrSplit[1] )
          ? arrSplit[1].length
          : 0;

  return Highcharts.numberFormat(value, decimal, '.', ' ');
}

ChartConfig.fBaseAreaConfig = function(options) {
  const config = Highcharts.merge(
    Chart.fBaseConfig(options), {
    chart: {
      zoomType: 'xy',
      resetZoomButton: Chart.fResetZoomButton({
        position: {x: -10}
      }),
      xDeltaCrossLabel: 4,
      yDeltaCrossLabel: 20
    },
    zhDetailCharts: [],
    zhToggleSeria: ChartFn.toggleSeria
  });

  config.xAxis = Object.assign( Chart.fXAxisOpposite(config.xAxis), {
    events: {
      afterSetExtremes : ChartFn.zoomIndicatorCharts
    }
  })
  config.yAxis = Object.assign(config.yAxis, {
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
};

ChartConfig.fMarkerExDividend = function(
  color=COLOR.EX_DIVIDEND,
  dataLabelsY=32
){
  return {
    y: 0,
    exValue: 0.5,
    marker : {
      symbol: 'circle',
      fillColor : color,
      lineColor: color,
      radius: 6,
      states: {
        hover: {
          enable: true,
          fillColor: COLOR.PLOT,
          lineColor: color,
          lineWidth: 2,
          radius: 6
        }
      }
    },
    dataLabels : {
      enabled: true,
      inside: true,
      color: color,
      style : {
        fill: color,
        stroke: color,
        color: color,
        fontSize: '12px',
        fontWeight: 'normal',
        textShadow: 'none',
        textOutline: '0px transparent'
      },
      crop: false,
      overflow: 'none',
      y: dataLabelsY,
      formatter : function(){
        return this.point.exValue;
      }
    }
  }
};

ChartConfig.fMarkerSplitRatio = function(){
  const point = ChartConfig.fMarkerExDividend(COLOR.SPLIT_RATIO);
  point.dataLabels.formatter = function() { return this.point.splitRatio};
  return point;
}

const _fScatterSeria = function(color, pointFormatter, data, zhSeriaId){
  return {
    type: 'scatter',
    color: color,
    tooltip : Chart.fTooltip(pointFormatter),
    data : data,
    zhSeriaId : zhSeriaId
  }
}
ChartConfig.fExDividendSeria = function(data, chartId){
  return _fScatterSeria(
    COLOR.EX_DIVIDEND,
    Tooltip.exDividend,
    data,
    chartId + '_ExDivident'
  );
}
ChartConfig.fSplitRatioSeria = function(data, chartId){
  return _fScatterSeria(
    COLOR.SPLIT_RATIO,
    Tooltip.splitRatio,
    data,
    chartId + '_SplitRatio'
  );
}

ChartConfig.fSeries = function(option={}){
  const { seriaType } = option
  , _type = typeof seriaType === 'string'
      ? seriaType.toLowerCase()
      : 'spline';
  return merge(
    false, {
      type: _type,
      //type: 'spline',
      lineWidth: 1,
      tooltip: Chart.fTooltip(Tooltip.fnBasePointFormatter)
    }, option
  );
}

export default ChartConfig
