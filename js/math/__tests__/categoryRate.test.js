"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _categoryRate = _interopRequireDefault(require("../categoryRate"));

var _categoryHelpers = _interopRequireDefault(require("./categoryHelpers"));

var _crParams = _categoryHelpers["default"]._crParams,
    _crP1 = _categoryHelpers["default"]._crP1,
    _crExpectedPoint = _categoryHelpers["default"]._crExpectedPoint; //Rate S1/S2

describe('categoryRate', function () {
  var sc = '#111',
      rc = '#222';
  test('should return array with rate S1/S values', function () {
    var _crParams2 = _crParams([['P1', 10, 5, 2], ['P2', 10, 0, 0]], {
      sc: sc,
      rc: rc
    }),
        d1 = _crParams2[0],
        d2 = _crParams2[1],
        expectedResult = _crParams2[2];

    expect((0, _categoryRate["default"])(d1, d2, {
      sc: sc,
      rc: rc
    })).toEqual(expectedResult);
  });
  test('should return arr with 0 values for not match points', function () {
    expect((0, _categoryRate["default"])([_crP1('A1', 10, sc)], [], {
      sc: sc,
      rc: rc
    })).toEqual([_crExpectedPoint('A1', 0, rc)]);
  });
});
//# sourceMappingURL=categoryRate.test.js.map