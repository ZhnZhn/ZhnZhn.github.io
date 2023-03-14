"use strict";

var _crStyle = require("../crStyle");
describe('crStyle2', () => {
  const fn = _crStyle.crStyle2;
  test('should create style from two parameters', () => {
    const _s1 = {
        width: 10
      },
      _s2 = {
        width: 20,
        height: 20
      };
    const _r = fn(_s1, _s2);
    expect(_r).toEqual({
      ..._s1,
      ..._s2
    });
    expect(_r).not.toBe(_s1);
    expect(_r).not.toBe(_s2);
    expect(fn(_s1, false && _s2)).toBe(_s1);
  });
});
describe('crStyle', () => {
  const fn = _crStyle.crStyle;
  it('should create style from arr', () => {
    const _s1 = {
        width: 10
      },
      _s2 = {
        width: 20,
        height: 20
      };
    expect(fn()).toEqual({});
    const _r1 = fn(_s1, _s2);
    expect(_r1).toEqual({
      ..._s1,
      ..._s2
    });
    expect(_r1).not.toBe(_s1);
    expect(_r1).not.toBe(_s2);
    const _r2 = fn(_s1, false, null, void 0, NaN, '', 0, _s2);
    expect(_r2).toEqual({
      ..._s1,
      ..._s2
    });
    expect(_r2).not.toBe(_s1);
    expect(_r2).not.toBe(_s2);
  });
});
//# sourceMappingURL=crStyle.test.js.map