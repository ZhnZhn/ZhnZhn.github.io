"use strict";

var _crFn = require("../crFn");

describe('crHm', () => {
  it('should create object with null prototype', () => {
    const hm = (0, _crFn.crHm)();
    expect(Object.getPrototypeOf(hm)).toBe(null);
    expect(hm.toString).toBe(void 0);
    expect(hm.valueOf).toBe(void 0);
  });
  it('should add props from arg', () => {
    const props = {
      a: 'a',
      b: 'b'
    };
    expect((0, _crFn.crHm)(props)).toEqual(props);
  });
});
describe('crItemConf', () => {
  const fn = _crFn.crItemConf;
  it('should create obj with item conf', () => {
    expect(fn({
      title: 'title',
      subtitle: null,
      itemCaption: void 0
    })).toEqual({
      title: 'title'
    });
  });
});
describe('crValueConf', () => {
  const fn = _crFn.crValueConf;
  it('should return {x, y} recent point from data', () => {
    expect(fn([[3, 3], [1, 2]])).toEqual({
      x: 1,
      y: 2
    });
    expect(fn([{
      x: 3,
      y: 3
    }, {
      x: 1,
      y: 2
    }])).toEqual({
      x: 1,
      y: 2
    });
  });
  it('should use str 0.0 for y not number', () => {
    expect(fn([[3, 3], [1, null]])).toEqual({
      x: 1,
      y: '0.0'
    });
    expect(fn([{
      x: 3,
      y: 3
    }, {
      x: 1,
      y: NaN
    }])).toEqual({
      x: 1,
      y: '0.0'
    });
  });
});
//# sourceMappingURL=crFn.test.js.map