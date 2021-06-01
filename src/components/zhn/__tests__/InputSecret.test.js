/**
 * @jest-environment jsdom
 */
"use strict";
import '@testing-library/jest-dom';
import zhnUtils from '../../_test-utils/zhn-test-utils';
import InputSecret from '../InputSecret';

const {
  createRef,
  render, screen, act,
  fireChange,
  fireKeyDownEnter,
  fireKeyDownDelete
} = zhnUtils;

describe('InputSecret', () =>{
  const placeholder = 'api-key'
  , _findInput = () => screen.findByPlaceholderText(placeholder);
  test('should render InputSecret with event handlers and ref', async ()=> {
    const onEnter = jest.fn()
    , ref = createRef()
    //1 Test render
    , { rerender } = render(<InputSecret
       ref={ref}
       placeholder={placeholder}
       onEnter={onEnter}
    />)

    //2 Test onChange handle and removed attribute value
    let input = await _findInput()
    const _changeValue = 'abcd'
    fireChange(input, _changeValue)
    input = await _findInput()
    expect(input).toHaveValue(_changeValue)
    expect(input.hasAttribute('value')).toBe(false)

    //3 Test KeyDown handle
    //3.1 Test KeyDown Enter
    fireKeyDownEnter(input)
    expect(onEnter).toHaveBeenCalledTimes(1)
    expect(onEnter.mock.calls[0][0]).toBe(_changeValue)

    //3.2 Test KeyDown Delete
    fireKeyDownDelete(input)
    input = await _findInput()
    expect(input).toHaveValue('')
    expect(onEnter).toHaveBeenCalledTimes(2)
    expect(onEnter.mock.calls[1][0]).toBe('')

    //4 Test ref implementation interface
    fireChange(input, _changeValue)
    //4.1
    expect(ref.current.getValue()).toBe(_changeValue)
    //4.2
    act(() => ref.current.clear())
    input = await _findInput()
    expect(input).toHaveValue('')
    expect(input.hasAttribute('value')).toBe(false)


    //5 Test rerender without onEnter
    const _onEnterTimes = 2
    fireChange(input, _changeValue)
    //5.1 Test render
    rerender(<InputSecret
       ref={ref}
       placeholder={placeholder}
    />)
    input = await _findInput()
    expect(input).toHaveValue(_changeValue)
    expect(input.hasAttribute('value')).toBe(false)
    //5.2 Test KeyDown Enter
    fireKeyDownEnter(input)
    expect(onEnter).toHaveBeenCalledTimes(_onEnterTimes)
    //5.3 Test KeyDown Delete
    fireKeyDownDelete(input)
    input = await _findInput()
    expect(input).toHaveValue('')
    expect(onEnter).toHaveBeenCalledTimes(_onEnterTimes)

  })
})
