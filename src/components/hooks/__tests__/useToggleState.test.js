import {
  renderHook,
  act
} from '@testing-library/react';
import { useToggleState } from '../useToggle';

const _getState = result => result.current[0]
, _getToggle = result => result.current[1];

const _renderInitialTest = (
  initialValue,
  expectedValue
) => {
  const { result } = renderHook(() => useToggleState(initialValue));
  expect(_getState(result)).toEqual(expectedValue)

  const toggle = _getToggle(result);
  expect(typeof toggle).toBe('function')
  return [result, toggle];
};

describe('useToggleState', () =>{
  test('should return object state and reference equal function toggle', ()=>{
    const initialState = {
      prop1: true,
      prop2: true
    }
    , [
      result,
      toggle
    ] = _renderInitialTest(initialState, initialState);

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

  test('should update state by plain object with own boolean properties',()=>{
    const initialState = {
      prop1: true,
      prop2: true
    }
    , [
      result,
      toggle
    ] = _renderInitialTest(initialState, initialState);

    act(() => toggle({ prop1: false, prop2: false }))
    const _result1 = _getState(result)
    expect(_result1).toEqual({
      prop1: false,
      prop2: false
    })

    act(() => toggle({ prop1: false, prop2: false }))
    expect(_getState(result)).toBe(_result1)

    act(() => toggle(Object.create({ prop3: true })))
    expect(_getState(result)).toBe(_result1)

    act(() => toggle({ prop1: 'true', prop2: 1, prop3: true }))
    expect(_getState(result)).toBe(_result1)

    act(() => toggle({}))
    expect(_getState(result)).toBe(_result1)

    act(() => toggle(null))
    expect(_getState(result)).toBe(_result1)

    act(() => toggle())
    expect(_getState(result)).toBe(_result1)

    act(() => toggle(0))
    expect(_getState(result)).toBe(_result1)

    act(() => toggle(true))
    expect(_getState(result)).toBe(_result1)

    act(() => toggle({ prop3: true }))
    expect(_getState(result)).toEqual({
      prop1: false,
      prop2: false,
      prop3: true
    })

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
