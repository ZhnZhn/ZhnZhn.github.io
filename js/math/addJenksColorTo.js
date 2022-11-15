"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _jenks = _interopRequireDefault(require("./jenks"));

const DF_NUMBER_OF_INTERVALS = 6,
      DF_COLORS = ['#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b', '#74c476'];
const _isArr = Array.isArray;

const _getIntervalIndex = (intervals, v) => {
  const n = intervals.length - 1;

  if (v === intervals[n]) {
    return n - 1;
  }

  for (let i = 0; i < n; i++) {
    if (v >= intervals[i] && v < intervals[i + 1]) {
      return i;
    }
  }
}; // shape of data = [{y}]


const addJenksColorTo = function (data, colors, numberOfIntervals) {
  if (colors === void 0) {
    colors = DF_COLORS;
  }

  if (numberOfIntervals === void 0) {
    numberOfIntervals = DF_NUMBER_OF_INTERVALS;
  }

  if (!_isArr(data)) {
    return [];
  }

  const _dataLength = data.length,
        _numberOfIntervals = numberOfIntervals > _dataLength ? _dataLength : numberOfIntervals,
        _intervals = (0, _jenks.default)(data.map(p => p.y), _numberOfIntervals);

  if (_isArr(_intervals)) {
    data.forEach(p => {
      p.color = colors[_getIntervalIndex(_intervals, p.y)];
    });
  }

  return data;
};

var _default = addJenksColorTo;
exports.default = _default;
//# sourceMappingURL=addJenksColorTo.js.map