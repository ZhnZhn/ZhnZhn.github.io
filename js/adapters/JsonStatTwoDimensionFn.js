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
const _crRecentGeoTupple = (value, status, geoIndex, timeTuple) => {
  const dGeo = [],
    sGeo = [],
    _timeSize = timeTuple[1],
    _recentSliceDiff = _timeSize - 1;
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
const _getRecentTimeLabel = (dimension, timeTuple) => {
  const {
    index: timeIndex
  } = (0, _JsonStatFn._getDimensionCategory)(dimension, timeTuple[0]);
  let _timeLabel = '',
    _timeIndex = -1;
  (0, _AdapterFn.getObjectKeys)(timeIndex).reverse().forEach(timeId => {
    if (timeIndex[timeId] > _timeIndex) {
      _timeLabel = timeId;
      _timeIndex = timeIndex[timeId];
    }
  });
  return _timeLabel;
};
const crGeoSlice = json => {
  const value = (0, _JsonStatFn._getDatasetValue)(json),
    [geoTuple, timeTuple] = _getGeoTuples(json),
    dimension = (0, _JsonStatFn._getDatasetDimension)(json),
    status = (0, _JsonStatFn._getDatasetStatus)(json),
    {
      index
    } = (0, _JsonStatFn._getDimensionCategory)(dimension, geoTuple[0]),
    [dGeo, sGeo] = _crRecentGeoTupple(value, status, index, timeTuple);
  return [{
    id: dGeo
  }, sGeo, _getRecentTimeLabel(dimension, timeTuple)];
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
  return {
    data,
    date: {
      id: (0, _AdapterFn.getObjectKeys)(timeIndex)
    }
  };
};
exports.crGeoSeria = crGeoSeria;
//# sourceMappingURL=JsonStatTwoDimensionFn.js.map