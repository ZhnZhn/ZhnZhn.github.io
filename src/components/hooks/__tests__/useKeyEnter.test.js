import {renderHook, act} from '@testing-library/react-hooks'
import useKeyEnter from '../useKeyEnter'

describe('useKeyEnter', ()=>{
  test('should return same onKeyEnter and call param fn on KeyEnter event', ()=>{
    const fn = jest.fn(()=>{})
    const { result } = renderHook(()=>useKeyEnter(fn))

    const _onKeyEnter = result.current;
    expect(typeof _onKeyEnter).toBe('function')
    expect(fn).toHaveBeenCalledTimes(0)

    act(() => _onKeyEnter({keyCode: 13}))
    expect(result.current).toEqual(_onKeyEnter)
    expect(fn).toHaveBeenCalledTimes(1)

    act(() => _onKeyEnter({keyCode: 32}))
    expect(result.current).toEqual(_onKeyEnter)
    expect(fn).toHaveBeenCalledTimes(2)

    act( () => _onKeyEnter({keyCode: 20}))
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
