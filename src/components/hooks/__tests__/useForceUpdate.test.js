/**
 * @jest-environment jsdom
 */
"use strict";
import { render, fireEvent } from '@testing-library/react'
import useForceUpdate from '../useForceUpdate'

const _testRender = (renderSpy, fns, calledTimes) => {
  expect(renderSpy).toBeCalledTimes(calledTimes)
  expect(fns.size).toBe(1)
  expect(typeof (Array.from(fns))[0]).toBe('function')
};
const _testFireClick = (
  getByTestId, fns,
  renderSpy, calledTimes
) => {
  fireEvent.click(getByTestId("bt"))
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

    const { getByTestId } = render(<Comp />)
    _testRender(renderSpy, fns, 1)

    const _testRerender = _testFireClick.bind(null, getByTestId, fns, renderSpy)
    _testRerender(2)
    _testRerender(3)
  })
})
