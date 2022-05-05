"use strict";

var _crFn = require("../crFn");

describe('crError', () => {
  const fn = _crFn.crError;
  it('should create err obj', () => {
    expect(fn('caption', 'msg')).toEqual({
      errCaption: 'caption',
      message: 'msg'
    });
  });
  it('should replace void 0 values by default values', () => {
    expect(fn()).toEqual({
      errCaption: '',
      message: 'No data available for request.'
    });
  });
});
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
//# sourceMappingURL=crFn.test.js.map