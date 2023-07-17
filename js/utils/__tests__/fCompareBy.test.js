"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _fCompareBy = _interopRequireDefault(require("../fCompareBy"));
describe('fCompareBy', () => {
  const fn = _fCompareBy.default;
  it('should create fn for comparing arr by index', () => {
    const _compare = fn(0),
      arr = [[3, 0], [4, 0], [2, 0], [2, 1], [1, 0]];
    expect(typeof fn).toBe('function');
    expect(arr.sort(_compare)).toEqual([[1, 0], [2, 0], [2, 1], [3, 0], [4, 0]]);
  });
  it('should create fn for comparing by propName', () => {
    const _compare = fn('y'),
      arr = [{
        y: 3,
        x: 0
      }, {
        y: 4,
        x: 0
      }, {
        y: 2,
        x: 0
      }, {
        y: 2,
        x: 1
      }, {
        y: 1,
        x: 0
      }];
    expect(typeof fn).toBe('function');
    expect(arr.sort(_compare)).toEqual([{
      y: 1,
      x: 0
    }, {
      y: 2,
      x: 0
    }, {
      y: 2,
      x: 1
    }, {
      y: 3,
      x: 0
    }, {
      y: 4,
      x: 0
    }]);
  });
  it('should create fn which compare with falsy items', () => {
    const _compareByIndex0 = fn(0),
      arr1 = [[3, 0], [4, 0], [2, 0], [2, 1], [1, 0], null];
    expect(typeof _compareByIndex0).toBe('function');
    expect(arr1.sort(_compareByIndex0)).toEqual([[1, 0], [2, 0], [2, 1], [3, 0], [4, 0], null]);
    const _compareByPropY = fn('y'),
      arr2 = [{
        y: 3,
        x: 0
      }, {
        y: 4,
        x: 0
      }, {
        y: 2,
        x: 0
      }, {
        y: 2,
        x: 1
      }, {
        y: 1,
        x: 0
      }, void 0];
    expect(typeof _compareByPropY).toBe('function');
    expect(arr2.sort(_compareByPropY)).toEqual([{
      y: 1,
      x: 0
    }, {
      y: 2,
      x: 0
    }, {
      y: 2,
      x: 1
    }, {
      y: 3,
      x: 0
    }, {
      y: 4,
      x: 0
    }, void 0]);
    const arr3 = [null, void 0, NaN, 0, '', false];
    expect(() => arr3.sort(_compareByIndex0)).not.toThrow();
  });
});
//# sourceMappingURL=fCompareBy.test.js.map