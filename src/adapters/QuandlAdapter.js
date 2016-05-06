
import _ from 'lodash';
import Big from 'big.js';

import {Direction} from '../constants/Type';
import ChartConfigs from '../constants/ChartConfigs';
import {
        fnNumberFormat,
        fnVolumePointFormatter,
        fnATHPointFormatter,
        markerExDivident,
        tooltipExDivident,
        markerSplitRatio,
        tooltipSplitRatio
      } from '../constants/ChartConfigs';

import {
        fnAddSeriesSma,
        fnRemoveSeries,
        fnGetConfigMfi
      } from './IndicatorSma';

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

const _fnGetDatasetInfo = function(json){
  const dataset = json.dataset;
  return  {
     name : dataset.name,
     description : dataset.description,
     newest_available_date : dataset.newest_available_date,
     oldest_available_date : dataset.oldest_available_date,
     frequency : dataset.frequency
  };
}

const _fnGetValueMoving = function(seria){

  const len = seria.length
      , nowValue = (len>0) ? seria[len-1][1] : '0.0'
      , bWasValue = (len>1) ? Big(seria[len-2][1]) : Big(0.0)
      , bDelta = bWasValue.minus(nowValue)
      , bPercent = (len>1) ? bDelta.times(100).div(bWasValue.toString()).abs().toFixed(2) : Big(0.0);

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
          const marker = Object.assign(ChartConfigs.fMarkerExDividend(), {x, exValue, price});
          marker.dataLabels.y = 0;
          dataExDividend.push(marker);
       }
    }

    return result;
}

const _fnAddVolume = function(result){
  const {point, dateUTC, dataVolume, dataVolumeColumn} = result;
  dataVolume.push([dateUTC, point[5]]);
  if (point[4]>point[1]){
    dataVolumeColumn.push({
      x : dateUTC, y : point[5],
      open : point[1], close : point[4],
      low: point[3], high: point[2],
      color: '#80c040'
    });
  } else if (point[4]<point[1]){
    dataVolumeColumn.push({
      x : dateUTC, y : point[5],
      open : point[1], close : point[4],
      low: point[3], high: point[2],
      color: '#F44336'
    });
  } else {
    dataVolumeColumn.push({
      x : dateUTC, y : point[5],
      open : point[1], close : point[4],
      low: point[3], high: point[2],
      color: 'gray'});
  }
  return result;
}

const _fnAddATH = function(result){
  const {dateUTC, point, seria, dataATH} = result;
  const len = seria.length;
  if (len>1){
    const prevPoint = seria[len-2];
    const bDelta = (point[1]) ? Big(prevPoint[1]).minus(point[1]) : Big('0.0');
    const bPercent = bDelta.times(100).div(prevPoint[1]).abs().toFixed(2);
    let color;
    if (bDelta.gt(0.0)){
      color = '#F44336';
    }
    else if (!bDelta.gte(0.0)){
         color = '#80c040';
    } else {
         color = (point[1]) ? 'gray' : 'white';
    }

    dataATH.push({
      x : dateUTC,
      y : parseFloat(bPercent),
      close : prevPoint[1],
      open : point[1],
      color : color
    })
  }

  return result;
}

const _fnAddHighLow = function(result){
  const {dateUTC, yPointIndex, point, dataHighLow} = result;

  const closeValue = point[yPointIndex]
      , bHigh = (point[2]) ? Big(point[2]).minus(closeValue) : Big('0.0')
      , bLow = (point[3]) ? Big(point[3]).minus(closeValue) : Big('0.0')
      , high = (point[2]) ? point[2] : 'Uknown'
      , low = (point[3]) ? point[3] : 'Uknown'

  dataHighLow.push({
    x : dateUTC,
    high : parseFloat(bHigh),
    low : parseFloat(bLow),
    dayHigh : high,
    dayLow : low,
    close : closeValue
    //color : (point[2] && point[3]) ? undefined : 'white'
  });

  return result
}


const _fnCreatePointFlow = function(json, yPointIndex){

  const fnStep = [_fnConvertToUTC, _fnCheckExtrems, _fnAddToSeria]
      , column_names = json.dataset.column_names
      , result = {
         yPointIndex : yPointIndex,
         minPoint : Number.POSITIVE_INFINITY,
         maxPoint : Number.NEGATIVE_INFINITY,
         seria : [],
         dataVolume : [], dataVolumeColumn : [],
         dataExDividend : [], dataSplitRatio : [],
         dataATH : [], dataHighLow : []
      };

  if (column_names[5] === "Volume"){
    fnStep.push(_fnAddVolume);
  }
  if (column_names[6] === "Ex-Dividend"){
    fnStep.push(_fnAddExDividend);
  }
  if (column_names[7] === "Split Ratio"){
    fnStep.push(_fnAddSplitRatio);
  }
  if (column_names[1] === "Open"){
    fnStep.push(_fnAddATH);
  }
  if (column_names[2] === "High" && column_names[3] === "Low"){
    fnStep.push(_fnAddHighLow);
  }
  return {
    fnPointsFlow : _.flow(fnStep),
    result : result
  };
}

const _fnSeriesPipe = function(json, yPointIndex){
  const {fnPointsFlow, result} = _fnCreatePointFlow(json, yPointIndex)
      , points = _.sortBy(json.dataset.data, '0');

  for(var i=0, max=points.length; i<max; i++){
    fnPointsFlow(points[i], result);
  }

  result.zhPoints = points;

  return result
}


const _fnCreateIndicatorConfig = function(){

  const config = ChartConfigs.fBaseAreaConfig();

  config.chart.height = 140;
  config.chart.spacingTop = 8;
  config.chart.spacingBottom = 10;
  config.chart.zoomType = undefined;

  config.yAxis.opposite = true;
  config.yAxis.plotLines = [];

  return config;
}

const _fnCreateConfigATH = function(data){
  if (data.length>0){
    const config = _fnCreateIndicatorConfig();
    config.title = ChartConfigs.fTitleMetric('ATH Chart');
    config.credits = ChartConfigs.creditsMetric;

    config.series[0].zhValueText = "ATH";
    config.series[0].data = data;
    config.series[0].name = "ATH";
    config.series[0].visible = true;
    config.series[0].type = "column";
    config.series[0].borderWidth = 0;
    config.series[0].pointPlacement = 'on';
    config.series[0].minPointLength = 4;
    config.series[0].groupPadding = 0.1;

    config.series[0].tooltip = {
      pointFormatter : fnATHPointFormatter,
      headerFormat : ''
    }
    return config;
  } else {
    return undefined;
  }
}

const _fnCreateConfigVolume = function(data, dataColumn){
  if (data.length>0){
    const config = ChartConfigs.fBaseAreaConfig();
    config.title = ChartConfigs.fTitleMetric('Volume Chart');
    config.legend = ChartConfigs.legendVolume;
    config.credits = ChartConfigs.creditsMetric;

    config.chart.height = 140;
    config.chart.spacingTop = 8;
    config.chart.spacingBottom = 10;
    config.chart.zoomType = undefined;

    config.yAxis.opposite = true;
    config.yAxis.plotLines = [];

    config.series[0].data = data;
    config.series[0].zhValueText = "Volume";
    config.series[0].name = "Spline";

    config.series.push({
      type : "column",
      name : "Column",
      data : dataColumn,
      zhValueText : "Volume",
      visible : false,
      borderWidth : 0,
      pointPlacement : 'on',
      groupPadding : 0.1,
      states : {
        hover : {
          enabled : true,
          brightness: 0.07
        }
      },
      tooltip : {
        pointFormatter : fnVolumePointFormatter,
        headerFormat : ''
      }
    });

    return config;
  } else {
    return undefined;
  }
};

const _fnCreateConfigHighLow = function(data){
  if (data.length>0){
    const config = _fnCreateIndicatorConfig();
    config.title = ChartConfigs.fTitleMetric('HighLow Chart');
    config.credits = ChartConfigs.creditsMetric;

    config.series[0].zhValueText = "HL";
    config.series[0].data = data;
    config.series[0].name = "HL";
    config.series[0].visible = true;
    config.series[0].type = "arearange";

    config.series[0].tooltip = {
      pointFormatter : ChartConfigs.pointFormatterHighLow,
      headerFormat : ''
    }

    return config;
  } else {
    return undefined;
  }
}

const _fnAddSeriesExDivident = function(config, data){
  if (data.length>0){
    config.series.push({
       type: 'scatter',
       color: 'green',
       tooltip : tooltipExDivident,
       data : data
    });
  }
}

const _fnAddSeriesSplitRatio = function(config, data){
  if (data.length>0){
    config.series.push({
       type: 'scatter',
       color: ' #ED5813',
       tooltip : tooltipSplitRatio,
       data : data
    });
  }
};

const _fnCheckIsMfi = function(config, json, zhPoints){
  const names= json.dataset.column_names;
  if ( names[2] === 'High' && names[3] === 'Low'  &&
       names[4] === 'Close' && names[5] === 'Volume') {
    config.zhPoints = zhPoints;
    config.zhIsMfi = true;
    config.zhFnGetMfiConfig = fnGetConfigMfi;
  }
};

const fnGetSeries = function(config, json, yPointIndex){

   config.info = _fnGetDatasetInfo(json);

   const {
     seria, minPoint, maxPoint,
     dataExDividend, dataSplitRatio,
     dataVolume, dataVolumeColumn,
     dataATH, dataHighLow,
     zhPoints
   } = _fnSeriesPipe(json, yPointIndex);

   _fnCheckIsMfi(config, json, zhPoints);
   config.zhFnAddSeriesSma = fnAddSeriesSma;
   config.zhFnRemoveSeries = fnRemoveSeries;

   config.valueMoving = _fnGetValueMoving(seria);
   config.series[0].data = seria;

   config.xAxis.events = {
     afterSetExtremes : ChartConfigs.zoomMetricCharts
   }

   _fnAddSeriesExDivident(config, dataExDividend);
   _fnAddSeriesSplitRatio(config, dataSplitRatio)

   config.zhVolumeConfig = _fnCreateConfigVolume(dataVolume, dataVolumeColumn);
   config.zhATHConfig = _fnCreateConfigATH(dataATH);
   config.zhHighLowConfig = _fnCreateConfigHighLow(dataHighLow);

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
   const config = ChartConfigs.fBaseAreaConfig();
   return fnQuandlFlow(config, json, yPointIndex);
}

QuandlAdapter.toSeries = function(json, yPointIndex, chartId){
  let data = json.dataset.data.map((point, index)=> {
    const arrDate = point[0].split('-');
    return [Date.UTC(arrDate[0], (parseInt(arrDate[1], 10)-1), arrDate[2]), point[yPointIndex]];
  });
  data = _.sortBy(data, '0');

  const valueText = (chartId.length<12) ? chartId : chartId.substring(0,12)
      , configSeries = ChartConfigs.fSeries();

  configSeries.zhValueText = valueText;
  configSeries.data = data;

  return configSeries;
};

export default QuandlAdapter;
