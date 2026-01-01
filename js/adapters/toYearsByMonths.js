"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _pipe = _interopRequireDefault(require("../utils/pipe"));
var _configBuilderFn = require("../charts/configBuilderFn");
var _Tooltip = require("../charts/Tooltip");
var _styleFn = require("../components/styleFn");
var _mathFn = require("../math/mathFn");
var _AdapterFn = require("./AdapterFn");
const CATEGORIES = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const MIN_MAX_COLOR = '#008b8b',
  CONFIG_NOW = {
    index: 3,
    color: '#7cb5ec'
  },
  CONFIG_PREV = {
    index: 2,
    color: '#f45b5b'
  },
  _crConfigAvg = () => ({
    index: 4,
    color: (0, _styleFn.getColorBlack)(),
    isVisible: false
  });
const _getYear = str => str.split("-")[0];
const _getMonth = str => str.split("-")[1];
const _crSeria = (name, _ref) => {
  let {
    type = 'spline',
    data,
    color,
    isVisible = true
  } = _ref;
  return {
    type,
    name,
    data,
    color,
    visible: isVisible
  };
};
const _crPoint = item => ({
  c: _getMonth(item[0]),
  y: item[1],
  status: item[2]
});
const _crValuePoint = item => item[1];
const _crValueYearPoint = item => ({
  v: item[1],
  y: _getYear(item[0]),
  status: item[2]
});
const _findHighLow = arr => {
  let h = {
      v: Number.NEGATIVE_INFINITY,
      y: ''
    },
    l = {
      v: Number.POSITIVE_INFINITY,
      y: ''
    };
  arr.forEach(item => {
    if (item.v > h.v) {
      h = item;
    }
    if (item.v < l.v) {
      l = item;
    }
  });
  return {
    high: h.v,
    yHigh: h.y,
    yHs: h.status,
    low: l.v,
    yLow: l.y,
    yLs: l.status
  };
};
const _crHighLowPoint = (key, arr) => ({
  c: key,
  ..._findHighLow(arr)
});
const _calcAvg = arr => {
  const sum = arr.reduce((acc, a) => acc + a, 0);
  return arr.length !== 0 ? (0, _mathFn.roundBy)(sum / arr.length, 4) : 0;
};
const _crAvgPoint = (key, arr) => ({
  y: _calcAvg(arr),
  c: key
});
const _crSeriaData = function (data, i, year, crPoint) {
  if (crPoint === void 0) {
    crPoint = _crPoint;
  }
  const arr = [],
    max = data.length;
  for (; i < max; i++) {
    const item = data[i];
    if (_getYear(item[0]) !== year) {
      break;
    }
    arr.push(crPoint(item));
  }
  return {
    i,
    arr: arr.reverse()
  };
};
const _crNowPrevSeries = (data, seriaColor) => {
  const firtsItem = data[0][0],
    _yearNow = _getYear(firtsItem),
    {
      i,
      arr: _dNow
    } = _crSeriaData(data, 0, _yearNow),
    prevItem = data[i][0],
    _yearPrev = _getYear(prevItem),
    {
      arr: _dPrev
    } = _crSeriaData(data, i, _yearPrev);
  return [_crSeria(_yearNow, {
    color: seriaColor,
    ...CONFIG_NOW,
    ...{
      data: _dNow
    }
  }), _crSeria(_yearPrev, {
    ...CONFIG_PREV,
    ...{
      data: _dPrev
    }
  })];
};
const _hmToSeriaData = (hm, crPoint) => CATEGORIES.map(key => crPoint(key, hm[key]));
const _crBaseHm = () => CATEGORIES.reduce((hm, key) => {
  hm[key] = [];
  return hm;
}, Object.create(null));
const _crMonthHm = function (i, data, stopYear, crPoint) {
  if (crPoint === void 0) {
    crPoint = _crValuePoint;
  }
  const hm = _crBaseHm(),
    max = data.length;
  let isBreaked = false;
  for (; i < max; i++) {
    const _item = data[i],
      _y = _item[0];
    if (_y === stopYear) {
      isBreaked = true;
      break;
    }
    const _m = _getMonth(_item[0]);
    hm[_m].push(crPoint(_item));
  }
  return {
    hm,
    isBreaked
  };
};
const _crRangeSeries = data => {
  const refYear = parseFloat(_getYear(data[0][0])),
    stopYear = '' + (refYear - 5),
    {
      hm,
      isBreaked
    } = _crMonthHm(0, data, stopYear, _crValueYearPoint),
    max = data.length,
    _stopYear = isBreaked ? stopYear : _getYear(data[max - 1][0]),
    _range = `${_stopYear}:${refYear}`,
    _data = _hmToSeriaData(hm, _crHighLowPoint);
  const _minData = [],
    _maxData = [];
  _data.forEach(_ref2 => {
    let {
      c,
      high,
      yHigh,
      low,
      yLow
    } = _ref2;
    _minData.push({
      c,
      y: low,
      d: yLow
    });
    _maxData.push({
      c,
      y: high,
      d: yHigh
    });
  });
  return [(0, _configBuilderFn.crSplineSeriaConfig)({
    name: `Min ${_range}`,
    data: _minData,
    color: MIN_MAX_COLOR,
    seriaWidth: 2,
    tooltip: _Tooltip.tooltipCategorySimple
  }), _crSeria(`Max ${_range}`, {
    data: _maxData,
    color: MIN_MAX_COLOR
  })];
};
const _findStartYearIndex = (data, yearStop) => {
  const max = data.length;
  let i = 0;
  for (; i < max; i++) {
    if (_getYear(data[i][0]) !== yearStop) {
      break;
    }
  }
  return i;
};
const _crAvgSeria = data => {
  const yearNow = _getYear(data[0][0]),
    fromYear = parseFloat(yearNow) - 1,
    stopYear = '' + (parseFloat(yearNow) - 5),
    max = data.length,
    startIndex = _findStartYearIndex(data, yearNow),
    {
      hm,
      isBreaked
    } = _crMonthHm(startIndex, data, stopYear),
    _stopYear = isBreaked ? stopYear : _getYear(data[max - 1][0]),
    _data = _hmToSeriaData(hm, _crAvgPoint),
    name = `Avg ${_stopYear}:${fromYear}`;
  return _crSeria(name, {
    ..._crConfigAvg(),
    ...{
      data: _data
    }
  });
};
const _crZhConfig = option => {
  const {
      value,
      itemCaption,
      dataSource,
      linkFn,
      item,
      key
    } = option,
    _id = key || value + '_' + 'YEARLY';
  return {
    id: _id,
    key: _id,
    itemCaption,
    isWithoutIndicator: true,
    dataSource,
    linkFn,
    item
  };
};
const _crValueAndDate = (seria, index) => {
  const {
      data = [],
      name
    } = seria,
    {
      y: value,
      c
    } = data[index];
  return {
    value,
    date: `${c}-${name}`
  };
};
const _crValueMoving = (nowSeria, prevSeria) => {
  const {
      data = []
    } = nowSeria,
    max = data.length - 1,
    {
      value: bNowValue,
      date
    } = _crValueAndDate(nowSeria, max),
    {
      value: bPrevValue,
      date: dateTo
    } = _crValueAndDate(prevSeria, max),
    moving = (0, _AdapterFn.crValueMoving)({
      bNowValue,
      bPrevValue
    });
  return {
    ...moving,
    date,
    dateTo,
    valueTo: (0, _AdapterFn.numberFormat)(bPrevValue),
    isDenyToChange: true
  };
};
const _checkIfEnoughData = data => {
  const _len = data?.length;
  if (_len <= 12) {
    throw (0, _AdapterFn.crError)("Data Error", `Not enough data for chart (${_len})`);
  }
};
const crYearlyConfig = (data, option) => {
  _checkIfEnoughData(data);
  const {
      title,
      subtitle,
      seriaColor
    } = option,
    [nowSeria, prevSeria] = _crNowPrevSeries(data, seriaColor),
    [minSeria, maxSeria] = _crRangeSeries(data);
  return (0, _pipe.default)((0, _configBuilderFn.crCategoryConfig)(CATEGORIES, title, subtitle), (0, _configBuilderFn.fAddSeries)([minSeria, maxSeria, prevSeria, nowSeria, _crAvgSeria(data)]), (0, _configBuilderFn.fAddTooltip)(_Tooltip.tooltipCategorySimple), (0, _configBuilderFn.fAdd)({
    chart: {
      marginTop: 45,
      marginBottom: 38
    },
    zhConfig: _crZhConfig(option),
    valueMoving: _crValueMoving(nowSeria, prevSeria)
  }));
};
var _default = exports.default = crYearlyConfig;
//# sourceMappingURL=toYearsByMonths.js.map