/**
 * @jest-environment jsdom
 */
//Highcharts dateFormat from AdapterFn require jsdom   
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _Type = require("../../constants/Type");

var crError = _AdapterFn["default"].crError,
    crId = _AdapterFn["default"].crId,
    crItemLink = _AdapterFn["default"].crItemLink,
    crVolumePoint = _AdapterFn["default"].crVolumePoint,
    crAthPoint = _AdapterFn["default"].crAthPoint,
    legendItem = _AdapterFn["default"].legendItem,
    stockSeriesLegend = _AdapterFn["default"].stockSeriesLegend,
    ymdToUTC = _AdapterFn["default"].ymdToUTC,
    toUpperCaseFirst = _AdapterFn["default"].toUpperCaseFirst,
    isYNumber = _AdapterFn["default"].isYNumber,
    isNumberOrNull = _AdapterFn["default"].isNumberOrNull,
    toFloatOrEmpty = _AdapterFn["default"].toFloatOrEmpty,
    findMinY = _AdapterFn["default"].findMinY,
    findMaxY = _AdapterFn["default"].findMaxY,
    joinBy = _AdapterFn["default"].joinBy,
    valueMoving = _AdapterFn["default"].valueMoving,
    crItemConf = _AdapterFn["default"].crItemConf,
    crValueConf = _AdapterFn["default"].crValueConf;
describe('added fns', function () {
  it('should have next fns', function () {
    expect(typeof crError).toBe('function');
    expect(typeof crId).toBe('function');
    expect(typeof crItemLink).toBe('function');
    expect(typeof crVolumePoint).toBe('function');
    expect(typeof crAthPoint).toBe('function');
    expect(typeof legendItem).toBe('function');
    expect(typeof stockSeriesLegend).toBe('function');
  });
});
var Y = [{
  "in": '2017',
  r: 1514678400000,
  d: '31-12-2017'
}, {
  "in": '2016',
  r: 1483142400000,
  d: '31-12-2016'
}, {
  "in": '2015',
  r: 1451520000000,
  d: '31-12-2015'
}, {
  "in": '2000',
  r: 978220800000,
  d: '31-12-2000'
}]; //Date.UTC(y, m-1, d)

var YM = [{
  "in": '2017-12',
  r: 1514678400000,
  d: '31-12-2017'
}, {
  "in": '2017-11',
  r: 1512000000000,
  d: '30-11-2017'
}, {
  "in": '2017-10',
  r: 1509408000000,
  d: '31-10-2017'
}, {
  "in": '2017-9',
  r: 1506729600000,
  d: '30-09-2017'
}, {
  "in": '2017-09',
  r: 1506729600000,
  d: '30-09-2017'
}, {
  "in": '2017-8',
  r: 1504137600000,
  d: '31-08-2017'
}, {
  "in": '2017-08',
  r: 1504137600000,
  d: '31-08-2017'
}, {
  "in": '2017-1',
  r: 1485820800000,
  d: '31-01-2017'
}, {
  "in": '2017-01',
  r: 1485820800000,
  d: '31-01-2017'
}];
var YMD = [{
  "in": '2018-01-01',
  r: 1514764800000,
  d: '01-01-2018'
}, {
  "in": '2018-1-01',
  r: 1514764800000,
  d: '01-01-2018'
}, {
  "in": '2018-1-1',
  r: 1514764800000,
  d: '01-01-2018'
}, {
  "in": '2018-01-01',
  r: 1514764800000,
  d: '01-01-2018'
}];
describe('ymdToUTC', function () {
  var fn = ymdToUTC;
  test('should return UTC msc of 31, December of year from YYYY', function () {
    Y.forEach(function (d) {
      expect(fn(d["in"])).toBe(d.r);
    });
  });
  test('should return UTC msc of last day of month from YYYY-MM', function () {
    YM.forEach(function (d) {
      expect(fn(d["in"])).toBe(d.r);
    });
  });
  test('should return UTC msc of day (00:00:00 UTC) from YYYY-MM-DD', function () {
    YMD.forEach(function (d) {
      expect(fn(d["in"])).toBe(d.r);
    });
  });
});
describe('toUpperCaseFirst', function () {
  var fn = toUpperCaseFirst;
  var EMPTY = '';
  test('should return string with first upper case letter for string or String input', function () {
    expect(fn('abc')).toBe('Abc');
    expect(fn('aBc')).toBe('ABc');
    expect(fn('aBC')).toBe('ABC');
  });
  test('should retunr empty string for instance of String', function () {
    expect(fn(new String('abc'))).toBe('');
    expect(fn(new String('aBc'))).toBe('');
    expect(fn(new String('aBC'))).toBe('');
  });
  test('should return empty string in edge case', function () {
    expect(fn('')).toBe(EMPTY);
    expect(fn(undefined)).toBe(EMPTY);
    expect(fn(null)).toBe(EMPTY);
    expect(fn({})).toBe(EMPTY);
    expect(fn([])).toBe(EMPTY);
    expect(fn({
      str: 'abc'
    })).toBe(EMPTY);
    expect(fn(function () {})).toBe(EMPTY);
    expect(fn(/\s/)).toBe(EMPTY);
    expect(fn(Date.now())).toBe(EMPTY);
  });
});
describe('isYNumber', function () {
  var fn = isYNumber;
  test('should return true for object with property y number', function () {
    expect(fn({
      y: 10
    })).toBe(true);
    expect(fn({
      y: 1
    })).toBe(true);
    expect(fn({
      y: 0
    })).toBe(true);
    expect(fn({
      y: -1
    })).toBe(true);
  });
  test('should return false for object with property y not number', function () {
    expect(fn({
      y: null
    })).toBe(false);
    expect(fn({
      y: NaN
    })).toBe(false);
    expect(fn({
      y: 'str'
    })).toBe(false);
    expect(fn({
      y: undefined
    })).toBe(false);
    expect(fn({
      y: true
    })).toBe(false);
    expect(fn({
      y: false
    })).toBe(false);
    expect(fn({
      y: Number.POSITIVE_INFINITY
    })).toBe(false);
    expect(fn({
      y: Number.NEGATIVE_INFINITY
    })).toBe(false);
    expect(fn({
      y: []
    })).toBe(false);
    expect(fn({
      y: {}
    })).toBe(false);
    expect(fn({
      y: function y() {}
    })).toBe(false);
  });
});
describe('isNumberOrNull', function () {
  var fn = isNumberOrNull;
  it('should return true for number and null or false', function () {
    expect(fn(123)).toBe(true);
    expect(fn(12.3)).toBe(true);
    expect(fn(1.23)).toBe(true);
    expect(fn(null)).toBe(true);
    expect(fn('123')).toBe(false);
    expect(fn()).toBe(false);
    expect(fn(NaN)).toBe(false);
  });
});
describe('toFloatOrEmpty', function () {
  var fn = toFloatOrEmpty;
  it('should convert input to float or return empty str', function () {
    expect(fn('1.23')).toBe(1.23);
    expect(fn('')).toBe('');
    expect(fn('str')).toBe('');
  });
});
var DATA_ARR = [[0, 0.3], [0, 0.31], [0, 0.29]];
var DATA_POINT = [{
  x: 0,
  y: 0.3
}, {
  x: 0,
  y: 0.31
}, {
  x: 0,
  y: 0.29
}];
describe('findMinY', function () {
  var fn = findMinY;
  test('should return minY for points arrays', function () {
    expect(fn(DATA_ARR)).toBe(0.29);
  });
  test('should return minY for points object', function () {
    expect(fn(DATA_POINT)).toBe(0.29);
  });
  test('should return undefined in edge case', function () {
    expect(fn()).toBe(undefined);
    expect(fn([])).toBe(undefined);
    expect(fn([[0]])).toBe(undefined);
    expect(fn([{
      x: 0
    }])).toBe(undefined);
  });
});
describe('findMaxY', function () {
  var fn = findMaxY;
  test('should return maxY for points arrays', function () {
    expect(fn(DATA_ARR)).toBe(0.31);
  });
  test('should return maxY for points object', function () {
    expect(fn(DATA_POINT)).toBe(0.31);
  });
  test('should return undefined in edge case', function () {
    expect(fn()).toBe(undefined);
    expect(fn([])).toBe(undefined);
    expect(fn([[0]])).toBe(undefined);
    expect(fn([{
      x: 0
    }])).toBe(undefined);
  });
});
describe('joinBy', function () {
  test('should join by delimeter', function () {
    expect(joinBy('.')).toBe('');
    expect(joinBy('.', 'a')).toBe('a');
    expect(joinBy('.', 'a', 'b')).toBe('a.b');
  });
  test('should filter falsy values', function () {
    expect(joinBy('.', '', 'b', 'c')).toBe('b.c');
    expect(joinBy('.', null, 'b', 'c')).toBe('b.c');
    expect(joinBy('.', void 0, 'b', 'c')).toBe('b.c');
  });
});
describe('valueMoving', function () {
  var fn = valueMoving;
  it('should return echo data and direction empty for !arr input', function () {
    var direction = {
      direction: _Type.Direction.EMPTY
    };
    expect(fn('')).toEqual((0, _extends2["default"])({
      date: ''
    }, direction));
    expect(fn(null)).toEqual((0, _extends2["default"])({
      date: null
    }, direction));
    expect(fn()).toEqual((0, _extends2["default"])({
      date: void 0
    }, direction));
    expect(fn({})).toEqual((0, _extends2["default"])({
      date: {}
    }, direction));
    expect(fn('str')).toEqual((0, _extends2["default"])({
      date: 'str'
    }, direction));
  });
  it('should return valueMoving obj for arr input', function () {
    expect(fn([[Date.UTC(2018, 11, 31), 10000], [Date.UTC(2019, 11, 31), 20000]])).toEqual({
      value: '20 000',
      _value: '20000',
      delta: '10 000',
      _deltaAbs: '10000',
      percent: '100.00%',
      _percentAbs: '100.00',
      direction: _Type.Direction.UP,
      valueTo: '10 000',
      date: '31-12-2019',
      dateTo: '31-12-2018'
    });
  });
  it('should return valueMoving obj for arr input with 1 point', function () {
    expect(fn([[Date.UTC(2019, 11, 31), 20000]])).toEqual({
      value: '20 000',
      _value: '20000',
      delta: '0',
      _deltaAbs: '0',
      percent: '0.00%',
      _percentAbs: '0.00',
      direction: _Type.Direction.EQUAL,
      valueTo: '20 000',
      date: '31-12-2019',
      dateTo: '31-12-2019'
    });
  });
  it('should return valueMoving obj for empty arr', function () {
    expect(fn([])).toEqual({
      value: '0',
      _value: '0',
      delta: '0',
      _deltaAbs: '0',
      percent: '0.00%',
      _percentAbs: '0.00',
      direction: _Type.Direction.EQUAL,
      valueTo: '0',
      date: '',
      dateTo: ''
    });
  });
});
describe('crItemConf', function () {
  var fn = crItemConf;
  it('should create obj with item conf', function () {
    expect(fn({
      title: 'title',
      subtitle: null,
      itemCaption: void 0
    })).toEqual({
      title: 'title'
    });
  });
});
describe('crValueConf', function () {
  var fn = crValueConf;
  it('should return {x, y} recent point from data', function () {
    expect(fn([[3, 3], [1, 2]])).toEqual({
      x: 1,
      y: 2
    });
    expect(fn([{
      x: 3,
      y: 3
    }, {
      x: 1,
      y: 2
    }])).toEqual({
      x: 1,
      y: 2
    });
  });
  it('should use str 0.0 for y not number', function () {
    expect(fn([[3, 3], [1, null]])).toEqual({
      x: 1,
      y: '0.0'
    });
    expect(fn([{
      x: 3,
      y: 3
    }, {
      x: 1,
      y: NaN
    }])).toEqual({
      x: 1,
      y: '0.0'
    });
  });
});
//# sourceMappingURL=AdapterFn.test.js.map