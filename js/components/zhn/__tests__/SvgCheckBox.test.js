/**
 * @jest-environment jsdom
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

require("@testing-library/jest-dom");

var _react = require("@testing-library/react");

var _SvgCheckBox = _interopRequireDefault(require("../SvgCheckBox"));

var _fireEventHelpers = _interopRequireDefault(require("./_fireEventHelpers"));

var fireClick = _fireEventHelpers["default"].fireClick,
    fireKeyDownEnter = _fireEventHelpers["default"].fireKeyDownEnter;

var _crTestArtifacts = function _crTestArtifacts(onCheck, onUnCheck) {
  var chb = _react.screen.getByRole('checkbox'),
      _testStyledFalseTimes = function _testStyledFalseTimes(times) {
    if (times === void 0) {
      times = 0;
    }

    expect(chb).toHaveAttribute('aria-checked', "false");
    expect(onUnCheck).toHaveBeenCalledTimes(times);
  },
      _testStyledTrueTimes = function _testStyledTrueTimes(times) {
    if (times === void 0) {
      times = 0;
    }

    expect(chb).toHaveAttribute('aria-checked', "true");
    expect(onCheck).toHaveBeenCalledTimes(times);
  };

  return {
    chb: chb,
    _testStyledFalseTimes: _testStyledFalseTimes,
    _testStyledTrueTimes: _testStyledTrueTimes
  };
};

describe('SvgCheckBox', function () {
  test('should render SvgCheckBox with initialValue and handlers', function () {
    var initialValue = false,
        checkedColor = '#222222',
        onCheck = jest.fn(),
        onUnCheck = jest.fn(),
        props = {
      initialValue: initialValue,
      checkedColor: checkedColor,
      onCheck: onCheck,
      onUnCheck: onUnCheck
    },
        _render = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox["default"], (0, _extends2["default"])({}, props))),
        rerender = _render.rerender,
        _crTestArtifacts2 = _crTestArtifacts(onCheck, onUnCheck),
        chb = _crTestArtifacts2.chb,
        _testStyledFalseTimes = _crTestArtifacts2._testStyledFalseTimes,
        _testStyledTrueTimes = _crTestArtifacts2._testStyledTrueTimes; //1 Test initialValue


    _testStyledFalseTimes(0); //2 Click on checkbox
    //2.1 From false


    fireClick(chb);

    _testStyledTrueTimes(1); //2.2 From true


    fireClick(chb);

    _testStyledFalseTimes(1); //3 KeyDown on checkbox
    //3.1 keyDown Enter from false


    fireKeyDownEnter(chb);

    _testStyledTrueTimes(2); //3.2 keyDown Enter from true


    fireKeyDownEnter(chb);

    _testStyledFalseTimes(2); //4 Handler args component interface
    //4.1 Same componet interface object


    expect(onCheck.mock.calls[0][0]).toBe(onUnCheck.mock.calls[1][0]);
    expect(onCheck.mock.calls[1][0]).toBe(onUnCheck.mock.calls[1][0]); //4.2 Handler setUnchecked

    fireClick(chb);

    _testStyledTrueTimes(3);

    (0, _react.act)(function () {
      onCheck.mock.calls[2][0].setUnchecked();
    });

    _testStyledFalseTimes(2); //5 Rerender with new initialValue


    rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox["default"], (0, _extends2["default"])({}, props, {
      initialValue: true
    })));

    _testStyledFalseTimes(2);
  });
  test('should use property booolean value and handlers', function () {
    var value = false,
        initValue = true,
        checkedColor = '#222222',
        onCheck = jest.fn(),
        onUnCheck = jest.fn(),
        props = {
      value: value,
      initValue: initValue,
      checkedColor: checkedColor,
      onCheck: onCheck,
      onUnCheck: onUnCheck
    },
        _render2 = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox["default"], (0, _extends2["default"])({}, props))),
        rerender = _render2.rerender,
        _crTestArtifacts3 = _crTestArtifacts(onCheck, onUnCheck),
        chb = _crTestArtifacts3.chb,
        _testStyledFalseTimes = _crTestArtifacts3._testStyledFalseTimes,
        _testStyledTrueTimes = _crTestArtifacts3._testStyledTrueTimes; //1 First render with value false


    _testStyledFalseTimes(0); //2 Rerender with value true


    rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox["default"], (0, _extends2["default"])({}, props, {
      value: !value
    })));

    _testStyledTrueTimes(0); //3 Click on checkbox
    //3.1 From true


    fireClick(chb);

    _testStyledTrueTimes(0);

    expect(onUnCheck).toHaveBeenCalledTimes(1); //3.2 From false

    rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox["default"], (0, _extends2["default"])({}, props, {
      value: false
    })));
    fireClick(chb);

    _testStyledFalseTimes(1);

    expect(onCheck).toHaveBeenCalledTimes(1);
  });
  test('should call preventDefault on event handlers', function () {
    (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox["default"], {}));

    var chb = _react.screen.getByRole('checkbox'); //In case preventDefault called fireEvent return false


    expect(fireClick(chb)).toBe(false);
    expect(fireKeyDownEnter(chb)).toBe(false);
  });
});
//# sourceMappingURL=SvgCheckBox.test.js.map