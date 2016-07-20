
import flow from 'lodash/flow';
import sortBy from 'lodash/sortBy';
import Big from 'big.js';

import {ChartType} from '../constants/Type';
import Chart from '../constants/Chart';
import ChartConfig from '../constants/ChartConfig';

import { fnAddSeriesSma, fnRemoveSeries, fnGetConfigMfi } from './IndicatorSma';

import QuandlFn2 from './QuandlFn2';

import {fCreatePieConfig} from './QuandlToPie';
import {fCreateStackedAreaConfig} from './QuandlToStackedArea';
import {fCreateStackedColumnConfig} from './QuandlToStackedColumn';
import {fCreateTreeMapConfig} from './QuandlToTreeMap';


const C = {
  OPEN : "Open",
  CLOSE : "Close",
  LOW : "Low",
  HIGH : "High",
  VOLUME : "Volume",
  EX_DIVIDEND : "Ex-Dividend",
  SPLIT_RATIO : "Split Ratio",
  UNKNOWN : "Unknown",

  COLOR_BLUE : "#7cb5ec",
  COLOR_GREEN : "#80c040",
  COLOR_RED : "#F44336",
  COLOR_WHITE : "white",
  COLOR_GRAY : "gray"
}
const QuandlAdapter = {};


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

const _fnAddSplitRatio = function(splitRationIndex, result){
  const { point, dateUTC, yPointIndex, dataSplitRatio } = result;
  if (point[splitRationIndex] !== 1){
    const x = dateUTC
        , splitRatio = point[splitRationIndex]
        , price = point[yPointIndex];

    dataSplitRatio.push(Object.assign(ChartConfig.fMarkerSplitRatio(), {x, splitRatio, price}));
  }
  return result;
}

const _fnAddExDividend = function(exDividendIndex, result){
     const { point, dateUTC, yPointIndex, dataExDividend } = result;

     if (point[exDividendIndex] !== 0){
       const x = dateUTC
           , exValue = point[exDividendIndex]
           , price = point[yPointIndex];

       if (QuandlFn2.isPrevDateAfter(dataExDividend, x , 14)) {
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
      color: C.COLOR_GREEN
    });
  } else if (point[close]<point[open]){
    dataVolumeColumn.push({
      x : dateUTC, y : point[volume],
      _open : point[open], _close : point[close],
      _low: point[low], _high: point[high],
      color: C.COLOR_RED
    });
  } else {
    dataVolumeColumn.push({
      x : dateUTC, y : point[volume],
      _open : point[open], _close : point[close],
      _low: point[low], _high: point[high],
      color: C.COLOR_GRAY
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
      _color = C.COLOR_RED;
    }
    else if (!_bDelta.gte(0.0)){
      _color = C.COLOR_GREEN;
    } else {
      _color = (point[open]) ? C.COLOR_GRAY : C.COLOR_WHITE;
    }

    dataATH.push({
      x : dateUTC,
      y : parseFloat(_bPercent),
      close : _closePrev,
      open : (point[open]) ? point[open] : C.UNKNOWN,
      color : _color
    })
  }

  return result;
}

const _fnAddHighLow = function(optionIndex, result){
  const { open=1, high=2, low=3 } = optionIndex
      , { dateUTC, yPointIndex, point, dataHighLow } = result;

  const _closeValue = point[yPointIndex]
      , _openValue = (point[open]) ? point[open] : C.UNKNOWN
      , _bHigh = (point[high]) ? Big(point[high]).minus(_closeValue) : Big('0.0')
      , _bLow = (point[low]) ? Big(point[low]).minus(_closeValue) : Big('0.0')
      , _dayHigh = (point[high]) ? point[high] : C.UNKNOWN
      , _dayLow = (point[low]) ? point[low] : C.UNKNOWN

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

const _fnAddCustomSeries = function(columns, result){
   const { dateUTC, point, legendSeries } = result;
   for (var i=0, max=columns.length ; i<max; i++ ){
      legendSeries[i].data.push([dateUTC, point[columns[i]]])
   }
}

const _fLegendConfig = function(seriaColumnNames, column_names){
  const legendSeries = []
      , columns =[];

  for (let i=0, max=seriaColumnNames.length; i<max; i++ ){
     const columnName = seriaColumnNames[i]
         , columnIndex = QuandlFn2.findColumnIndex(column_names, columnName);
     if (columnIndex) {
        const { color, symbol } = Chart.fSeriaMarkerConfig(columnName);
        legendSeries.push({ data: [], name : columnName, color, symbol });
        columns.push(columnIndex);
     }
  }

  return { legendSeries, columns }
}

const _fnCreatePointFlow = function(json, yPointIndex, option){

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

  const open = QuandlFn2.findColumnIndex(column_names, C.OPEN)
      , close = QuandlFn2.findColumnIndex(column_names, C.CLOSE)
      , low = QuandlFn2.findColumnIndex(column_names, C.LOW)
      , high = QuandlFn2.findColumnIndex(column_names, C.HIGH)
      , volume = QuandlFn2.findColumnIndex(column_names, C.VOLUME)
      , exDividend = QuandlFn2.findColumnIndex(column_names, C.EX_DIVIDEND)
      , splitRatio = QuandlFn2.findColumnIndex(column_names, C.SPLIT_RATIO);

  if (volume){
    fnStep.push(_fnAddVolume.bind(null, {
      volume, open, close, low, high
    }));
  }

  if (exDividend) {
    fnStep.push(_fnAddExDividend.bind(null, exDividend));
  }

  if (splitRatio){
    fnStep.push(_fnAddSplitRatio.bind(null, splitRatio));
  }

  if (open){
    fnStep.push(_fnAddATH.bind(null, { open }));
  }

  if (high && low ){
    fnStep.push(_fnAddHighLow.bind(null, { open, high, low }));
  }

  const { seriaColumnNames } = option;
  if (seriaColumnNames) {
    const { legendSeries, columns } = _fLegendConfig(seriaColumnNames, column_names);

    if (legendSeries.length !== 0){
      result.legendSeries = legendSeries
      fnStep.push(_fnAddCustomSeries.bind(null, columns));
    }
  }

  return {
    fnPointsFlow : flow(fnStep),
    result : result
  };
}

const _fnSeriesPipe = function(json, yPointIndex, option){
  const {fnPointsFlow, result} = _fnCreatePointFlow(json, yPointIndex, option)
      , points = sortBy(json.dataset.data, '0');

  for(var i=0, max=points.length; i<max; i++){
    fnPointsFlow(points[i], result);
  }

  result.zhPoints = points;
  result.minY = Chart.calcMinY(result);

  return result
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
    config.chart.spacingBottom = 40;
  }
}

const _fnAddSeriesSplitRatio = function(config, data, chartId, y){
  if (data.length>0){
    _fnSetYForPoints(data, y);
    config.series.push(ChartConfig.fSplitRatioSeria(data, chartId));
    config.chart.spacingBottom = 40;
  }
};

const _fnCheckIsMfi = function(config, json, zhPoints){
  const names= json.dataset.column_names;
  if ( names[2] === C.HIGH && names[3] === C.LOW  &&
       names[4] === C.CLOSE && names[5] === C.VOLUME) {
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

const _fnSetLegendSeriesToConfig = function(legendSeries, config, chartId){
  const legend = []
      , _len = config.series.length;

  if (_len !== 0){
     legend.push({
        name: config.series[0].zhValueText,
        index: 0,
        color: C.COLOR_BLUE,
        isVisible : true
    });
  }

  for (let i=0, max=legendSeries.length; i<max; i++){
    const { data, name, color, symbol } = legendSeries[i];

    config.series.push(ChartConfig.fSeries({
       zhSeriaId : i + '_' + chartId,
       zhValueText : name,
       visible : false,
       marker : Chart.fSeriaMarker({ color, symbol }),
       color: color,
       data : data       
    }));
    legend.push({
       name : name,
       index : _len + i,
       color : color,
       isVisible : false
     });
  }

  config.zhConfig.legend = legend;
};

const fnGetSeries = function(config, json, option){
   const { dataColumn:yPointIndex, value:chartId } = option;

   _fnSetChartTitle(config, option);
   config.zhConfig = QuandlFn2.createZhConfig(option);
   config.info = QuandlFn2.createDatasetInfo(json);

   const {
     seria, minPoint, maxPoint, minY,
     dataExDividend, dataSplitRatio,
     dataVolume, dataVolumeColumn,
     dataATH, dataHighLow,
     legendSeries, zhPoints
   } = _fnSeriesPipe(json, yPointIndex, option);

   _fnCheckIsMfi(config, json, zhPoints);
   config.zhFnAddSeriesSma = fnAddSeriesSma;
   config.zhFnRemoveSeries = fnRemoveSeries;

   config.valueMoving = QuandlFn2.createValueMovingFromSeria(seria);
   config.valueMoving.date = QuandlFn2.getRecentDate(seria, json);
   config.series[0].data = seria;
   config.series[0].zhSeriaId = chartId;

   config.xAxis.events = {
     afterSetExtremes : ChartConfig.zoomMetricCharts
   }

   _fnAddSeriesExDivident(config, dataExDividend, chartId, minY);
   _fnAddSeriesSplitRatio(config, dataSplitRatio, chartId, minY);

   config.zhVolumeConfig = (dataVolume.length>0)
            ? ChartConfig.fIndicatorVolumeConfig(chartId, dataVolumeColumn, dataVolume)
            : undefined;
   config.zhATHConfig = (dataATH.length>0)
            ? ChartConfig.fIndicatorATHConfig(chartId, dataATH)
            : undefined;
   config.zhHighLowConfig = (dataHighLow.length>0)
            ? ChartConfig.fIndicatorHighLowConfig(chartId, dataHighLow)
            : undefined;

    if (legendSeries){
      _fnSetLegendSeriesToConfig(legendSeries, config, chartId);
      config.zhConfig.isWithLegend = true;
    }

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

const _fCreateAreaConfig = function(json, option){
  const config = ChartConfig.fBaseAreaConfig()
      , { columnName } = option;

  option.dataColumn = QuandlFn2.getDataColumnIndex(json, option);
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
      , yPointIndex = QuandlFn2.getDataColumnIndex(json, option);

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
