import Highcharts from 'highcharts';


const Tooltip = {};

const _fnNumberFormat = function(value){
  const arrSplit = (value+'').split('.')
      , decimal = (arrSplit[1]) ? 2 : 0;
  return Highcharts.numberFormat(value, decimal, '.', ' ');
};

const _fnTooltipHeader = function(date, id, cssClass=''){
  return `<div id="${id}" class="tp__header not-selected ${cssClass}">
  <span class="tp__header__caption">${date}</span>
  <span class="tp__header__close">X</span>
  </div>`
}

const _fnBaseTooltip = function({date, id, valueText, value}){
  return _fnTooltipHeader(date, id) +
  `<div class="tp__body">
  <span class="tp__body__title">${valueText}:&nbsp;</span>
  <span class="tp__body__value">${value}</span>
  </div>`
}

const _fnExDividend = function({date, id, valueText, value, point}){
  return _fnTooltipHeader(date, id) +
  `<div class="tp__body">
  <span class="tp__body__title">Ex-Dividend: </span>
  <span style="color: green;">${point.exValue}</span><br/>
  <span class="tp__body__title">Stock Price: </span>
  <span class="tp__body__value">${point.price}</span>
  </div>`
}

const _fnSplitRatio = function({date, id, valueText, value, point}){
  return _fnTooltipHeader(date, id) +
  `<div class="tp__body">
  <span class="tp__body__title">Split Ratio: </span>
  <span style="color: #ED5813;">${point.splitRatio}</span><br/>
  <span class="tp__body__title">Stock Price: </span>
  <span class="tp__body__value">${point.price}</span>
  </div>`
}

const _fnVolumeTooltip = function({date, id, value, point}){
  return _fnTooltipHeader(date, id) +
  `<div class="tp__body">
  <span class="tp__body__title">Volume: </span>
  <span class="tp__body__value">${value}</span><br/>
  <span class="tp__body__title">Open: </span>
  <span class="tp__body__value">${point.open}</span>
  <span class="tp__body__title"> Close: </span>
  <span class="tp__body__value">${point.close}</span><br/>
  <span class="tp__body__title">Low: </span>
  <span class="tp__body__value">${point.low}</span>
  <span class="tp__body__title"> High: </span>
  <span class="tp__body__value">${point.high}</span>
  </div>`
}

const _fnATHTooltip = function({date, id, value, point}){
   return _fnTooltipHeader(date, id) +
   `<div class="tp__body">
   <span class="tp__body__title">ATH: </span>
   <span class="tp__body__value">${point.y}%</span><br/>
   <span class="tp__body__title">Close: </span>
   <span class="tp__body__value">${point.close}</span>
   <span class="tp__body__title"> Open: </span>
   <span class="tp__body__value">${point.open}</span><br/>
   </div>`
}

const _fnHighLowTooltip = function({date, id, value, point}){
  return _fnTooltipHeader(date, id) +
  `<div class="tp__body">
  <span class="tp__body__title">Day High: </span>
  <span class="tp__body__value">${point.dayHigh}</span></br>
  <span class="tp__body__title">Day Low: </span>
  <span class="tp__body__value">${point.dayLow}</span></br>
  <span class="tp__body__title">Close: </span>
  <span class="tp__body__value">${point.close}</span>
  </div>`
}

const _fnPieTooltip = function({id, value, point}){
  return _fnTooltipHeader(point.nameFull, id, 'tp--fs16') +
  `<div class="tp__body tp--fs16">
  <span class="tp__body__title">Value: </span>
  <span class="tp__body__value">${value}</span></br>
  </div>`
}

const _fnStackedAreaTooltip = function({id, value, point}){
  const {nameFull, category, percent='0.0', total=0} = point;
  return _fnTooltipHeader(nameFull, id, 'tp--fs16') +
  `<div class="tp__body tp--fs16">
  <span class="tp__body__title">Year: </span>
  <span class="tp__body__value">${category}</span></br>
  <span class="tp__body__title">Value: </span>
  <span class="tp__body__value">${value}</span></br>
  <span class="tp__body__title">Percent: </span>
  <span class="tp__body__value">${percent}</span></br>
  <span class="tp__body__title">Total: </span>
  <span class="tp__body__value">${_fnNumberFormat(total)}</span></br>
  </div>`
}

const _fnAddHandlerClose = function(id, point){
  setTimeout( function(){
          document.getElementById(id)
             .addEventListener('click', function _fnHide(){
                    document.getElementById(id).removeEventListener('click', _fnHide);
                    point.series.chart.zhTooltip.hide();
         })
  }, 1);
}

const _fnBasePointFormatter = function(fnTemplate, isWithValueText, isWithValue){
  return function(){
    var point = this
      , id = point.series.options.zhSeriaId
      , date = Highcharts.dateFormat('%A, %b %d, %Y', point.x)
      , valueText = (isWithValueText) ? point.series.userOptions.zhValueText : null
      , value = (isWithValue) ? _fnNumberFormat(point.y) : null;

      _fnAddHandlerClose(id, point);

      return fnTemplate({date, id, valueText, value, point});
  }
}

Tooltip.fnBasePointFormatter = _fnBasePointFormatter(_fnBaseTooltip, true, true);
Tooltip.fnExDividendPointFormatter = _fnBasePointFormatter(_fnExDividend, false, false);
Tooltip.fnSplitRatioPointFormatter = _fnBasePointFormatter(_fnSplitRatio, false, false);

Tooltip.fnVolumePointFormatter = _fnBasePointFormatter(_fnVolumeTooltip, false, true);
Tooltip.fnATHPointFormatter = _fnBasePointFormatter(_fnATHTooltip, false, false);
Tooltip.fnHighLowPointFormatter = _fnBasePointFormatter(_fnHighLowTooltip, false, false);

Tooltip.fnPiePointFormatter = _fnBasePointFormatter(_fnPieTooltip, false, true);
Tooltip.fnStackedAreaPointFormatter = _fnBasePointFormatter(_fnStackedAreaTooltip, false, true);

export default Tooltip
