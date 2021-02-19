"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _categoryDiff = _interopRequireDefault(require("../categoryDiff"));

var _categoryHelpers = _interopRequireDefault(require("./categoryHelpers"));

var _crParams = _categoryHelpers["default"]._crParams,
    _crP1 = _categoryHelpers["default"]._crP1,
    _crExpectedPoint = _categoryHelpers["default"]._crExpectedPoint; //Diff S1-S2

describe('categoryDiff', function () {
  var sc = '#111',
      rc = '#222';
  test('should return array with correct diff values', function () {
    var _crParams2 = _crParams([['P1', 10, 5, 5], ['P2', 10, 0, 10], ['P3', 10, null, 0]], {
      sc: sc,
      rc: rc
    }),
        d1 = _crParams2[0],
        d2 = _crParams2[1],
        expectedResult = _crParams2[2];

    expect((0, _categoryDiff["default"])(d1, d2, {
      sc: sc,
      rc: rc
    })).toEqual(expectedResult);
  });
  test('should return arr with 0 y values for not match points', function () {
    expect((0, _categoryDiff["default"])([_crP1('A1', 10, sc)], [], {
      sc: sc,
      rc: rc
    })).toEqual([_crExpectedPoint('A1', 0, rc)]);
  });
});
//# sourceMappingURL=categoryDiff.test.js.map