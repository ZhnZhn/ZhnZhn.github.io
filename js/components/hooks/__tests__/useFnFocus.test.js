"use strict";

var _react = require("@testing-library/react");
var _useFocus = require("../useFocus");
const _getHookRef = result => result.current[0];
const _getHookFn = result => result.current[1];
const _actHookFn = (result, hookFn, fn, focus, timesFn, timesFocus) => {
  (0, _react.act)(hookFn);
  expect(_getHookFn(result)).toEqual(hookFn);
  expect(fn).toHaveBeenCalledTimes(timesFn);
  expect(focus).toHaveBeenCalledTimes(timesFocus);
};
describe('useFnFocus', () => {
  test('should after call fn call ref focus', () => {
    const fn = jest.fn(),
      focus = jest.fn();
    const {
      result
    } = (0, _react.renderHook)(() => (0, _useFocus.useFnFocus)(fn));
    const ref = _getHookRef(result);
    ref.current = {
      focus
    };
    const hookFn = _getHookFn(result);
    expect(typeof hookFn).toBe('function');
    const _actFnFocus = _actHookFn.bind(null, result, hookFn, fn, focus);
    _actFnFocus(1, 1);
    _actFnFocus(2, 2);
    ref.current.focus = null;
    _actFnFocus(3, 2);
    ref.current = null;
    _actFnFocus(4, 2);
  });
});
//# sourceMappingURL=useFnFocus.test.js.map