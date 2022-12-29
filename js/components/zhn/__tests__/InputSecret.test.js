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
  render,
  screen,
  act,
  waitFor,
  fireChange,
  fireKeyDownEnter,
  fireKeyDownDelete
} = _zhnTestUtils.default;
describe('InputSecret', () => {
  const placeholder = 'api-key',
    _findInput = () => screen.findByPlaceholderText(placeholder);
  test('should render InputSecret with event handlers and ref', async () => {
    const onEnter = jest.fn(),
      ref = createRef()
      //1 Test render
      ,
      {
        rerender
      } = render( /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSecret.default, {
        ref: ref,
        placeholder: placeholder,
        onEnter: onEnter
      }));

    //2 Test onChange handle and removed attribute value
    let input = await _findInput();
    const _changeValue = 'abcd';
    fireChange(input, _changeValue);
    input = await _findInput();
    expect(input).toHaveValue(_changeValue);
    await waitFor(() => {
      expect(input.hasAttribute('value')).toBe(false);
    }, {
      timeout: 0
    });

    //3 Test KeyDown handle
    //3.1 Test KeyDown Enter
    fireKeyDownEnter(input);
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEnter.mock.calls[0][0]).toBe(_changeValue);

    //3.2 Test KeyDown Delete
    fireKeyDownDelete(input);
    input = await _findInput();
    expect(input).toHaveValue('');
    expect(onEnter).toHaveBeenCalledTimes(2);
    expect(onEnter.mock.calls[1][0]).toBe('');

    //4 Test ref implementation interface
    fireChange(input, _changeValue);
    //4.1
    expect(ref.current.getValue()).toBe(_changeValue);
    //4.2
    act(() => ref.current.clear());
    input = await _findInput();
    expect(input).toHaveValue('');
    await waitFor(() => {
      expect(input.hasAttribute('value')).toBe(false);
    }, {
      timeout: 0
    });

    //5 Test rerender without onEnter
    const _onEnterTimes = 2;
    fireChange(input, _changeValue);
    //5.1 Test render
    rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSecret.default, {
      ref: ref,
      placeholder: placeholder
    }));
    input = await _findInput();
    expect(input).toHaveValue(_changeValue);
    await waitFor(() => {
      expect(input.hasAttribute('value')).toBe(false);
    }, {
      timeout: 0
    });
    //5.2 Test KeyDown Enter
    fireKeyDownEnter(input);
    expect(onEnter).toHaveBeenCalledTimes(_onEnterTimes);
    //5.3 Test KeyDown Delete
    fireKeyDownDelete(input);
    input = await _findInput();
    expect(input).toHaveValue('');
    expect(onEnter).toHaveBeenCalledTimes(_onEnterTimes);
  });
});
//# sourceMappingURL=InputSecret.test.js.map