import { renderHook } from '@testing-library/react';
import { useRefBool } from '../useProperty';

const _getRef = result => result.current[0];
const _getSetTrue = result => result.current[1];
const _getSetFalse = result => result.current[2];

describe('useRefBool', ()=>{
  test('should return tuple with ref and constant setTrue and setFalse across rendering', ()=>{
    const initialValue = true
    , {
      result,
      rerender
    } = renderHook(() => useRefBool(initialValue));

    //1 Initial render and return value
    const _ref = _getRef(result)
    , _setTrue = _getSetTrue(result)
    , _setFalse = _getSetFalse(result);
    expect(_ref.current).toBe(initialValue)

    //2 setFalse and setTrue value
    _setFalse()
    expect(_ref.current).toBe(false)
    _setTrue()
    expect(_ref.current).toBe(true)
    _setFalse()
    expect(_ref.current).toBe(false)

    // Rerender
    rerender()
    const _ref2 = _getRef(result)
    , _setTrue2 = _getSetTrue(result)
    , _setFalse2 = _getSetFalse(result);
    expect(_ref2.current).toBe(false)
    expect(_ref2).toBe(_ref)
    expect(_setTrue2).toBe(_setTrue)
    expect(_setFalse2).toBe(_setFalse)

    //setTrue and setFalse value
    _setTrue2()
    expect(_ref.current).toBe(true)
    _setFalse2()
    expect(_ref.current).toBe(false)
  })
})
