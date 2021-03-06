import {renderHook, act} from '@testing-library/react-hooks'
import useInputKeyDown from '../useInputKeyDown'

describe('useInputKeyDown', ()=>{
  test('should return handle for input KeyDown', ()=>{
    const onEnter = jest.fn()
    , onDelete = jest.fn();
    let initialValue = 'a';

    const { result, rerender } = renderHook(
      ({ onEnter, onDelete, initialValue})=>useInputKeyDown({onEnter, onDelete}, [initialValue]),
      { initialProps: {
       onEnter, onDelete,
       initialValue
      }}
    )

    //1 Test return type
    let onKeyDown = result.current
    expect(typeof onKeyDown).toBe('function')

    //2.1 Test onEnter with event.target.value
    act(() => onKeyDown({ keyCode: 13, target: { value: 'a'} }))
    expect(onEnter).toHaveBeenCalledTimes(1)
    expect(onEnter.mock.calls[0][0]).toBe('a')

    //3.1 Test onDelete for Escape
    const preventDefault = jest.fn()
    act(() => onKeyDown({ keyCode: 27, preventDefault }))
    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(preventDefault).toHaveBeenCalledTimes(1)
    //3.2 Test onDelete for Delete
    act(() => onKeyDown({ keyCode: 46, preventDefault }))
    expect(onDelete).toHaveBeenCalledTimes(2)
    expect(preventDefault).toHaveBeenCalledTimes(2)


    //4 Test rerender with new deps
    initialValue = 'b'
    rerender({ onEnter: void 0, initialValue })
    //4.1 Test return new function
    expect(typeof result.current).toBe('function')
    expect(result.current).not.toBe(onKeyDown)
    //2.2 Test onEnter without fn
    act(() => result.current({ keyCode: 13 }))
    expect(onEnter).toHaveBeenCalledTimes(1)
    
  })
})
