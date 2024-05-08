/**
 * @jest-environment jsdom
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
require("@testing-library/jest-dom");
var _zhnTestUtils = _interopRequireDefault(require("../../_test-utils/zhn-test-utils"));
var _InputSecret = _interopRequireDefault(require("../InputSecret"));
var _jsxRuntime = require("react/jsx-runtime");
const {
  createRef,
  screen,
  act,
  waitFor,
  KEY_ENTER,
  KEY_DELETE,
  setupUserEvent,
  getFnParameter
} = _zhnTestUtils.default;
describe('InputSecret', () => {
  const placeholder = 'api-key';
  //, _findInput = () => screen.findByPlaceholderText(placeholder);
  test('should render InputSecret with event handlers and ref', async () => {
    const onEnter = jest.fn(),
      refEl = createRef()
      //1 Test render
      ,
      {
        user,
        rerender
      } = setupUserEvent( /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSecret.default, {
        refEl: refEl,
        placeholder: placeholder,
        onEnter: onEnter
      }));
    let input = screen.getByPlaceholderText(placeholder);

    //2 Test onChange handle and removed attribute value
    const _changeValue = 'abcd';
    await user.type(input, _changeValue);
    expect(input).toHaveValue(_changeValue);
    expect(input.hasAttribute('value')).toBe(false);

    //3 Test KeyDown handle
    //3.1 Test KeyDown Enter
    await user.type(input, KEY_ENTER);
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(getFnParameter(onEnter)).toBe(_changeValue);

    //3.2 Test KeyDown Delete
    await user.type(input, KEY_DELETE);
    expect(input).toHaveValue('');
    expect(onEnter).toHaveBeenCalledTimes(2);
    expect(getFnParameter(onEnter, 1));

    //4 Test ref implementation interface
    await user.type(input, _changeValue);
    //4.1
    expect(refEl.current.getValue()).toBe(_changeValue);
    //4.2
    act(() => refEl.current.clear());
    expect(input).toHaveValue('');
    expect(input.hasAttribute('value')).toBe(false);

    //5 Test rerender without onEnter
    const _onEnterTimes = 2;
    await user.type(input, _changeValue);
    //5.1 Test render
    rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSecret.default, {
      refEl: refEl,
      placeholder: placeholder
    }));
    expect(input).toHaveValue(_changeValue);
    await waitFor(() => {
      expect(input.hasAttribute('value')).toBe(false);
    }, {
      timeout: 0
    });

    //5.2 Test KeyDown Enter
    await user.type(input, KEY_ENTER);
    expect(onEnter).toHaveBeenCalledTimes(_onEnterTimes);
    //5.3 Test KeyDown Delete
    await user.type(input, KEY_DELETE);
    expect(input).toHaveValue('');
    expect(onEnter).toHaveBeenCalledTimes(_onEnterTimes);
  });
});
//# sourceMappingURL=InputSecret.test.js.map