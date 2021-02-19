"use strict";

exports.__esModule = true;
exports["default"] = void 0;

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
}; //[c:'P1', s1:10, s2:5, r:5] Diff S1-S2


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

var categoryHelpers = {
  _crP1: _crP1,
  _crP2: _crP2,
  _crExpectedPoint: _crExpectedPoint,
  _crParams: _crParams
};
describe('categoryHelpers', function () {
  test('', function () {});
});
var _default = categoryHelpers;
exports["default"] = _default;
//# sourceMappingURL=categoryHelpers.js.map