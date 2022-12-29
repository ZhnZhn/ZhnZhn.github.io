import { renderHook } from '@testing-library/react';
import useEventCallback from '../useEventCallback';

describe('useEventCallback', () => {
  test('should return same function on rerender', ()=>{
    const handler1 = jest.fn()
    , { result, rerender } = renderHook(
      ({ handler }) => useEventCallback(handler),
      {initialProps: { handler: handler1}}
    )
    , fn1 = result.current;
    expect(typeof fn1).toBe('function')

    const hadnler2 = jest.fn();
    rerender({ handler: hadnler2 })
    const fn2 = result.current;
    expect(fn1).toEqual(fn2)
  })
})
