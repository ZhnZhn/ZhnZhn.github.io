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
describe('crStyle3', () => {
  const fn = _crStyle.crStyle3;
  test('should create style from three parameters', () => {
    const _s1 = {
        width: 10
      },
      _s2 = {
        width: 20,
        height: 20
      },
      _s3 = {
        height: 30
      };
    const _r1 = fn(_s1, _s2, _s3);
    expect(_r1).toEqual({
      ..._s1,
      ..._s2,
      ..._s3
    });
    expect(_r1).not.toBe(_s1);
    expect(_r1).not.toBe(_s2);
    expect(_r1).not.toBe(_s3);
    const _r2 = fn(_s1, _s2, false && _s3);
    expect(_r2).toEqual({
      ..._s1,
      ..._s2
    });
    expect(_r2).not.toBe(_s1);
    expect(_r2).not.toBe(_s2);
    expect(_r2).not.toBe(_s3);
    const _r3 = fn(_s1, false && _s2, _s3);
    expect(_r3).toEqual({
      ..._s1,
      ..._s3
    });
    expect(_r3).not.toBe(_s1);
    expect(_r3).not.toBe(_s2);
    expect(_r3).not.toBe(_s3);
    expect(fn(_s1, null && _s2, void 0 && _s3)).toBe(_s1);
    expect(fn(_s1, '' && _s2, 0 && _s3)).toBe(_s1);
    expect(fn(_s1, NaN && _s2, -0 && _s3)).toBe(_s1);
  });
});
//# sourceMappingURL=crStyle.test.js.map