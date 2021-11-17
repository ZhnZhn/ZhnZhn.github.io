"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _arrangeSeriaByCategories = _interopRequireDefault(require("../arrangeSeriaByCategories"));

describe('arrangeSeriaByCategories', () => {
  const fn = _arrangeSeriaByCategories.default;
  test('should arrange seria data by categories', () => {
    const categories = ['a1', 'a2', 'a3'],
          seria = {
      data: [{
        'c': 'a3'
      }, {
        c: 'a4'
      }, {
        c: 'a1'
      }]
    };
    expect(fn(seria, categories)).toEqual({
      data: [{
        c: 'a1'
      }, null, {
        c: 'a3'
      }]
    });
  });
});
//# sourceMappingURL=arrangeSeriaByCategories.test.js.map