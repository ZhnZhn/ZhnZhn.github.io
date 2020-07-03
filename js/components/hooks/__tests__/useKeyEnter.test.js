"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reactHooks = require("@testing-library/react-hooks");

var _useKeyEnter = _interopRequireDefault(require("../useKeyEnter"));

describe('useKeyEnter', function () {
  test('should return same onKeyEnter and call param fn on KeyEnter event', function () {
    var fn = jest.fn(function () {});

    var _renderHook = (0, _reactHooks.renderHook)(function () {
      return (0, _useKeyEnter["default"])(fn);
    }),
        result = _renderHook.result;

    var _onKeyEnter = result.current;
    expect(typeof _onKeyEnter).toBe('function');
    expect(fn).toHaveBeenCalledTimes(0);
    (0, _reactHooks.act)(function () {
      return _onKeyEnter({
        keyCode: 13
      });
    });
    expect(result.current).toEqual(_onKeyEnter);
    expect(fn).toHaveBeenCalledTimes(1);
    (0, _reactHooks.act)(function () {
      return _onKeyEnter({
        keyCode: 32
      });
    });
    expect(result.current).toEqual(_onKeyEnter);
    expect(fn).toHaveBeenCalledTimes(2);
    (0, _reactHooks.act)(function () {
      return _onKeyEnter({
        keyCode: 20
      });
    });
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
//# sourceMappingURL=useKeyEnter.test.js.map