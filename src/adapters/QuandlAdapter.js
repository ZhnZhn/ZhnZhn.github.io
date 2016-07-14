
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
        fnGetRecentDate,
        fnFindColumnIndex
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
  if (
       ( point[yPointIndex] && point[yPointIndex]<=minPoint )
       || point[yPointIndex] === 0
  ){
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

const _fnAddVolume = function(optionIndex, result){
  const { volume, open=1, close=4, low=3, high=2 } = optionIndex
      , { point, dateUTC, dataVolume, dataVolumeColumn } = result;
  dataVolume.push([dateUTC, point[volume]]);
  if (point[close]>point[open]){
    dataVolumeColumn.push({
      x : dateUTC, y : point[volume],
      _open : point[open], _close : point[close],
      _low: point[low], _high: point[high],
      color: '#80c040'
    });
  } else if (point[close]<point[open]){
    dataVolumeColumn.push({
      x : dateUTC, y : point[volume],
      _open : point[open], _close : point[close],
      _low: point[low], _high: point[high],
      color: '#F44336'
    });
  } else {
    dataVolumeColumn.push({
      x : dateUTC, y : point[volume],
      _open : point[open], _close : point[close],
      _low: point[low], _high: point[high],
      color: 'gray'
    });
  }
  return result;
}

const _fnAddATH = function(optionIndex, result){
  const { open=1 } = optionIndex
      , { dateUTC, point, seria, dataATH } = result
      , len = seria.length;

  if (len>1){
    const prevPoint = seria[len-2]
        , _closePrev = prevPoint[1]
        , _bDelta = (point[open] && _closePrev)
            ? Big(_closePrev).minus(point[open])
            : Big('0.0')
        , _bPercent = ( _closePrev )
            ? _bDelta.times(100).div(_closePrev).abs().toFixed(2)
            : Big('0.0');

    let _color;
    if (_bDelta.gt(0.0)){
      _color = '#F44336';
    }
    else if (!_bDelta.gte(0.0)){
      _color = '#80c040';
    } else {
      _color = (point[open]) ? 'gray' : 'white';
    }

    dataATH.push({
      x : dateUTC,
      y : parseFloat(_bPercent),
      close : _closePrev,
      open : (point[open]) ? point[open] : 'Unknown',
      color : _color
    })
  }

  return result;
}

const _fnAddHighLow = function(optionIndex, result){
  const { open=1, high=2, low=3 } = optionIndex
      , { dateUTC, yPointIndex, point, dataHighLow } = result;

  const _closeValue = point[yPointIndex]
      , _openValue = (point[open]) ? point[open] : 'Unknown'
      , _bHigh = (point[high]) ? Big(point[high]).minus(_closeValue) : Big('0.0')
      , _bLow = (point[low]) ? Big(point[low]).minus(_closeValue) : Big('0.0')
      , _dayHigh = (point[high]) ? point[high] : 'Unknown'
      , _dayLow = (point[low]) ? point[low] : 'Unknown'

  dataHighLow.push({
    x : dateUTC,
    high : parseFloat(_bHigh),
    low : parseFloat(_bLow),
    open : _openValue,
    dayHigh : _dayHigh,
    dayLow : _dayLow,
    close : _closeValue
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

  const open = fnFindColumnIndex(column_names, "Open")
      , close = fnFindColumnIndex(column_names, "Close")
      , low = fnFindColumnIndex(column_names, "Low")
      , high = fnFindColumnIndex(column_names, "High")
      , volume = fnFindColumnIndex(column_names, "Volume");

  if ( volume !== -1){
    fnStep.push(_fnAddVolume.bind(null, {
      volume, open, close, low, high
    }));
  }

  if (column_names[6] === "Ex-Dividend"){
    fnStep.push(_fnAddExDividend);
  }
  if (column_names[7] === "Split Ratio"){
    fnStep.push(_fnAddSplitRatio);
  }

  if ( open !== -1 ){
    fnStep.push(_fnAddATH.bind(null, {
      open
    }));
  }

  if (high !== -1 && low !== -1){
    fnStep.push(_fnAddHighLow.bind(null, {
      open, high, low
    }));
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
  result.minY = Chart.calcMinY(result);

  return result
}


const _fnCreateIndicatorConfig = function(){

  const config = ChartConfig.fBaseAreaConfig();

  config.chart.height = 160;
  config.chart.spacingTop = 8;
  config.chart.spacingBottom = 10;
  config.chart.zoomType = undefined;

  config.yAxis.opposite = true;
  config.yAxis.plotLines = [];

  config.yAxis.startOnTick = true;
  config.yAxis.endOnTick = true;
  config.yAxis.tickPixelInterval = 60;

  return config;
}

const _fnCreateConfigATH = function(data, chartId){
  if (data.length>0){
    const config = _fnCreateIndicatorConfig();
    config.title = ChartConfig.fTitleMetric('ATH Chart');

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
    const config = _fnCreateIndicatorConfig();
    config.chart.height = 160;
    config.yAxis.endOnTick = false;
    config.yAxis.tickPixelInterval = 40;

    config.title = ChartConfig.fTitleMetric('Volume Chart:');
    config.legend = ChartConfig.legendVolume;

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

    config.series[0].zhSeriaId = chartId + '_HL';
    config.series[0].zhValueText = "HL";
    config.series[0].data = data;
    config.series[0].name = "HL";
    config.series[0].visible = true;
    config.series[0].type = "arearange";
    config.series[0].color = '#2D7474';

    config.series[0].tooltip = {
      pointFormatter : Tooltip.fnHighLowPointFormatter,
      headerFormat : ''
    }

    return config;
  } else {
    return undefined;
  }
}

const _fnSetYForPoints = function(data, y){
  for (let i=0, max=data.length; i<max; i++ ){
    data[i].y = y;
  }
}

const _fnAddSeriesExDivident = function(config, data, chartId, y){
  if (data.length>0){
    _fnSetYForPoints(data, y);
    config.series.push(ChartConfig.fExDividendSeria(data, chartId));
  }
}

const _fnAddSeriesSplitRatio = function(config, data, chartId, y){
  if (data.length>0){
    _fnSetYForPoints(data, y);
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

const _fnSetChartTitle = function(config, option){
  const { title, subtitle } = option;
  if (title){
    config.chart.spacingTop = Chart.STACKED_SPACING_TOP;
    config.title = Chart.fTitle({ text: title, y:Chart.STACKED_TITLE_Y });
    config.subtitle = Chart.fSubtitle({ text: subtitle, y:Chart.STACKED_SUBTITLE_Y });
  }
}

const fnGetSeries = function(config, json, option){
   const { dataColumn:yPointIndex, value:chartId } = option;

   _fnSetChartTitle(config, option);
   config.zhConfig = fnCreateZhConfig(option);
   config.info = fnCreateDatasetInfo(json);

   const {
     seria, minPoint, maxPoint, minY,
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

   _fnAddSeriesExDivident(config, dataExDividend, chartId, minY);
   _fnAddSeriesSplitRatio(config, dataSplitRatio, chartId, minY);
   if ( dataExDividend.length !== 0 || dataSplitRatio.length !== 0){
     config.chart.spacingBottom = 40;
   }

   config.zhVolumeConfig = _fnCreateConfigVolume(dataVolume, dataVolumeColumn, chartId);
   config.zhATHConfig = _fnCreateConfigATH(dataATH, chartId);
   config.zhHighLowConfig = _fnCreateConfigHighLow(dataHighLow, chartId);

   return { config, minPoint, maxPoint, minY }
}

const fnConfigAxes = function(result){
  const { config, minPoint, maxPoint, minY } = result
      , _maxPoint = parseFloat(Big(maxPoint).round(4).toString(), 10)
      , _minPoint = parseFloat(Big(minPoint).round(4).toString(), 10)

  config.yAxis.plotLines[0].value = _maxPoint;
  config.yAxis.plotLines[0].label.text = ChartConfig.fnNumberFormat(_maxPoint);
  config.yAxis.plotLines[1].value = _minPoint;
  config.yAxis.plotLines[1].label.text = ChartConfig.fnNumberFormat(_minPoint);
  config.yAxis.opposite = true;
  config.yAxis.min = minY;

  config.xAxis = Chart.fXAxisOpposite(config.xAxis);

  return result
}

const fnQuandlFlow = flow(fnGetSeries, fnConfigAxes);

const _fnGetDataColumnIndex = function(json, option){
  const { columnName, dataColumn } = option
      , _dataColumn = fnFindColumnIndex(json, columnName)
      , _columnIndex = (_dataColumn !== -1)
            ? _dataColumn
            : (dataColumn) ? dataColumn : 1;

   return _columnIndex;
}

const _fCreateAreaConfig = function(json, option){
  const config = ChartConfig.fBaseAreaConfig()
      , { columnName } = option;

  option.dataColumn = _fnGetDataColumnIndex(json, option);
  if ( columnName ){
    config.series[0].zhValueText = columnName;
  }

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


const _fnFindMinY = function(data=[]){
  let minY = Number.POSITIVE_INFINITY;
  for (let i=0, max=data.length; i<max; i++){
    if ( data[i][1]<minY ) {
      minY = data[i][1]
    }
  }

  if ( minY !== Number.POSITIVE_INFINITY) {
    return minY;
  } else {
    return undefined;
  }
}

QuandlAdapter.toSeries = function(json, option){
  const { value:chartId, parentId } = option
      , yPointIndex = _fnGetDataColumnIndex(json, option);

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
  configSeries.minY = _fnFindMinY(data);

  return configSeries;
};

export default QuandlAdapter;
