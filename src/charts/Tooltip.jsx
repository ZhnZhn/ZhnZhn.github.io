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

const _fnTooltipHeader = function(date, id, cssClass=''){
  return `<div id="${id}" class="tp__header not-selected ${cssClass}">
  <span class="tp__header__caption">${date}</span>
  <span class="tp__header__close">X</span>
  </div>`
}

const _fnTooltipSparkType4 = function({
  fullWidth, width, year, value, total, percent, id
}){
  return `<div class="tp__body">
  <div class="tp__body__part1" style="width:${fullWidth}px;" >
    <div style="float:left;padding-right:10px;width:${width}px;">
      <span class="tp__body__title">Year: </span>
      <span class="tp__body__year">${year}</span></br>
      <span class="tp__body__title">Value: </span>
      <span class="tp__body__value">${value}</span></br>
    </div>
    <div id="${id}_${SPARKLINES_SUFFIX_ID}" class="tp__body__sparklines">
    </div>
  </div>
  <div class="tp__body__part1" style="width:${fullWidth}px;" >
    <div style="float:left;padding-right:10px;width:${width}px;">
      <span class="tp__body__title">Total: </span>
      <span class="tp__body__value">${total}</span></br>
      <span class="tp__body__title">Percent: </span>
      <span class="tp__body__value">${percent}</span></br>
    </div>
    <div id="${id}_${SPARKLINES_BAR_SUFFIX_ID}" class="tp__body__sparklines">
    </div>
  </div>`
}

const _fnBaseTooltip = function({date, id, color, valueText='Value', value}){
  const _style = (color)
           ? `style="color:${color};"`
           : '';
  return _fnTooltipHeader(date, id) +
  `<div class="tp__body">
  <span class="tp__body__title">${valueText}:&nbsp;</span>
  <span class="tp__body__value" ${_style}>${value}</span>
  </div>`
}

const _fnExDividend = function({date, id, valueText, value, point}){
  return _fnTooltipHeader(date, id) +
  `<div class="tp__body">
  <span class="tp__body__title">Ex-Dividend: </span>
  <span style="color: #90ed7d;">${point.exValue}</span><br/>
  <span class="tp__body__title">Close: </span>
  <span class="tp__body__value">${point.price}</span>
  </div>`
}

const _fnSplitRatio = function({date, id, valueText, value, point}){
  return _fnTooltipHeader(date, id) +
  `<div class="tp__body">
  <span class="tp__body__title">Split Ratio: </span>
  <span style="color: #ED5813;">${point.splitRatio}</span><br/>
  <span class="tp__body__title">Close: </span>
  <span class="tp__body__value">${point.price}</span>
  </div>`
}

const _fnVolumeTooltip = function({ date, id, value, point }){
  const { _open='NoData', _close='', _low='', _high='' } = point;
  return _fnTooltipHeader(date, id) +
  `<div class="tp__body">
  <span class="tp__body__title">Volume: </span>
  <span class="tp__body__value">${value}</span><br/>
  <span class="tp__body__title">Open: </span>
  <span class="tp__body__value">${_open}</span>
  <span class="tp__body__title"> Close: </span>
  <span class="tp__body__value">${_close}</span><br/>
  <span class="tp__body__title">Low: </span>
  <span class="tp__body__value">${_low}</span>
  <span class="tp__body__title"> High: </span>
  <span class="tp__body__value">${_high}</span>
  </div>`
}

const _fnATHTooltip = function({date, id, value, point}){
   return _fnTooltipHeader(date, id) +
   `<div class="tp__body">
   <span class="tp__body__title">ATH: </span>
   <span class="tp__body__value" style="color:${point.color};">${point.y}%</span><br/>
   <span class="tp__body__title">Prev Close: </span>
   <span class="tp__body__value">${point.close}</span><br/>
   <span class="tp__body__title">Next Open: </span>
   <span class="tp__body__value">${point.open}</span><br/>
   </div>`
}

const _fnHighLowTooltip = function({date, id, value, point}){
  const { open, dayHigh, dayLow, close } = point;
  return _fnTooltipHeader(date, id) +
  `<div class="tp__body">
  <span class="tp__body__title">Open: </span>
  <span class="tp__body__value">${open}</span><br/>
  <span class="tp__body__title">High: </span>
  <span class="tp__body__value">${dayHigh}</span><br/>
  <span class="tp__body__title">Low: </span>
  <span class="tp__body__value">${dayLow}</span><br/>
  <span class="tp__body__title">Close: </span>
  <span class="tp__body__value">${close}</span>
  </div>`
}
const _fnCategoryAreaRange = function({ id, point }){
  const { high, low, c } = point;
  return _fnTooltipHeader(c, id) +
  `<div class="tp__body">
  <span class="tp__body__title">High: </span>
  <span class="tp__body__value">${high}</span><br/>
  <span class="tp__body__title">Low: </span>
  <span class="tp__body__value">${low}</span>
  </div>`;
};
const _fnCategory = function({ id, point }){
  const { y, c } = point;
  return _fnTooltipHeader(c, id) +
  `<div class="tp__body">
  <span class="tp__body__title">Value: </span>
  <span class="tp__body__value">${y}</span>
  </div>`;
};



const _fnPieTooltip = function({id, value, point}){
  return _fnTooltipHeader(point.nameFull, id) +
  `<div class="tp__body">
  <span class="tp__body__title">Value: </span>
  <span class="tp__body__value">${value}</span></br>
  </div>`
}

const _fnCalcWidthSparkType4 = function(value, total){
  const _width1 = WIDTH_VALUE + value.length*WIDTH_CHAR
      , _width2 = WIDTH_TOTAL + total.length*WIDTH_CHAR
      , width = (_width1>_width2) ? _width1 : _width2
      , fullWidth = width + WIDTH_SPARK;
  return { fullWidth, width }
}

const _fnStackedAreaTooltip = function({id, value, point}){
  const {nameFull, category, percent='0.0', total=0} = point
      , _total = ChartFn.toNumberFormat(total)
      , { fullWidth, width } = _fnCalcWidthSparkType4(value, _total);

  return _fnTooltipHeader(nameFull, id) + _fnTooltipSparkType4({
    fullWidth, width, year: category, value, total: _total, percent, id
  });
}

const _fnTreeMapTooltip = function({id, point}){
  const {nameFull, year, value='0.0', percent='0.0', total=0} = point
      , _value = ChartFn.toNumberFormat(value)
      , _total = ChartFn.toNumberFormat(total)
      , { fullWidth, width } = _fnCalcWidthSparkType4(_value, _total);

  return _fnTooltipHeader(nameFull, id) + _fnTooltipSparkType4({
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

const _fnAddHandlerCloseAndSparklines = function(id, point){
  setTimeout( function(){
          document.getElementById(id)
             .addEventListener('click', _fHide(id,point))

         let  sparkLinesData = []
            , sparkBarsData = []
            , pointIndex;

         if (point.sparkvalues) {
           sparkLinesData = point.sparkvalues;
           sparkBarsData = point.sparkpercent;
           pointIndex = (point.sparkvalues.length !== 0)
                            ?  point.sparkvalues.length - 1
                            : 0 ;
         } else {
           const seriesData = point.series.data
           seriesData.forEach((item, itemIndex) => {
              sparkLinesData.push(item.y);
              sparkBarsData.push(item.percentage)
           })
           pointIndex = point.index
         }

         const sparklines = SparkFactory.createSparklines(sparkLinesData, pointIndex)
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

  fnExDividendPointFormatter: _fnBasePointFormatter({
    fnTemplate: _fnExDividend
  }),
  fnSplitRatioPointFormatter: _fnBasePointFormatter({
    fnTemplate : _fnSplitRatio
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
  categoryAreaRange: _fnBasePointFormatter({
    fnTemplate: _fnCategoryAreaRange
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
  })
}

export default Tooltip
