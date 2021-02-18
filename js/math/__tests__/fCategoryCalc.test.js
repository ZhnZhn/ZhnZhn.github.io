"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _fCategoryCalc = _interopRequireDefault(require("../fCategoryCalc"));

var _crP1 = function _crP1(category, color) {
  return {
    color: color,
    y: 1,
    category: category
  };
},
    _crP2 = function _crP2(category) {
  return {
    y: 1,
    category: category
  };
},
    _crExpectedPoint = function _crExpectedPoint(c, color) {
  return {
    color: color,
    y: 1,
    c: c,
    id: c,
    status: void 0
  };
};

var _crParams = function _crParams(arr) {
  var d1 = [],
      d2 = [],
      expectedResult = [];
  arr.forEach(function (_ref) {
    var category = _ref[0],
        sc = _ref[1],
        rc = _ref[2];
    d1.push(_crP1(category, sc));
    d2.push(_crP2(category));
    expectedResult.push(_crExpectedPoint(category, rc));
  });
  return [d1, d2, expectedResult];
};

describe('fCategoryCalc', function () {
  var calc = function calc(p1, p2) {
    return p1.y;
  },
      fn = (0, _fCategoryCalc["default"])(calc),
      sc = '#111',
      rc = '#222',
      _crParams2 = _crParams([['P1', sc, rc], ['P2', '#aaa', '#aaa'], ['P3', rc, rc]]),
      d1 = _crParams2[0],
      d2 = _crParams2[1],
      expectedResult = _crParams2[2];

  test('should return fn', function () {
    expect(typeof fn).toBe('function');
  });
  test('should only replace sc color by rc for points', function () {
    expect(fn(d1, d2, {
      sc: sc,
      rc: rc
    })).toEqual(expectedResult);
  });
  test('should only replace sc color by rc for not match points', function () {
    expect(fn(d1, [], {
      sc: sc,
      rc: rc
    })).toEqual(expectedResult);
  });
});
//# sourceMappingURL=fCategoryCalc.test.js.map