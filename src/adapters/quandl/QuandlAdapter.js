
import Big from 'big.js';

import pipe from '../../utils/pipe'

import {ChartType} from '../../constants/Type';
import Chart from '../../charts/Chart';
import ChartFn from '../../charts/ChartFn'
import ChartConfig from '../../charts/ChartConfig';
import ChartLegend from '../../charts/ChartLegend';
import ConfigBuilder from '../../charts/ConfigBuilder';

import AdapterFn from '../AdapterFn';
import QuandlFn2 from './QuandlFn2';

import {fCreatePieConfig} from './QuandlToPie';
import {fCreateStackedAreaConfig} from './QuandlToStackedArea';
import {fCreateStackedColumnConfig} from './QuandlToStackedColumn';
import {fCreateTreeMapConfig} from './QuandlToTreeMap';
import toYearly from '../toYearly'
import ToScatter from './ToScatter'

const { getData, getColumnNames } = QuandlFn2;

const {
  crDividendSeria,
  crSplitRatioSeria
} = ChartConfig;
const {
  setMinMaxPlotLines
} = ChartFn;
const _assign = Object.assign;

const C = {
  OPEN : "Open",
  CLOSE : "Close",
  PRICE: 'Price',
  LOW : "Low",
  HIGH : "High",
  VOLUME : "Volume",
  EX_DIVIDEND : "Ex-Dividend",
  SPLIT_RATIO : "Split Ratio",
  UNKNOWN : "Unknown",

  COLOR_BLUE: '#2f7ed8',
}


const _notNull2 = (a, b) => a !== null && b !== null;

const _fnConvertToUTC = function(point, result){
   const arrDate = point[0].split('-');
   result.dateUTC = Date.UTC(arrDate[0], (parseInt(arrDate[1], 10)-1), arrDate[2]);
   result.point = point;
   return result;
}

const _fnCheckExtrems = function(result){
  const {point, yPointIndex, maxPoint, minPoint} = result;
  if (!(point[yPointIndex] == null) && point[yPointIndex]>=maxPoint){
    result.maxPoint = point[yPointIndex];
  }
  if (!(point[yPointIndex] == null) && point[yPointIndex]<=minPoint) {
    result.minPoint = point[yPointIndex];
  }

  return result;
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
        , splitRatio = parseFloat(point[splitRationIndex].toFixed(2))
        , price = point[yPointIndex];

    dataSplitRatio.push(_assign(ChartConfig.crMarkerSplitRatio(), {x, splitRatio, price}));
  }
  return result;
}

const _fnAddExDividend = function(exDividendIndex, result){
     const { point, dateUTC, yPointIndex, dataExDividend } = result;

     if (point[exDividendIndex] !== 0){
       const x = dateUTC
           //, exValue = parseFloat(point[exDividendIndex].toFixed(2))
           , exValue = point[exDividendIndex]
           , price = point[yPointIndex]
           , marker = _assign(
                ChartConfig.crMarkerExDividend(),
                { x, exValue, price }
             );
       if (!QuandlFn2.isPrevDateAfter(dataExDividend, x , 14)) {
         marker.dataLabels.y = 0;
       }
       dataExDividend.push(marker);
    }

    return result;
}

const _fnAddVolume = function(optionIndex, result){
  const { volume, open, close=4, low=3, high=2 } = optionIndex
      , { point, dateUTC, dataVolume, dataVolumeColumn } = result
      , _open = (open) ? point[open] : undefined;

  dataVolume.push([dateUTC, point[volume]]);
  dataVolumeColumn.push( AdapterFn.volumeColumnPoint({
    open: _open, close: point[close], date: dateUTC, volume: point[volume],
    option: {_low: point[low], _high: point[high]},
  }))

  return result;
}

const _fnAddATH = function(optionIndex, result){
  const { open=1 } = optionIndex
      , { dateUTC, point, seria, dataATH } = result
      , len = seria.length;

  if (len>1) {
    const _prevPoint = seria[len-2];
    dataATH.push(AdapterFn.athPoint({
      date: dateUTC, prevClose: _prevPoint[1], open: point[open]
    }))
  }

  return result;
}

const _fnAddHighLow = function(optionIndex, result){
  const { open=1, high=2, low=3 } = optionIndex
  , { dateUTC, yPointIndex, point, dataHighLow } = result
  , _closeValue = point[yPointIndex]
  , _openValue = _notNull2(point[open], _closeValue)
       ? point[open]
       : C.UNKNOWN
  , _bHigh = _notNull2(point[high], _closeValue)
       ? Big(point[high]).minus(_closeValue)
       : Big('0.0')
  , _bLow = _notNull2(point[low], _closeValue)
       ? Big(point[low]).minus(_closeValue)
       : Big('0.0')
  , _dayHigh = point[high] || C.UNKNOWN
  , _dayLow = point[low] || C.UNKNOWN;

  dataHighLow.push({
    x : dateUTC,
    high : parseFloat(_bHigh),
    low : parseFloat(_bLow),
    open : _openValue,
    dayHigh : _dayHigh,
    dayLow : _dayLow,
    close : _closeValue
  });

  return result;
}

const _fnAddCustomSeries = function(columns, result){
   const { dateUTC, point, legendSeries } = result;
   let i=0, max=columns.length;
   for (; i<max; i++ ){
      legendSeries[i].data.push([dateUTC, point[columns[i]]])
   }
}

const _fLegendConfig = function(seriaColumnNames, column_names){
  const legendSeries = []
      , columns =[];

  if (seriaColumnNames[0] === 'All'){
    let j=1, _len = column_names.length;
    for (j; j<_len; j++){
      legendSeries.push(
        ChartLegend.fLegendConfig(column_names[j])
      )
      columns.push(j)
    }
  } else {
    let i=0, max=seriaColumnNames.length;
    for (; i<max; i++ ){
       const columnName = seriaColumnNames[i]
           , columnIndex = QuandlFn2.findColumnIndex(column_names, columnName);
       if (columnIndex) {
          legendSeries.push(
            ChartLegend.fLegendConfig(columnName)
          )
          columns.push(columnIndex)
       }
    }
  }

  return { legendSeries, columns };
}

const _fnCreatePointFlow = function(json, yPointIndex, option){

  const fnStep = [_fnConvertToUTC, _fnCheckExtrems, _fnAddToSeria]
      , { dataset={} } = json
      , column_names = getColumnNames(json)
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
      , _closeIndex = QuandlFn2.findColumnIndex(column_names, C.CLOSE)
      , close = ( typeof _closeIndex !== 'undefined')
          ? _closeIndex
          : QuandlFn2.findColumnIndex(column_names, C.PRICE)
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

  const _isTransform = dataset.transform && dataset.transform !== 'none';
  if (exDividend && !_isTransform) {
    fnStep.push(_fnAddExDividend.bind(null, exDividend));
  }

  if (splitRatio && !_isTransform){
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
      fnStep.push(_fnAddCustomSeries.bind(null, columns))
    }
  }

  return {
    //fnPointsFlow : flow(fnStep),
    fnPointsFlow : pipe(...fnStep),
    result : result
  };
}


const _fnSeriesPipe = function(json, yPointIndex, option){
  const { fnPointsFlow, result } = _fnCreatePointFlow(json, yPointIndex, option)
      , data = getData(json)
      , points = data.sort(AdapterFn.compareByDate);

  let i=0, _max=points.length;
  for(; i<_max; i++) {
    fnPointsFlow(points[i], result)
  }

  _assign(result, {
    zhPoints: points,
    minY: Chart.calcMinY(result)
  })

  return result;
}

const _fnSetYForPoints = function(data, y){
  let i=0, max=data.length;
  for (; i<max; i++ ){
    data[i].y = y;
  }
}

const _fnAddSeriesExDivident = function(config, data, chartId, y){
  if (data.length>0){
    _fnSetYForPoints(data, y);
    config.series.push(crDividendSeria(data, chartId));
    config.chart.spacingBottom = 40;
  }
}

const _fnAddSeriesSplitRatio = function(config, data, chartId, y){
  if (data.length>0){
    _fnSetYForPoints(data, y);
    config.series.push(crSplitRatioSeria(data, chartId));
    config.chart.spacingBottom = 40;
  }
};

const _fnCheckIsMfi = function(config, json, zhPoints){
  const names = getColumnNames(json);
  if ( names[2] === C.HIGH && names[3] === C.LOW  &&
       names[4] === C.CLOSE && names[5] === C.VOLUME) {
    _assign(config, {
      zhPoints: zhPoints,
      zhIsMfi: true
    })
  }
};
const _fnCheckIsMomAth = function(config, json, zhPoints) {
  const names = getColumnNames(json)
  if ( names[1] === C.OPEN && names[4] === C.CLOSE) {
    _assign(config, {
      zhPoints: zhPoints,
      zhIsMomAth: true
    })
  }
}

const _fnSetChartTitle = function(config, option){
  const { title, subtitle } = option;
  if (title){
    Chart.setDefaultTitle(config, title, subtitle)
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

  let i=0, max=legendSeries.length;
  for (i; i<max; i++){
    const { data, name, color, symbol, isSecondAxes } = legendSeries[i]
        , seria = ChartConfig.fSeries({
             zhSeriaId : i + '_' + chartId,
             zhValueText : name,
             visible : false,
             marker : Chart.fSeriaMarker({ color, symbol }),
             color: color,
             data : data
          });

     if (!isSecondAxes){
        config.series.push(seria);
        legend.push({
          name : name,
          index : config.series.length - 1,
          color : color,
          isVisible : false
        });
     } else {
       legend.push({
          name : name,
          color : color,
          isVisible : false,
          isSecondAxes : true,
          seria : seria
        });
     }
  }

  config.zhConfig.legend = legend;
};

const fnGetSeries = function(config, json, option){
   const {
           dataColumn:yPointIndex,
           value:chartId,
           isDrawDeltaExtrems, isNotZoomToMinMax,
           dfR
         } = option;

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
   _fnCheckIsMomAth(config, json, zhPoints);

   config.series[0].data = seria;
   config.series[0].zhSeriaId = chartId;

   _fnAddSeriesExDivident(config, dataExDividend, chartId, minY);
   _fnAddSeriesSplitRatio(config, dataSplitRatio, chartId, minY);

   config = ConfigBuilder()
     .init(config)
     .add({
       valueMoving: AdapterFn.valueMoving(seria, dfR)
     })
     .addMiniVolume({
       id: chartId,
       dColumn: dataVolumeColumn,
       dVolume: dataVolume
     })
     .addMiniATH({
       id: chartId,
       data: dataATH
     })
     .addMiniHL({
       id: chartId,
       data: dataHighLow
     })
     .toConfig();

    if (legendSeries){
      _fnSetLegendSeriesToConfig(legendSeries, config, chartId)
      config.zhConfig.isWithLegend = true
    }

   return {
     config,
     minPoint, maxPoint, minY,
     isDrawDeltaExtrems, isNotZoomToMinMax
   };
}

const fnConfigAxes = function(result){
  const {
          config, minPoint, maxPoint, minY,
          isDrawDeltaExtrems, isNotZoomToMinMax
        } = result
      , plotLines = config.yAxis.plotLines
      , _data = config.series[0].data
      , _maxIndex = _data.length - 1
      , _recentValue = _maxIndex > -1
           ? _data[_maxIndex][1]
           : 0;

  setMinMaxPlotLines({ plotLines,
    min: minPoint, max: maxPoint,
    value: _recentValue,
    isDrawDeltaExtrems
  })
  if (!isNotZoomToMinMax){
    config.yAxis.min = minY
  }

  return result;
}

//const fnQuandlFlow = flow(fnGetSeries, fnConfigAxes);
const fnQuandlFlow = pipe(fnGetSeries, fnConfigAxes);

const _fCreateAreaConfig = function(json, option){
  const config = ChartConfig.fBaseAreaConfig()
      , { columnName } = option;

  option.dataColumn = QuandlFn2.getDataColumnIndex(json, option);
  if ( columnName ){
    config.series[0].zhValueText = columnName;
  }

  return fnQuandlFlow(config, json, option);
}

const _fToConfig = builder => (json, option) => {
  const data = getData(json);
  return { config: builder.toConfig(data, option) };
}
const _fToSeria = builder => (json, option, chart) => {
  const data = getData(json);
  return builder.toSeria(data, option, chart);
}

const _rToConfig = {
  [ChartType.AREA] : _fCreateAreaConfig,
  [ChartType.SEMI_DONUT] : fCreatePieConfig,
  [ChartType.STACKED_AREA] : fCreateStackedAreaConfig,
  [ChartType.STACKED_AREA_PERCENT] : fCreateStackedAreaConfig,
  [ChartType.STACKED_COLUMN] : fCreateStackedColumnConfig,
  [ChartType.STACKED_COLUMN_PERCENT] : fCreateStackedColumnConfig,
  [ChartType.TREE_MAP] : fCreateTreeMapConfig,
  [ChartType.YEARLY]: _fToConfig(toYearly),
  [ChartType.SCATTER]: _fToConfig(ToScatter),
  [ChartType.SCATTER_UP]: _fToConfig(ToScatter),
  [ChartType.SCATTER_DOWN]: _fToConfig(ToScatter)
}

const _crSeriaData = (data, yIndex) => {
  return data
    .map(p => [ AdapterFn.ymdToUTC(p[0]), p[yIndex] ])
    .sort(AdapterFn.compareByDate);
};

const _toSeria = (json, option) => {
  const { value:chartId, parentId } = option
      , yPointIndex = QuandlFn2.getDataColumnIndex(json, option)
      , data = _crSeriaData(getData(json), yPointIndex)
      , seria = _assign(
           ChartConfig.fSeries(), {
             zhSeriaId: parentId + '_' + chartId,
             zhValueText: chartId.substring(0,12),
             data: data,
             minY: AdapterFn.findMinY(data)
           }
         );

  return seria;
}

const _rToSeria = {
  DF: _toSeria,
  [ChartType.SCATTER]: _fToSeria(ToScatter),
  [ChartType.SCATTER_UP]: _fToSeria(ToScatter),
  [ChartType.SCATTER_DOWN]: _fToSeria(ToScatter)
}

const QuandlAdapter = {
  toConfig(json, option){
     const { seriaType=ChartType.AREA } = option
         , config = _rToConfig[seriaType](json, option);
     return config;
  },

  toSeries(json, option, chart){
    const { seriaType } = option
       , _toSeria = _rToSeria[seriaType] || _rToSeria.DF
       , seria = _toSeria(json, option, chart);
    return seria;
  }

}

export default QuandlAdapter;
