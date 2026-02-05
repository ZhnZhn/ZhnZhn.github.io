"use strict";

var _styleFn = require("../styleFn");
describe('crStyle2', () => {
  const fn = _styleFn.crStyle2;
  test('should create style from two parameters', () => {
    const _s1 = {
        width: 10
      },
      _s2 = {
        width: 20,
        height: 20
      },
      _isFalseStyle = false;
    const _r = fn(_s1, _s2);
    expect(_r).toEqual({
      ..._s1,
      ..._s2
    });
    expect(_r).not.toBe(_s1);
    expect(_r).not.toBe(_s2);
    expect(fn(_s1, _isFalseStyle && _s2)).toBe(_s1);
  });
});
describe('crStyle3', () => {
  const fn = _styleFn.crStyle3;
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
      },
      _isFalseStyle = false;
    const _r1 = fn(_s1, _s2, _s3);
    expect(_r1).toEqual({
      ..._s1,
      ..._s2,
      ..._s3
    });
    expect(_r1).not.toBe(_s1);
    expect(_r1).not.toBe(_s2);
    expect(_r1).not.toBe(_s3);
    const _r2 = fn(_s1, _s2, _isFalseStyle && _s3);
    expect(_r2).toEqual({
      ..._s1,
      ..._s2
    });
    expect(_r2).not.toBe(_s1);
    expect(_r2).not.toBe(_s2);
    expect(_r2).not.toBe(_s3);
    const _r3 = fn(_s1, _isFalseStyle && _s2, _s3);
    expect(_r3).toEqual({
      ..._s1,
      ..._s3
    });
    expect(_r3).not.toBe(_s1);
    expect(_r3).not.toBe(_s2);
    expect(_r3).not.toBe(_s3);

    /*eslint-disable no-constant-binary-expression*/
    expect(fn(_s1, null && _s2, void 0 && _s3)).toBe(_s1);
    expect(fn(_s1, '' && _s2, 0 && _s3)).toBe(_s1);
    expect(fn(_s1, NaN && _s2, -0 && _s3)).toBe(_s1);
    /*eslint-enable no-constant-binary-expression*/
  });
});
describe('crAbsoluteTopLeftStyle', () => {
  const fn = _styleFn.crAbsoluteTopLeftStyle;
  test('should return aabsolute top let style', () => {
    expect(fn(0, 5)).toEqual({
      position: 'absolute',
      top: 0,
      left: 5
    });
  });
  test('should use case arguments isRight, isBottom', () => {
    expect(fn(0, 5, !0)).toEqual({
      position: 'absolute',
      top: 0,
      right: 5
    });
    expect(fn(0, 5, !1, !0)).toEqual({
      position: 'absolute',
      bottom: 0,
      left: 5
    });
    expect(fn(0, 5, !0, !0)).toEqual({
      position: 'absolute',
      bottom: 0,
      right: 5
    });
  });
});
//# sourceMappingURL=crStyle.test.js.map