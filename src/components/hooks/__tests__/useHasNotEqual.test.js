import { renderHook } from '@testing-library/react';
import useHasNotEqual from '../useHasNotEqual';

const _getHas = result => result.current;

const _rerender = (result, rerender, value, expectedResult ) => {
  rerender({ value })
  expect(_getHas(result)).toBe(expectedResult)
};

describe('useHasNotEqual', ()=>{
  test('should return false for initial render and for same value for next rerender', ()=>{
    const is = true
    , {
      result,
      rerender
    } = renderHook(({value}) => useHasNotEqual(value), {
      initialProps: { value: is }
    });

    expect(_getHas(result)).toBe(false)

    const _testRerender = _rerender.bind(null, result, rerender)

    // for bool
    _testRerender(is, false)
    _testRerender(false, true)
    _testRerender(!is, false)
    _testRerender(is, true)
    _testRerender(is, false)
    _testRerender(is, false)

    // for object
    const obj = {};
    _testRerender(obj, true)
    _testRerender(obj, false)
    _testRerender({}, true)
    _testRerender({}, true)
    _testRerender(obj, true)
    _testRerender(obj, false)
    _testRerender(obj, false)

  })
})
