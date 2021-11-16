/**
 * @jest-environment jsdom
 */
//Highcharts dateFormat from AdapterFn require jsdom
"use strict";
import AdapterFn from '../AdapterFn'

import { Direction } from '../../constants/Type'

const {
  crError,
  crId,
  crItemLink,

  crVolumePoint,
  crAthPoint,

  legendItem,
  stockSeriesLegend,

  ymdToUTC,  
  isYNumber,
  isNumberOrNull,
  toFloatOrEmpty,
  findMinY,
  findMaxY,
  joinBy,
  valueMoving,
  crItemConf,
  crValueConf
} = AdapterFn;

describe('added fns', ()=>{
  it('should have next fns', ()=>{
    expect(typeof crError).toBe('function')
    expect(typeof crId).toBe('function')
    expect(typeof crItemLink).toBe('function')

    expect(typeof crVolumePoint).toBe('function')
    expect(typeof crAthPoint).toBe('function')

    expect(typeof legendItem).toBe('function')
    expect(typeof stockSeriesLegend).toBe('function')
  })
})

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

describe('toFloatOrEmpty', ()=>{
  const fn = toFloatOrEmpty
  it('should convert input to float or return empty str', ()=>{
    expect(fn('1.23')).toBe(1.23)
    expect(fn('')).toBe('')
    expect(fn('str')).toBe('')
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

describe('joinBy', () => {
  test('should join by delimeter', () => {
    expect(joinBy('.')).toBe('')
    expect(joinBy('.', 'a')).toBe('a')
    expect(joinBy('.', 'a', 'b')).toBe('a.b')
  })
  test('should filter falsy values', () => {
    expect(joinBy('.', '', 'b', 'c')).toBe('b.c')
    expect(joinBy('.', null, 'b', 'c')).toBe('b.c')
    expect(joinBy('.', void 0, 'b', 'c')).toBe('b.c')
  })
})

describe('valueMoving', ()=>{
  const fn = valueMoving
  it('should return echo data and direction empty for !arr input', ()=>{
    const direction = { direction: Direction.EMPTY }
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
      direction: Direction.UP,

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
      direction: Direction.EQUAL,

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
      direction: Direction.EQUAL,

      valueTo: '0',
      date: '',
      dateTo: ''
    })
  })
})

describe('crItemConf', ()=>{
  const fn = crItemConf
  it('should create obj with item conf', ()=>{
    expect(fn({
      title: 'title',
      subtitle: null,
      itemCaption: void 0
    })).toEqual({
      title: 'title'
    })
  })
})

describe('crValueConf', ()=>{
  const fn = crValueConf
  it('should return {x, y} recent point from data', ()=>{
    expect(fn([[3, 3], [1, 2]])).toEqual({ x: 1, y: 2 })
    expect(fn([{x:3, y:3}, {x:1, y:2}])).toEqual({ x: 1, y: 2 })
  })
  it('should use str 0.0 for y not number', ()=>{
    expect(fn([[3, 3], [1, null]])).toEqual({ x: 1, y: '0.0' })
    expect(fn([{x:3, y:3}, {x:1, y:NaN}])).toEqual({ x: 1, y: '0.0' })
  })
})
