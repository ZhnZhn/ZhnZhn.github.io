/**
 * @jest-environment jsdom
 */
"use strict";
import '@testing-library/jest-dom';
import zhnUtils from '../../_test-utils/zhn-test-utils';
import InputText from '../InputText';

const {
  createRef,
  screen,
  act,
  KEY_ENTER,
  KEY_DELETE,
  setupUserEvent,
  getFnParameter
} = zhnUtils;

describe("InputText", () => {
  test('should render InputText with event handlers and ref', async ()=>{
    const initValue = 'abc'
    , onEnter = jest.fn()
    , onChange = jest.fn()
    , refEl = createRef()
    //1 Test render
    , {
      user,
      rerender
    } = setupUserEvent(<InputText
       refEl={refEl}
       initValue={initValue}
       onChange={onChange}
       onEnter={onEnter}
    />)
    let input = screen.getByRole('textbox')
    expect(input).toHaveValue(initValue)

    //2 Test event handlers
    //2.1 KeyDown Delete
    await user.type(input, KEY_DELETE);
    expect(input).toHaveValue('')

    //2.2 onChange
    const _changeValue = 'abcd';
    await user.type(input, _changeValue);
    expect(input).toHaveValue(_changeValue)
    expect(onChange).toHaveBeenCalledTimes(_changeValue.length)
    expect(getFnParameter(onChange)).toBe(_changeValue[0])
    expect(getFnParameter(onChange, _changeValue.length-1)).toBe(_changeValue)

    //2.3 KeyDown Enter && onEnter
    await user.type(input, KEY_ENTER);
    expect(onEnter).toHaveBeenCalledTimes(1)
    expect(getFnParameter(onEnter)).toBe(_changeValue)

    //3 Test ref implementation interface
    //3.1
    expect(refEl.current.getValue()).toBe(_changeValue)
    //3.2
    act(() => refEl.current.setValue('a'))
    expect(input).toHaveValue('a')
    //3.3
    refEl.current.focus()
    expect(input).toHaveFocus()

    //4 Test rerender with new initValue without optional handlers
    const _initValue = "abcde";
    rerender(<InputText initValue={_initValue} />)
    expect(input).toHaveValue(_initValue)

    //4.1 KeyDown Enter && onEnter
    await user.type(input, KEY_ENTER);
    expect(onEnter).toHaveBeenCalledTimes(1)

    //4.2 onChange
    await user.type(input, _changeValue);
    expect(input).toHaveValue(_initValue + _changeValue)
    expect(onChange).toHaveBeenCalledTimes(_changeValue.length)
  })
})
