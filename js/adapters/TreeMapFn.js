"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getCrPointName = exports.crPointName = exports.addPercentAndColorToData = exports.addColorsTo = void 0;
var _formatNumber = _interopRequireDefault(require("../utils/formatNumber"));
var _domSanitize = _interopRequireDefault(require("../utils/domSanitize"));
var _AdapterFn = require("./AdapterFn");
var _compareByFn = require("./compareByFn");
var _MonoColorFn = require("../charts/MonoColorFn");
var _CL = require("./CL");
const _findLevelBy = (data, from, sum, stopSum, propName) => {
  const _maxIndex = data.length;
  if (from >= _maxIndex) {
    return [_maxIndex, sum];
  }
  let index = _maxIndex,
    i = from;
  for (; i < _maxIndex; i++) {
    sum += data[i][propName];
    if (sum >= stopSum) {
      index = i;
      break;
    }
  }
  if (index < _maxIndex) {
    index += 1;
  }
  return [index, sum];
};
const _findLevelIndex = (data, total, level1, level2, propName) => {
  const _onePercent = total / 100,
    _v1 = _onePercent * level1,
    _v2 = _onePercent * level2,
    [index1, sum1] = _findLevelBy(data, 0, 0, _v1, propName),
    [index2] = _findLevelBy(data, index1, sum1, _v2, propName);
  return [index1, index2];
};
const _addColor = (data, levelIndex1, levelIndex2) => {
  const _numberOfPoints2 = levelIndex2 - levelIndex1,
    _numberOfPoints3 = data.length - levelIndex2;
  let deltaColor;
  data.forEach((point, pointIndex) => {
    if (pointIndex < levelIndex1) {
      deltaColor = pointIndex * (_MonoColorFn.COLOR_PERIOD / levelIndex1);
      point.color = (0, _MonoColorFn.crMonoColor)(_MonoColorFn.COLOR_BASE1, deltaColor);
      point._level = 1;
    } else if (pointIndex < levelIndex2) {
      deltaColor = (pointIndex - levelIndex1) * (_MonoColorFn.COLOR_PERIOD / _numberOfPoints2);
      point.color = (0, _MonoColorFn.crMonoColor)(_MonoColorFn.COLOR_BASE2, deltaColor);
      point._level = 2;
    } else {
      deltaColor = (pointIndex - levelIndex2) * (_MonoColorFn.COLOR_PERIOD / _numberOfPoints3);
      point.color = (0, _MonoColorFn.crMonoColor)(_MonoColorFn.COLOR_BASE3, deltaColor);
      point._level = 3;
    }
  });
};
const addColorsTo = _ref => {
  let {
    data,
    total,
    propName = "value",
    level1 = 60,
    level2 = 90
  } = _ref;
  const [leveIndex1, levelIndex2] = _findLevelIndex(data, total, level1, level2, propName);
  _addColor(data, leveIndex1, levelIndex2);
};
exports.addColorsTo = addColorsTo;
const _crValuePercentToken = (percent, value) => `${(0, _formatNumber.default)(value)} (${percent}%)`,
  _crPercentToken = percent => percent >= 1 ? `${percent}%` : `.${('' + percent).split(".")[1]}%`,
  _fCrName = crToken => (label, percent, value) => (0, _domSanitize.default)(`${label}<br/><span class="${_CL.CL_TREE_MAP_PERCENT_BLACK}">${crToken(percent, value)}</span>`),
  _crValuePercentName = _fCrName(_crValuePercentToken),
  _crPercentName = _fCrName(_crPercentToken),
  _isPercentName = data => data.length > 8 && data[0].value > 1000;
const getCrPointName = data => _isPercentName(data) ? _crPercentName : _crValuePercentName;
exports.getCrPointName = getCrPointName;
const _crPointName = percent => (0, _AdapterFn.isNumber)(percent) ? `${percent}%` : "";
const crPointName = exports.crPointName = _fCrName(_crPointName);
const addPercentAndColorToData = (data, total) => {
  if (total !== 0) {
    const _onePercent = total / 100;
    data.forEach(item => {
      item.percent = (0, _AdapterFn.roundBy)(item.value / _onePercent);
      item.name = crPointName(item.label, item.percent > 1 ? item.percent : "");
    });
    (0, _compareByFn.sortDescByPnValue)(data);
    addColorsTo({
      data,
      total
    });
  }
};
exports.addPercentAndColorToData = addPercentAndColorToData;
//# sourceMappingURL=TreeMapFn.js.map