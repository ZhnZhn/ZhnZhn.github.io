/**
 * @jest-environment jsdom
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
require("@testing-library/jest-dom");
var _zhnTestUtils = _interopRequireDefault(require("../../_test-utils/zhn-test-utils"));
var _SvgCheckBox = _interopRequireDefault(require("../SvgCheckBox"));
var _jsxRuntime = require("react/jsx-runtime");
const {
  render,
  screen,
  act,
  fireClick,
  fireKeyDownEnter,
  KEY_ENTER,
  setupUserEvent
} = _zhnTestUtils.default;
const _crTestArtifacts = (onCheck, onUnCheck) => {
  const chb = screen.getByRole('checkbox'),
    _testStyledFalseTimes = function (times) {
      if (times === void 0) {
        times = 0;
      }
      expect(chb).toHaveAttribute('aria-checked', "false");
      expect(onUnCheck).toHaveBeenCalledTimes(times);
    },
    _testStyledTrueTimes = function (times) {
      if (times === void 0) {
        times = 0;
      }
      expect(chb).toHaveAttribute('aria-checked', "true");
      expect(onCheck).toHaveBeenCalledTimes(times);
    };
  return {
    chb,
    _testStyledFalseTimes,
    _testStyledTrueTimes
  };
};
describe('SvgCheckBox', () => {
  test('should render SvgCheckBox with initialValue and handlers', async () => {
    const initialValue = false,
      checkedColor = '#222222',
      onCheck = jest.fn(),
      onUnCheck = jest.fn(),
      props = {
        initialValue,
        checkedColor,
        onCheck,
        onUnCheck
      },
      {
        user,
        rerender
      } = setupUserEvent( /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox.default, {
        ...props
      })),
      {
        chb,
        _testStyledFalseTimes,
        _testStyledTrueTimes
      } = _crTestArtifacts(onCheck, onUnCheck);

    //1 Test initialValue
    _testStyledFalseTimes(0);

    //2 Click on checkbox
    //2.1 From false
    await user.click(chb);
    _testStyledTrueTimes(1);
    //2.2 From true
    await user.click(chb);
    _testStyledFalseTimes(1);

    //3 KeyDown on checkbox
    //3.1 keyDown Enter from false
    await user.type(chb, KEY_ENTER);
    _testStyledTrueTimes(2);
    //3.2 keyDown Enter from true
    await user.type(chb, KEY_ENTER);
    _testStyledFalseTimes(2);

    //4 Handler args component interface
    //4.1 Same componet interface object
    expect(onCheck.mock.calls[0][0]).toBe(onUnCheck.mock.calls[1][0]);
    expect(onCheck.mock.calls[1][0]).toBe(onUnCheck.mock.calls[1][0]);
    //4.2 Handler setUnchecked
    await user.click(chb);
    _testStyledTrueTimes(3);
    act(() => {
      onCheck.mock.calls[2][0].setUnchecked();
    });
    _testStyledFalseTimes(2);

    //5 Rerender with new initialValue
    rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox.default, {
      ...props,
      initialValue: true
    }));
    _testStyledFalseTimes(2);
  });
  test('should use property booolean value and handlers', async () => {
    const value = false,
      initValue = true,
      checkedColor = '#222222',
      onCheck = jest.fn(),
      onUnCheck = jest.fn(),
      props = {
        value,
        initValue,
        checkedColor,
        onCheck,
        onUnCheck
      },
      {
        user,
        rerender
      } = setupUserEvent( /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox.default, {
        ...props
      })),
      {
        chb,
        _testStyledFalseTimes,
        _testStyledTrueTimes
      } = _crTestArtifacts(onCheck, onUnCheck);

    //1 First render with value false
    _testStyledFalseTimes(0);
    //2 Rerender with value true
    rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox.default, {
      ...props,
      value: !value
    }));
    _testStyledTrueTimes(0);

    //3 Click on checkbox
    //3.1 From true
    await user.click(chb);
    _testStyledTrueTimes(0);
    expect(onUnCheck).toHaveBeenCalledTimes(1);
    //3.2 From false
    rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox.default, {
      ...props,
      value: false
    }));
    await user.click(chb);
    _testStyledFalseTimes(1);
    expect(onCheck).toHaveBeenCalledTimes(1);
  });
  test('should call preventDefault on event handlers', async () => {
    render( /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox.default, {}));
    const chb = screen.getByRole('checkbox');

    //In case preventDefault called fireEvent return false
    expect(fireClick(chb)).toBe(false);
    expect(fireKeyDownEnter(chb)).toBe(false);
  });
});
//# sourceMappingURL=SvgCheckBox.test.js.map