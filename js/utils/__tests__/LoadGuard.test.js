"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _LoadGuard = _interopRequireDefault(require("../LoadGuard"));

describe('LoadGuard', function () {
  test('should sync reset by stop', function () {
    var guard = new _LoadGuard["default"](1000);
    guard.start('url');
    expect(guard.isLoading).toBe(true);
    guard.stop();
    expect(guard.isLoading).toBe(false);
  });
  test('should async reset by stop', function () {
    var guard = new _LoadGuard["default"](1000);
    guard.start('url');
    expect(guard.isLoading).toBe(true);
    setTimeout(function () {
      guard.stop();
      expect(guard.isLoading).toBe(false);
    }, 200);
  });
  test('should reset guard after timeout', function () {
    var guard = new _LoadGuard["default"](1000);
    expect(guard.isLoading).toBe(false);
    guard.start('url');
    expect(guard.isLoading).toBe(true);
    setTimeout(function () {
      expect(guard.isLoading).toBe(true);
    }, 500);
    setTimeout(function () {
      expect(guard.isLoading).toBe(false);
    }, 1500);
  });
  test('start method should return true if started', function () {
    var guard = new _LoadGuard["default"](1000);
    expect(guard.start('url')).toBe(true);
    expect(guard.isLoading).toBe(true);
    expect(guard.start('url2')).toBe(false);
    expect(guard.isLoading).toBe(true);
    setTimeout(function () {
      expect(guard.isLoading).toBe(false);
    }, 1500);
  });
});
//# sourceMappingURL=LoadGuard.test.js.map