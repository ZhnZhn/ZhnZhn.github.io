import {renderHook, act} from '@testing-library/react-hooks'
import useKeyEscape from '../useKeyEscape'

import factorySameFnForEmptyDeps from './_factorySameFnForEmptyDeps'

describe('useKeyEscape', ()=>{
  test('', ()=>{
    const onEscape = jest.fn()
    //1 Test return type
    , {
      result,
      rerender
    } = renderHook(({ onEscape })=>useKeyEscape(onEscape, [onEscape]), {
      initialProps: { onEscape }
    })

    const _onKeyEscape = result.current;
    expect(typeof _onKeyEscape).toBe('function')
    expect(onEscape).toHaveBeenCalledTimes(0)

    //2 Test KeyDown
    //2.1 KeyDown Escape
    const _eventEscape = {
      keyCode: 27,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    }
    act(() => _onKeyEscape(_eventEscape))
    expect(result.current).toEqual(_onKeyEscape)
    expect(_eventEscape.preventDefault).toHaveBeenCalledTimes(1)
    expect(_eventEscape.stopPropagation).toHaveBeenCalledTimes(1)
    expect(onEscape).toHaveBeenCalledTimes(1)
    expect(onEscape.mock.calls[0][0]).toBe(void 0)

    //2.2 KeyDown not Escape
    const _eventNotEscape = {keyCode: 20}
    act( () => _onKeyEscape(_eventNotEscape))
    expect(onEscape).toHaveBeenCalledTimes(1)

    //3 Test rerender for return instance depended on deps
    //3.1 With same onEscape
    rerender({ onEscape })
    expect(_onKeyEscape).toEqual(result.current)
    //3.2 With new onEnter
    rerender({ onEnter: jest.fn() })
    expect(_onKeyEscape).not.toEqual(result.current)
  })

  test('should return same fn in case of empty deps', 
    factorySameFnForEmptyDeps(useKeyEscape))
})
