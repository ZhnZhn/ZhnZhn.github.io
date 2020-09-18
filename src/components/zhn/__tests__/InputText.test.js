import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen, act } from '@testing-library/react'

import InputText from '../InputText'

describe("InputText", () => {
  const _findInput = () => screen.findByRole('textbox');
  test('should render InputText with event handlers and ref', async ()=>{
    const onEnter = jest.fn()
    , onChange = jest.fn()
    , ref = React.createRef()
    //1 Test render
    , { rerender } = render(<InputText
       ref={ref}
       initValue="abc"
       onChange={onChange}
       onEnter={onEnter}
    />)
    let input = screen.getByRole('textbox')
    expect(input).toHaveValue('abc')

    //2 Test event handlers
    //2.1 KeyDown Delete
    fireEvent.keyDown(input, { key: 'Delete', keyCode: 46 })
    input = await _findInput()
    expect(input).toHaveValue('')

    //2.2 onChange
    fireEvent.change(input, {target: { value: 'abcd' }})
    input = await _findInput()
    expect(input).toHaveValue('abcd')

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0]).toBe('abcd')

    //2.3 KeyDown Enter && onEnter
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 })
    expect(onEnter).toHaveBeenCalledTimes(1)
    expect(onEnter.mock.calls[0][0]).toBe('abcd')

    //3 Test ref implementation interface
    //3.1
     expect(ref.current.getValue()).toBe('abcd')
    //3.2
    act(() => ref.current.setValue('a'))
    input = await _findInput()
    expect(input).toHaveValue('a')
    //3.3
    ref.current.focus()
    expect(input).toHaveFocus()

    //4 Test rerender with new initValue without optional handlers
    rerender(<InputText initValue="abcde"/>)
    input = await _findInput()
    expect(input).toHaveValue('abcde')

    //4.1 KeyDown Enter && onEnter
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 })
    expect(onEnter).toHaveBeenCalledTimes(1)

    //4.2 onChange
    fireEvent.change(input, {target: { value: 'abcd' }})
    input = await _findInput()
    expect(input).toHaveValue('abcd')
    expect(onChange).toHaveBeenCalledTimes(1)

  })
})
