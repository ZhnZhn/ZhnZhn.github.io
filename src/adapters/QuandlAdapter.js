
import flow from 'lodash/flow';
import sortBy from 'lodash/sortBy';
import Big from 'big.js';

import {ChartType} from '../constants/Type';
import Chart from '../constants/Chart';
import ChartConfig from '../constants/ChartConfig';
import Tooltip from '../constants/Tooltip';

import {
        fnAddSeriesSma,
        fnRemoveSeries,
        fnGetConfigMfi
      } from './IndicatorSma';
import {
        fnCreateZhConfig,
        fnCreateDatasetInfo,
        fnCreateValueMovingFromSeria,
        fnGetRecentDate
      } from './QuandlFn';
import {fCreatePieConfig} from './QuandlToPie';
import {fCreateStackedAreaConfig} from './QuandlToStackedArea';
import {fCreateStackedColumnConfig} from './QuandlToStackedColumn';
import {fCreateTreeMapConfig} from './QuandlToTreeMap';

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

    dataSplitRatio.push(Object.assign(ChartConfig.fMarkerSplitRatio(), {x, splitRatio, price}));
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
          dataExDividend.push(Object.assign(ChartConfig.fMarkerExDividend(), {x, exValue, price}));
       } else {
          const marker = Object.assign(ChartConfig.fMarkerExDividend(), {x, exValue, price});
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
    fnPointsFlow : flow(fnStep),
    result : result
  };
}

const _fnSeriesPipe = function(json, yPointIndex){
  const {fnPointsFlow, result} = _fnCreatePointFlow(json, yPointIndex)
      , points = sortBy(json.dataset.data, '0');

  for(var i=0, max=points.length; i<max; i++){
    fnPointsFlow(points[i], result);
  }

  result.zhPoints = points;

  return result
}


const _fnCreateIndicatorConfig = function(){

  const config = ChartConfig.fBaseAreaConfig();

  config.chart.height = 140;
  config.chart.spacingTop = 8;
  config.chart.spacingBottom = 10;
  config.chart.zoomType = undefined;

  config.yAxis.opposite = true;
  config.yAxis.plotLines = [];

  return config;
}

const _fnCreateConfigATH = function(data, chartId){
  if (data.length>0){
    const config = _fnCreateIndicatorConfig();
    config.title = ChartConfig.fTitleMetric('ATH Chart');
    config.credits = ChartConfig.creditsMetric;

    config.series[0].zhSeriaId = chartId + "_ATH";
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
      pointFormatter : Tooltip.fnATHPointFormatter,
      headerFormat : ''
    }
    return config;
  } else {
    return undefined;
  }
}

const _fnCreateConfigVolume = function(data, dataColumn, chartId){
  if (data.length>0){
    const config = ChartConfig.fBaseAreaConfig();
    config.title = ChartConfig.fTitleMetric('Volume Chart');
    config.legend = ChartConfig.legendVolume;
    config.credits = ChartConfig.creditsMetric;

    config.chart.height = 140;
    config.chart.spacingTop = 8;
    config.chart.spacingBottom = 10;
    config.chart.zoomType = undefined;

    config.yAxis.opposite = true;
    config.yAxis.plotLines = [];

    config.series[0].data = data;
    config.series[0].name = "Spline";
    config.series[0].zhValueText = "Volume";
    config.series[0].zhSeriaId = chartId + '_VolumeArea';

    config.series.push({
      zhSeriaId : chartId + '_VolumeColumn',
      zhValueText : "Volume",
      turboThreshold : 20000,
      type : "column",
      name : "Column",
      data : dataColumn,

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
        pointFormatter : Tooltip.fnVolumePointFormatter,
        headerFormat : ''
      }
    });

    return config;
  } else {
    return undefined;
  }
};

const _fnCreateConfigHighLow = function(data, chartId){
  if (data.length>0){
    const config = _fnCreateIndicatorConfig();
    config.title = ChartConfig.fTitleMetric('HighLow Chart');
    config.credits = ChartConfig.creditsMetric;

    config.series[0].zhSeriaId = chartId + '_HL';
    config.series[0].zhValueText = "HL";
    config.series[0].data = data;
    config.series[0].name = "HL";
    config.series[0].visible = true;
    config.series[0].type = "arearange";

    config.series[0].tooltip = {
      pointFormatter : Tooltip.fnHighLowPointFormatter,
      headerFormat : ''
    }

    return config;
  } else {
    return undefined;
  }
}

const _fnAddSeriesExDivident = function(config, data, chartId){
  if (data.length>0){
    config.series.push(ChartConfig.fExDividendSeria(data, chartId));
  }
}

const _fnAddSeriesSplitRatio = function(config, data, chartId){
  if (data.length>0){
    config.series.push(ChartConfig.fSplitRatioSeria(data, chartId));
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


const fnGetSeries = function(config, json, option){
   const yPointIndex = option.dataColumn
       , chartId = option.value;

   config.zhConfig = fnCreateZhConfig(option);
   config.info = fnCreateDatasetInfo(json);

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

   config.valueMoving = fnCreateValueMovingFromSeria(seria);
   config.valueMoving.date = fnGetRecentDate(seria, json);
   config.series[0].data = seria;
   config.series[0].zhSeriaId = chartId;

   config.xAxis.events = {
     afterSetExtremes : ChartConfig.zoomMetricCharts
   }

   _fnAddSeriesExDivident(config, dataExDividend, chartId);
   _fnAddSeriesSplitRatio(config, dataSplitRatio, chartId)

   config.zhVolumeConfig = _fnCreateConfigVolume(dataVolume, dataVolumeColumn, chartId);
   config.zhATHConfig = _fnCreateConfigATH(dataATH, chartId);
   config.zhHighLowConfig = _fnCreateConfigHighLow(dataHighLow, chartId);

   return {config, minPoint, maxPoint}
}

const fnConfigAxes = function(result){
  const {config, minPoint, maxPoint} = result;

  config.yAxis.plotLines[0].value = maxPoint;
  config.yAxis.plotLines[0].label.text = ChartConfig.fnNumberFormat(maxPoint);
  config.yAxis.plotLines[1].value = minPoint;
  config.yAxis.plotLines[1].label.text = ChartConfig.fnNumberFormat(minPoint);
  config.yAxis.opposite = true;

  //config.xAxis = Object.assign({}, config.xAxis, fnGetXAxesConfig());
  config.xAxis = Chart.fXAxisOpposite(config.xAxis);

  return result
}

const fnQuandlFlow = flow(fnGetSeries, fnConfigAxes);

const _fCreateAreaConfig = function(json, option){
  const config = ChartConfig.fBaseAreaConfig();
  return fnQuandlFlow(config, json, option);
}

const _rToConfig = {
  [ChartType.AREA] : _fCreateAreaConfig,
  [ChartType.SEMI_DONUT] : fCreatePieConfig,
  [ChartType.STACKED_AREA] : fCreateStackedAreaConfig,
  [ChartType.STACKED_AREA_PERCENT] : fCreateStackedAreaConfig,
  [ChartType.STACKED_COLUMN] : fCreateStackedColumnConfig,
  [ChartType.STACKED_COLUMN_PERCENT] : fCreateStackedColumnConfig,
  [ChartType.TREE_MAP] : fCreateTreeMapConfig
}

QuandlAdapter.toConfig = function(json, option){
   const {seriaType=ChartType.AREA} = option;

   return _rToConfig[seriaType](json, option);
}


QuandlAdapter.toSeries = function(json, option){
  const yPointIndex = option.dataColumn
      , chartId = option.value
      , parentId = option.parentId;

  let data = json.dataset.data.map((point, index)=> {
    const arrDate = point[0].split('-');
    return [Date.UTC(arrDate[0], (parseInt(arrDate[1], 10)-1), arrDate[2]), point[yPointIndex]];
  });
  data = sortBy(data, '0');

  const valueText = (chartId.length<12) ? chartId : chartId.substring(0,12)
      , configSeries = ChartConfig.fSeries();

  configSeries.zhSeriaId = parentId + '_' + chartId;
  configSeries.zhValueText = valueText;
  configSeries.data = data;

  return configSeries;
};

export default QuandlAdapter;
