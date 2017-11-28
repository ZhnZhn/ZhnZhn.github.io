import Highcharts from 'highcharts';
import { render } from 'react-dom';

import ChartFn from './ChartFn'

import SparkFactory from '../components/factories/SparkFactory';

const SPARKLINES_SUFFIX_ID = 'sparklines'
    , SPARKLINES_BAR_SUFFIX_ID = 'sparklines_bar'
    , WIDTH_CHAR = 10
    , WIDTH_VALUE = 54
    , WIDTH_TOTAL = 50
    , WIDTH_SPARK = 20 + 80 + 16;

const C = {
  TITLE_C: '#a487d4',
  YEAR_C: '#fdb316',
  VALUE_C: '#2f7ed8',
  EX_DIVIDEND_C: 'green'
}
const TITLE_STYLE = `style="color:${C.TITLE_C};"`;
const FONT_STYLE = 'font-size:16px;font-weight:bold';

const _numberFormat = (value) => {
  const arrSplit = (value+'').split('.')
      , decimal = arrSplit[1] ? arrSplit[1].length : 0;
   return Highcharts
     .numberFormat(value, decimal, '.', ' ');
}

const _crSpan = (t='', v='', { color=C.VALUE_C }={}) => {
  const _vStyle = `style="color:${color};${FONT_STYLE}"`
      , _t = t ? `${t}: `: ''
      , _v = v !== null ? v: '';
  return `
  <span ${TITLE_STYLE}>${_t}</span>
  <span ${_vStyle}>${_v}</span>`;
}
const _crRow = (t='', v='', option) => {
  return `<div>${_crSpan(t, v, option)}</div>`;
}

const _crHeader = (date, id, cssClass='') => {
  return `<div id="${id}" class="tp__header not-selected ${cssClass}">
    <span class="tp__header__caption">${date}</span>
    <span class="tp__header__close">X</span>
  </div>`;
}

const _fnTooltipSparkType4 = function({
  fullWidth, width, year, value, total, percent, id
}){
  const _style = `style="float:left;padding-right:10px;width:${width}px;"`;
  return `<div class="tp__body">
  <div class="tp__body__part1" style="width:${fullWidth}px;" >
    <div ${_style}>
      ${_crRow('Year', year, { color: C.YEAR_C })}
      ${_crRow('Value', value)}
    </div>
    <div id="${id}_${SPARKLINES_SUFFIX_ID}" class="tp__body__sparklines">
    </div>
  </div>
  <div class="tp__body__part1" style="width:${fullWidth}px;" >
    <div ${_style}>
      ${_crRow('Total', total)}
      ${_crRow('Percent', percent)}
    </div>
    <div id="${id}_${SPARKLINES_BAR_SUFFIX_ID}" class="tp__body__sparklines">
    </div>
  </div>`;
}

const _fnBaseTooltip = function({date, id, color, valueText='Value', value}){
  return `${_crHeader(date, id)}
  <div class="tp__body">
    ${_crRow(valueText, value, { color })}
  </div>`;
}

const _fnExDividend = function({date, id, valueText, value, point}){
  const { exValue, price } = point;
  return `${_crHeader(date, id)}
  <div class="tp__body">
    ${_crRow('Ex-Dividend', exValue, { color: '#90ed7d'})}
    ${_crRow('Close', price)}
  </div>`;
}

const _fnSplitRatio = function({date, id, valueText, value, point}){
  const { splitRatio, price } = point
  return `${_crHeader(date, id)}
  <div class="tp__body">
    ${_crRow('Split Ratio', splitRatio, { color: '#ED5813'})}
    ${_crRow('Close', price)}
  </div>`;
}

const _fnExValue = function({ date, id, point }){
  const { exValue } = point;
  return `${_crHeader(date, id)}
  <div class="tp__body">
    ${_crRow('Value', exValue)}
  </div>`;
}
const _fnEPS = function({ date, id, point }){
  const {
          announceTime, fiscalPeriod, fiscalEndDate,
          actualEPS, estimatedEPS,
          numberOfEstimates, EPSSurpriseDollar
        } = point;
  return `${_crHeader(date, id)}
  <div class="tp_body">
    <div>
      ${_crSpan('', announceTime, { color: C.YEAR_C })}
      ${_crSpan('', fiscalPeriod)}
      ${_crSpan('', fiscalEndDate)}
    </div>
    <div style=${FONT_STYLE}>
      ${_crSpan('EPS', actualEPS)}
      ${_crSpan('Est.', estimatedEPS)}
    </div>
    <div style=${FONT_STYLE}>
      ${_crSpan('Supr.', EPSSurpriseDollar)}
      ${_crSpan('NumbEst.', numberOfEstimates)}
    </div>
  </div>`;
}

const _fnVolumeTooltip = function({ date, id, value, point }){
  const { _open='NoData', _close='', _low='', _high='' } = point;
  return `${_crHeader(date, id)}
  <div class="tp__body">
    ${_crRow('Volume', value)}
    <div>
      ${_crSpan('Open', _open)}
      ${_crSpan('Close', _close)}
    </div>
    <div>
      ${_crSpan('Low', _low)}
      ${_crSpan('High', _high)}
    </div>
  </div>`;
}

const _fnATHTooltip = function({date, id, value, point}){
  const { color, y, close, open } = point
   return `${_crHeader(date, id)}
    <div class="tp__body">
      ${_crRow('ATH', y+'%', { color })}
      ${_crRow('Prev Close', close)}
      ${_crRow('Next Open', open)}
    </div>`;
}

const _fnHighLowTooltip = function({date, id, value, point}){
  const { open, dayHigh, dayLow, close } = point;
  return `${_crHeader(date, id)}
  <div class="tp__body">
    ${_crRow('Open', open)}
    ${_crRow('High', dayHigh)}
    ${_crRow('Low', dayLow)}
    ${_crRow('Close', close)}
  </div>`;
}
const _fnCategoryRHLY = function({ id, point }){
  const { high, yHigh, low, yLow, c } = point;
  return `${_crHeader(c, id)}
  <div class="tp__body">
    <div>
      ${_crSpan('High', high)}
      ${_crSpan('', yHigh, { color: C.YEAR_C })}
    </div>
    <div>
      ${_crSpan('&nbsp;Low', low)}
      ${_crSpan('', yLow, { color: C.YEAR_C })}
    </div>
  </div>`;
};


const _fnCategory = function({ id, point }){
  const { y, c } = point;
  return `${_crHeader(c, id)}
  <div class="tp__body">
    ${_crRow('Value', _numberFormat(y))}
  </div>`;
};

const _fnTreeMap = function({ id, point }){
  const { title, label, value, percent='' } = point
  , _percent = percent ? `(${percent}%)` : ''
  , _value = `${_numberFormat(value)} ${_percent}`;
  return `${_crHeader(title, id)}
  <div class="tp_body">
    ${_crRow('', label)}
    ${_crRow('', _value, { color: C.YEAR_C })}
  </div>
  `;
}



const _fnPieTooltip = function({ id, value, point }){
  return `${_crHeader(point.nameFull, id)}
  <div class="tp__body">
    ${_crRow('Value', value)}
  </div>`;
}

const _fnCalcWidthSparkType4 = function(value, total){
  const _width1 = WIDTH_VALUE + value.length*WIDTH_CHAR
      , _width2 = WIDTH_TOTAL + total.length*WIDTH_CHAR
      , width = (_width1>_width2) ? _width1 : _width2
      , fullWidth = width + WIDTH_SPARK;
  return { fullWidth, width };
}

const _fnStackedAreaTooltip = function({id, value, point}){
  const {nameFull, category, percent='0.0', total=0} = point
      , _total = ChartFn.toNumberFormat(total)
      , { fullWidth, width } = _fnCalcWidthSparkType4(value, _total);

  return _crHeader(nameFull, id) + _fnTooltipSparkType4({
    fullWidth, width, year: category, value, total: _total, percent, id
  });
}

const _fnTreeMapTooltip = function({id, point}){
  const {nameFull, year, value='0.0', percent='0.0', total=0} = point
      , _value = ChartFn.toNumberFormat(value)
      , _total = ChartFn.toNumberFormat(total)
      , { fullWidth, width } = _fnCalcWidthSparkType4(_value, _total);

  return _crHeader(nameFull, id) + _fnTooltipSparkType4({
    fullWidth, width, year, value: _value, total: _total, percent, id
  })
}

const _fHide = (id, point) => function _fnHide() {
  document.getElementById(id)
          .removeEventListener('click', _fnHide);
  point.series.chart.zhTooltip.hide();
}

const _fnAddHandlerClose = function(id, point){
  setTimeout( function(){
    document.getElementById(id)
            .addEventListener('click', _fHide(id, point))
  }, 1);
}


const _crSparkData = (point) => {
  const { sparkvalues, sparkpercent } = point;
  let  sparkLinesData = []
     , sparkBarsData = []
     , pointIndex;

  if (sparkvalues) {
    sparkLinesData = sparkvalues;
    sparkBarsData = sparkpercent;
    pointIndex = (sparkvalues.length !== 0)
           ? sparkvalues.length - 1
           : 0 ;
  } else {
    const seriesData = point.series.data;
    seriesData.forEach((item, itemIndex) => {
       sparkLinesData.push(item.y);
       sparkBarsData.push(item.percentage)
    })
    pointIndex = point.index
  }
  return { sparkLinesData, sparkBarsData, pointIndex };
}

const _fnAddHandlerCloseAndSparklines = function(id, point){
  setTimeout( function(){
          document.getElementById(id)
             .addEventListener('click', _fHide(id,point))

          const {
                  sparkLinesData, sparkBarsData,
                  pointIndex
                } = _crSparkData(point)
             , sparklines = SparkFactory.createSparklines(sparkLinesData, pointIndex)
             , sparkbars = SparkFactory.createSparkbars(sparkBarsData, pointIndex);
         render( sparklines, document.getElementById(`${id}_${SPARKLINES_SUFFIX_ID}`))
         render( sparkbars, document.getElementById(`${id}_${SPARKLINES_BAR_SUFFIX_ID}`))
  }, 1);
}

const _fnDateFormatDMY = Highcharts.dateFormat.bind(null, '%A, %b %d, %Y')
const _fnDateFormatDMYT = Highcharts.dateFormat.bind(null, '%A, %b %d, %Y, %H:%M')
const _fnFormatCategory = x => x;


const _fnBasePointFormatter = function( option ){
  return function(){
   const {
          fnTemplate, onAfterRender=_fnAddHandlerClose,
          fnDateFormat = _fnDateFormatDMY,
          isWithColor, isWithValueText, isWithValue
         } = option
       , point = this
       , series = point.series
       , date = fnDateFormat(point.x)
       , color = isWithColor
           ? point.color || series.color
           : undefined
       , { zhValueText, name='Value', id, zhSeriaId } = series.userOptions
       , _id = zhSeriaId || id || 'TP'
       , valueText = isWithValueText
            ? zhValueText || name
            : 'Value'
       , value = isWithValue
            ? ChartFn.toNumberFormat(point.y)
            : null;

       onAfterRender(_id, point)

       return fnTemplate({ id: _id, date, color, valueText, value, point });
  }
}

const Tooltip = {
   fnBasePointFormatter: _fnBasePointFormatter({
     fnTemplate : _fnBaseTooltip,
     isWithColor: true, isWithValueText: true, isWithValue: true
   }),
   fnBasePointFormatterT: _fnBasePointFormatter({
     fnTemplate : _fnBaseTooltip,
     fnDateFormat: _fnDateFormatDMYT,
     isWithColor: true, isWithValueText: true, isWithValue: true
  }),
  fnBasePointFormatterC: _fnBasePointFormatter({
    fnTemplate : _fnBaseTooltip,
    fnDateFormat: _fnFormatCategory,
    isWithColor: true, isWithValueText: true, isWithValue: true
  }),
  category: _fnBasePointFormatter({
    fnTemplate: _fnCategory
  }),
  categoryRHLY: _fnBasePointFormatter({
    fnTemplate: _fnCategoryRHLY
  }),

  fnExDividendPointFormatter: _fnBasePointFormatter({
    fnTemplate: _fnExDividend
  }),
  fnSplitRatioPointFormatter: _fnBasePointFormatter({
    fnTemplate : _fnSplitRatio
  }),
  exValue: _fnBasePointFormatter({
    fnTemplate: _fnExValue
  }),
  eps: _fnBasePointFormatter({
    fnTemplate : _fnEPS
  }),

  fnVolumePointFormatter: _fnBasePointFormatter({
    fnTemplate: _fnVolumeTooltip, isWithValue: true
  }),
  fnVolumePointFormatterT: _fnBasePointFormatter({
    fnTemplate: _fnVolumeTooltip,
    fnDateFormat: _fnDateFormatDMYT,
    isWithValue: true
  }),

  fnATHPointFormatter: _fnBasePointFormatter({
    fnTemplate: _fnATHTooltip
  }),
  fnHighLowPointFormatter: _fnBasePointFormatter({
    fnTemplate: _fnHighLowTooltip
  }),
  fnPiePointFormatter: _fnBasePointFormatter({
    fnTemplate: _fnPieTooltip, isWithValue: true
  }),
  fnStackedAreaPointFormatter: _fnBasePointFormatter({
    fnTemplate: _fnStackedAreaTooltip,
    onAfterRender: _fnAddHandlerCloseAndSparklines,
    isWithValue: true
  }),
  fnTreeMapPointFormatter: _fnBasePointFormatter({
    fnTemplate: _fnTreeMapTooltip,
    onAfterRender: _fnAddHandlerCloseAndSparklines,
    isWithValue: true
  }),
  treeMap: _fnBasePointFormatter({
    fnTemplate: _fnTreeMap
  })
}

export default Tooltip
