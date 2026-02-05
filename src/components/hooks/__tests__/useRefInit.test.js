import { renderHook } from '@testing-library/react';
import { useRefInit } from '../useProperty';

const _getValue = result => result.current;

const _testRenderAndRerender = (
  init,
  expectedValue
) => {
  const {
    result,
    rerender
  } = renderHook(()=>useRefInit(init));
  expect(_getValue(result)).toBe(expectedValue)
  rerender()
  expect(_getValue(result)).toBe(expectedValue)
  expect(init).toHaveBeenCalledTimes(1)
};

describe('useRefInit', ()=>{
  test('should return computed by function value',()=>{
    _testRenderAndRerender(jest.fn(()=>false), false)
    _testRenderAndRerender(jest.fn(()=>true), true)
    _testRenderAndRerender(jest.fn(()=>''), '')
  })
})
