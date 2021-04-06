import Big from 'big.js';

import mathFn from '../math/mathFn';
import formatNumber from '../utils/formatNumber';
import formatAllNumber from '../utils/formatAllNumber';

import fnArr from '../utils/fnArr';
import DateUtils from '../utils/DateUtils';

import Chart from './Chart';

import { Direction } from '../constants/Type';

import WithAreaChartFn from './WithAreaChartFn';
import calcDeltaYAxis from './calcDeltaYAxis';
import dateFormat from './dateFormat';

const { toDmy, toTdmy, toTdmyIf } = dateFormat;

const {
  crValueMoving,
  toFixedNumber,
  calcPercent,
  crId
} = mathFn;

const _isFn = fn => typeof fn === 'function'
, _isNaN = Number.isNaN
, _isNumber = n => typeof n === 'number'
    && n-n===0
, _isUndef = v => typeof v === 'undefined'
, _isArr = Array.isArray
, _assign = Object.assign
, _fnFindIndex = fnArr.findIndexByProp('x');

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

const _initOptionsZhSeries = chart => {
  const { options } = chart;
  options.zhSeries = _assign({
    count: 0,
    titleEls: []
  }, options.zhSeries)
  return options;
};

const _crYAxisColor = chart => {
  switch(chart.yAxis.length){
    case 1: return C.C1_SECOND_Y_AXIS;
    case 2: return C.C2_SECOND_Y_AXIS;
    default: return C.C1_SECOND_Y_AXIS;
  }
};

const _addSeries = ({ chart, series, label, hasSecondYAxis }) => {
  let _color;
  if (hasSecondYAxis){
    _color = _crYAxisColor(chart)
    chart.addAxis( Chart.fSecondYAxis(label, _color) )
    series.yAxis = label
    series.color = _color
  }

  if (_isArr(series)){
    const _max = series.length - 1;
    series.forEach((seria, index) => {
      if (hasSecondYAxis) {
        seria.yAxis = label
      }
      const _option = index === _max
        ? [true, true]
        : [false, false];
      chart.addSeries(seria, ...[_option])
    })
  } else {
    chart.addSeries(series, true, true)
  }
  return _color;
};

const _calcXyForLabel = options => {
  const seriesCount = options.zhSeries.count
  , row = Math.floor(seriesCount/C.SERIA_LABELS_IN_ROW)
  , x = C.SERIA_LABEL_X_DELTA
        + C.SERIA_LABEL_WIDTH*seriesCount
        - row*(C.SERIA_LABEL_WIDTH*C.SERIA_LABELS_IN_ROW)
  , y = C.SERIA_LABEL_Y_DELTA + C.SERIA_LABEL_HEIGHT*row;
  return { x, y };
};
const _renderSeriesLabel = ({ chart, options, series, label='', color }) => {
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


const _updateYAxisMinMax = ({ hasSecondYAxis, series, options, chart }) => {
  const _yAxis = chart?.yAxis?.[0];
  if (!hasSecondYAxis && _isFn(_yAxis?.update)) {
    const { minY, maxY } = series || {}
    , _optionYAxis = options?.yAxis?.[0]
    , { min, max } = _optionYAxis || {}
    , _min = min>minY ? minY : min
    , _max = max<maxY ? maxY : max
    , _minE = _isNumber(_min) ? _min : null
    , _maxE = _isNumber(_max) ? _max : null;
    _yAxis.setExtremes(_minE, _maxE, true)
  }
};

const _formatNumber = n => formatAllNumber(toFixedNumber(n));
const _setPlotLine = (plotLine, value, delta='') => {
  if (plotLine) {
    plotLine.value = value
    plotLine.label.text = `${_formatNumber(value)}${delta}`
  }
};

const _crDelta = perToValue => `\u00A0\u00A0Δ ${perToValue}%`
, _crPoint = bValue => parseFloat(bValue.round(4).toString(), 10)
, _calcPerTo = (bFrom, bValue, bTotal) => calcPercent({
   bValue: bFrom.minus(bValue),
   bTotal
});


const ChartFn = {
  ...WithAreaChartFn,
  toDmy, toTdmy, toTdmyIf,
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

    _updateYAxisMinMax({ hasSecondYAxis, series, options, chart })
  },

  zoomIndicatorCharts(event){
    const zhDetailCharts = this.chart.options.zhDetailCharts
    , { userMin, userMax, min, max } = event
    , _min = userMin || min
    , _max = userMin ? userMax : max;
    zhDetailCharts.forEach(chart => {
      chart.xAxis[0].setExtremes(_min, _max, true, true);
    })
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
    , mlsUTC = DateUtils.dmyToUTC(dateTo)
    , index = _isNaN(mlsUTC)
        ? -1
        : _fnFindIndex(points, mlsUTC)
    , valueTo = index !== -1
        ? points[index].y
        : void 0;

    return _isUndef(valueTo)
      ? void 0
      : _assign({}, prev,
          crValueMoving({
            nowValue: prev.value,
            prevValue: valueTo,
            Direction: Direction,
            fnFormat: formatAllNumber
          }),
          { valueTo, dateTo }
        );
  },

  toNumberFormat: formatNumber,
  toNumberFormatAll: formatAllNumber,

  crId,
  crTpId: () => crId('TP_'),

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
    , perToMax = _calcPerTo(_bMax, _bValue, _bValue)
    , perToMin = _calcPerTo(_bValue, _bMin, _bValue);

    _setPlotLine(plotLines[0], _crPoint(_bMax), _crDelta(perToMax))
    _setPlotLine(plotLines[1], _crPoint(_bMin), _crDelta(perToMin))
  },

  calcMinY: (min, max) => max>Number.NEGATIVE_INFINITY
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

};

export default ChartFn
