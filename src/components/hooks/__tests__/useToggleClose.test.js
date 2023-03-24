import {
  renderHook,
  act
} from '@testing-library/react';
import useToggleClose from '../useToggleClose';

const _getState = result => result.current[0]
, _getToggle = result => result.current[1]
, _getClose = result => result.current[2];

/* eslint-disable react-hooks/rules-of-hooks */
const _renderInitialTest = (
  initialValue,
  expectedValue
) => {
  const {
    result
  } = renderHook(() => useToggleClose(initialValue));
  expect(_getState(result)).toBe(expectedValue)

  const toggle = _getToggle(result)
  , close = _getClose(result);
  expect(typeof toggle).toBe('function')
  expect(typeof close).toBe('function')
  return [
    result,
    toggle,
    close
  ];
};
/* eslint-enable react-hooks/rules-of-hooks */

describe('useToggleClose', ()=>{
  test('should return tuple with boolean state, by default false, and reference equal functions toggle, close',()=>{
    const [
      result,
      toggle,
      close
    ] = _renderInitialTest(void 0, false);

    act(() => toggle())
    expect(_getState(result)).toBe(true)
    expect(_getToggle(result)).toBe(toggle)
    expect(_getClose(result)).toBe(close)

    act(() => close())
    expect(_getState(result)).toBe(false)
    expect(_getToggle(result)).toBe(toggle)
    expect(_getClose(result)).toBe(close)

    act(() => toggle())
    expect(_getState(result)).toBe(true)
    expect(_getToggle(result)).toBe(toggle)
    expect(_getClose(result)).toBe(close)
  })
  test('should use boolean initialValue parameter', ()=>{
    _renderInitialTest(false, false);
    _renderInitialTest(true, true);
  })
  test('should convert initialValue to boolean', ()=>{
    _renderInitialTest(null, false)
    _renderInitialTest(void 0, false)
    _renderInitialTest('', false)
    _renderInitialTest(0, false)
    _renderInitialTest(NaN, false)

    _renderInitialTest(1, true)
    _renderInitialTest('str', true)
  })
})
