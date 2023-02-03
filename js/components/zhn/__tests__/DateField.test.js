/**
 * @jest-environment jsdom
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
require("@testing-library/jest-dom");
var _zhnTestUtils = _interopRequireDefault(require("../../_test-utils/zhn-test-utils"));
var _DateField = _interopRequireDefault(require("../DateField"));
var _jsxRuntime = require("react/jsx-runtime");
const {
  createRef,
  screen,
  act,
  KEY_ENTER,
  KEY_DELETE,
  setupUserEvent
} = _zhnTestUtils.default;
describe("DateField", () => {
  const _findInput = () => screen.findByRole('textbox');
  test('', async () => {
    const onEnter = jest.fn(),
      ref = createRef(),
      initialValue = "2010-01-01"
      //1 Test render with initialValue
      ,
      {
        user,
        rerender
      } = setupUserEvent( /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateField.default, {
        ref: ref,
        initialValue: initialValue,
        onEnter: onEnter
      }));
    let input = screen.getByRole('textbox');
    expect(input).toHaveValue(initialValue);

    //2 Test event handlers
    //2.1 onChange
    const _changeValue = '2020-01-01';
    await user.clear(input);
    await user.type(input, _changeValue);
    expect(input).toHaveValue(_changeValue);

    //2.2 KeyDown Enter
    await user.type(input, KEY_ENTER);
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEnter.mock.calls[0][0]).toBe(_changeValue);

    //2.3 KeyDown Delete
    await user.type(input, KEY_DELETE);
    expect(input).toHaveValue(initialValue);

    //3 Test ref implementation interface
    //3.1
    expect(ref.current.getValue()).toBe(initialValue);
    //3.2
    const _setValue = '2000-01-01';
    act(() => ref.current.setValue(_setValue));
    input = await _findInput();
    expect(input).toHaveValue(_setValue);
    //3.3
    expect(ref.current.isValid()).toBe(true);
    //3.4
    ref.current.focus();
    expect(input).toHaveFocus();

    //4 Test rerender with new initialValue
    const _rerenderValue = "2020-01-01";
    rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateField.default, {
      initialValue: _rerenderValue
    }));
    input = await _findInput();
    expect(input).toHaveValue(_rerenderValue);
  });
});
//# sourceMappingURL=DateField.test.js.map