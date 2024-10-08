"use strict";

exports.__esModule = true;
exports.crGeoSlice = exports.crGeoSeria = void 0;
var _AdapterFn = require("./AdapterFn");
var _JsonStatFn = require("./JsonStatFn");
const _getGeoTuples = json => {
  const [id, size] = (0, _JsonStatFn._getIdSizeTuple)(json);
  let _geoTuple = [],
    _timeTuple = [];
  for (let i = 0; i < size.length; i++) {
    if (size[i] !== 1) {
      if (id[i] !== "time") {
        _geoTuple = [id[i], size[i]];
      } else {
        _timeTuple = [id[i], size[i]];
      }
    }
  }
  return [_geoTuple, _timeTuple];
};
const _getMaybeUndefValue = value => value === void 0 ? null : value;
const _crGeoTupple = (value, status, geoIndex, _timeSize, _recentSliceDiff) => {
  const dGeo = [],
    sGeo = [];
  let valueIndex;
  (0, _AdapterFn.getObjectKeys)(geoIndex).forEach(id => {
    valueIndex = _timeSize * geoIndex[id] + _recentSliceDiff;
    dGeo.push(id);
    sGeo.push({
      value: _getMaybeUndefValue(value[valueIndex]),
      status: _getMaybeUndefValue(status[valueIndex])
    });
  });
  return [dGeo, sGeo];
};
const crGeoSlice = (json, timeId) => {
  const value = (0, _JsonStatFn._getDatasetValue)(json),
    [geoTuple, timeTuple] = _getGeoTuples(json),
    dimension = (0, _JsonStatFn._getDatasetDimension)(json),
    status = (0, _JsonStatFn._getDatasetStatus)(json),
    {
      index
    } = (0, _JsonStatFn._getDimensionCategory)(dimension, geoTuple[0]),
    {
      index: timeIndex
    } = (0, _JsonStatFn._getDimensionCategory)(dimension, timeTuple[0]),
    sliceDiff = timeIndex[timeId];
  return (0, _AdapterFn.isNumber)(sliceDiff) ? _crGeoTupple(value, status, index, timeTuple[1], sliceDiff) : [[], []];
};
exports.crGeoSlice = crGeoSlice;
const _getTimeSize = json => {
  const timeTuple = _getGeoTuples(json)[1];
  return timeTuple[1];
};
const crGeoSeria = (json, geoId) => {
  const value = (0, _JsonStatFn._getDatasetValue)(json),
    dimension = (0, _JsonStatFn._getDatasetDimension)(json),
    {
      index
    } = (0, _JsonStatFn._getDimensionCategory)(dimension, "geo"),
    geoNumberIndex = index[geoId],
    _timeSize = _getTimeSize(json),
    {
      index: timeIndex
    } = (0, _JsonStatFn._getDimensionCategory)(dimension, "time"),
    data = [];
  for (let i = _timeSize * geoNumberIndex; i < _timeSize * geoNumberIndex + _timeSize; i++) {
    data.push(value[i]);
  }
  let fromIndex = 0;
  for (; fromIndex < data.length; fromIndex++) {
    if ((0, _AdapterFn.isNumber)(data[fromIndex])) break;
  }
  let toIndex = data.length - 1;
  for (; toIndex > -1; toIndex--) {
    if ((0, _AdapterFn.isNumber)(data[toIndex])) break;
  }
  return {
    data: data.slice(fromIndex, toIndex + 1),
    date: {
      id: (0, _AdapterFn.getObjectKeys)(timeIndex).slice(fromIndex, toIndex + 1)
    }
  };
};
exports.crGeoSeria = crGeoSeria;
//# sourceMappingURL=JsonStatTwoDimensionFn.js.map