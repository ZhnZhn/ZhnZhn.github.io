"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _categoryRate = _interopRequireDefault(require("../categoryRate"));

describe('categoryRate', function () {
  test('should return array with calculated values', function () {
    var sc = 'blue',
        rc = 'green';
    expect((0, _categoryRate["default"])([{
      y: 10,
      category: 'A',
      color: sc
    }, {
      y: 10,
      category: 'B',
      color: 'cayn'
    }], [{
      y: 5,
      category: 'A'
    }, {
      y: 0,
      category: 'B'
    }], {
      rc: rc,
      sc: sc
    })).toEqual([{
      y: 2,
      id: 'A',
      c: 'A',
      color: rc,
      status: void 0
    }, {
      y: 0,
      id: 'B',
      c: 'B',
      color: 'cayn',
      status: void 0
    }]);
  });
});
//# sourceMappingURL=categoryRate.test.js.map