import crDateConfig from '../crDateConfig';
import { LT_EU_STAT } from '../../../../constants/LoadType';

import mockDateBeforeAll from '../../../../utils/__tests__/mockDateBeforeAll';


describe("crDateConfig", () => {
  //2024-01-01 12:00:01
  mockDateBeforeAll(2024,0,1,12,0,1)
  const fn = crDateConfig;

  test("should create year date config", () => {
    const [_r, _dfDate] = fn("Y", 1, "LOAD_ID");
    expect(_r[0]).toEqual({"caption": "2023", "value": "2023"})
    expect(_r.length).toBe(12)
    expect(_dfDate).toBe("2023")
  })
  test("should create year date config width default mapDateDf parameter", () => {
    const [_r, _dfDate] = fn("Y");
    expect(_r[0]).toEqual({"caption": "2023", "value": "2023"})
    expect(_r.length).toBe(12)
    expect(_dfDate).toBe("2023")
  })

  test("should create year bi-annual date config", () => {
    const [_r, _dfDate] = fn("S", 2)
    expect(_r[0]).toEqual({"caption": "2024S2", "value": "2024S2"})
    expect(_r[1]).toEqual({"caption": "2024S1", "value": "2024S1"})
    expect(_r.length).toBe(48)
    expect(_dfDate).toBe("2023S2")
  })
  test("should create year bi-annual date config for EU_STAT loadId case", () => {
    const [_r, _dfDate] = fn("S", 2, LT_EU_STAT);
    expect(_r[0]).toEqual({"caption": "2024-S2", "value": "2024-S2"})
    expect(_r[1]).toEqual({"caption": "2024-S1", "value": "2024-S1"})
    expect(_r.length).toBe(48)
    expect(_dfDate).toBe("2023-S2")
  })

  test("should create year quarter date config", () => {
    const [_r, _dfDate] = fn("K", 2);
    expect(_r[0]).toEqual({"caption": "2023K4", "value": "2023K4"})
    expect(_r[1]).toEqual({"caption": "2023K3", "value": "2023K3"})
    expect(_r[2]).toEqual({"caption": "2023K2", "value": "2023K2"})
    expect(_r[3]).toEqual({"caption": "2023K1", "value": "2023K1"})
    expect(_r.length).toBe(16)
    expect(_dfDate).toBe("2023K2")
  })
  test("should create year quarter date config for EU_STAT loadId case", () => {
    const [_r, _dfDate] = fn("Q", 2, LT_EU_STAT);
    expect(_r[0]).toEqual({"caption": "2023-Q4", "value": "2023-Q4"})
    expect(_r[1]).toEqual({"caption": "2023-Q3", "value": "2023-Q3"})
    expect(_r[2]).toEqual({"caption": "2023-Q2", "value": "2023-Q2"})
    expect(_r[3]).toEqual({"caption": "2023-Q1", "value": "2023-Q1"})
    expect(_r.length).toBe(16)
    expect(_dfDate).toBe("2023-Q2")
  })

})
