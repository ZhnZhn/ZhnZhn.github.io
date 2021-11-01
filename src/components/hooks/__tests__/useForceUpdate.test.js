/**
 * @jest-environment jsdom
 */
"use strict";
import { render, screen, fireEvent } from '@testing-library/react'
import useForceUpdate from '../useForceUpdate'

const _testRender = (renderSpy, fns, calledTimes) => {
  expect(renderSpy).toBeCalledTimes(calledTimes)
  expect(fns.size).toBe(1)
  expect(typeof (Array.from(fns))[0]).toBe('function')
};
const _testRenderAfterClickBt = (renderSpy, fns, calledTimes) => {
  fireEvent.click(screen.getByTestId("bt"))
  _testRender(renderSpy, fns, calledTimes)
};

describe('useForceUpdate', ()=>{
  test('should return same function and rerender component when called', ()=>{
    const fns = new Set()
    , renderSpy = jest.fn();

    function Comp() {
      const forceUpdate = useForceUpdate();
      fns.add(forceUpdate)
      renderSpy()
      return (
        <button data-testid="bt" onClick={forceUpdate}>
          Rerender
        </button>
      );
    }

    render(<Comp />)
    _testRender(renderSpy, fns, 1)

    _testRenderAfterClickBt(renderSpy, fns, 2)
    _testRenderAfterClickBt(renderSpy, fns, 3)
  })
})
