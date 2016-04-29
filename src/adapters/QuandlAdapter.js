
import _ from 'lodash';
import Big from 'big.js';

import {Direction} from '../constants/Type';
import ChartConfigs from '../constants/ChartConfigs';
import {
        fnNumberFormat,
        markerExDivident,
        tooltipExDivident,
        markerSplitRatio,
        tooltipSplitRatio,
        configSeriesAdded
      } from '../constants/ChartConfigs';

const QuandlAdapter = {};

const fnCheckWithPrev = function(arr, checkedDate, predicate){
   const length = arr.length;
   if (length === 0){
     return true;
   }
   const prevDate = arr[length-1].x;
   if (Math.abs((checkedDate.valueOf()-prevDate.valueOf())/(24*60*60*1000)) < predicate){
     return false;
   } else {
     return true;
   }
}

const fnGetXAxesConfig = function(){
  return {
    opposite : true,
    tickLength : 0,
    tickPosition : 'inside',
    labels : {
      y : -5
    }
  }
}

const fnGetDatasetInfo = function(json){
  const dataset = json.dataset;
  return  {
     name : dataset.name,
     description : dataset.description,
     newest_available_date : dataset.newest_available_date,
     oldest_available_date : dataset.oldest_available_date,
     frequency : dataset.frequency
  };
}

const fnGetValueMoving = function(seria){
  const len = seria.length
      , nowValue = seria[len-1][1]
      , bWasValue = Big(seria[len-2][1])
      , bDelta = bWasValue.minus(nowValue)
      , bPercent = bDelta.times(100).div(bWasValue.toString()).abs().toFixed(2);

  let direction;
  if (bDelta.gt(0.0)){
    direction = Direction.DOWN;
  } else if (!bDelta.gte(0.0)){
    direction = Direction.UP;
  } else {
    direction = Direction.EQUAL;
  }

  return {
    value : fnNumberFormat(nowValue),
    delta : fnNumberFormat(bDelta.abs().toString()),
    percent : bPercent.toString() + '%',
    direction
  };
}

const _fnConvertToUTC = function(point, result){
   const arrDate = point[0].split('-');
   result.dateUTC = Date.UTC(arrDate[0], (parseInt(arrDate[1], 10)-1), arrDate[2]);
   result.point = point;
   return result;
}

const _fnCheckExtrems = function(result){
  const {point, yPointIndex, maxPoint, minPoint} = result;
  if (point[yPointIndex] && point[yPointIndex]>=maxPoint){
    result.maxPoint = point[yPointIndex];
  }
  if (point[yPointIndex] && point[yPointIndex]<=minPoint){
    result.minPoint = point[yPointIndex];
  }
  return result
}

const _fnAddToSeria = function(result){
   const {seria, dateUTC, point, yPointIndex} = result;
   seria.push([dateUTC, point[yPointIndex]]);

   return result;
}

const _fnAddSplitRatio = function(result){
  const {point, dateUTC, yPointIndex, dataSplitRatio} = result;
  if (point[7] !== 1){
    const x = dateUTC
        , splitRatio = point[7]
        , price = point[yPointIndex];

    dataSplitRatio.push(Object.assign({}, markerSplitRatio, {x, splitRatio, price}));
  }
  return result;
}

const _fnAddExDividend = function(result){
     const {point, dateUTC, yPointIndex, dataExDividend} = result;

     if (point[6] !== 0){
       const x = dateUTC
           , exValue = point[6]
           , price = point[yPointIndex];

       if (fnCheckWithPrev(dataExDividend, x , 14)) {
          dataExDividend.push(Object.assign({}, markerExDivident, {x, exValue, price}));
       } else {
          const marker = Object.assign(_.cloneDeep(markerExDivident), {x, exValue, price});
          marker.dataLabels.y = 0;
          dataExDividend.push(marker);
       }
    }

    return result;
}

const _fnAddVolume = function(result){
  const {point, dateUTC, dataVolume} = result;
  dataVolume.push([dateUTC, point[5]])
  return result;
}


const _fnCreatePointFlow = function(json){
  const fnStep = [_fnConvertToUTC, _fnCheckExtrems, _fnAddToSeria]
      , column_names = json.dataset.column_names;
  if (column_names[5] === "Volume"){
    fnStep.push(_fnAddVolume);
  }
  if (column_names[6] === "Ex-Dividend"){
    fnStep.push(_fnAddExDividend);
  }
  if (column_names[7] === "Split Ratio"){
    fnStep.push(_fnAddSplitRatio);
  }
  return _.flow(fnStep);
}

const fnSeriesPipe = function(json, yPointIndex){
  const fnPointsFlow = _fnCreatePointFlow(json)
      , points = json.dataset.data
      , minPoint = Number.POSITIVE_INFINITY
      , maxPoint = Number.NEGATIVE_INFINITY
      , seria = []
      , dataExDividend = [], dataSplitRatio = [], dataVolume = []
      , result = {
          yPointIndex, minPoint, maxPoint, seria,
          dataVolume, dataExDividend, dataSplitRatio
        };

  for(var i=0, max=points.length; i<max; i++){
    fnPointsFlow(points[i], result);
  }
  result.seria = _.sortBy(result.seria, '0');

  return result
}


const fnGetSeries = function(config, json, yPointIndex){
   config.info = fnGetDatasetInfo(json);

   const result = fnSeriesPipe(json, yPointIndex);

   let {
     seria, minPoint, maxPoint,
     dataExDividend, dataSplitRatio, dataVolume
   } = result;

   config.series[0].data = seria;

   if (dataExDividend.length>0){
     dataExDividend = _.sortBy(dataExDividend, 'x');
     config.series.push({
        type: 'scatter',
        color: 'green',
        tooltip : tooltipExDivident,
        data : dataExDividend
     });
   }

   if (dataSplitRatio.length>0){
     dataSplitRatio = _.sortBy(dataSplitRatio, 'x');
     config.series.push({
        type: 'scatter',
        color: ' #ED5813',
        tooltip : tooltipSplitRatio,
        data : dataSplitRatio
     });
   }

   config.valueMoving = fnGetValueMoving(seria);

   let configVolume;
   if (dataVolume.length>0){
     dataVolume = _.sortBy(dataVolume, '0')
     configVolume = _.cloneDeep(ChartConfigs.baseAreaConfig);
     configVolume.series[0].data = dataVolume;
     configVolume.series[0].zhValueText = "Volume";
     //configVolume.series[0].type = "column";
     configVolume.chart.height = 140;
     configVolume.chart.spacingTop = 8,
     configVolume.chart.spacingBottom = 10,
     configVolume.yAxis.opposite = true;
     configVolume.yAxis.plotLines = [];

     configVolume.credits = {
        position : {
      	  align: 'right',
	        x: -10,
	        verticalAlign: 'bottom',
	        y: -5
        }
     }

   }
   config.zhVolumeConfig = configVolume;

   return {config, minPoint, maxPoint}
}

const fnConfigAxes = function(result){
  const {config, minPoint, maxPoint} = result;

  config.yAxis.plotLines[0].value = maxPoint;
  config.yAxis.plotLines[0].label.text = fnNumberFormat(maxPoint);
  config.yAxis.plotLines[1].value = minPoint;
  config.yAxis.plotLines[1].label.text = fnNumberFormat(minPoint);
  config.yAxis.opposite = true;

  config.xAxis = Object.assign({}, config.xAxis, fnGetXAxesConfig());

  return result
}

const fnQuandlFlow = _.flow(fnGetSeries, fnConfigAxes);

QuandlAdapter.toConfig = function(json, yPointIndex){
   const config = _.cloneDeep(ChartConfigs.baseAreaConfig);
   return fnQuandlFlow(config, json, yPointIndex);
}

QuandlAdapter.toSeries = function(json, yPointIndex, chartId){
  let data = json.dataset.data.map((point, index)=> {
    const arrDate = point[0].split('-');
    return [Date.UTC(arrDate[0], (parseInt(arrDate[1], 10)-1), arrDate[2]), point[yPointIndex]];
  });
  data = _.sortBy(data, '0');

  const valueText = (chartId.length<12) ? chartId : chartId.substring(0,12)
      , configSeries = _.cloneDeep(configSeriesAdded);

  configSeries.zhValueText = valueText;
  configSeries.data = data;

  return configSeries;
};

export default QuandlAdapter;
