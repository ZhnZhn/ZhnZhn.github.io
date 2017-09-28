
import flow from 'lodash.flow';
import Big from 'big.js';

import {ChartType} from '../constants/Type';
import Chart from '../charts/Chart';
import ChartConfig from '../charts/ChartConfig';
import ChartLegend from '../charts/ChartLegend';

import {
  fnAddSeriesSma, fnRemoveSeries,
  fnGetConfigMfi, fnMomAthConfig
} from './IndicatorSma';

import QuandlFn2 from './QuandlFn2';
import AdapterFn from './AdapterFn';

import {fCreatePieConfig} from './QuandlToPie';
import {fCreateStackedAreaConfig} from './QuandlToStackedArea';
import {fCreateStackedColumnConfig} from './QuandlToStackedColumn';
import {fCreateTreeMapConfig} from './QuandlToTreeMap';

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
      , { dateUTC, yPointIndex, point, dataHighLow } = result;

  const _closeValue = point[yPointIndex]
      , _openValue = (point[open]) ? point[open] : C.UNKNOWN
      , _bHigh = (point[high]) ? Big(point[high]).minus(_closeValue) : Big('0.0')
      , _bLow = (point[low]) ? Big(point[low]).minus(_closeValue) : Big('0.0')
      , _dayHigh = (point[high]) ? point[high] : C.UNKNOWN
      , _dayLow = (point[low]) ? point[low] : C.UNKNOWN;

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
      , column_names = dataset.column_names
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
    fnPointsFlow : flow(fnStep),
    result : result
  };
}


const _fnSeriesPipe = function(json, yPointIndex, option){
  const { fnPointsFlow, result } = _fnCreatePointFlow(json, yPointIndex, option)
      , { dataset={} } = json
      , { data=[] } = dataset
      , points = data.sort(AdapterFn.compareByDate);

  let i=0, _max=points.length;
  for(; i<_max; i++) {
    fnPointsFlow(points[i], result)
  }

  Object.assign(result, {
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
    Object.assign(config, {
      zhPoints: zhPoints,
      zhIsMfi: true,
      zhFnGetMfiConfig: fnGetConfigMfi
    })
  }
};
const _fnCheckIsMomAth = function(config, json, zhPoints) {
  const names= json.dataset.column_names;
  if ( names[1] === C.OPEN && names[4] === C.CLOSE) {
    Object.assign(config, {
      zhPoints: zhPoints,
      zhFnMomAthConfig: fnMomAthConfig
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
           isDrawDeltaExtrems, isNotZoomToMinMax
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

   Object.assign(config, {
     valueMoving: AdapterFn.valueMoving(seria),
     zhFnAddSeriesSma: fnAddSeriesSma,
     zhFnRemoveSeries: fnRemoveSeries,
     zhVolumeConfig: dataVolume.length>0
        ? ChartConfig.fIndicatorVolumeConfig(chartId, dataVolumeColumn, dataVolume)
        : undefined,
     zhATHConfig: dataATH.length>0
        ? ChartConfig.fIndicatorATHConfig(chartId, dataATH)
        : undefined,
    zhHighLowConfig: dataHighLow.length>0
        ? ChartConfig.fIndicatorHighLowConfig(chartId, dataHighLow)
        : undefined
   })

    if (legendSeries){
      _fnSetLegendSeriesToConfig(legendSeries, config, chartId)
      config.zhConfig.isWithLegend = true
    }

   return {
     config, minPoint, maxPoint, minY,
     isDrawDeltaExtrems, isNotZoomToMinMax
   };
}

const _setPlotLinesExtremValues = function(plotLines, minPoint, maxPoint, value, isDrawDeltaExtrems){
  const _bMax = Big(maxPoint)
      , _bMin = Big(minPoint)
      , _bValue = (value !== null) ? Big(value) : Big(0)
      , _maxPoint = parseFloat(_bMax.round(4).toString(), 10)
      , _minPoint = parseFloat(_bMin.round(4).toString(), 10);

  let _deltaMax='', _deltaMin='';
  if (isDrawDeltaExtrems){
    const perToMax = QuandlFn2.createPercent({ bValue: _bMax.minus(_bValue), bTotal: _bValue })
    const perToMin = QuandlFn2.createPercent({ bValue: _bValue.minus(_bMin), bTotal: _bValue })
    _deltaMax = `\u00A0\u00A0Δ ${perToMax}%`
    _deltaMin = `\u00A0\u00A0Δ ${perToMin}%`
  }

  plotLines[0].value = _maxPoint;
  plotLines[0].label.text = `${ChartConfig.fnNumberFormat(_maxPoint)}${_deltaMax}`;
  plotLines[1].value = _minPoint;
  plotLines[1].label.text = `${ChartConfig.fnNumberFormat(_minPoint)}${_deltaMin}`;

}

const fnConfigAxes = function(result){
  const {
          config, minPoint, maxPoint, minY,
          isDrawDeltaExtrems, isNotZoomToMinMax
        } = result
      , plotLines = config.yAxis.plotLines
      , _data = config.series[0].data
      , _maxIndex = _data.length - 1
      , _recentValue = _data[_maxIndex][1];

  _setPlotLinesExtremValues(
    plotLines, minPoint, maxPoint,
    _recentValue, isDrawDeltaExtrems
  )

  if (!isNotZoomToMinMax){
    config.yAxis.min = minY
  }

  return result;
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

const QuandlAdapter = {
  toConfig(json, option){
     const { seriaType=ChartType.AREA } = option
         , _config = _rToConfig[seriaType](json, option);
     return _config;
  },

  toSeries(json, option){
    const { value:chartId, parentId } = option
        , yPointIndex = QuandlFn2.getDataColumnIndex(json, option)
        , { dataset={} } = json;
    let { data=[] } = dataset;
    data = data.map(point => {
              const arrDate = point[0].split('-');
              return [Date.UTC(arrDate[0], (parseInt(arrDate[1], 10)-1), arrDate[2]), point[yPointIndex]];
           })
           .sort(AdapterFn.compareByDate);

    const configSeries = ChartConfig.fSeries();

    Object.assign(configSeries, {
      zhSeriaId: parentId + '_' + chartId,
      zhValueText: chartId.substring(0,12),
      data: data,
      minY: QuandlFn2.findMinY(data)
    })

    return configSeries;
  }

}

export default QuandlAdapter;
