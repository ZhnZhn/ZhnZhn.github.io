"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _crDateConfig = _interopRequireDefault(require("../crDateConfig"));
var _mockDateBeforeAll = _interopRequireDefault(require("../../../../utils/__tests__/mockDateBeforeAll"));
describe("crDateConfig", () => {
  //2024-01-01 12:00:01
  (0, _mockDateBeforeAll.default)(2024, 0, 1, 12, 0, 1);
  const fn = _crDateConfig.default;
  test("should create year date config", () => {
    const [_r, _dfDate] = fn("Y", 1, "LOAD_ID");
    expect(_r[0]).toEqual({
      "caption": "2023",
      "value": "2023"
    });
    expect(_r.length).toBe(12);
    expect(_dfDate).toBe("2023");
  });
  test("should create year date config width default parameters", () => {
    const [_r, _dfDate] = fn("Y");
    expect(_r[0]).toEqual({
      "caption": "2023",
      "value": "2023"
    });
    expect(_r.length).toBe(12);
    expect(_dfDate).toBe("2023");
  });
});
//# sourceMappingURL=crDateConfig.test.js.map