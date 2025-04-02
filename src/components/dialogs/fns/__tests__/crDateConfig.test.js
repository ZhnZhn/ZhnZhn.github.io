import crDateConfig from '../crDateConfig';
import {
  LT_EU_STAT,
  LT_BIS
} from '../../../../constants/LoadType';

import mockDateBeforeAll from '../../../../utils/__tests__/mockDateBeforeAll';

const ANNUAL_LENGTH = 25;
const SEMI_ANNUAL_LENGTH = 50;
const QUARTER_LENGTH = 48;

const _testQuarterConfig = (_r, _dfDate) => {
  expect(_r[0]).toEqual({"caption": "2023-Q4", "value": "2023-Q4"})
  expect(_r[1]).toEqual({"caption": "2023-Q3", "value": "2023-Q3"})
  expect(_r[2]).toEqual({"caption": "2023-Q2", "value": "2023-Q2"})
  expect(_r[3]).toEqual({"caption": "2023-Q1", "value": "2023-Q1"})
  expect(_r.length).toBe(QUARTER_LENGTH)
  expect(_dfDate).toBe("2023-Q2")
};

describe("crDateConfig", () => {
  //2024-01-01 12:00:01
  mockDateBeforeAll(2024,0,1,12,0,1)
  const fn = crDateConfig;

  test("should create year date config", () => {
    const [_r, _dfDate] = fn("Y", 1, "LOAD_ID");
    expect(_r[0]).toEqual({"caption": "2023", "value": "2023"})
    expect(_r.length).toBe(ANNUAL_LENGTH)
    expect(_dfDate).toBe("2023")
  })
  test("should create year date config width default mapDateDf parameter", () => {
    const [_r, _dfDate] = fn("Y");
    expect(_r[0]).toEqual({"caption": "2023", "value": "2023"})
    expect(_r.length).toBe(ANNUAL_LENGTH)
    expect(_dfDate).toBe("2023")
  })

  test("should create year bi-annual date config", () => {
    const [_r, _dfDate] = fn("S", 2)
    expect(_r[0]).toEqual({"caption": "2024S2", "value": "2024S2"})
    expect(_r[1]).toEqual({"caption": "2024S1", "value": "2024S1"})
    expect(_r.length).toBe(SEMI_ANNUAL_LENGTH)
    expect(_dfDate).toBe("2023S2")
  })
  test("should create year bi-annual date config for EU_STAT loadId case", () => {
    const [_r, _dfDate] = fn("S", 2, LT_EU_STAT);
    expect(_r[0]).toEqual({"caption": "2024-S2", "value": "2024-S2"})
    expect(_r[1]).toEqual({"caption": "2024-S1", "value": "2024-S1"})
    expect(_r.length).toBe(SEMI_ANNUAL_LENGTH)
    expect(_dfDate).toBe("2023-S2")
  })

  test("should create year quarter date config", () => {
    const [_r, _dfDate] = fn("K", 2);
    expect(_r[0]).toEqual({"caption": "2023K4", "value": "2023K4"})
    expect(_r[1]).toEqual({"caption": "2023K3", "value": "2023K3"})
    expect(_r[2]).toEqual({"caption": "2023K2", "value": "2023K2"})
    expect(_r[3]).toEqual({"caption": "2023K1", "value": "2023K1"})
    expect(_r.length).toBe(QUARTER_LENGTH)
    expect(_dfDate).toBe("2023K2")
  })
  test("should create year quarter date config for EU_STAT loadId case", () => {
    const [_r, _dfDate] = fn("Q", 2, LT_EU_STAT);
    _testQuarterConfig(_r, _dfDate)
  })
  test("should create year quarter date config for BIS loadId case", () => {
    const [_r, _dfDate] = fn("Q", 2, LT_BIS);
    _testQuarterConfig(_r, _dfDate)
  })

})
