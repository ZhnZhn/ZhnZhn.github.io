/**
 * @jest-environment jsdom
 */
"use strict";
import '@testing-library/jest-dom';
import zhnUtils from '../../../_test-utils/zhn-test-utils';
import RowCheckBox1 from '../RowCheckBox1';

const {
  render,
  screen,
  wrapByUiThemeProvider,
  setupUserEvent
} = zhnUtils;

const _helperStyledFalse = (bt, chbox) => {
  expect(bt).toHaveStyle(`color: grey`)
  expect(chbox).toHaveAttribute('aria-checked', "false")
}
const _helperStyledTrue = (checkedColor, bt, chbox) => {
  expect(bt).toHaveStyle(`color: ${checkedColor}`)
  expect(chbox).toHaveAttribute('aria-checked', "true")
};

const _crTestArtifacts = (checkedColor) => {
  const bt = screen.getByRole('button')
  , chbox = screen.getByRole('checkbox')
  , _testStyledFalse = _helperStyledFalse.bind(null, bt, chbox)
  , _testStyledTrue = _helperStyledTrue.bind(null, checkedColor, bt, chbox)
  return { bt, chbox, _testStyledFalse, _testStyledTrue};
};

describe('RowCheckBox1', ()=>{
  test('should render RowCheckBox1 with onToggle handler', async ()=>{
    const initValue = false
    , caption = 'CheckBox'
    , checkedColor = '#222222'
    , onToggle = jest.fn()
    , props = { initValue, checkedColor, caption, onToggle }
    , {
      user,
      rerender
    } = setupUserEvent(wrapByUiThemeProvider(<RowCheckBox1 {...props} />))
    , {
        bt, chbox, _testStyledFalse, _testStyledTrue
      } = _crTestArtifacts(checkedColor)
    , _testOnToggleCalled = (times, argValue) => {
      expect(onToggle).toHaveBeenCalledTimes(times)
      expect(onToggle.mock.calls[times-1][0]).toBe(argValue)
    };

    //1 Test initial values
    _testStyledFalse()

    //2 Test click on buttom
    //2.1 From false
    await user.click(bt);
    _testStyledTrue()
    _testOnToggleCalled(1, true)
    //2.2 From true
    await user.click(bt);
    _testStyledFalse()
    _testOnToggleCalled(2, false)

    //3 Test click on checkbox
    //3.1 From false
    await user.click(chbox);
    _testStyledTrue()
    _testOnToggleCalled(3, true)
    //3.2 From true
    await user.click(chbox);
    _testStyledFalse()
    _testOnToggleCalled(4, false)

    //4 After parent rerender have previous value
    rerender(wrapByUiThemeProvider(<RowCheckBox1 {...props} initValue={true} />))
    _testStyledFalse()
  })
  test('should render RowCheckBox1 with onCheck, onUnCheck handlers', async ()=>{
    const initValue = false
    , caption = 'CheckBox'
    , checkedColor = '#222222'
    , onCheck = jest.fn()
    , onUnCheck = jest.fn()
    , onToggle = jest.fn()
    , props = {
       initValue, checkedColor, caption,
       onCheck, onUnCheck, onToggle
    }
    , {
      user,
      rerender
    } = setupUserEvent(wrapByUiThemeProvider(<RowCheckBox1 {...props} />))
    , {
        bt, chbox, _testStyledFalse, _testStyledTrue
      } = _crTestArtifacts(checkedColor)
    , _testCalled = (fn, times) => {
      expect(fn).toHaveBeenCalledTimes(times)
      expect(fn.mock.calls[times-1][0]).toBe(void 0)
      expect(onToggle).toHaveBeenCalledTimes(0)
    };

    //1 Test initial values
    _testStyledFalse()

    //2 Test click on checkbox
    //2.1 From false
    await user.click(chbox);
    _testStyledTrue()
    _testCalled(onCheck, 1)
    //2.2 From true
    await user.click(chbox);
    _testStyledFalse()
    _testCalled(onUnCheck, 1)

    //3 Test click on button
    //3.1 From false
    await user.click(bt);
    _testStyledTrue()
    _testCalled(onCheck, 2)
    //3.2 From true
    await user.click(bt);
    _testStyledFalse()
    _testCalled(onUnCheck, 2)

    //4 After parent rerender have previous value
    rerender(wrapByUiThemeProvider(<RowCheckBox1 {...props} initValue={true} />))
    _testStyledFalse()

  })
  test('should not render button for empty caption',()=>{
    const { rerender } = render(wrapByUiThemeProvider(<RowCheckBox1 />))
    , _testToBeInDocument = () => {
      const chbox = screen.getByRole('checkbox')
      , bt = screen.queryByRole('button');
      expect(chbox).toBeInTheDocument()
      expect(bt).not.toBeInTheDocument()
    };

    _testToBeInDocument()

    rerender(wrapByUiThemeProvider(<RowCheckBox1 />))
    _testToBeInDocument()
  })
})
