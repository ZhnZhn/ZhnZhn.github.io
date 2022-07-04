"use strict";

exports.__esModule = true;
exports.crPointName = exports.addColorsTo = void 0;

var _MonoColorFn = require("../charts/MonoColorFn");

var _AdapterFn = require("./AdapterFn");

const _findLevelBy = (data, from, sum, stopSum) => {
  const _maxIndex = data.length;

  if (from >= _maxIndex) {
    return [_maxIndex, sum];
  }

  let index = _maxIndex,
      i = from;

  for (; i < _maxIndex; i++) {
    sum += data[i].value;

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

const _findLevelIndex = (data, total, level1, level2) => {
  const _onePercent = total / 100,
        _v1 = _onePercent * level1,
        _v2 = _onePercent * level2,
        [index1, sum1] = _findLevelBy(data, 0, 0, _v1),
        [index2] = _findLevelBy(data, index1, sum1, _v2);

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
    } else if (pointIndex < levelIndex2) {
      deltaColor = (pointIndex - levelIndex1) * (_MonoColorFn.COLOR_PERIOD / _numberOfPoints2);
      point.color = (0, _MonoColorFn.crMonoColor)(_MonoColorFn.COLOR_BASE2, deltaColor);
    } else {
      deltaColor = (pointIndex - levelIndex2) * (_MonoColorFn.COLOR_PERIOD / _numberOfPoints3);
      point.color = (0, _MonoColorFn.crMonoColor)(_MonoColorFn.COLOR_BASE1, deltaColor);
    }
  });
};

const addColorsTo = function (data, total, level1, level2) {
  if (level1 === void 0) {
    level1 = 60;
  }

  if (level2 === void 0) {
    level2 = 90;
  }

  const [leveIndex1, levelIndex2] = _findLevelIndex(data, total, level1, level2);

  _addColor(data, leveIndex1, levelIndex2);
};

exports.addColorsTo = addColorsTo;
const NUMBER_STYLE = 'style="color:#333;"';

const crPointName = (label, value, percent) => label + " <br/>\n<span " + NUMBER_STYLE + ">" + (0, _AdapterFn.numberFormat)(value) + " (" + percent + "%)</span>";

exports.crPointName = crPointName;
//# sourceMappingURL=TreeMapFn.js.map