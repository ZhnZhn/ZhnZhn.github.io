/**
 * @jest-environment jsdom
 */
//Highcharts dateFormat from AdapterFn require jsdom
"use strict";
import {
  toWmdy,
  toTdmyIf,
  toDmy,
  toTdSafe
} from '../dateFormatFn';

const UTC_MLS_1970_01_01 = 0
, UTC_MLS_2010_12_31 = 1293753600000
, UTC_MLS_2018_01_01 = 1514764800000
, UTC_MLS_2018_01_10 = 1515542400000
, UTC_MLS_2018_10_01 = 1538352000000
, ONE_MINUTE_MLS = 1000*60

describe('toWmdy', () => {
  const fn = toWmdy;
  test('should return string of day of week, month day, year from mls number', ()=>{
    expect(fn(UTC_MLS_2010_12_31)).toBe('Friday, Dec 31, 2010')
    expect(fn(UTC_MLS_2018_01_01)).toBe('Monday, Jan 01, 2018')
    expect(fn(UTC_MLS_2018_01_10)).toBe('Wednesday, Jan 10, 2018')
    expect(fn(UTC_MLS_2018_10_01)).toBe('Monday, Oct 01, 2018')
  })
})

describe('toTdmyIf',()=>{
  const fn = toTdmyIf;
  test('should return toWmdy string for day mls number', ()=>{
    expect(fn(UTC_MLS_2010_12_31)).toBe('Friday, Dec 31, 2010')
    expect(fn(UTC_MLS_2018_01_01)).toBe('Monday, Jan 01, 2018')
    expect(fn(UTC_MLS_2018_01_10)).toBe('Wednesday, Jan 10, 2018')
    expect(fn(UTC_MLS_2018_10_01)).toBe('Monday, Oct 01, 2018')
  })
  test('should return time date string in other cases', ()=>{
    expect(fn(UTC_MLS_2010_12_31 + ONE_MINUTE_MLS)).toBe('00:01, Friday, Dec 31, 2010')
    expect(fn(UTC_MLS_2018_01_01 + 2*ONE_MINUTE_MLS)).toBe('00:02, Monday, Jan 01, 2018')
    expect(fn(UTC_MLS_2018_01_10 + 3*ONE_MINUTE_MLS)).toBe('00:03, Wednesday, Jan 10, 2018')
    expect(fn(UTC_MLS_2018_10_01 + 4*ONE_MINUTE_MLS)).toBe('00:04, Monday, Oct 01, 2018')
  })
})

describe('toDmy', ()=>{
  const fn = toDmy;
  test('should return string DD-MM-YYYY from number mls', ()=>{
    expect(fn(UTC_MLS_1970_01_01)).toBe('01-01-1970')
    expect(fn(UTC_MLS_2010_12_31)).toBe('31-12-2010')
    expect(fn(UTC_MLS_2018_01_01)).toBe('01-01-2018')
    expect(fn(UTC_MLS_2018_01_10)).toBe('10-01-2018')
    expect(fn(UTC_MLS_2018_10_01)).toBe('01-10-2018')
  })
})

describe('toTdSafe',()=>{
  const fn = toTdSafe;
  test('should return string of time date from mls number', ()=>{
    expect(fn(UTC_MLS_2010_12_31)).toBe('00:00:00 31-12-2010')
    expect(fn(UTC_MLS_2018_10_01)).toBe('00:00:00 01-10-2018')
  })
  test('should return empty string n edge cases', ()=>{
    expect(fn()).toBe('')
    expect(fn(null)).toBe('')
    expect(fn('str')).toBe('')
    expect(fn(NaN)).toBe('')
    expect(fn(true)).toBe('')
    expect(fn({})).toBe('')
  })
})
