import {renderHook, act} from '@testing-library/react-hooks'
import useToggle from '../useToggle'

describe('useToggle', ()=>{
  test('should toggle state from default initialValue false', ()=>{
    const {result} = renderHook(() => useToggle());

    //assert initial state
    expect(result.current[0]).toBe(false)
    const _toggle = result.current[1]
    expect(typeof _toggle).toBe('function')

    //toggle && assert new state
    act(result.current[1])
    expect(result.current[0]).toBe(true)
    expect(result.current[1]).toEqual(_toggle)

    //toggle && assert new state
    act(result.current[1])
    expect(result.current[0]).toBe(false)
    expect(result.current[1]).toEqual(_toggle)
  })
  test('should use bool initialValue', ()=>{
    const {result} = renderHook(() => useToggle(true));

    //assert initial state
    expect(result.current[0]).toBe(true)

    //toggle && assert new state
    act(result.current[1])
    expect(result.current[0]).toBe(false)
  })
  test('should convert to bool initialValue', ()=>{    
    const {result} = renderHook(() => useToggle(null));
    expect(result.current[0]).toBe(false)
    const {result:r2} = renderHook(() => useToggle(''));
    expect(r2.current[0]).toBe(false)
    const {result:r3} = renderHook(() => useToggle(0));
    expect(r3.current[0]).toBe(false)
    const {result:r4} = renderHook(() => useToggle(NaN));
    expect(r4.current[0]).toBe(false)

    const {result:r5} = renderHook(() => useToggle(1));
    expect(r5.current[0]).toBe(true)
    const {result:r6} = renderHook(() => useToggle('str'));
    expect(r6.current[0]).toBe(true)
  })
})
