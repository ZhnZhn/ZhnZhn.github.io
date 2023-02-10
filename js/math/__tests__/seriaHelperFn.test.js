"use strict";

var _seriaHelperFn = require("../seriaHelperFn");
describe("isNotEmptyArr", () => {
  const fn = _seriaHelperFn.isNotEmptyArr;
  test('should return true for arr with object', () => {
    expect(fn([{}])).toBe(true);
    expect(fn([[]])).toBe(true);
  });
  test('should return false for not arr and arr without object', () => {
    expect(fn()).toBe(false);
    expect(fn(null)).toBe(false);
    expect(fn(() => {})).toBe(false);
    expect(fn('str')).toBe(false);
    expect(fn(1)).toBe(false);
    expect(fn(true)).toBe(false);
    expect(fn([])).toBe(false);
    expect(fn([null, void 0, 'str', 1, true])).toBe(false);
  });
});
describe("isNumber", () => {
  const fn = _seriaHelperFn.isNumber;
  test("should check is value number type", () => {
    expect(fn(0.1)).toBe(true);
    expect(fn(0)).toBe(true);
    expect(fn(-0)).toBe(true);
    expect(fn(+0)).toBe(true);
    expect(fn(NaN)).toBe(false);
    expect(fn(null)).toBe(false);
    expect(fn(undefined)).toBe(false);
    expect(fn('')).toBe(false);
    expect(fn({})).toBe(false);
  });
});
describe("crPointGetter", () => {
  const fn = _seriaHelperFn.crPointGetter;
  test("should create getter for array points", () => {
    const _data = [[0, 0], [1, 1]];
    const {
      getX,
      getY
    } = fn(_data);
    expect(getX(_data[0])).toBe(0);
    expect(getY(_data[0])).toBe(0);
    expect(getX(_data[1])).toBe(1);
    expect(getY(_data[1])).toBe(1);
  });
  test("should create getter for object points", () => {
    const _data = [{
      x: 0,
      y: 0
    }, {
      x: 1,
      y: 1
    }];
    const {
      getX,
      getY
    } = fn(_data);
    expect(getX(_data[0])).toBe(0);
    expect(getY(_data[0])).toBe(0);
    expect(getX(_data[1])).toBe(1);
    expect(getY(_data[1])).toBe(1);
  });
});
describe("fGetY", () => {
  const fn = _seriaHelperFn.fGetY;
  test("should return function for getting y for arr point", () => {
    const point = [1, 2],
      getY = fn(point);
    expect(typeof getY).toBe('function');
    expect(getY(point)).toBe(point[1]);
  });
  test("should return function for getting y for obj point", () => {
    const point = {
        y: 2
      },
      getY = fn(point);
    expect(typeof getY).toBe('function');
    expect(getY(point)).toBe(point.y);
  });
  test('should return undefined for edge case', () => {
    expect(fn(null)).toBe(undefined);
    expect(fn({})).toBe(undefined);
  });
});
describe('getZeroCountFromStart', () => {
  const fn = _seriaHelperFn.getZeroCountFromStart;
  test('should return number of points with y 0 or null from data start', () => {
    const dataArr = [[1, 0], [2, null]];
    expect(fn(dataArr, (0, _seriaHelperFn.fGetY)(dataArr[0]))).toBe(2);
    const dataArr2 = [[1, 0], [2, null], [-1, 1]];
    expect(fn(dataArr2, (0, _seriaHelperFn.fGetY)(dataArr2[0]))).toBe(2);
    const dataObj = [{
      x: 1,
      y: 0
    }, {
      x: 2,
      y: null
    }];
    expect(fn(dataObj, (0, _seriaHelperFn.fGetY)(dataObj[0]))).toBe(2);
  });
});
describe('getZeroIndexFromEnd', () => {
  const fn = _seriaHelperFn.getZeroIndexFromEnd;
  test('should return index of last y 0 or null from data end', () => {
    const dataArr = [[-1, -1], [1, 0], [2, null]];
    expect(fn(dataArr, (0, _seriaHelperFn.fGetY)(dataArr[0]))).toBe(1);
    const dataObj = [{
      x: -1,
      y: -1
    }, {
      x: 1,
      y: 0
    }, {
      x: 2,
      y: null
    }];
    expect(fn(dataObj, (0, _seriaHelperFn.fGetY)(dataObj[0]))).toBe(1);
  });
});
describe('crDataArrays', () => {
  const fn = _seriaHelperFn.crDataArrays;
  test('should return array with data numbers and dataX values by chart data', () => {
    expect(fn([[1, 10], [2, 20], [3, 30], [4, null], [5, void 0]])).toEqual([[10, 20, 30], [1, 2, 3]]);
  });
  expect(fn([{
    x: 1,
    y: 10
  }, {
    x: 2,
    y: 20
  }, {
    x: 3,
    y: 30
  }, {
    x: 4,
    y: null
  }, {
    x: 5,
    y: void 0
  }])).toEqual([[10, 20, 30], [1, 2, 3]]);
  test('should return array with empty arrays for edge case', () => {
    expect(fn()).toEqual([[], []]);
    expect(fn(null)).toEqual([[], []]);
    expect(fn('str')).toEqual([[], []]);
    expect(fn(2)).toEqual([[], []]);
    expect(fn(true)).toEqual([[], []]);
    expect(fn([null, 'str', 2, false, void 0])).toEqual([[], []]);
  });
});
describe('mergeToChartPoints', () => {
  const fn = _seriaHelperFn.mergeToChartPoints;
  test('should return array with chart points by dataX and values', () => {
    expect(fn([1, 2, 3], [10, 20, 30])).toEqual([[1, 10], [2, 20], [3, 30]]);
  });
});
//# sourceMappingURL=seriaHelperFn.test.js.map