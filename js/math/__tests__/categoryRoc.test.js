"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _categoryRoc = _interopRequireDefault(require("../categoryRoc"));

var _categoryHelpers = _interopRequireDefault(require("./categoryHelpers"));

var _crP1 = _categoryHelpers["default"]._crP1,
    _crExpectedPoint = _categoryHelpers["default"]._crExpectedPoint,
    _crParams = _categoryHelpers["default"]._crParams; // ROC S1 from S2

describe('categoryRoc', function () {
  test('should return arr with correct roc values', function () {
    var sc = '#111',
        rc = '#222',
        _crParams2 = _crParams([['P1', 10, 5, 100], ['P2', 9, 6, 50], ['P3', 5, 10, -50], ['P4', 0, 9, -100], ['P5', 100.01, 100, 0.01], ['P6', 99.99, 100, -0.01], ['P7', 0, 1, -100], ['P8', 0, -1, 100]], {
      sc: sc,
      rc: rc
    }),
        d1 = _crParams2[0],
        d2 = _crParams2[1],
        expectedResult = _crParams2[2];

    expect((0, _categoryRoc["default"])(d1, d2, {
      sc: sc,
      rc: rc
    })).toEqual(expectedResult);
  });
  test('should return arr with null values for not match points', function () {
    var sc = '#111',
        rc = '#222';
    expect((0, _categoryRoc["default"])([_crP1('A1', 3, sc)], [], {
      rc: rc,
      sc: sc
    })).toEqual([_crExpectedPoint('A1', null, rc)]);
  });
});
//# sourceMappingURL=categoryRoc.test.js.map