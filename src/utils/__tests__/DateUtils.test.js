import DateUtils from '../DateUtils'

import DateUtilsWithMock from './DateUtilsWithMock'

const {
  isYmd,
  isYmdOrEmpty,
  isDmyPeriod,
  dmyToUTC,
  ymdToUTC,
  ymdhmsToUTC,
  mlsToDmy,
  isDmy,
  getUTCTime,
  addToDmy,
  getYTDfromDmy,
  monthIndex,
  getYmdhmUTC
} = DateUtils;

// DateUtils configuration consts
const MIN_YEAR = 1990;

const _compose = fns => fns.reduce((f, g) => (...args) => f(g(...args)));

describe('isYmd YYYY-MM-DD', () => {
  const fn = isYmd;

  test('should return true for valid YYYY-MM-DD', ()=> {
    expect(fn("2010-01-10")).toBe(true)
    expect(fn("2010-10-01")).toBe(true)
  })
  test('should return false for not valid YYYY-MM-DD', ()=> {
    expect(fn("2010-14-01")).toBe(false)
    expect(fn("2010-02-32")).toBe(false)
  })
  test(`min default valid value is ${MIN_YEAR}-01-01`, () => {
    expect(fn(`${MIN_YEAR}-01-01`)).toBe(true)
    expect(fn('1989-12-30')).toBe(false)
  })
  test('min default valid can be configured', () => {
    expect(fn('1989-12-30', 0, 1989)).toBe(true)
  })
  test('should year be not future', () => {
    expect(fn('2030-01-01')).toBe(false)

    expect(fn('2030-01-01', 1)).toBe(false)
    expect(fn('2030-01-01', 2)).toBe(false)
    expect(fn('2030-01-01', 3)).toBe(false)
    expect(fn('2030-01-01', 20)).toBe(true)
  })
  test('should return false in edge case', () => {
     expect(fn('')).toBe(false)
     expect(fn([])).toBe(false)
     expect(fn(null)).toBe(false)
     expect(fn(undefined)).toBe(false)
  })
})

describe('isYmdOrEmty YYYY-MM-DD', () => {
  const fn = isYmdOrEmpty
   test('should return is valid date or empty', () => {
     expect(fn('')).toBe(true)
     expect(fn("2010-01-10")).toBe(true)
     expect(fn("2010-10-01")).toBe(true)

     expect(fn(null)).toBe(false)
     expect(fn({})).toBe(false)
     expect(fn([])).toBe(false)
     expect(fn(()=>{})).toBe(false)
     expect(fn("2010-20-20")).toBe(false)
     expect(fn("2010-40-40")).toBe(false)
   })
})

describe('isDmyPeriod', ()=>{
  const fn = isDmyPeriod;
  test('should return correct boolean', ()=>{
    expect(fn('01-01-2010', '02-01-2010')).toBe(true)
    expect(fn('01-01-2010', '01-01-2010')).toBe(true)
    expect(fn('02-01-2010', '01-01-2010')).toBe(false)
  })
})

describe('dmyToUTC', ()=>{
  const fn = dmyToUTC;
  test('should return UTC from DD-MM-YYYY', () => {
    expect(fn("10-10-2010")).toBe(Date.UTC(2010, 9, 10))
    expect(fn("01-01-2010")).toBe(Date.UTC(2010, 0, 1))
  })
  test('should return NaN in edge case', () => {
    expect(fn("20-20-2010")).toBe(NaN)
    expect(fn("")).toBe(NaN)
    expect(fn(null)).toBe(NaN)
    expect(fn(undefined)).toBe(NaN)
  })
})

describe('ymdToUTC', ()=> {
  const fn = ymdToUTC
  test('should return mls UTC-0 for str YYYY-MM-DD', ()=>{
    expect(fn('2010-01-01')).toBe(Date.UTC(2010, 0, 1))
  })
  test('should return mls UTC-0 for str YYYY-MM', ()=>{
    expect(fn('2010-01')).toBe(Date.UTC(2010, 0, 31))
  })
  test('should return NaN for YYYY-MM edge case', ()=>{
    expect(fn('2010-MM')).toBe(NaN)
  })
  test('should return mls UTC-0 for str YYYY-QN', ()=>{
    expect(fn('2010-Q1')).toBe(Date.UTC(2010, 2, 31))
    expect(fn('2010-Q2')).toBe(Date.UTC(2010, 5, 30))
  })
  test('should return NaN for YYYY-QS edge case', ()=>{
    expect(fn('2010-QS')).toBe(NaN)
  })
  test('should return mls UTC-0 for str YYYY', ()=>{
    expect(fn('2010')).toBe(Date.UTC(2010, 11, 31))
  })
  test('should return NaN for YYYY edge case', ()=>{
    expect(fn('YYYY')).toBe(NaN)
  })
  test('should return mls UTC-0 for YYYY-MM-DD or NaN for more than 3 tokens', ()=>{
    expect(fn('2010-01-01-12:00')).toBe(Date.UTC(2010, 0, 1))
    expect(fn('2010-01-AA-12:00')).toBe(NaN)
  })
  test('should use option y for YYYY case', () => {
    expect(fn("2010")).toBe(Date.UTC(2010, 11, 31))
    expect(fn("2010", {y: 1})).toBe(Date.UTC(2010-1, 11, 31))
  })
})

describe('ymdhmsToUTC', ()=> {
  const fn = ymdhmsToUTC;
  test('should retun mls UTC-0 for str date', ()=> {
    expect(fn('2010-01-01 12:00:00')).toBe(Date.UTC(2010, 0, 1, 12, 0, 0))
  })
})

describe('formatTo', ()=>{
  const fn = mlsToDmy;
  const EMPTY = '';
  test('should format to DD-MM-YYYY from ms', ()=>{
    expect(fn(1514764800000)).toBe('01-01-2018')
    expect(fn(1515542400000)).toBe('10-01-2018')
    expect(fn(1538352000000)).toBe('01-10-2018')
  })
  test('should format to empty string in edge case', ()=>{
    expect(fn(null)).toBe(EMPTY)
    expect(fn(undefined)).toBe(EMPTY)
    expect(fn({})).toBe(EMPTY)
    expect(fn(NaN)).toBe(EMPTY)
    expect(fn('')).toBe(EMPTY)
    expect(fn('abc')).toBe(EMPTY)
    expect(fn(()=>{})).toBe(EMPTY)
    expect(fn(Number.MAX_SAFE_INTEGER)).toBe(EMPTY)
  })
})

describe('isDmy', () => {
  const fn = isDmy;
  test('should return true for str in format DD-MM-YYY', () => {
     expect(fn('10-10-2000')).toBe(true)
     expect(fn('20-01-2000')).toBe(true)
     expect(fn('01-12-2000')).toBe(true)
  })
  test(`should use defult min year value ${MIN_YEAR}`, ()=>{
    expect(fn('31-12-1989')).toBe(false)
  })
  test('should use minYear param', () => {
    expect(fn('10-10-2000', 2010)).toBe(false)
  })
  test('should return false for str not in format DD-MM-YYYY', () => {
    expect(fn('10-14-2000')).toBe(false)
    expect(fn('20-1-2000')).toBe(false)
    expect(fn('2000-12-01')).toBe(false)
  })
  test('should return false in edge cases', () => {
    expect(fn(null)).toBe(false)
    expect(fn()).toBe(false)
    expect(fn('')).toBe(false)
    expect(fn(1)).toBe(false)
    expect(fn({})).toBe(false)
    expect(fn(()=>{})).toBe(false)
    expect(fn(fn)).toBe(false)
  })
})

describe('getUTCTime', ()=>{
  const fn = getUTCTime;
  test('should return correct str from ms', ()=>{
    expect(fn(1547205009808)).toBe('11:10')
    expect(fn(1547204900008)).toBe('11:08')
  })
  test('should return empty string in edge case', ()=>{
    expect(fn(undefined)).toBe('')
    expect(fn(null)).toBe('')
    expect(fn('str')).toBe('')
    expect(fn(NaN)).toBe('')
    expect(fn({})).toBe('')
  })
})

describe('addToDmy', ()=>{
  const fn = addToDmy
  , _fn = _compose([
    mlsToDmy,
    (date) => date.getTime(),
    addToDmy
  ]);
  test('should return Date instance', ()=>{
    expect(fn('01-02-2019', -1)).toBeInstanceOf(Date)
    expect(fn('01-02-2019', 1)).toBeInstanceOf(Date)
    expect(fn('01-02-2019')).toBeInstanceOf(Date)
    expect(fn('01-02-2019', 'str')).toBeInstanceOf(Date)
    expect(fn('01-02-2019', null)).toBeInstanceOf(Date)
    expect(fn('str', null)).toBeInstanceOf(Date)
  })
  test('should return dmy with added month to dmy format', ()=>{
    expect(_fn('01-02-2019', -1)).toBe('01-01-2019')
    expect(_fn('01-02-2019', -2)).toBe('01-12-2018')
    expect(_fn('01-02-2019', -3)).toBe('01-11-2018')
    expect(_fn('01-02-2019', -6)).toBe('01-08-2018')
    expect(_fn('01-02-2019', -12)).toBe('01-02-2018')
  })
})

describe('getYTDfromDmy', ()=>{
  const fn = getYTDfromDmy
  test('should return mls to start of year', ()=>{
    expect(fn('01-01-2010')).toBe(Date.UTC(2010, 0, 1))
    expect(fn('02-01-2010')).toBe(Date.UTC(2010, 0, 1))
  })
})

describe('monthIndex', ()=>{
  const fn = monthIndex
  it('should return month index from 0 from str', ()=>{
    expect(fn('january')).toBe(0)
    expect(fn('January')).toBe(0)
    expect(fn('december')).toBe(11)
    expect(fn('December')).toBe(11)
  })
  it('should return -1 for edge cases', ()=>{
    expect(fn('str')).toBe(-1)
    expect(fn('Jan')).toBe(-1)
    expect(fn('decembe')).toBe(-1)
    expect(fn('')).toBe(-1)

    expect(fn()).toBe(-1)
    expect(fn(null)).toBe(-1)
    expect(fn(1)).toBe(-1)
    expect(fn({})).toBe(-1)
  })
})


describe("getYmdhms", ()=>{
  const fn = getYmdhmUTC
  it("should return str in format YYYY-MM-DD HH:MM UTC", ()=>{
    expect(fn(new Date(Date.UTC(2010, 0, 1)))).toBe('2010-01-01 00:00 UTC')
    expect(fn(new Date(Date.UTC(2010, 0, 1, 1)))).toBe('2010-01-01 01:00 UTC')
  })
})


DateUtilsWithMock()
