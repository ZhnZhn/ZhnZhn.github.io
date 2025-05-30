/**
 * @jest-environment jsdom
 */
//Highcharts dateFormat from AdapterFn require jsdom
"use strict";
import {
  ymdToUTC,
  isNumber,
  isYNumber,
  isNumberOrNull,
  crShortItemCaption,
  setItemCaptionCurrencyRateTo,
  findMinY,
  findMaxY,
  valueMoving,
  crError,
  fCrValue,
  toTimeDate,
  getValues,
  safeReplaceIn
} from '../AdapterFn';
import {
  DT_EMPTY,
  DT_UP,
  DT_EQUAL
} from '../../constants/DirectionType';

const Y = [
  { in: '2017', r: 1514678400000, d: '31-12-2017' },
  { in: '2016', r: 1483142400000, d: '31-12-2016' },
  { in: '2015', r: 1451520000000, d: '31-12-2015' },
  { in: '2000', r: 978220800000, d: '31-12-2000' },
]

//Date.UTC(y, m-1, d)
const YM = [
  { in: '2017-12', r: 1514678400000, d: '31-12-2017' },
  { in: '2017-11', r: 1512000000000, d: '30-11-2017' },
  { in: '2017-10', r: 1509408000000, d: '31-10-2017' },

  { in: '2017-9', r: 1506729600000, d: '30-09-2017' },
  { in: '2017-09', r: 1506729600000, d: '30-09-2017' },
  { in: '2017-8', r: 1504137600000, d: '31-08-2017' },
  { in: '2017-08', r: 1504137600000, d: '31-08-2017' },

  { in: '2017-1', r: 1485820800000, d: '31-01-2017' },
  { in: '2017-01', r: 1485820800000, d: '31-01-2017' },
];

const YMD = [
  { in: '2018-01-01', r: 1514764800000, d: '01-01-2018' },
  { in: '2018-1-01', r: 1514764800000, d: '01-01-2018' },
  { in: '2018-1-1', r: 1514764800000, d: '01-01-2018' },
  { in: '2018-01-01', r: 1514764800000, d: '01-01-2018' },
]

describe('ymdToUTC', () => {
  const fn = ymdToUTC;
  test('should return UTC msc of 31, December of year from YYYY', () => {
    Y.forEach(d => {
      expect(fn(d.in)).toBe(d.r)
    })
  })

  test('should return UTC msc of last day of month from YYYY-MM', () => {
    YM.forEach(d => {
      expect(fn(d.in)).toBe(d.r)
    })
  })

  test('should return UTC msc of day (00:00:00 UTC) from YYYY-MM-DD', () => {
    YMD.forEach(d => {
      expect(fn(d.in)).toBe(d.r)
    })
  })

});

describe('isNumber', () => {
  const fn = isNumber;
  test('should return true for number value', () => {
    expect(fn(0)).toBe(true)
    expect(fn(1)).toBe(true)
    expect(fn(0.123456789)).toBe(true)

    expect(fn(NaN)).toBe(false)
    expect(fn(new Number(1))).toBe(false)
    expect(fn('')).toBe(false)
    expect(fn()).toBe(false)
    expect(fn(null)).toBe(false)
    expect(fn({})).toBe(false)
    expect(fn([])).toBe(false)
  })
})

describe('isYNumber', () => {
  const fn = isYNumber
  test('should return true for object with property y number', () => {
    expect(fn({y: 10})).toBe(true)
    expect(fn({y: 1})).toBe(true)
    expect(fn({y: 0})).toBe(true)
    expect(fn({y: -1})).toBe(true)
  })
  test('should return false for object with property y not number', ()=>{
    expect(fn({y: null})).toBe(false)
    expect(fn({y: NaN})).toBe(false)
    expect(fn({y: 'str'})).toBe(false)
    expect(fn({y: undefined})).toBe(false)
    expect(fn({y: true})).toBe(false)
    expect(fn({y: false})).toBe(false)
    expect(fn({y: Number.POSITIVE_INFINITY})).toBe(false)
    expect(fn({y: Number.NEGATIVE_INFINITY})).toBe(false)
    expect(fn({y: []})).toBe(false)
    expect(fn({y: {}})).toBe(false)
    expect(fn({y: ()=>{} })).toBe(false)
  })
})

describe('isNumberOrNull', ()=>{
  const fn = isNumberOrNull
  it('should return true for number and null or false', ()=>{
    expect(fn(123)).toBe(true)
    expect(fn(12.3)).toBe(true)
    expect(fn(1.23)).toBe(true)
    expect(fn(null)).toBe(true)

    expect(fn('123')).toBe(false)
    expect(fn()).toBe(false)
    expect(fn(NaN)).toBe(false)
  })
})

describe('crShortItemCaption', () => {
  const fn = crShortItemCaption;
  test("should create short item caption", () => {
    expect(fn("Some name (ABC)")).toBe("ABC")
  })
  test("should return empty string in edge cases", ()=>{
    expect(fn()).toBe("")
    expect(fn(null)).toBe("")
    expect(fn({})).toBe("")
    expect(fn(NaN)).toBe("")
  })
})

describe("setItemCaptionCurrencyRateTo", ()=>{
  const fn = setItemCaptionCurrencyRateTo;
  test("should create str currency rate", ()=>{
    const option = {
      items: [{c: "European euro (EUR)"}]
    };
    fn(option, "USD")
    expect(option.itemCaption).toBe("EUR/USD")
  })
})

const DATA_ARR = [ [0, 0.3], [0, 0.31], [0, 0.29] ];
const DATA_POINT = [ {x:0, y: 0.3},{x:0, y: 0.31},{x:0, y: 0.29} ];

describe('findMinY', ()=>{
  const fn = findMinY;
  test('should return minY for points arrays', ()=>{
     expect(fn(DATA_ARR)).toBe(0.29)
  })
  test('should return minY for points object', ()=>{
    expect(fn(DATA_POINT)).toBe(0.29)
  })
  test('should return undefined in edge case', ()=>{
    expect(fn()).toBe(undefined)
    expect(fn([])).toBe(undefined)
    expect(fn([[0]])).toBe(undefined)
    expect(fn([{x:0}])).toBe(undefined)
  })
})

describe('findMaxY', ()=>{
  const fn = findMaxY;
  test('should return maxY for points arrays', ()=>{
     expect(fn(DATA_ARR)).toBe(0.31)
  })
  test('should return maxY for points object', ()=>{
    expect(fn(DATA_POINT)).toBe(0.31)
  })
  test('should return undefined in edge case', ()=>{
    expect(fn()).toBe(undefined)
    expect(fn([])).toBe(undefined)
    expect(fn([[0]])).toBe(undefined)
    expect(fn([{x:0}])).toBe(undefined)
  })
})

describe('valueMoving', ()=>{
  const fn = valueMoving
  it('should return echo data and direction empty for !arr input', ()=>{
    const direction = { direction: DT_EMPTY }
    expect(fn('')).toEqual({ date: '', ...direction })
    expect(fn(null)).toEqual({ date: null, ...direction })
    expect(fn()).toEqual({ date: void 0, ...direction })
    expect(fn({})).toEqual({ date: {}, ...direction })
    expect(fn('str')).toEqual({ date: 'str', ...direction })
  })
  it('should return valueMoving obj for arr input', ()=>{
    expect(fn([
      [Date.UTC(2018, 11, 31), 10000], [Date.UTC(2019, 11, 31), 20000]
    ])).toEqual({
      value: '20 000',
      _value: '20000',
      delta: '10 000',
      _deltaAbs: '10000',
      percent: '100.00%',
      _percentAbs: '100.00',
      direction: DT_UP,

      valueTo: '10 000',
      date: '31-12-2019',
      dateTo: '31-12-2018'
    })
  })
  it('should return valueMoving obj for arr input with 1 point', ()=>{
    expect(fn([
      [Date.UTC(2019, 11, 31), 20000]
    ])).toEqual({
      value: '20 000',
      _value: '20000',
      delta: '0',
      _deltaAbs: '0',
      percent: '0.00%',
      _percentAbs: '0.00',
      direction: DT_EQUAL,

      valueTo: '20 000',
      date: '31-12-2019',
      dateTo: '31-12-2019'
    })
  })
  it('should return valueMoving obj for empty arr', ()=>{
    expect(fn([])).toEqual({
      value: '0',
      _value: '0',
      delta: '0',
      _deltaAbs: '0',
      percent: '0.00%',
      _percentAbs: '0.00',
      direction: DT_EQUAL,

      valueTo: '0',
      date: '',
      dateTo: ''
    })
  })
})

describe('crError', ()=>{
  const fn = crError
  it('should create err obj', ()=>{
    expect(fn('caption', 'msg')).toEqual({
      errCaption: 'caption',
      message: 'msg'
    })
  })
  it('should replace void 0 values by default values', ()=>{
    expect(fn()).toEqual({
      errCaption: '',
      message: 'No data available for request.'
    })
  })
})

describe('fCrValue', ()=>{
  const fn = fCrValue;
  it('should return function that create value depend on option property _rt', () => {
    const _crEchoValue = fn({});
    expect(typeof _crEchoValue).toBe("function")
    expect(_crEchoValue(1.554)).toBe(1.554)
    expect(_crEchoValue(1.555)).toBe(1.555)

    const _crRoundByValue = fn({_rt: 2});
    expect(typeof _crRoundByValue).toBe("function")
    expect(_crRoundByValue(1.554, 2)).toBe(1.55)
    expect(_crRoundByValue(1.555, 2)).toBe(1.56)

    const _crEchoValue2 = fn({_rt: "2"});
    expect(typeof _crEchoValue2).toBe("function")
    expect(_crEchoValue2(1.554)).toBe(1.554)
    expect(_crEchoValue2(1.555)).toBe(1.555)
  })
})

describe("toTimeDate", ()=>{
  const fn = toTimeDate;
  test("should return str in format time DD-MM-YYYY from strDate", ()=>{
    expect(fn("2024-12-16T18:31:00.851Z")).toBe("18:31:00 16-12-2024")
    expect(fn("2014-05-22T00:00:00.000Z")).toBe("00:00:00 22-05-2014")
    expect(fn("2021-09-02T06:00:10.474Z")).toBe("06:00:10 02-09-2021")
  })
  test("should return empty string in edge cases", ()=>{
    expect(fn()).toBe("")
    expect(fn(null)).toBe("")

    expect(fn("")).toBe("")

    expect(fn(0)).toBe("")
    expect(fn(true)).toBe("")
  })
})

describe("getValues", ()=>{
  const fn = getValues;
  test("should return option items values", ()=>{
    expect(fn({
      items: [{v: "someValue"}]
    })).toEqual(["someValue"])

    expect(fn({
      items: [{v: "someValue1"},{v: "someValue2"}]
    })).toEqual(["someValue1", "someValue2"])
  })
})

describe("safeReplaceIn", ()=>{
  const fn = safeReplaceIn
  test("should replace in str from-token to to-token", ()=>{
    expect(fn("a b a", "a", "1")).toBe("1 b a")
    expect(fn("a b a", "b", "2")).toBe("a 2 a")
    expect(fn("a b a", "d", "2")).toBe("a b a")
  })
  test("should return empty str in edge cases", ()=>{
    expect(fn(null, "a", "b")).toBe("")
    expect(fn(void 0, "a", "b")).toBe("")
    expect(fn(true, "a", "b")).toBe("")
    expect(fn(1, "a", "b")).toBe("")
    expect(fn({}, "a", "b")).toBe("")
  })
})
