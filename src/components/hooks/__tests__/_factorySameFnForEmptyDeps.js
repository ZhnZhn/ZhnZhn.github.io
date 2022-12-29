import { renderHook } from '@testing-library/react';

describe('_factorySameFnForEmptyDeps', ()=>{
  test('', () => expect('').toBe(''))
})

const factorySameFnForEmptyDeps = (useHook) => () => {
  const fn = jest.fn()
  //1 Test return type
  , {
    result,
    rerender
  } = renderHook(({ fn }) => useHook(fn), {
    initialProps: { fn }
  });

  const _fn = result.current;
  expect(typeof _fn).toBe('function')

  //2 Test rerender
  //2.1 With same fn
  rerender({ fn })
  expect(_fn).toEqual(result.current)

  //2.2 With new fn
  rerender({ fn: jest.fn() })
  expect(_fn).toEqual(result.current)

  //2.3 With empty fn
  rerender({})
  expect(_fn).toEqual(result.current)
}

export default factorySameFnForEmptyDeps
