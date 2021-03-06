/**
 * @jest-environment jsdom
 */
"use strict";
import '@testing-library/jest-dom';
import zhnUtils from '../../_test-utils/zhn-test-utils';
import InputPattern from '../InputPattern';

const {
  createRef,
  render, screen, act,
  fireClick,
  fireChange,
  fireKeyDownEnter,
  fireKeyDownDelete
} = zhnUtils;

describe("InputPattern", () => {
  const _findInput = () => screen.findByRole('textbox');
  const _findBtClear = () => screen.findByRole('button');
  test("should render InputPattern with event handlers and ref", async () => {
    const onEnter = jest.fn()
    , onClear = jest.fn()
    , onTest = jest.fn(str => str.length < 4 )
    , ref = createRef()
    , initValue = "abc"
    //1 Test render
    , { rerender } = render(<InputPattern
       ref={ref}
       initValue={initValue}
       onTest={onTest}
       onEnter={onEnter}
       onClear={onClear}
    />);
    let input = screen.getByRole('textbox')
    expect(input).toHaveValue(initValue)

    //2 Test event handlers
    //2.1 onChange
    const _changeValue = 'abcd'
    fireChange(input, _changeValue)
    input = await _findInput()
    expect(input).toHaveValue(_changeValue)
    expect(onTest).toHaveBeenCalledTimes(1)
    expect(onTest.mock.calls[0][0]).toBe(_changeValue)

    //2.2 KeyDown Delete
    fireKeyDownDelete(input)
    input = await _findInput()
    expect(input).toHaveValue(initValue)

    //2.3 KeyDown Enter && onEnter
    fireKeyDownEnter(input)
    expect(onEnter).toHaveBeenCalledTimes(1)
    expect(onEnter.mock.calls[0][0]).toBe(initValue)

    //2.4 onClick on BtClear
    const btClear = await _findBtClear()
    fireClick(btClear)
    input = await _findInput()
    expect(input).toHaveValue(initValue)
    expect(input).toHaveFocus()
    expect(onClear).toHaveBeenCalledTimes(1)

    //3 Test ref implementation interface
    //3.1
    expect(ref.current.getValue()).toBe(initValue)
    //3.2
    expect(ref.current.isValid()).toBe(true)
    expect(onTest).toHaveBeenCalledTimes(2)
    expect(onTest.mock.calls[1][0]).toBe(initValue)
    //3.3
    ref.current.focus()
    expect(input).toHaveFocus()
    //3.4
    act(() => ref.current.showErrMsg())
    expect(ref.current.isValid()).toBe(true)

    //4 Test rerender with new initValue without optional handlers
    const _initValue = "abcde"
    rerender(<InputPattern initValue={_initValue} />)
    input = await _findInput()
    expect(input).toHaveValue(_initValue)

  })
})
