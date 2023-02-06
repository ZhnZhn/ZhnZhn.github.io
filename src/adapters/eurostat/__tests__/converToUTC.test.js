import convertToUTC from '../convertToUTC';

const UTC_MLS_2019_01_31 = 1548892800000
, UTC_MLS_2019_02_28 = 1551312000000
, UTC_MLS_2020_02_29 = 1582934400000
, UTC_MLS_2019_11_30 = 1575072000000

, UTC_MLS_2019_03_31 = 1553990400000
, UTC_MLS_2019_06_30 = 1561852800000
, UTC_MLS_2019_09_30 = 1569801600000
, UTC_MLS_2019_12_31 = 1577750400000;

describe('convertToUTC',()=>{
  const fn = convertToUTC;
  test('should return UTC mls from YYYY-MM string',()=>{
    //2019-01-31
    expect(fn('2019-01')).toBe(UTC_MLS_2019_01_31)
    //2019-02-28
    expect(fn('2019-02')).toBe(UTC_MLS_2019_02_28)
    //2020-02-29
    expect(fn('2020-02')).toBe(UTC_MLS_2020_02_29)
    //2019-11-30
    expect(fn('2019-11')).toBe(UTC_MLS_2019_11_30)
  })
  test('should return UTC mls from YYYY-Q[1,2,3,4] string', ()=>{
    //2019-03-31
    expect(fn('2019-Q1')).toBe(UTC_MLS_2019_03_31)
    //2019-06-30
    expect(fn('2019-Q2')).toBe(UTC_MLS_2019_06_30)
    //2019-09-30
    expect(fn('2019-Q3')).toBe(UTC_MLS_2019_09_30)
    //2019-12-31
    expect(fn('2019-Q4')).toBe(UTC_MLS_2019_12_31)
  })
  test('should return UTC mls from YYYY-S[1,2] string', ()=>{
    //2019-06-30
    expect(fn('2019-S1')).toBe(UTC_MLS_2019_06_30)
    //2019-12-31
    expect(fn('2019-S2')).toBe(UTC_MLS_2019_12_31)
  })
  test('should return UTC from YYYY string', ()=>{
    //2019-12-31
    expect(fn('2019')).toBe(UTC_MLS_2019_12_31)
  })
})
