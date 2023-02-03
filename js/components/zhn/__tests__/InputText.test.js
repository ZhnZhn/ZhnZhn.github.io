/**
 * @jest-environment jsdom
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
require("@testing-library/jest-dom");
var _zhnTestUtils = _interopRequireDefault(require("../../_test-utils/zhn-test-utils"));
var _InputText = _interopRequireDefault(require("../InputText"));
var _jsxRuntime = require("react/jsx-runtime");
const {
  createRef,
  screen,
  act,
  KEY_ENTER,
  KEY_DELETE,
  setupUserEvent,
  getFnParameter
} = _zhnTestUtils.default;
describe("InputText", () => {
  test('should render InputText with event handlers and ref', async () => {
    const initValue = 'abc',
      onEnter = jest.fn(),
      onChange = jest.fn(),
      ref = createRef()
      //1 Test render
      ,
      {
        user,
        rerender
      } = setupUserEvent( /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
        ref: ref,
        initValue: initValue,
        onChange: onChange,
        onEnter: onEnter
      }));
    let input = screen.getByRole('textbox');
    expect(input).toHaveValue(initValue);

    //2 Test event handlers
    //2.1 KeyDown Delete
    await user.type(input, KEY_DELETE);
    expect(input).toHaveValue('');

    //2.2 onChange
    const _changeValue = 'abcd';
    await user.type(input, _changeValue);
    expect(input).toHaveValue(_changeValue);
    expect(onChange).toHaveBeenCalledTimes(_changeValue.length);
    expect(getFnParameter(onChange)).toBe(_changeValue[0]);
    expect(getFnParameter(onChange, _changeValue.length - 1)).toBe(_changeValue);

    //2.3 KeyDown Enter && onEnter
    await user.type(input, KEY_ENTER);
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(getFnParameter(onEnter)).toBe(_changeValue);

    //3 Test ref implementation interface
    //3.1
    expect(ref.current.getValue()).toBe(_changeValue);
    //3.2
    act(() => ref.current.setValue('a'));
    expect(input).toHaveValue('a');
    //3.3
    ref.current.focus();
    expect(input).toHaveFocus();

    //4 Test rerender with new initValue without optional handlers
    const _initValue = "abcde";
    rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
      initValue: _initValue
    }));
    expect(input).toHaveValue(_initValue);

    //4.1 KeyDown Enter && onEnter
    await user.type(input, KEY_ENTER);
    expect(onEnter).toHaveBeenCalledTimes(1);

    //4.2 onChange
    await user.type(input, _changeValue);
    expect(input).toHaveValue(_initValue + _changeValue);
    expect(onChange).toHaveBeenCalledTimes(_changeValue.length);
  });
});
//# sourceMappingURL=InputText.test.js.map