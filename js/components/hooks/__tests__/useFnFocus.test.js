"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reactHooks = require("@testing-library/react-hooks");

var _useFnFocus = _interopRequireDefault(require("../useFnFocus"));

describe('useFnFocus', function () {
  test('should after call fn call ref focus', function () {
    var _fn = jest.fn(function () {});

    var _focus = jest.fn(function () {});

    var _renderHook = (0, _reactHooks.renderHook)(function () {
      return (0, _useFnFocus["default"])(_fn);
    }),
        result = _renderHook.result;

    var _ref = result.current[0];
    _ref.current = {
      focus: _focus
    };
    var _doFnFocus = result.current[1];
    expect(typeof _doFnFocus).toBe('function');
    (0, _reactHooks.act)(_doFnFocus);
    expect(result.current[1]).toEqual(_doFnFocus);
    expect(_fn).toBeCalledTimes(1);
    expect(_ref.current.focus).toBeCalledTimes(1);
    (0, _reactHooks.act)(_doFnFocus);
    expect(_fn).toBeCalledTimes(2);
    expect(_ref.current.focus).toBeCalledTimes(2);
    _ref.current.focus = null;
    (0, _reactHooks.act)(_doFnFocus);
    expect(_fn).toBeCalledTimes(3);
    expect(_focus).toBeCalledTimes(2);
    _ref.current = null;
    (0, _reactHooks.act)(_doFnFocus);
    expect(_fn).toBeCalledTimes(4);
    expect(_focus).toBeCalledTimes(2);
  });
});
//# sourceMappingURL=useFnFocus.test.js.map