import {
  renderHook,
  act
} from '@testing-library/react';
import { useFnFocus } from '../useFocus';

const _getHookRef = result => result.current[0];
const _getHookFn = result => result.current[1];

const _actHookFn = (
  result,
  hookFn,
  fn,
  focus,
  timesFn,
  timesFocus
) => {
  act(hookFn)
  expect(_getHookFn(result)).toEqual(hookFn)
  expect(fn).toBeCalledTimes(timesFn)
  expect(focus).toBeCalledTimes(timesFocus)
};

describe('useFnFocus', ()=>{
  test('should after call fn call ref focus', ()=>{
    const fn = jest.fn()
    , focus = jest.fn();

    const { result } = renderHook(() => useFnFocus(fn));
    const ref = _getHookRef(result);
    ref.current = { focus }
    const hookFn = _getHookFn(result);
    expect(typeof hookFn).toBe('function')

    const _actFnFocus = _actHookFn.bind(null, result, hookFn, fn, focus);
    _actFnFocus(1, 1)
    _actFnFocus(2, 2)

    ref.current.focus = null
    _actFnFocus(3, 2)

    ref.current = null
    _actFnFocus(4, 2)
  })
})
