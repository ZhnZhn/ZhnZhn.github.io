"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _crCn = _interopRequireDefault(require("../crCn"));

describe('crCn', function () {
  test('should create className for two arguments', function () {
    expect((0, _crCn["default"])(void 0, void 0)).toBe(undefined);
    expect((0, _crCn["default"])('a', void 0)).toBe('a');
    expect((0, _crCn["default"])(void 0, 'b')).toBe('b');
    expect((0, _crCn["default"])('a', 'b')).toBe('a b');
    expect((0, _crCn["default"])([true, 'a'], 'b')).toBe('a b');
    expect((0, _crCn["default"])([false, 'a'], 'b')).toBe('b');
    expect((0, _crCn["default"])([true, 'a'], void 0)).toBe('a');
    expect((0, _crCn["default"])([false, 'a'], void 0)).toBe(undefined);
    expect((0, _crCn["default"])('a', [true, 'b'])).toBe('a b');
    expect((0, _crCn["default"])('a', [false, 'b'])).toBe('a');
    expect((0, _crCn["default"])(void 0, [true, 'b'])).toBe('b');
    expect((0, _crCn["default"])(void 0, [false, 'b'])).toBe(undefined);
    expect((0, _crCn["default"])([true, 'a'], [true, 'b'])).toBe('a b');
    expect((0, _crCn["default"])([false, 'a'], [true, 'b'])).toBe('b');
    expect((0, _crCn["default"])([false, 'a'], [false, 'b'])).toBe(undefined);
    expect((0, _crCn["default"])([true, 'a'], [false, 'b'])).toBe('a');
    expect((0, _crCn["default"])([true, void 0], [true, void 0])).toBe(undefined);
    expect((0, _crCn["default"])([true, 'a'], [true, void 0])).toBe('a');
    expect((0, _crCn["default"])([false, 'a'], [true, void 0])).toBe(undefined);
    expect((0, _crCn["default"])([true, void 0], [true, 'b'])).toBe('b');
    expect((0, _crCn["default"])([true, void 0], [false, 'b'])).toBe(undefined);
  });
});
//# sourceMappingURL=crCn.test.js.map