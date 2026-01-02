"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getCrPointName = exports.crPointName = exports.addPercentAndColorToData = exports.addColorsTo = void 0;
var _Color = require("../constants/Color");
var _isTypeFn = require("../utils/isTypeFn");
var _domFn = require("../utils/domFn");
var _formatNumber = _interopRequireDefault(require("../utils/formatNumber"));
var _mathFn = require("../math/mathFn");
var _compareByFn = require("./compareByFn");
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
    [index2, sum2] = _findLevelBy(data, index1, sum1, _v2, propName);
  return [index1, index2, (0, _mathFn.roundBy)(sum1 / _onePercent, 1), (0, _mathFn.roundBy)(sum2 / _onePercent, 1)];
};
const _setColorLevelTo = (point, colorLevel, level) => {
  point.color = colorLevel;
  point._level = level;
};
const _addColor = (data, levelIndex1, levelIndex2) => {
  data.forEach((point, pointIndex) => {
    _setColorLevelTo(point, ...(pointIndex < levelIndex1 ? [_Color.COLOR_CATEGORY_LEVEL1, 1] : pointIndex < levelIndex2 ? [_Color.COLOR_CATEGORY_LEVEL2, 2] : [_Color.COLOR_CATEGORY_LEVEL3, 3]));
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
  const [leveIndex1, levelIndex2, sumOfPercentLevel1, sumOfPercentLevel2] = _findLevelIndex(data, total, level1, level2, propName);
  _addColor(data, leveIndex1, levelIndex2);
  return [sumOfPercentLevel1, sumOfPercentLevel2];
};
exports.addColorsTo = addColorsTo;
const _crValuePercentToken = (percent, value) => `${(0, _formatNumber.default)(value)} (${percent}%)`,
  _crPercentToken = percent => percent >= 1 ? `${percent}%` : `.${('' + percent).split(".")[1]}%`,
  _fCrName = crToken => (label, percent, value) => (0, _domFn.domSanitize)(`${label}<br/><span class="${_CL.CL_TREE_MAP_PERCENT_BLACK}">${crToken(percent, value)}</span>`),
  _crValuePercentName = _fCrName(_crValuePercentToken),
  _crPercentName = _fCrName(_crPercentToken),
  _isPercentName = data => data.length > 8 && data[0].value > 1000;
const getCrPointName = data => _isPercentName(data) ? _crPercentName : _crValuePercentName;
exports.getCrPointName = getCrPointName;
const _crPointName = percent => (0, _isTypeFn.isNumber)(percent) ? `${percent}%` : "";
const crPointName = exports.crPointName = _fCrName(_crPointName);
const addPercentAndColorToData = (data, total) => {
  if (total !== 0) {
    const _onePercent = total / 100;
    data.forEach(item => {
      item.percent = (0, _mathFn.roundBy)(item.value / _onePercent);
      item.name = crPointName(item.label, item.percent > 1 ? item.percent : "");
    });
    (0, _compareByFn.sortDescByPnValue)(data);
    return addColorsTo({
      data,
      total
    });
  }
};
exports.addPercentAndColorToData = addPercentAndColorToData;
//# sourceMappingURL=TreeMapFn.js.map