import { renderHook } from '@testing-library/react';
import useHasNotEqual from '../useHasNotEqual';

const _getHas = result => result.current[0];
const _getIsCurrentValue = result => result.current[1];

const _rerender = (isCurrentValue, result, rerender, value, expectedResult ) => {
  rerender({ value })
  expect(_getHas(result)).toBe(expectedResult)
  const _isCurrentValue = _getIsCurrentValue(result);
  expect(_isCurrentValue).toBe(isCurrentValue)
  expect(_isCurrentValue(value)).toBe(true)
};

describe('useHasNotEqual', ()=>{
  //'isNotEqual false for initial render and for same value for next rerender'
  test('should return tuple [isNotEqual: boolean, isCurrentValue: function]', ()=>{
    const is = true
    , {
      result,
      rerender
    } = renderHook(({value}) => useHasNotEqual(value), {
      initialProps: { value: is }
    });

    expect(_getHas(result)).toBe(false)
    const isCurrentValue = _getIsCurrentValue(result)
    expect(typeof isCurrentValue).toBe("function")

    const _testRerender = _rerender.bind(null,
      isCurrentValue,
      result,
      rerender
    )

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
