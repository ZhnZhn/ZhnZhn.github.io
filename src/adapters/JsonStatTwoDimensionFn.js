import { getObjectKeys } from './AdapterFn';

import {
  _getDatasetDimension,
  _getDatasetValue,
  _getDatasetStatus,
  _getDimensionCategory,
  _getIdSizeTuple
} from './JsonStatFn';

const _getGeoTuples = (json) => {
  const [
    id,
    size
  ] = _getIdSizeTuple(json);
  let _geoTuple = [], _timeTuple = [];
  for(let i=0; i<size.length; i++) {
    if (size[i] !== 1) {
      if (id[i] !== "time") {
        _geoTuple = [id[i], size[i]]
      } else {
        _timeTuple = [id[i], size[i]]
      }
    }
  }
  return [
    _geoTuple,
    _timeTuple
  ];
};

const _getMaybeUndefValue = value => value === void 0
 ? null
 : value;

 const _crRecentGeoTupple = (
   value,
   status,
   geoIndex,
   timeTuple
 ) => {
   const dGeo = []
   , sGeo = []
   , _timeSize = timeTuple[1]
   , _recentSliceDiff = _timeSize - 1;
   let valueIndex;
   getObjectKeys(geoIndex).forEach(id => {
     valueIndex = _timeSize*geoIndex[id] + _recentSliceDiff
     dGeo.push(id)
     sGeo.push({
       value: _getMaybeUndefValue(value[valueIndex]),
       status: _getMaybeUndefValue(status[valueIndex])
     })
   })
   return [dGeo, sGeo];
 }

const _getRecentTimeLabel = (
  dimension,
  timeTuple
) => {
  const {
    index: timeIndex
  } = _getDimensionCategory(dimension, timeTuple[0]);
  let _timeLabel = '', _timeIndex = -1;
  getObjectKeys(timeIndex)
    .reverse().forEach(timeId => {
      if (timeIndex[timeId]>_timeIndex) {
        _timeLabel = timeId
        _timeIndex = timeIndex[timeId]
      }
  })
  return _timeLabel;
};

export const crGeoSlice = (json) => {
  const value = _getDatasetValue(json)
  , [
    geoTuple,
    timeTuple
  ] = _getGeoTuples(json)
  , dimension = _getDatasetDimension(json)
  , status = _getDatasetStatus(json)
  , { index } = _getDimensionCategory(dimension, geoTuple[0])
  , [dGeo, sGeo] = _crRecentGeoTupple(
      value,
      status,
      index,
      timeTuple
  );

  return [
    { id: dGeo },
    sGeo,
    _getRecentTimeLabel(dimension, timeTuple)
  ];
};

const _getTimeSize = json => {
  const timeTuple = _getGeoTuples(json)[1];
  return timeTuple[1];
}

export const crGeoSeria = (json, geoId) => {
  const value = _getDatasetValue(json)
  , dimension = _getDatasetDimension(json)
  , { index } = _getDimensionCategory(dimension, "geo")
  , geoNumberIndex = index[geoId]
  , _timeSize = _getTimeSize(json)
  , { index: timeIndex } = _getDimensionCategory(dimension, "time")
  , data = [];
  for(let i=_timeSize*geoNumberIndex;i<_timeSize*geoNumberIndex + _timeSize;i++){
    data.push(value[i])
  }
  return {
    data,
    date: {
      id: getObjectKeys(timeIndex)
    }
  }
}
