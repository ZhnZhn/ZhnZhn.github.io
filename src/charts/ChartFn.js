import Highcharts from 'highcharts';

import Big from 'big.js';

import mathFn from '../math/mathFn'
import formatNumber from '../utils/formatNumber'
import formatAllNumber from '../utils/formatAllNumber'

import fnArr from '../utils/fnArr';
import DateUtils from '../utils/DateUtils';

import Chart from './Chart';

import { Direction } from '../constants/Type';


import WithAreaChartFn from './WithAreaChartFn'
import calcDeltaYAxis from './calcDeltaYAxis'

const {
  crValueMoving,
  toFixedNumber,
  calcPercent
} = mathFn;


const _isFn = fn => typeof fn === 'function';
const _fnFindIndex = fnArr.findIndexByProp('x');

const C = {
  C1_SECOND_Y_AXIS: '#f45b5b',
  C2_SECOND_Y_AXIS: '#f7a35c',
  SERIA_LABEL_CHARS : 14,
  SERIA_LABELS_IN_ROW : 3,
  SERIA_LABEL_X_DELTA : 120,
  SERIA_LABEL_Y_DELTA : 95,
  SERIA_LABEL_WIDTH : 125,
  SERIA_LABEL_HEIGHT : 20
};

//const _fnNoop = () => {};

const _initOptionsZhSeries = (chart) => {
  const options = chart.options
      , zhSeries = options.zhSeries;
  if (!zhSeries){
    options.zhSeries = {
      count: 0,
      titleEls: []
    }
  } else if (!zhSeries.titleEls){
    zhSeries.titleEls = []
  }
  return options;
}

const _crYAxisColor = (chart) => {
  switch(chart.yAxis.length){
    case 1: return C.C1_SECOND_Y_AXIS;
    case 2: return C.C2_SECOND_Y_AXIS;
    default: return C.C1_SECOND_Y_AXIS;
  }
}

const _addSeries = ({ chart, series, label, hasSecondYAxis }) => {
  let _color;
  if (hasSecondYAxis){
    _color = _crYAxisColor(chart)
    chart.addAxis( Chart.fSecondYAxis(label, _color) )
    series.yAxis = label
    series.color = _color
  }

  if (Array.isArray(series)){
    const _max = series.length - 1;
    series.forEach((seria, index) => {
      if (hasSecondYAxis) {
        seria.yAxis = label
      }
      if (index !== _max ) {
        chart.addSeries(seria, false, false)
      } else {
        chart.addSeries(seria, true, true)
      }
    })
  } else {
    chart.addSeries(series, true, true)
  }
  return _color;
}

const _calcXyForLabel = (options) => {
  const seriesCount = options.zhSeries.count
  , row = Math.floor(seriesCount/C.SERIA_LABELS_IN_ROW)
  , x = C.SERIA_LABEL_X_DELTA
        + C.SERIA_LABEL_WIDTH*seriesCount
        - row*(C.SERIA_LABEL_WIDTH*C.SERIA_LABELS_IN_ROW)
  , y = C.SERIA_LABEL_Y_DELTA + C.SERIA_LABEL_HEIGHT*row;
  return { x, y };
}
const _renderSeriesLabel = ({chart, options, series, label='', color }) => {
  const seriesText = (label.length>C.SERIA_LABEL_CHARS)
            ? label.substring(0, C.SERIA_LABEL_CHARS)
            : label
      , { x, y } = _calcXyForLabel(options);

  return chart.renderer.text(seriesText, x, y)
    .css({
      color: color || options.colors[series._colorIndex],
      'font-size': '16px',
      'font-weight': 800
    })
    .add();
};

const _updateYAxisMin = ({ hasSecondYAxis, series, options, chart }) => {
  const minY = series?.minY
  , min = options?.yAxis?.[0]?.min
  , _yAxis = chart?.yAxis?.[0];
  if ( !hasSecondYAxis && (minY !== undefined)
       && min>minY && _isFn(_yAxis?.update)){
    _yAxis.update({ min: minY, startOnTick: true });
  }
};


const _formatNumber = n => formatAllNumber(toFixedNumber(n));
const _setPlotLine = (plotLine, value, delta='') => {
  if (plotLine) {
    plotLine.value = value
    plotLine.label.text = `${_formatNumber(value)}${delta}`
  }
};


const ChartFn = {
  ...WithAreaChartFn,
  arCalcDeltaYAxis: calcDeltaYAxis,

  addSeriaWithRenderLabel(props){
    const {
            chart, series, label, color, hasSecondYAxis
          } = props
        ,  options = _initOptionsZhSeries(chart)
        , _color = _addSeries({
            chart, series, label, hasSecondYAxis
          })
        , textEl = _renderSeriesLabel({
            chart, options, series, label,
            color: color || _color
          });
    options.zhSeries.count +=1
    options.zhSeries.titleEls.push(textEl)

    _updateYAxisMin({ hasSecondYAxis, series, options, chart })
  },

  zoomIndicatorCharts(event){
    const zhDetailCharts = this.chart.options.zhDetailCharts
       , { userMin, userMax, min, max } = event;
    if (userMin){
      zhDetailCharts.forEach( chart => {
        chart.xAxis[0].setExtremes( userMin, userMax, true, true);
      })
    } else {
      zhDetailCharts.forEach( chart => {
        chart.xAxis[0].setExtremes( min, max, true, true);
      })
    }
  },
  afterSetExtremesYAxis(event){
    const { trigger, userMax, userMin } = event;
    if (trigger === 'zoom' && userMax) {
      this.setExtremes(
        userMin, userMax + (userMax-userMin)*0.05,
        true, true
      )
    }
  },

  crValueMoving(chart, prev, dateTo){
    const points = chart.series[0].data
        , millisUTC = DateUtils.dmyToUTC(dateTo)
        , index = _fnFindIndex(points, millisUTC)
        , valueTo = index !== -1
            ? points[index].y
            : undefined;

    return valueTo !== undefined
      ? Object.assign({}, prev,
          crValueMoving({
            nowValue: prev.value,
            prevValue: valueTo,
            Direction: Direction,
            fnFormat: formatAllNumber
          }),
          { valueTo, dateTo }
        )
     : undefined;
  },

  toNumberFormat: formatNumber,
  toNumberFormatAll: formatAllNumber,

  crTpId: () => {
    return (
       'TP_' +
        Date.now().toString(36) +
        Math.random().toString(36).substring(2, 9)
      )
      .toUpperCase();
  },

  toDateFormatDMY: Highcharts
     .dateFormat.bind(null, '%A, %b %d, %Y'),
  toDateFormatDMYT: Highcharts
     .dateFormat.bind(null, '%A, %b %d, %Y, %H:%M'),

  setMinMaxPlotLines({ plotLines, min, max, value, isDrawDeltaExtrems}){
    if (isDrawDeltaExtrems) {
      ChartFn.setPlotLinesDeltas({ plotLines, min, max, value })
    } else {
      ChartFn.setPlotLinesMinMax({ plotLines, min, max})
    }
  },

  setPlotLinesMinMax: ({ plotLines, min, max }) => {
    if ( max>Number.NEGATIVE_INFINITY ){
      _setPlotLine(plotLines[0], max)
    }
    if ( min<Number.POSITIVE_INFINITY ){
      _setPlotLine(plotLines[1], min)
    }
  },
  setPlotLinesDeltas: ({ plotLines, min, max, value }) => {
    const _bMax = max !== Number.NEGATIVE_INFINITY
        ? Big(max)
        : Big(0)
    , _bMin = min !== Number.POSITIVE_INFINITY
        ? Big(min)
        : Big(0)
    , _bValue = value !== null
        ? Big(value)
        : Big(0)
    , perToMax = calcPercent({
       bValue: _bMax.minus(_bValue),
       bTotal: _bValue
    })
    , perToMin = calcPercent({
      bValue: _bValue.minus(_bMin),
      bTotal: _bValue
    })
    , _deltaMax = `\u00A0\u00A0Δ ${perToMax}%`
    , _deltaMin = `\u00A0\u00A0Δ ${perToMin}%`
    , _maxPoint = parseFloat(_bMax.round(4).toString(), 10)
    , _minPoint = parseFloat(_bMin.round(4).toString(), 10);

    _setPlotLine(plotLines[0], _maxPoint, _deltaMax)
    _setPlotLine(plotLines[1], _minPoint, _deltaMin)
  },

  calcMinY: ({ min, max }) => max>Number.NEGATIVE_INFINITY
   && min<Number.POSITIVE_INFINITY
     ? min - ((max-min)*1/6)
     : void 0,

  setYToPoints: (data, y) => {
    if (y == null) {
      return;
    }
    const max=data.length;
    for (let i=0; i<max; i++ ){
      data[i].y = y;
    }
  }

}

export default ChartFn
