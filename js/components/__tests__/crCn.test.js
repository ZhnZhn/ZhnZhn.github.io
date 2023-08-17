"use strict";

var _styleFn = require("../styleFn");
describe('crCn', () => {
  test('should create className for two arguments', () => {
    expect((0, _styleFn.crCn)(void 0, void 0)).toBe(undefined);
    expect((0, _styleFn.crCn)('a', void 0)).toBe('a');
    expect((0, _styleFn.crCn)(void 0, 'b')).toBe('b');
    expect((0, _styleFn.crCn)('a', 'b')).toBe('a b');
    expect((0, _styleFn.crCn)([true, 'a'], 'b')).toBe('a b');
    expect((0, _styleFn.crCn)([false, 'a'], 'b')).toBe('b');
    expect((0, _styleFn.crCn)([true, 'a'], void 0)).toBe('a');
    expect((0, _styleFn.crCn)([false, 'a'], void 0)).toBe(undefined);
    expect((0, _styleFn.crCn)('a', [true, 'b'])).toBe('a b');
    expect((0, _styleFn.crCn)('a', [false, 'b'])).toBe('a');
    expect((0, _styleFn.crCn)(void 0, [true, 'b'])).toBe('b');
    expect((0, _styleFn.crCn)(void 0, [false, 'b'])).toBe(undefined);
    expect((0, _styleFn.crCn)([true, 'a'], [true, 'b'])).toBe('a b');
    expect((0, _styleFn.crCn)([false, 'a'], [true, 'b'])).toBe('b');
    expect((0, _styleFn.crCn)([false, 'a'], [false, 'b'])).toBe(undefined);
    expect((0, _styleFn.crCn)([true, 'a'], [false, 'b'])).toBe('a');
    expect((0, _styleFn.crCn)([true, void 0], [true, void 0])).toBe(undefined);
    expect((0, _styleFn.crCn)([true, 'a'], [true, void 0])).toBe('a');
    expect((0, _styleFn.crCn)([false, 'a'], [true, void 0])).toBe(undefined);
    expect((0, _styleFn.crCn)([true, void 0], [true, 'b'])).toBe('b');
    expect((0, _styleFn.crCn)([true, void 0], [false, 'b'])).toBe(undefined);
  });
});
//# sourceMappingURL=crCn.test.js.map