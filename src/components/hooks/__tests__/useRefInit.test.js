import { renderHook } from '@testing-library/react';
import { useRefInit } from '../useProperty';

const _getValue = result => result.current;

/* eslint-disable react-hooks/rules-of-hooks */
const _testRenderAndRerender = (init, expectedValue) => {
  const { result:r1, rerender:rr1 } = renderHook(()=>useRefInit(init))
  expect(_getValue(r1)).toBe(expectedValue)
  rr1()
  expect(_getValue(r1)).toBe(expectedValue)
  expect(init).toBeCalledTimes(1)
}
/* eslint-enable react-hooks/rules-of-hooks */

describe('useRefInit', ()=>{
  test('should return computed by function value',()=>{
    _testRenderAndRerender(jest.fn(()=>false), false)
    _testRenderAndRerender(jest.fn(()=>true), true)
    _testRenderAndRerender(jest.fn(()=>''), '')
  })
})
