import Big from 'big.js';

import mathFn from '../math/mathFn';
import formatNumber from '../utils/formatNumber';
import formatAllNumber from '../utils/formatAllNumber';

import fnArr from '../utils/fnArr';
import DateUtils from '../utils/DateUtils';

import Chart from './Chart';

import calcYAxisOffset from './calcYAxisOffset';
import crMetricConfig from './crMetricConfig';
import dateFormat from './dateFormat';

const { toDmy, toTdmy, toTdmyIf } = dateFormat;

const {
  crValueMoving,
  toFixedNumber,
  calcPercent,
  crId
} = mathFn;

const _isFn = fn => typeof fn === 'function'
, _isNumber = n => typeof n === 'number'
    && n-n===0
, _isArr = Array.isArray
, _assign = Object.assign
, _findIndexByX = fnArr.findIndexByProp('x')
, INITIAL_MAX_NUMBER = Number.NEGATIVE_INFINITY
, INITIAL_MIN_NUMBER = Number.POSITIVE_INFINITY;

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

const _crYAxisColor = chart =>
  chart.yAxis.length === 2
    ? C.C2_SECOND_Y_AXIS
    : C.C1_SECOND_Y_AXIS;

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

const _getLabelText = label => (label || '').length>C.SERIA_LABEL_CHARS
  ? label.substring(0, C.SERIA_LABEL_CHARS)
  : label;

const _renderSeriesLabel = ({ chart, options, series, label, color }) => {
  const labelText = _getLabelText(label)
  , { x, y } = _calcXyForLabel(options);

  return chart.renderer
    .text(labelText, x, y)
    .css({
      color: color || options.colors[series._colorIndex],
      'font-size': '16px',
      'font-weight': 800
    })
    .add();
};


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

const _updateYAxisMinMax = ({ hasSecondYAxis, series, options, chart }) => {
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


const _crBigValueOrZero = (value, initialValue) =>
  value !== initialValue
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



const ChartFn = {
  toDmy, toTdmy, toTdmyIf,
  calcYAxisOffset,
  crMetricConfig,

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
    const [min, max] =_getMinMaxFromEvent(event);
    (this.chart.options.zhDetailCharts || []).forEach(chart => {
      chart.xAxis[0].setExtremes(min, max, true, true);
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
    , index = _isNumber(mlsUTC)
        ? _findIndexByX(points, mlsUTC)
        : -1
    , valueTo = index === -1
        ? void 0
        : points[index].y;

    return _isNumber(valueTo)
      ? _assign({}, prev,
          crValueMoving({
            nowValue: prev.value,
            prevValue: valueTo,
            fnFormat: formatAllNumber
          }),
          { valueTo, dateTo }
        )
     : void 0;
  },

  toNumberFormat: formatNumber,
  toNumberFormatAll: formatAllNumber,

  crId,
  crTpId: () => crId('TP_'),

  setPlotLinesMinMax: ({ plotLines, min, max }) => {
    if ( max>INITIAL_MAX_NUMBER ){
      _setPlotLine(plotLines[0], max)
    }
    if ( min<INITIAL_MIN_NUMBER ){
      _setPlotLine(plotLines[1], min)
    }
  },
  setPlotLinesDeltas: ({ plotLines, min, max, value }) => {
    const _bMax = _crBigValueOrZero(max, INITIAL_MAX_NUMBER)
    , _bMin = _crBigValueOrZero(min, INITIAL_MIN_NUMBER)
    , _bValue = _crBigValueOrZero(value, null)
    , _perToMax = _calcPerTo(_bMax, _bValue, _bValue)
    , _perToMin = _calcPerTo(_bValue, _bMin, _bValue);

    _setPlotLine(plotLines[0], _crPoint(_bMax), _crDelta(_perToMax))
    _setPlotLine(plotLines[1], _crPoint(_bMin), _crDelta(_perToMin))
  },

  calcMinY: (min, max) => max>INITIAL_MAX_NUMBER
    && min<INITIAL_MIN_NUMBER
      ? min - ((max-min)*1/6)
      : void 0,

  setYToPoints: (data, y) => {
    if (y == null) {
      return;
    }
    data.forEach(point => point.y = y)
  }

};

export default ChartFn
