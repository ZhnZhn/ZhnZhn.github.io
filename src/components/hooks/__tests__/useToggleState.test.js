import {
  renderHook,
  act
} from '@testing-library/react';
import useToggleState from '../useToggleState';

const _getState = result => result.current[0]
, _getToggle = result => result.current[1];

/* eslint-disable react-hooks/rules-of-hooks */
const _renderInitialTest = (initialValue, expectedValue) => {
  const {result} = renderHook(() => useToggleState(initialValue));
  expect(_getState(result)).toEqual(expectedValue)

  const toggle = _getToggle(result);
  expect(typeof toggle).toBe('function')
  return [result, toggle];
};
/* eslint-enable react-hooks/rules-of-hooks */

describe('useToggleState', () =>{
  test('should return object state and reference equal function toggle', ()=>{
    const initialState = {
      prop1: true,
      prop2: true
    }
    , [result, toggle] = _renderInitialTest(initialState, initialState);

    act(() => toggle('prop1'))
    expect(_getState(result)).toEqual({
      prop1: false,
      prop2: true
    })
    expect(_getToggle(result)).toEqual(toggle)

    act(() => toggle('prop2'))
    expect(_getState(result)).toEqual({
      prop1: false,
      prop2: false
    })
    expect(_getToggle(result)).toEqual(toggle)

    act(() => toggle('prop1'))
    expect(_getState(result)).toEqual({
      prop1: true,
      prop2: false
    })
    expect(_getToggle(result)).toEqual(toggle)

    act(() => toggle('prop3'))
    expect(_getState(result)).toEqual({
      prop1: true,
      prop2: false,
      prop3: true
    })
    expect(_getToggle(result)).toEqual(toggle)
  })

  test('should init empty object state by default', ()=>{
    _renderInitialTest(void 0, {});
  })

  test('should also use function as initialValue', ()=>{
    const _initialState = {
      prop1: true
    }
    , _initialValue = () => _initialState;
    _renderInitialTest(_initialValue, _initialState);
  })

})
