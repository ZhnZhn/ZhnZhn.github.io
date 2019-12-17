"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _dataToPoints = _interopRequireDefault(require("../dataToPoints"));

//fork https://github.com/borisyankov/react-sparklines/blob/master/__tests__/dataToPoints.js
describe('dataToPoints', function () {
  test('should return an array', function () {
    expect(Array.isArray((0, _dataToPoints["default"])({
      data: []
    }))).toBe(true);
    expect(Array.isArray((0, _dataToPoints["default"])({
      data: [1, 2, 3]
    }))).toBe(true);
    expect(Array.isArray((0, _dataToPoints["default"])({
      data: [1, null, undefined]
    }))).toBe(true);
  });
  test('should return only `limit` items', function () {
    expect((0, _dataToPoints["default"])({
      data: [1, 2, 3, 4, 5]
    }).length).toBe(5);
    expect((0, _dataToPoints["default"])({
      data: [1, 2, 3, 4, 5],
      limit: 2
    }).length).toBe(2);
    expect((0, _dataToPoints["default"])({
      data: [1, 2, 3, 4, 5],
      limit: 5
    }).length).toBe(5);
    expect((0, _dataToPoints["default"])({
      data: [1, 2, 3, 4, 5],
      limit: 10
    }).length).toBe(5);
  });
  test('should return proper values for 1 value', function () {
    expect((0, _dataToPoints["default"])({
      data: [1]
    })).toEqual([{
      x: 0,
      y: 0.5
    }]);
  });
  test('should return proper values 2+ values', function () {
    expect((0, _dataToPoints["default"])({
      data: [1, 1]
    })).toEqual([{
      x: 0,
      y: 0.5
    }, {
      x: 1,
      y: 0.5
    }]);
    expect((0, _dataToPoints["default"])({
      data: [0, 1]
    })).toEqual([{
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 0
    }]);
    expect((0, _dataToPoints["default"])({
      data: [1, 0]
    })).toEqual([{
      x: 0,
      y: 0
    }, {
      x: 1,
      y: 1
    }]);
    expect((0, _dataToPoints["default"])({
      data: [0, 1, 2]
    })).toEqual([{
      x: 0,
      y: 1
    }, {
      x: 0.5,
      y: 0.5
    }, {
      x: 1,
      y: 0
    }]);
  });
  test('should inerpolate values properly', function () {
    expect((0, _dataToPoints["default"])({
      data: [0, 1, 2],
      width: 10,
      height: 10
    })).toEqual([{
      x: 0,
      y: 10
    }, {
      x: 5,
      y: 5
    }, {
      x: 10,
      y: 0
    }]);
  });
  test('should take min and max into account', function () {
    expect((0, _dataToPoints["default"])({
      data: [1, 2, 3, 4],
      width: 6,
      height: 10,
      max: 2,
      min: 3
    })).toEqual([{
      x: 0,
      y: -10
    }, {
      x: 2,
      y: 0
    }, {
      x: 4,
      y: 10
    }, {
      x: 6,
      y: 20
    }]);
  });
  test('should return y == height for 0 and null values', function () {
    expect((0, _dataToPoints["default"])({
      data: [0]
    })).toEqual([{
      x: 0,
      y: 0.5
    }]);
    expect((0, _dataToPoints["default"])({
      data: [0, null, 0]
    })).toEqual([{
      x: 0,
      y: 0.5
    }, {
      x: 0.5,
      y: 0.5
    }, {
      x: 1,
      y: 0.5
    }]);
  });
});
//# sourceMappingURL=dataToPoints.test.js.map