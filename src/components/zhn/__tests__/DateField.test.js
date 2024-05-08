/**
 * @jest-environment jsdom
 */
"use strict";
import '@testing-library/jest-dom';
import zhnUtils from '../../_test-utils/zhn-test-utils';
import DateField from '../DateField';

const {
  createRef,
  screen,
  act,
  KEY_ENTER,
  KEY_DELETE,
  setupUserEvent
} = zhnUtils;

describe("DateField", () => {
  const _findInput = () => screen.findByRole('textbox');
  test('', async () => {
    const onEnter = jest.fn()
    , refEl = createRef()
    , initialValue="2010-01-01"
    //1 Test render with initialValue
    , {
      user,
      rerender
    } = setupUserEvent(<DateField
        refEl={refEl}
        initialValue={initialValue}
        onEnter={onEnter}
      />);
    let input = screen.getByRole('textbox')
    expect(input).toHaveValue(initialValue)

    //2 Test event handlers
    //2.1 onChange
    const _changeValue = '2020-01-01';
    await user.clear(input);
    await user.type(input, _changeValue);
    expect(input).toHaveValue(_changeValue)

    //2.2 KeyDown Enter
    await user.type(input, KEY_ENTER);
    expect(onEnter).toHaveBeenCalledTimes(1)
    expect(onEnter.mock.calls[0][0]).toBe(_changeValue)

    //2.3 KeyDown Delete
    await user.type(input, KEY_DELETE);
    expect(input).toHaveValue(initialValue)

    //3 Test ref implementation interface
    //3.1
     expect(refEl.current.getValue()).toBe(initialValue)
    //3.2
    const _setValue = '2000-01-01';
    act(() => refEl.current.setValue(_setValue))
    input = await _findInput()
    expect(input).toHaveValue(_setValue)
    //3.3
    expect(refEl.current.isValid()).toBe(true)
    //3.4
    refEl.current.focus()
    expect(input).toHaveFocus()

    //4 Test rerender with new initialValue
    const _rerenderValue = "2020-01-01";
    rerender(<DateField initialValue={_rerenderValue} />)
    input = await _findInput();
    expect(input).toHaveValue(_rerenderValue)
  })
})
