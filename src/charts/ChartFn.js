export { getColorBlack } from '../components/styleFn';

export {
  toDmy,
  toTdmy,
  toTdmyIf
} from './dateFormat';
export { crId } from '../math/mathFn';

import Big from 'big.js';

import {
  crValueMoving as crVm,
  toFixedNumber,
  calcPercent,
  crId
} from '../math/mathFn';
import formatNumber from '../utils/formatNumber';
import formatAllNumber from '../utils/formatAllNumber';

import { arrFactoryFindIndexByProp } from '../utils/arrFn';
import { dmyToUTC } from '../utils/dateFn';

import { fSecondYAxis } from './Chart';


const _isFn = fn => typeof fn === 'function'
, _isNumber = n => typeof n === 'number'
    && n-n===0
, _isArr = Array.isArray
, _assign = Object.assign
, _findIndexByX = arrFactoryFindIndexByProp('x')

, INITIAL_MAX_NUMBER = Number.NEGATIVE_INFINITY
, INITIAL_MIN_NUMBER = Number.POSITIVE_INFINITY

, C1_SECOND_Y_AXIS = '#f45b5b'
, C2_SECOND_Y_AXIS = '#f7a35c'
, SERIA_LABEL_CHARS = 14
, SERIA_LABELS_IN_ROW = 3
, SERIA_LABEL_X_DELTA = 120
, SERIA_LABEL_Y_DELTA = 95
, SERIA_LABEL_WIDTH = 125
, SERIA_LABEL_HEIGHT = 20;

const _initOptionsZhSeries = chart => {
  const { options } = chart;
  options.zhSeries = _assign({
    count: 0,
    titleEls: []
  }, options.zhSeries)
  return options;
};

const _crYAxisColor = chart =>
  chart.yAxis.length === 2
    ? C2_SECOND_Y_AXIS
    : C1_SECOND_Y_AXIS;

const _addSeries = ({ chart, series, label, hasSecondYAxis }) => {
  let _color;
  if (hasSecondYAxis){
    _color = _crYAxisColor(chart)
    chart.addAxis(fSecondYAxis(label, _color))
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
  , row = Math.floor(seriesCount/SERIA_LABELS_IN_ROW)
  , x = SERIA_LABEL_X_DELTA
        + SERIA_LABEL_WIDTH*seriesCount
        - row*(SERIA_LABEL_WIDTH*SERIA_LABELS_IN_ROW)
  , y = SERIA_LABEL_Y_DELTA + SERIA_LABEL_HEIGHT*row;
  return { x, y };
};

const _getLabelText = label => (label || '').length>SERIA_LABEL_CHARS
  ? label.substring(0, SERIA_LABEL_CHARS)
  : label;

const _getRecentSeriaColor = chart => {
  const { series } = chart
  , _len = (series || []).length;
  return _len > 0
    ? series[_len-1].color
    : void 0;
};

const _renderSeriesLabel = (
  chart,
  labelText, x, y, color
) => chart.renderer
  .text(labelText, x, y)
  .css({
    color,
    'font-size': '16px',
    'font-weight': 800
  })
  .add();

const _getMinMaxFromSeries = (series, options) => {
  const { minY, maxY } = series || {}
  , _optionYAxis = options?.yAxis?.[0]
  , { min, max } = _optionYAxis || {}
  , _min = min>minY ? minY : min
  , _max = max<maxY ? maxY : max;
  return [
    _isNumber(_min) ? _min : null,
    _isNumber(_max) ? _max : null
  ];
}

const _updateYAxisMinMax = (
  { hasSecondYAxis, series, chart },
  options
) => {
  const _yAxis = chart?.yAxis?.[0];
  if (!hasSecondYAxis && _isFn(_yAxis?.update)) {
    const [min, max] = _getMinMaxFromSeries(series, options);
    _yAxis.setExtremes(min, max, true)
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


const _crBigValueOrZero = (
  value,
  initialValue
) => value !== initialValue
  ? Big(value)
  : Big(0);

const _getMinMaxFromEvent = ({
  userMin,
  userMax,
  min,
  max
}) => [
  userMin || min,
  userMin ? userMax : max
];


export const addSeriaWithRenderLabel = (
  props
) => {
  // { chart, series, label, hasSecondYAxis } = props
  const { chart } = props
  , chartOptions = _initOptionsZhSeries(chart)
  , _color = _addSeries(props)
  , labelText = _getLabelText(props.label)
  , { x, y } = _calcXyForLabel(chartOptions)
  , textEl = _renderSeriesLabel(
      chart,
      labelText, x, y,
      props.color || _color || _getRecentSeriaColor(chart)
    );

  chartOptions.zhSeries.count +=1
  chartOptions.zhSeries.titleEls.push(textEl)

  _updateYAxisMinMax(props, chartOptions)
}

export const zoomIndicatorCharts = function(event) {
  const [min, max] =_getMinMaxFromEvent(event);
  (this.chart.options.zhDetailCharts || []).forEach(chart => {
    chart.xAxis[0].setExtremes(min, max, true, true);
  })
}

export const afterSetExtremesYAxis = function(event) {
  const { trigger, userMax, userMin } = event;
  if (trigger === 'zoom' && userMax) {
    this.setExtremes(
      userMin, userMax + (userMax-userMin)*0.05,
      true, true
    )
  }
}

export const crValueMoving = (
  chart,
  prev,
  dateTo
) => {
  const points = chart.series[0].data
  , mlsUTC = dmyToUTC(dateTo)
  , index = _isNumber(mlsUTC)
      ? _findIndexByX(points, mlsUTC)
      : -1
  , valueTo = index === -1
      ? void 0
      : points[index].y;

  return _isNumber(valueTo)
    ? _assign({}, prev,
        crVm({
          nowValue: prev.value,
          prevValue: valueTo,
          fnFormat: formatAllNumber
        }),
        { valueTo, dateTo }
      )
   : void 0;
}

export const toNumberFormat = formatNumber
export const toNumberFormatAll = formatAllNumber

export const crTpId = () => crId('TP_')

export const setPlotLinesMinMax = ({
   plotLines,
   min,
   max
 }) => {
  if ( max>INITIAL_MAX_NUMBER ){
    _setPlotLine(plotLines[0], max)
  }
  if ( min<INITIAL_MIN_NUMBER ){
    _setPlotLine(plotLines[1], min)
  }
}

export const setPlotLinesDeltas = ({
  plotLines,
  min,
  max,
  value
}) => {
  const _bMax = _crBigValueOrZero(max, INITIAL_MAX_NUMBER)
  , _bMin = _crBigValueOrZero(min, INITIAL_MIN_NUMBER)
  , _bValue = _crBigValueOrZero(value, null)
  , _perToMax = _calcPerTo(_bMax, _bValue, _bValue)
  , _perToMin = _calcPerTo(_bValue, _bMin, _bValue);

  _setPlotLine(plotLines[0], _crPoint(_bMax), _crDelta(_perToMax))
  _setPlotLine(plotLines[1], _crPoint(_bMin), _crDelta(_perToMin))
}

export const calcMinY = (
  min,
  max
) => max>INITIAL_MAX_NUMBER
  && min<INITIAL_MIN_NUMBER
    ? min - ((max-min)*1/6)
    : void 0

export const setYToPoints = (
  data,
  y
) => {
  if (y == null) { return; }
  data.forEach(point => point.y = y)
}
