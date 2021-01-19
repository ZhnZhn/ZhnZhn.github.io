"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reactHooks = require("@testing-library/react-hooks");

var _useFnFocus = _interopRequireDefault(require("../useFnFocus"));

var _getHookRef = function _getHookRef(result) {
  return result.current[0];
};

var _getHookFn = function _getHookFn(result) {
  return result.current[1];
};

var _actHookFn = function _actHookFn(result, hookFn, fn, focus, timesFn, timesFocus) {
  (0, _reactHooks.act)(hookFn);
  expect(_getHookFn(result)).toEqual(hookFn);
  expect(fn).toBeCalledTimes(timesFn);
  expect(focus).toBeCalledTimes(timesFocus);
};

describe('useFnFocus', function () {
  test('should after call fn call ref focus', function () {
    var fn = jest.fn(),
        focus = jest.fn();

    var _renderHook = (0, _reactHooks.renderHook)(function () {
      return (0, _useFnFocus["default"])(fn);
    }),
        result = _renderHook.result;

    var ref = _getHookRef(result);

    ref.current = {
      focus: focus
    };

    var hookFn = _getHookFn(result);

    expect(typeof hookFn).toBe('function');

    var _actFnFocus = _actHookFn.bind(null, result, hookFn, fn, focus);

    _actFnFocus(1, 1);

    _actFnFocus(2, 2);

    ref.current.focus = null;

    _actFnFocus(3, 2);

    ref.current = null;

    _actFnFocus(4, 2);
  });
});
//# sourceMappingURL=useFnFocus.test.js.map