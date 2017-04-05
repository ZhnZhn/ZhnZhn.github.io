import DateUtils from '../DateUtils'
/*
const d1 = "2010-01-10"
    , d2 = "2010-10-01"
    , d_1 = "2010-14-01"
    , d_2 = "2010-02-32"
*/

describe('isValidDate YYYY-MM-DD', () => {
  const fn = DateUtils.isValidDate

  test('should return is valid data', ()=> {
    expect(fn("2010-01-10")).toBe(true)
    expect(fn("2010-10-01")).toBe(true)
    expect(fn("2010-14-01")).toBe(false)
    expect(fn("2010-02-32")).toBe(false)
  })
  test('min valid value is 1999-01-01', () => {
    expect(fn('1999-01-01')).toBe(true)
    expect(fn('1998-12-30')).toBe(false)
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

describe('isValidDateOrEmpty YYYY-MM-DD', () => {
  const fn = DateUtils.isValidDateOrEmpty
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
  const fn = DateUtils.dmyToUTC
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
