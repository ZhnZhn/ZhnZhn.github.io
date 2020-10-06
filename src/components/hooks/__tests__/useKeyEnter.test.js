import {renderHook, act} from '@testing-library/react-hooks'
import useKeyEnter from '../useKeyEnter'

describe('useKeyEnter', ()=>{
  test('should return fn onKeyEnter depended of deps', ()=>{
    const onEnter = jest.fn()
    //1 Test return type
    , {
      result,
      rerender
    } = renderHook(({ onEnter })=>useKeyEnter(onEnter, [onEnter]), {
      initialProps: { onEnter }
    })

    const _onKeyEnter = result.current;
    expect(typeof _onKeyEnter).toBe('function')
    expect(onEnter).toHaveBeenCalledTimes(0)

    //2 Test KeyDown
    //2.1 KeyDown Enter
    const _eventEnter = {keyCode: 13}
    act(() => _onKeyEnter(_eventEnter))
    expect(result.current).toEqual(_onKeyEnter)
    expect(onEnter).toHaveBeenCalledTimes(1)
    expect(onEnter.mock.calls[0][0]).toBe(_eventEnter)

    //2.2 KeyDown Blank
    const _eventBlank = {keyCode: 32}
    act(() => _onKeyEnter(_eventBlank))
    expect(result.current).toEqual(_onKeyEnter)
    expect(onEnter).toHaveBeenCalledTimes(2)
    expect(onEnter.mock.calls[1][0]).toBe(_eventBlank)

    //2.2 KeyDown not onEnter
    const _eventNotEnter = {keyCode: 20}
    act( () => _onKeyEnter(_eventNotEnter))
    expect(onEnter).toHaveBeenCalledTimes(2)

    //3 Test rerender for return instance depended on deps
    //3.1 With same onEnter
    rerender({ onEnter })
    expect(_onKeyEnter).toEqual(result.current)
    //3.2 With new onEnter
    rerender({ onEnter: jest.fn() })
    expect(_onKeyEnter).not.toEqual(result.current)

  })
  test('should return same fn in case of empty deps', ()=>{
    const onEnter = jest.fn()
    //1 Test return type
    , {
      result,
      rerender
    } = renderHook(({ onEnter })=>useKeyEnter(onEnter), {
      initialProps: { onEnter }
    })

    const _onKeyEnter = result.current;
    expect(typeof _onKeyEnter).toBe('function')

    //2 Test rerender
    //2.1 With same onEnter
    rerender({ onEnter })
    expect(_onKeyEnter).toEqual(result.current)

    //2.2 With new onEnter
    rerender({ onEnter: jest.fn() })
    expect(_onKeyEnter).toEqual(result.current)

    //2.3 With empty onEnter
    rerender()
    expect(_onKeyEnter).toEqual(result.current)
  })
})
