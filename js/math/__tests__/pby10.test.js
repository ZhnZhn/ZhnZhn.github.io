"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _pby7 = _interopRequireDefault(require("../pby10"));

describe('pby10', function () {
  test('should multiple categories values by power of 10', function () {
    var _pby = (0, _pby7["default"])([{
      y: 1.23
    }, {
      y: 2.34
    }], 0),
        result0 = _pby[0],
        byNumber0 = _pby[1];

    expect(result0).toEqual([{
      y: 1.23
    }, {
      y: 2.34
    }]);
    expect(byNumber0).toBe(1);

    var _pby2 = (0, _pby7["default"])([{
      y: 1.23
    }, {
      y: 2.34
    }], -0),
        result_0 = _pby2[0],
        byNumber_0 = _pby2[1];

    expect(result_0).toEqual([{
      y: 1.23
    }, {
      y: 2.34
    }]);
    expect(byNumber_0).toBe(1);

    var _pby3 = (0, _pby7["default"])([{
      y: 1.23
    }, {
      y: 2.34
    }], 1),
        result1 = _pby3[0],
        byNumber1 = _pby3[1];

    expect(result1).toEqual([{
      y: 12.3
    }, {
      y: 23.4
    }]);
    expect(byNumber1).toBe(10);

    var _pby4 = (0, _pby7["default"])([{
      y: 1.23
    }, {
      y: 2.34
    }], 2),
        result2 = _pby4[0],
        byNumber2 = _pby4[1];

    expect(result2).toEqual([{
      y: 123
    }, {
      y: 234
    }]);
    expect(byNumber2).toBe(100);

    var _pby5 = (0, _pby7["default"])([{
      y: 1.23
    }, {
      y: 2.34
    }], 3),
        result3 = _pby5[0],
        byNumber3 = _pby5[1];

    expect(result3).toEqual([{
      y: 1230
    }, {
      y: 2340
    }]);
    expect(byNumber3).toBe(1000);

    var _pby6 = (0, _pby7["default"])([{
      y: 123
    }, {
      y: 234
    }], -3),
        result_3 = _pby6[0],
        byNumber_3 = _pby6[1];

    expect(result_3).toEqual([{
      y: 0.123
    }, {
      y: 0.234
    }]);
    expect(byNumber_3).toBe(0.001);
  });
});
//# sourceMappingURL=pby10.test.js.map