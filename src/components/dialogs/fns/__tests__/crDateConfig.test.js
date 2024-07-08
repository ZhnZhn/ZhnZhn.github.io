import crDateConfig from '../crDateConfig';
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
  test("should create year bi-annual date config for EU_STAT loadId", () => {
    const [_r, _dfDate] = fn("S", 2, 'EU_STAT')
    expect(_r[0]).toEqual({"caption": "2024-S2", "value": "2024-S2"})
    expect(_r[1]).toEqual({"caption": "2024-S1", "value": "2024-S1"})
    expect(_r.length).toBe(48)
    expect(_dfDate).toBe("2023-S2")
  })
})
