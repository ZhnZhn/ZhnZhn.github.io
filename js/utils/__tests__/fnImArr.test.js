"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _fnImArr = _interopRequireDefault(require("../fnImArr"));

var push = _fnImArr["default"].push,
    insertItem = _fnImArr["default"].insertItem,
    filterByPropFn = _fnImArr["default"].filterByPropFn,
    editByPropFn = _fnImArr["default"].editByPropFn;
describe('push', function () {
  var fn = push,
      obj = {
    b: 2
  };
  test('should push obj', function () {
    var arr = [{
      a: 1
    }],
        result = fn(arr, obj),
        maxIndex = result.length - 1;
    expect(result).not.toBe(arr);
    expect(result[maxIndex]).not.toBe(obj);
    expect(result[maxIndex]).toEqual(obj);
  });
  test('should use empty arr in case arr not Array', function () {
    var result = push(void 0, obj);
    expect(result[0]).not.toBe(obj);
    expect(result[0]).toEqual(obj);
    expect(result.length).toEqual(1);
  });
});
describe('filterByPropFn', function () {
  test('should filter by propName arr and propValue', function () {
    var arr = [{
      a: 1
    }, {
      a: 2
    }, {
      a: 3
    }, {
      a: 1
    }],
        fn = filterByPropFn('a'),
        result = fn(arr, 1);
    expect(typeof fn).toBe('function');
    expect(result).not.toBe(arr);
    expect(result.length).toBe(2);
  });
});
describe('insertItem', function () {
  var fn = insertItem,
      arr = [{
    a: 1
  }, {
    b: 2
  }, {
    c: 3
  }],
      obj = {
    d: 4
  };
  test('should insert obj to arr, index=0', function () {
    var result = fn(obj, 0, arr);
    expect(result).not.toBe(arr);
    expect(result[0]).not.toBe(obj);
    expect(result[0]).toEqual(obj);
    expect(result.length).toBe(arr.length + 1);
  });
  test('should insert obj to arr, index=length', function () {
    var index = arr.length,
        result = fn(obj, index, arr);
    expect(result).not.toBe(arr);
    expect(result[index]).not.toBe(obj);
    expect(result[index]).toEqual(obj);
    expect(result.length).toBe(arr.length + 1);
  });
  test('should use empty arr in case arr not Array', function () {
    var result = fn(obj, 2);
    expect(result[0]).not.toBe(obj);
    expect(result[0]).toEqual(obj);
    expect(result.length).toBe(1);
  });
});
describe('editByPropFn', function () {
  test('should edit obj in arr by propName and index', function () {
    var arr = [{
      a: 1
    }, {
      a: 2
    }, {
      a: 3
    }],
        fn = editByPropFn('a'),
        result = fn(arr, 0, 4);
    expect(typeof fn).toBe('function');
    expect(result).not.toBe(arr);
    expect(result[0]).toEqual({
      a: 4
    });
  });
});
//# sourceMappingURL=fnImArr.test.js.map