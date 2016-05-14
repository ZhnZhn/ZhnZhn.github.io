import Highcharts from 'highcharts';

const Tooltip = {};

const _fnNumberFormat = function(value){
  const arrSplit = (value+'').split('.')
      , decimal =  ( arrSplit[1] ) ? arrSplit[1].length : 0;

  return Highcharts.numberFormat(value, decimal, '.', ' ');
};

const _fnBaseTooltip = function(date, id, valueText, value){
  return `<span style="font-weight: bold; font-size: 12px; color:rgba(194,149,23,1);">${date}</span>
  <span id="${id}" style="display: inline-block; margin-left: 10px; color: #ED5813; cursor: pointer;">[x]</span></br>
  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">${valueText}: </span>
  <span style="font-weight: bold; color:rgba(194,149,23,1);">${value}</span><br/>`
}

const _fnExDividend = function(date, id, valueText, value, point){
  return `<span style="font-weight: bold; font-size: 12px; color:rgba(194,149,23,1);">${date}</span>
  <span id="${id}" style="display: inline-block; margin-left: 10px; color: #ED5813; cursor: pointer;">[x]</span></br>
  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Ex-Dividend: </span>
  <span style="font-weight: bold; color: green;">${point.exValue}</span><br/>
  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Stock Price: </span>
  <span style="font-weight: bold; color:rgba(194,149,23,1);">${point.price}</span>`
}

const _fnSplitRatio = function(date, id, valueText, value, point){
  return `<span style="font-weight: bold; font-size: 12px; color:rgba(194,149,23,1);">${date}</span>
  <span id="${id}" style="display: inline-block; margin-left: 10px; color: #ED5813; cursor: pointer;">[x]</span></br>
  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Split Ratio: </span>
  <span style="font-weight: bold; color: #ED5813;">${point.splitRatio}</span><br/>
  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Stock Price: </span>
  <span style="font-weight: bold; color:rgba(194,149,23,1);">${point.price}</span>`
}

const _fnVolumeTooltip = function(date, id, value, point){
  return `<span style="font-weight: bold; font-size: 12px; color:rgba(194,149,23,1);">${date}</span>
  <span id="${id}" style="display: inline-block; margin-left: 10px; color: #ED5813; cursor: pointer;">[x]</span></br>
  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Volume: </span>
  <span style="font-weight: bold; color:rgba(194,149,23,1);">${value}</span><br/>
  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Open: </span>
  <span style="font-weight: bold; color:rgba(194,149,23,1);">${point.open}</span>
  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;"> Close: </span>
  <span style="font-weight: bold; color:rgba(194,149,23,1);">${point.close}</span><br/>
  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Low: </span>
  <span style="font-weight: bold; color:rgba(194,149,23,1);">${point.low}</span>
  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;"> High: </span>
  <span style="font-weight: bold; color:rgba(194,149,23,1);">${point.high}</span><br/>`
}

const _fnATHTooltip = function(date, id, value, point){
   return `<span style="font-weight: bold; font-size: 12px; color:rgba(194,149,23,1);">${date}</span>
   <span id="${id}" style="display: inline-block; margin-left: 10px; color: #ED5813; cursor: pointer;">[x]</span></br>
   <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">ATH: </span>
   <span style="font-weight: bold; color:rgba(194,149,23,1);">${point.y}%</span><br/>
   <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Close: </span>
   <span style="font-weight: bold; color:rgba(194,149,23,1);">${point.close}</span>
   <span style="color:rgba(69, 114, 167, 1);font-weight:bold;"> Open: </span>
   <span style="font-weight: bold; color:rgba(194,149,23,1);">${point.open}</span><br/>`
}

const _fnHighLowTooltip = function(date, id, value, point){
  return `<span style="font-weight: bold; font-size: 12px; color:rgba(194,149,23,1);">${date}</span>
  <span id="${id}" style="display: inline-block; margin-left: 10px; color: #ED5813; cursor: pointer;">[x]</span></br>
  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Day High: </span>
  <span style="font-weight: bold; color:rgba(194,149,23,1);">${point.dayHigh}</span></br>
  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Day Low: </span>
  <span style="font-weight: bold; color:rgba(194,149,23,1);">${point.dayLow}</span></br>
  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Close: </span>
  <span style="font-weight: bold; color:rgba(194,149,23,1);">${point.close}</span>`
}

const _fnBasePointFormatter = function(fnTemplate, isWithValueText, isWithValue){
  return function(){
    var point = this
      , valueText = (isWithValueText) ? this.series.userOptions.zhValueText : null
      , id = this.series.chart.userOptions.chart.zhId
      , date = Highcharts.dateFormat('%A, %b %d, %Y', point.x)
      , value = (isWithValue) ? _fnNumberFormat(point.y) : null;
      setTimeout( function(){
            document.getElementById(id)
                    .addEventListener('click', function(){
                         point.series.chart.zhTooltip.hide();
             })
      }, 1);
      return fnTemplate(date, id, valueText, value, point);
  }
}

const _fnMetricPointFormatter = function(fnTemplate, isWithValue){
  return function(){
     var point = this
      ,  id = point.y
      ,  date = Highcharts.dateFormat('%A, %b %d, %Y', point.x)
      ,  value = (isWithValue) ? fnNumberFormat(point.y) : null;
      setTimeout( function(){
            document.getElementById(id)
                    .addEventListener('click', function(){
                         point.series.chart.zhTooltip.hide();
             })
      }, 1);

      return fnTemplate(date, id, value, point);
  }
}

Tooltip.fnBasePointFormatter = _fnBasePointFormatter(_fnBaseTooltip, true, true);
Tooltip.fnExDividendPointFormatter = _fnBasePointFormatter(_fnExDividend, false, false);
Tooltip.fnSplitRatioPointFormatter = _fnBasePointFormatter(_fnSplitRatio, false, false);
Tooltip.fnVolumePointFormatter = _fnMetricPointFormatter(_fnVolumeTooltip, true);
Tooltip.fnATHPointFormatter = _fnMetricPointFormatter(_fnATHTooltip, false);
Tooltip.fnHighLowPointFormatter = _fnMetricPointFormatter(_fnHighLowTooltip, false);

export default Tooltip
