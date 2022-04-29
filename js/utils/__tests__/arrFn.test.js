"use strict";

var _arrFn = require("../arrFn");

const propName = 'caption',
      propValue1 = 'caption1',
      propValue2 = 'caption2',
      arr = [{
  [propName]: propValue1
}, {
  [propName]: propValue2
}];
describe('arrFactoryFindIndexByProp', () => {
  const fn = (0, _arrFn.arrFactoryFindIndexByProp)(propName);
  test('should return function', () => {
    expect(typeof fn).toBe('function');
  });
  test('should return index by prop', () => {
    expect(fn(arr, propValue1)).toBe(0);
    expect(fn(arr, propValue2)).toBe(1);
  });
  test('should return -1 in edge cases', () => {
    const fnEdgeCase = (0, _arrFn.arrFactoryFindIndexByProp)('notexist');
    expect(fn(arr, 'notexist')).toBe(-1);
    expect(fnEdgeCase(arr, propValue1)).toBe(-1);
    expect(fnEdgeCase({}, propValue1)).toBe(-1);
  });
});
describe('arrFactoryIsSameByProp', () => {
  const fn = (0, _arrFn.arrFactoryIsSameByProp)(propName);
  test('should return function', () => {
    expect(typeof fn).toBe('function');
  });
  test('should return is same by prop', () => {
    expect(fn(arr, propValue1)).toBe(true);
    expect(fn(arr, propValue2)).toBe(true);
    expect(fn(arr, 'notexist')).toBe(false);
  });
  test('should return false in edge cases', () => {
    const fnEdgeCase = (0, _arrFn.arrFactoryIsSameByProp)('notexist');
    expect(fn(arr, 'notexist')).toBe(false);
    expect(fnEdgeCase(arr, propValue1)).toBe(false);
    expect(fnEdgeCase({}, propValue1)).toBe(false);
  });
});
describe('isInArrStr', () => {
  const arr = ['test1', 'test2', 'test3'],
        isTest = (0, _arrFn.isInArrStr)(arr);
  test('should return function', () => {
    expect(typeof isTest).toBe('function');
  });
  test('should return true if str in array', () => {
    expect(isTest('test1')).toBe(true);
    expect(isTest('test3')).toBe(true);
  });
  test('should return false if str not in array', () => {
    expect(isTest('test5')).toBe(false);
    expect(isTest('7')).toBe(false);
  });
  test('should return false in edge case', () => {
    const _isTest1 = (0, _arrFn.isInArrStr)(),
          _isTest2 = (0, _arrFn.isInArrStr)({});

    expect(_isTest1('test1')).toBe(false);
    expect(_isTest2('test1')).toBe(false);
  });
});
//# sourceMappingURL=arrFn.test.js.map