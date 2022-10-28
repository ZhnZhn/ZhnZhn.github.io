import Big from 'big.js';

import pipe from '../../utils/pipe';
import {
  crMarkerExDividend,
  crMarkerSplitRatio
} from '../../charts/MarkerFn';
import { crLegendConfig } from '../../charts/ChartLegend';

import {
  isNumber,
  roundBy
} from '../AdapterFn';
import { compareByDate } from '../compareByFn';
import {
  crVolumePoint,
  crAthPoint
} from '../pointFn';
import {
  isPrevDateAfter,
  getData,
  getColumnNames,
  getDataColumnIndex,
  findColumnIndex
} from './QuandlFn';
import {
  OPEN,
  HIGH,
  LOW,
  CLOSE,
  PRICE,
  VOLUME,
  EX_DIVIDEND,
  SPLIT_RATIO,
  UNKNOWN
} from './C';

const _assign = Object.assign
, _isUndef = v => typeof v === 'undefined'
, _notNull2 = (a, b) => a !== null && b !== null;


const _convertToUTC = (
  point,
  result
) => {
   const arrDate = point[0].split('-');
   result.dateUTC = Date.UTC(arrDate[0], (parseInt(arrDate[1], 10)-1), arrDate[2]);
   result.point = point;
   return result;
};

const _checkExtrems = (
  result
) => {
  const {point, yPointIndex, maxY, minY} = result
  , value = point[yPointIndex];
  if (isNumber(value)){
    if (value>maxY) { result.maxY = value; }
    if (value<minY) { result.minY = value; }
  }
  return result;
};

const _addToSeria = (
  result
) => {
   const {
     seria,
     dateUTC,
     point,
     yPointIndex
   } = result;
   seria.push([dateUTC, point[yPointIndex]]);

   return result;
};

const _addSplitRatio = (
  splitRationIndex,
  result
) => {
  const {
    point,
    dateUTC,
    yPointIndex,
    dataSplitRatio
  } = result;
  if (point[splitRationIndex] !== 1){
    const x = dateUTC
    , splitRatio = roundBy(point[splitRationIndex])
    , price = point[yPointIndex];

    dataSplitRatio.push(_assign(crMarkerSplitRatio(), {x, splitRatio, price}));
  }
  return result;
};

const _addExDividend = (
  exDividendIndex,
  result
) => {
     const {
       point,
       dateUTC,
       yPointIndex,
       dataExDividend
     } = result;

     if (point[exDividendIndex] !== 0){
       const x = dateUTC
           , exValue = point[exDividendIndex]
           , price = point[yPointIndex]
           , marker = _assign(
                crMarkerExDividend(),
                { x, exValue, price }
             );
       if (!isPrevDateAfter(dataExDividend, x , 14)) {
         marker.dataLabels.y = 0;
       }
       dataExDividend.push(marker);
    }

    return result;
};

const _addVolume = (
  optionIndex,
  result
) => {
  const { volume, open, close=4, low=3, high=2 } = optionIndex
  , { point, dateUTC, dataVolume, dataVolumeColumn } = result
  , _open = open ? point[open] : void 0;

  dataVolume.push([dateUTC, point[volume]]);
  dataVolumeColumn.push(crVolumePoint({
    open: _open,
    close: point[close],
    date: dateUTC,
    volume: point[volume],
    option: {_low: point[low], _high: point[high]},
  }))

  return result;
};

const _addATH = (
  optionIndex,
  result
) => {
  const { open=1 } = optionIndex
  , { dateUTC, point, seria, dataATH } = result
  , len = seria.length;

  if (len>1) {
    const _prevPoint = seria[len-2];
    dataATH.push(crAthPoint({
      date: dateUTC,
      close: _prevPoint[1],
      open: point[open]
    }))
  }

  return result;
};

const _crBigDiff = (
  value,
  closeValue
) => _notNull2(value, closeValue)
  ? Big(value).minus(closeValue)
  : Big('0.0');

const _addHighLow = (
  optionIndex,
  result
) => {
  const { open=1, high=2, low=3 } = optionIndex
  , { dateUTC, yPointIndex, point, dataHighLow } = result
  , _closeValue = point[yPointIndex]
  , _openValue = _notNull2(point[open], _closeValue)
       ? point[open]
       : UNKNOWN
  , _bHigh = _crBigDiff(point[high], _closeValue)
  , _bLow = _crBigDiff(point[low], _closeValue)
  , _dayHigh = point[high] || UNKNOWN
  , _dayLow = point[low] || UNKNOWN;

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
};

const _addCustomSeries = (
  columns,
  result
) => {
   const { dateUTC, point, legendSeries } = result;
   let i=0, max=columns.length;
   for (; i<max; i++ ){
      legendSeries[i].data.push([dateUTC, point[columns[i]]])
   }
};

const _crLegendConfig = (
  seriaColumnNames,
  columnNames
) => {
  const legendSeries = []
  , columns = [];

  if (seriaColumnNames[0] === 'All'){
    let j=1, _len = columnNames.length;
    for (j; j<_len; j++){
      legendSeries.push(crLegendConfig(columnNames[j]))
      columns.push(j)
    }
  } else {
    let i=0, max=seriaColumnNames.length;
    for (; i<max; i++ ){
       const columnName = seriaColumnNames[i]
       , columnIndex = findColumnIndex(columnNames, columnName);
       if (columnIndex) {
          legendSeries.push(crLegendConfig(columnName))
          columns.push(columnIndex)
       }
    }
  }

  return { legendSeries, columns };
};

const _isTransform = ({
  dataset
}) => {
  const { transform } = dataset || {};
  return !!(transform && transform !== 'none');
};

const _crPointFlow = (
  json,
  option
) => {
  const yPointIndex = getDataColumnIndex(json, option)
  , fnStep = [_convertToUTC, _checkExtrems, _addToSeria]
  , columnNames = getColumnNames(json)

  , open = findColumnIndex(columnNames, OPEN)
  , _closeIndex = findColumnIndex(columnNames, CLOSE)
  , close = !_isUndef(_closeIndex)
      ? _closeIndex
      : findColumnIndex(columnNames, PRICE)
  , low = findColumnIndex(columnNames, LOW)
  , high = findColumnIndex(columnNames, HIGH)
  , volume = findColumnIndex(columnNames, VOLUME)
  , exDividend = findColumnIndex(columnNames, EX_DIVIDEND)
  , splitRatio = findColumnIndex(columnNames, SPLIT_RATIO)

  , result = {
     yPointIndex,
     minY : Number.POSITIVE_INFINITY,
     maxY : Number.NEGATIVE_INFINITY,
     seria : [],
     dataVolume : [], dataVolumeColumn : [],
     dataExDividend : [], dataSplitRatio : [],
     dataATH : [], dataHighLow : []
  };


  if (volume){
    fnStep.push(_addVolume.bind(null, {
      volume, open, close, low, high
    }));
  }

  const _hasNotTransform = !_isTransform(json);
  if (exDividend && _hasNotTransform) {
    fnStep.push(_addExDividend.bind(null, exDividend));
  }

  if (splitRatio && _hasNotTransform){
    fnStep.push(_addSplitRatio.bind(null, splitRatio));
  }

  if (open){
    fnStep.push(_addATH.bind(null, { open }));
  }

  if (high && low ){
    fnStep.push(_addHighLow.bind(null, { open, high, low }));
  }

  const { seriaColumnNames } = option;
  if (seriaColumnNames) {
    const { legendSeries, columns } = _crLegendConfig(seriaColumnNames, columnNames);

    if (legendSeries.length !== 0){
      result.legendSeries = legendSeries
      fnStep.push(_addCustomSeries.bind(null, columns))
    }
  }

  return [pipe(...fnStep), result];
};

const crAreaData = (
  json,
  option
) => {
  const [
    callPointFlow,
    result
  ] = _crPointFlow(json, option)
  , points = getData(json).sort(compareByDate);

  let i=0, _max=points.length;
  for(; i<_max; i++) {
    callPointFlow(points[i], result)
  }

  _assign(result, { zhPoints: points })

  return result;
};

export default crAreaData
