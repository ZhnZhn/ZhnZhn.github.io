/**
 * @jest-environment jsdom
 */
"use strict";
import '@testing-library/jest-dom';
import zhnUtils from '../../_test-utils/zhn-test-utils';
import InputText from '../InputText';

const {
  createRef,
  render, screen, act,
  fireChange,
  fireKeyDownEnter,
  fireKeyDownDelete
} = zhnUtils;

describe("InputText", () => {
  const _findInput = () => screen.findByRole('textbox');
  test('should render InputText with event handlers and ref', async ()=>{
    const initValue = 'abc'
    , onEnter = jest.fn()
    , onChange = jest.fn()
    , ref = createRef()
    //1 Test render
    , { rerender } = render(<InputText
       ref={ref}
       initValue={initValue}
       onChange={onChange}
       onEnter={onEnter}
    />)
    let input = screen.getByRole('textbox')
    expect(input).toHaveValue(initValue)

    //2 Test event handlers
    //2.1 KeyDown Delete
    fireKeyDownDelete(input)
    input = await _findInput()
    expect(input).toHaveValue('')

    //2.2 onChange
    const _changeValue = 'abcd'
    fireChange(input, _changeValue)
    input = await _findInput()
    expect(input).toHaveValue(_changeValue)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0]).toBe(_changeValue)

    //2.3 KeyDown Enter && onEnter
    fireKeyDownEnter(input)
    expect(onEnter).toHaveBeenCalledTimes(1)
    expect(onEnter.mock.calls[0][0]).toBe(_changeValue)

    //3 Test ref implementation interface
    //3.1
     expect(ref.current.getValue()).toBe(_changeValue)
    //3.2
    act(() => ref.current.setValue('a'))
    input = await _findInput()
    expect(input).toHaveValue('a')
    //3.3
    ref.current.focus()
    expect(input).toHaveFocus()

    //4 Test rerender with new initValue without optional handlers
    const _initValue = "abcde"
    rerender(<InputText initValue={_initValue} />)
    input = await _findInput()
    expect(input).toHaveValue(_initValue)

    //4.1 KeyDown Enter && onEnter
    fireKeyDownEnter(input)
    expect(onEnter).toHaveBeenCalledTimes(1)

    //4.2 onChange
    fireChange(input, _changeValue)
    input = await _findInput()
    expect(input).toHaveValue(_changeValue)
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
