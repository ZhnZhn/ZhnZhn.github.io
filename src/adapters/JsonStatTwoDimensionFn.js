import {
  isNumber,
  getObjectKeys
} from './AdapterFn';

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

 const _crGeoTupple = (
   value,
   status,
   geoIndex,
   _timeSize,
   _recentSliceDiff
 ) => {
   const dGeo = []
   , sGeo = []
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

export const crGeoSlice = (
  json,
  timeId
) => {
  const value = _getDatasetValue(json)
  , [
    geoTuple,
    timeTuple
  ] = _getGeoTuples(json)
  , dimension = _getDatasetDimension(json)
  , status = _getDatasetStatus(json)
  , { index } = _getDimensionCategory(dimension, geoTuple[0])
  , { index: timeIndex } = _getDimensionCategory(dimension, timeTuple[0])
  , sliceDiff = timeIndex[timeId];

  return isNumber(sliceDiff) ? _crGeoTupple(
      value,
      status,
      index,
      timeTuple[1],
      sliceDiff
  ) : [[], []];
};

const _getTimeSize = json => {
  const timeTuple = _getGeoTuples(json)[1];
  return timeTuple[1];
}

export const crGeoSeria = (
  json,
  geoId
) => {
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

  let fromIndex = 0;
  for(; fromIndex<data.length; fromIndex++){
    if (isNumber(data[fromIndex])) break;
  }
  let toIndex = data.length-1;
  for(; toIndex>-1; toIndex--){
    if (isNumber(data[toIndex])) break;
  }

  return {
    data: data.slice(fromIndex, toIndex+1),
    date: {
      id: getObjectKeys(timeIndex).slice(fromIndex, toIndex+1)
    }
  };
}
