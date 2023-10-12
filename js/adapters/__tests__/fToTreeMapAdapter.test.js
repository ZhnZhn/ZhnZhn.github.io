"use strict";

var _fToTreeMapAdapter = require("../fToTreeMapAdapter");
describe("crRoundedSubTotal", () => {
  const fn = _fToTreeMapAdapter.crRoundedSubTotal;
  test("should return array with two values", () => {
    //LUX-2022 the EI Primary energy consumption in EJ
    expect(fn(0.125398411, 0.015262846, 0.14, 2)).toEqual([0.125, 0.015]);
    expect(fn(89.28571428571428, 10.714285714285712, 100)).toEqual([89, 11]);

    //SGP-2022 the EI Primary energy consumption in EJ
    expect(fn(3.146366035, 0.017793981, 3.16, 2)).toEqual([3.146, 0.018]);
    expect(fn(99.55696202531644, 0.5696202531645569, 100)).toEqual([99.6, 0.6]);

    //SAU-2022 the EI Primary energy consumption in EJ
    expect(fn(11.488093727999999, 0.007856192, 11.5, 2)).toEqual([11.49, 0.0079]);
    expect(fn(99.91304347826086, 0.06869565217391305, 100)).toEqual([100, 0]);

    //WLD-2022 the EI Primary energy consumption in EJ
    expect(fn(494.0520245, 109.98362934, 604, 0)).toEqual([494, 110]);
    expect(fn(81.78807947019868, 18.211920529801326, 100)).toEqual([82, 18]);
  });
});
//# sourceMappingURL=fToTreeMapAdapter.test.js.map