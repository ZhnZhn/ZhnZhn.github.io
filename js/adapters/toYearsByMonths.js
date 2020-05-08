"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ConfigBuilder = _interopRequireDefault(require("../charts/ConfigBuilder"));

var _Tooltip = _interopRequireDefault(require("../charts/Tooltip"));

var _AdapterFn = _interopRequireDefault(require("./AdapterFn"));

var CATEGORIES = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
var C = {
  NOW: {
    index: 3,
    color: 'yellow'
  },
  PREV: {
    index: 2,
    color: '#f45b5b'
  },
  AVG: {
    index: 1,
    color: 'black',
    isVisible: false
  },
  RANGE: {
    index: 0,
    color: '#7cb5ec'
  }
};
var crValueMoving = _AdapterFn["default"].crValueMoving,
    roundBy = _AdapterFn["default"].roundBy,
    numberFormat = _AdapterFn["default"].numberFormat;

var _getYear = function _getYear(str) {
  return str.split("-")[0];
};

var _getMonth = function _getMonth(str) {
  return str.split("-")[1];
};

var _crSeria = function _crSeria(name, _ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'spline' : _ref$type,
      data = _ref.data,
      color = _ref.color,
      _ref$isVisible = _ref.isVisible,
      isVisible = _ref$isVisible === void 0 ? true : _ref$isVisible;
  return {
    type: type,
    name: name,
    data: data,
    color: color,
    visible: isVisible
  };
};

var _crItem = function _crItem(name, _ref2) {
  var index = _ref2.index,
      color = _ref2.color,
      _ref2$isVisible = _ref2.isVisible,
      isVisible = _ref2$isVisible === void 0 ? true : _ref2$isVisible;
  return {
    name: name,
    index: index,
    color: color,
    isVisible: isVisible
  };
};

var _crPoint = function _crPoint(item) {
  return {
    c: _getMonth(item[0]),
    y: item[1]
  };
};

var _crValuePoint = function _crValuePoint(item) {
  return item[1];
};

var _crValueYearPoint = function _crValueYearPoint(item) {
  return {
    v: item[1],
    y: _getYear(item[0])
  };
};

var _findHighLow = function _findHighLow(arr) {
  var h = {
    v: Number.NEGATIVE_INFINITY,
    y: ''
  },
      l = {
    v: Number.POSITIVE_INFINITY,
    y: ''
  };
  arr.forEach(function (item) {
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
    low: l.v,
    yLow: l.y
  };
};

var _crHighLowPoint = function _crHighLowPoint(key, arr) {
  return (0, _extends2["default"])({
    c: key
  }, _findHighLow(arr));
};

var _calcAvg = function _calcAvg(arr) {
  var sum = arr.reduce(function (acc, a) {
    return acc + a;
  }, 0);
  return arr.length !== 0 ? roundBy(sum / arr.length, 4) : 0;
};

var _crAvgPoint = function _crAvgPoint(key, arr) {
  return {
    y: _calcAvg(arr),
    c: key
  };
};

var _crSeriaData = function _crSeriaData(data, i, year, crPoint) {
  if (crPoint === void 0) {
    crPoint = _crPoint;
  }

  var arr = [],
      max = data.length;

  for (; i < max; i++) {
    var item = data[i];

    if (_getYear(item[0]) !== year) {
      break;
    }

    arr.push(crPoint(item));
  }

  return {
    i: i,
    arr: arr.reverse()
  };
};

var _crSeries = function _crSeries(data) {
  var firtsItem = data[0][0],
      _yearNow = _getYear(firtsItem),
      _crSeriaData2 = _crSeriaData(data, 0, _yearNow),
      i = _crSeriaData2.i,
      _dNow = _crSeriaData2.arr,
      prevItem = data[i][0],
      _yearPrev = _getYear(prevItem),
      _crSeriaData3 = _crSeriaData(data, i, _yearPrev),
      _dPrev = _crSeriaData3.arr;

  return {
    nowSeria: _crSeria(_yearNow, (0, _extends2["default"])({}, C.NOW, {}, {
      data: _dNow
    })),
    nowItem: _crItem(_yearNow, C.NOW),
    prevSeria: _crSeria(_yearPrev, (0, _extends2["default"])({}, C.PREV, {}, {
      data: _dPrev
    })),
    prevItem: _crItem(_yearPrev, C.PREV)
  };
};

var _hmToSeriaData = function _hmToSeriaData(hm, crPoint) {
  var data = [];
  CATEGORIES.forEach(function (key) {
    data.push(crPoint(key, hm[key]));
  });
  return data;
};

var _crBaseHm = function _crBaseHm() {
  var hm = Object.create(null);
  CATEGORIES.forEach(function (key) {
    hm[key] = [];
  });
  return hm;
};

var _crMonthHm = function _crMonthHm(i, data, stopYear, crPoint) {
  if (crPoint === void 0) {
    crPoint = _crValuePoint;
  }

  var hm = _crBaseHm(),
      max = data.length;

  var isBreaked = false;

  for (; i < max; i++) {
    var _item = data[i],
        _y = _item[0];

    if (_y === stopYear) {
      isBreaked = true;
      break;
    }

    var _m = _getMonth(_item[0]); //hm[_m].push(_item[1])


    hm[_m].push(crPoint(_item));
  }

  return {
    hm: hm,
    isBreaked: isBreaked
  };
};

var _crRangeSeria = function _crRangeSeria(data) {
  var refYear = parseFloat(_getYear(data[0][0])),
      stopYear = '' + (refYear - 5),
      _crMonthHm2 = _crMonthHm(0, data, stopYear, _crValueYearPoint),
      hm = _crMonthHm2.hm,
      isBreaked = _crMonthHm2.isBreaked,
      max = data.length,
      _stopYear = isBreaked ? stopYear : _getYear(data[max - 1][0]),
      name = "Range " + refYear + ":" + _stopYear,
      _data = _hmToSeriaData(hm, _crHighLowPoint);

  return {
    rangeSeria: (0, _ConfigBuilder["default"])().areaRangeSeria(_Tooltip["default"].categoryRHLY, {
      data: _data,
      name: name,
      point: {}
    }).toSeria(),
    rangeItem: _crItem(name, C.RANGE)
  };
};

var _findStartYearIndex = function _findStartYearIndex(data, yearStop) {
  var max = data.length;
  var i = 0;

  for (; i < max; i++) {
    if (_getYear(data[i][0]) !== yearStop) {
      break;
    }
  }

  return i;
};

var _crAvgSeria = function _crAvgSeria(data) {
  var yearNow = _getYear(data[0][0]),
      fromYear = parseFloat(yearNow) - 1,
      stopYear = '' + (parseFloat(yearNow) - 5),
      max = data.length,
      startIndex = _findStartYearIndex(data, yearNow),
      _crMonthHm3 = _crMonthHm(startIndex, data, stopYear),
      hm = _crMonthHm3.hm,
      isBreaked = _crMonthHm3.isBreaked,
      _stopYear = isBreaked ? stopYear : _getYear(data[max - 1][0]),
      _data = _hmToSeriaData(hm, _crAvgPoint),
      name = "Avg " + fromYear + ":" + _stopYear;

  return {
    avgSeria: _crSeria(name, (0, _extends2["default"])({}, C.AVG, {}, {
      data: _data
    })),
    avgItem: _crItem(name, C.AVG)
  };
};

var _crZhConfig = function _crZhConfig(option, _ref3) {
  var legend = _ref3.legend;

  var value = option.value,
      itemCaption = option.itemCaption,
      dataSource = option.dataSource,
      linkFn = option.linkFn,
      item = option.item,
      _id = value + '_' + 'YEARLY';

  return {
    id: _id,
    key: _id,
    itemCaption: itemCaption,
    isWithoutIndicator: true,
    legend: legend,
    dataSource: dataSource,
    linkFn: linkFn,
    item: item
  };
};

var _crValueAndDate = function _crValueAndDate(seria, index) {
  var _seria$data = seria.data,
      data = _seria$data === void 0 ? [] : _seria$data,
      name = seria.name,
      _data$index = data[index],
      value = _data$index.y,
      c = _data$index.c;
  return {
    value: value,
    date: c + "-" + name
  };
};

var _crValueMoving = function _crValueMoving(nowSeria, prevSeria) {
  var _nowSeria$data = nowSeria.data,
      data = _nowSeria$data === void 0 ? [] : _nowSeria$data,
      max = data.length - 1,
      _crValueAndDate2 = _crValueAndDate(nowSeria, max),
      bNowValue = _crValueAndDate2.value,
      date = _crValueAndDate2.date,
      _crValueAndDate3 = _crValueAndDate(prevSeria, max),
      bPrevValue = _crValueAndDate3.value,
      dateTo = _crValueAndDate3.date,
      moving = crValueMoving({
    bNowValue: bNowValue,
    bPrevValue: bPrevValue
  });

  return (0, _extends2["default"])({}, moving, {
    date: date,
    dateTo: dateTo,
    valueTo: numberFormat(bPrevValue),
    isDenyToChange: true
  });
};

var _checkIfEnoughData = function _checkIfEnoughData(data) {
  var _len = data == null ? void 0 : data.length;

  if (_len <= 12) {
    throw {
      errCaption: "Data Error",
      message: "Not enough data for chart (" + _len + ")"
    };
  }
};

var toMonthly = {
  toConfig: function toConfig(data, option) {
    _checkIfEnoughData(data);

    var title = option.title,
        subtitle = option.subtitle,
        _crSeries2 = _crSeries(data),
        nowSeria = _crSeries2.nowSeria,
        nowItem = _crSeries2.nowItem,
        prevSeria = _crSeries2.prevSeria,
        prevItem = _crSeries2.prevItem,
        _crRangeSeria2 = _crRangeSeria(data),
        rangeSeria = _crRangeSeria2.rangeSeria,
        rangeItem = _crRangeSeria2.rangeItem,
        _crAvgSeria2 = _crAvgSeria(data),
        avgSeria = _crAvgSeria2.avgSeria,
        avgItem = _crAvgSeria2.avgItem,
        legend = [nowItem, prevItem, rangeItem, avgItem],
        config = (0, _ConfigBuilder["default"])().categoryConfig(CATEGORIES).addCaption(title, subtitle).addSeriaBy(0, rangeSeria).addSeriaBy(1, avgSeria).addSeriaBy(2, prevSeria).addSeriaBy(3, nowSeria).addTooltip(_Tooltip["default"].categorySimple).add({
      chart: {
        spacingTop: 25,
        marginTop: 45
      },
      zhConfig: _crZhConfig(option, {
        legend: legend
      }),
      valueMoving: _crValueMoving(nowSeria, prevSeria)
    }).toConfig();

    return config;
  }
};
var _default = toMonthly;
exports["default"] = _default;
//# sourceMappingURL=toYearsByMonths.js.map