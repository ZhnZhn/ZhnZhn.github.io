"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _fCompareByTwoProps = _interopRequireDefault(require("../fCompareByTwoProps"));

describe('fCompareByTwoProps', function () {
  var fn = _fCompareByTwoProps["default"];
  it('should create fn for comparing by two props', function () {
    var _compare = fn('v', 'id'),
        arr = [{
      v: 3,
      id: 'a'
    }, {
      v: 4,
      id: 'a'
    }, {
      v: 1,
      id: 'a'
    }, {
      v: 2,
      id: 'a2'
    }, {
      v: 2,
      id: 'a1'
    }, {
      v: 2,
      id: 'a1'
    }, {
      v: 2,
      id: 'a3'
    }];

    expect(typeof _compare).toBe('function');
    expect(arr.sort(_compare)).toEqual([{
      v: 1,
      id: 'a'
    }, {
      v: 2,
      id: 'a1'
    }, {
      v: 2,
      id: 'a1'
    }, {
      v: 2,
      id: 'a2'
    }, {
      v: 2,
      id: 'a3'
    }, {
      v: 3,
      id: 'a'
    }, {
      v: 4,
      id: 'a'
    }]);
  });
});
//# sourceMappingURL=fCompareByTwoProps.test.js.map