import {renderHook, act} from '@testing-library/react-hooks'
import useFnFocus from '../useFnFocus'

describe('useFnFocus', ()=>{
  test('should after call fn call ref focus', ()=>{
    const _fn = jest.fn(()=>{})
    const _focus = jest.fn(() => {})

    const {result} = renderHook(() => useFnFocus(_fn))

    const _ref = result.current[0]
    _ref.current = { focus: _focus }
    const _doFnFocus = result.current[1]
    expect(typeof _doFnFocus).toBe('function')

    act(_doFnFocus)
    expect(result.current[1]).toEqual(_doFnFocus)
    expect(_fn).toBeCalledTimes(1)
    expect(_ref.current.focus).toBeCalledTimes(1)

    act(_doFnFocus)
    expect(_fn).toBeCalledTimes(2)
    expect(_ref.current.focus).toBeCalledTimes(2)

    _ref.current.focus = null
    act(_doFnFocus)
    expect(_fn).toBeCalledTimes(3)
    expect(_focus).toBeCalledTimes(2)

    _ref.current = null
    act(_doFnFocus)
    expect(_fn).toBeCalledTimes(4)
    expect(_focus).toBeCalledTimes(2)
  })
})
