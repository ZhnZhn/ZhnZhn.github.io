import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen, act } from '@testing-library/react'

import DateField from '../DateField'

describe("DateField", () => {
  const _findInput = () => screen.findByRole('textbox');
  test('', async () => {
    const onEnter = jest.fn()
    , ref = React.createRef()
    , initialValue="2010-01-01"
    //1 Test render with initialValue
    , { rerender } = render(<DateField
        ref={ref}
        initialValue={initialValue}
        onEnter={onEnter}
      />)
    let input = screen.getByRole('textbox')
    expect(input).toHaveValue(initialValue)

    //2 Test event handlers
    //2.1 onChange
    const _changeValue = '2020-01-01'
    fireEvent.change(input, {target: { value: _changeValue }})
    input = await _findInput()
    expect(input).toHaveValue(_changeValue)

    //2.2 KeyDown Enter
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 })
    expect(onEnter).toHaveBeenCalledTimes(1)
    expect(onEnter.mock.calls[0][0]).toBe(_changeValue)

    //2.3 KeyDown Delete
    fireEvent.keyDown(input, { key: 'Delete', keyCode: 46 })
    input = await _findInput()
    expect(input).toHaveValue(initialValue)

    //3 Test ref implementation interface
    //3.1
     expect(ref.current.getValue()).toBe(initialValue)
    //3.2
    const _setValue = '2000-01-01';
    act(() => ref.current.setValue(_setValue))
    input = await _findInput()
    expect(input).toHaveValue(_setValue)
    //3.3
    expect(ref.current.isValid()).toBe(true)
    //3.4
    ref.current.focus()
    expect(input).toHaveFocus()

    //4 Test rerender with new initialValue
    const _rerenderValue = "2020-01-01"
    rerender(<DateField initialValue={_rerenderValue} />)
    input = await _findInput()
    expect(input).toHaveValue(_rerenderValue)
  })
})
