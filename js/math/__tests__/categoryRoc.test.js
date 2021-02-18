"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _categoryRoc = _interopRequireDefault(require("../categoryRoc"));

var _crP1 = function _crP1(category, y, color) {
  return {
    y: y,
    category: category,
    color: color
  };
},
    _crP2 = function _crP2(category, y) {
  return {
    y: y,
    category: category
  };
},
    _crExpectedPoint = function _crExpectedPoint(c, y, color) {
  return {
    y: y,
    c: c,
    color: color,
    id: c,
    status: void 0
  };
}; //'P1', 10, 5, 100


var _crParams = function _crParams(arr, _ref) {
  var sc = _ref.sc,
      rc = _ref.rc;
  var d1 = [],
      d2 = [],
      expectedResult = [];
  arr.forEach(function (p) {
    d1.push(_crP1(p[0], p[1], sc));
    d2.push(_crP2(p[0], p[2]));
    expectedResult.push(_crExpectedPoint(p[0], p[3], rc));
  });
  return [d1, d2, expectedResult];
};

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
  test('should return arr with correct roc values for edge case', function () {
    var sc = '#111',
        rc = '#222';
    expect((0, _categoryRoc["default"])([_crP1('P1', 3, sc)], [], {
      rc: rc,
      sc: sc
    })).toEqual([_crExpectedPoint('P1', null, rc)]);
  });
});
//# sourceMappingURL=categoryRoc.test.js.map