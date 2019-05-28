import DateUtils from '../DateUtils'

const {
  isYmd,
  isYmdOrEmpty,
  dmyToUTC,
  mlsToDmy,
  isDmy,
  getUTCTime,
  addToDmy
} = DateUtils;

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
  test('min valid value is 1990-01-01', () => {
    expect(fn('1990-01-01')).toBe(true)
    expect(fn('1989-12-30')).toBe(false)
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

describe('dmyToUTC', ()=>{
  const fn = dmyToUTC;
  test('should return UTC from DD-MM-YYYY', () => {
    expect(fn("10-10-2010")).toBe(Date.UTC(2010, 9, 10))
    expect(fn("01-01-2010")).toBe(Date.UTC(2010, 0, 1))
  })
  test('should return 0 in edge case', () => {
    expect(fn("20-20-2010")).toBe(0)
    expect(fn("")).toBe(0)
    expect(fn(null)).toBe(0)
    expect(fn(undefined)).toBe(0)
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
  })
})

describe('isDmy', () => {
  const fn = isDmy;
  test('should return true for str in format DD-MM-YYY', () => {
     expect(fn('10-10-2000')).toBe(true)
     expect(fn('20-01-2000')).toBe(true)
     expect(fn('01-12-2000')).toBe(true)
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
