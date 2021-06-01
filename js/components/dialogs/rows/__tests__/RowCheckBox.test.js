/**
 * @jest-environment jsdom
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

require("@testing-library/jest-dom");

var _zhnTestUtils = _interopRequireDefault(require("../../../_test-utils/zhn-test-utils"));

var _RowCheckBox = _interopRequireDefault(require("../RowCheckBox"));

var render = _zhnTestUtils["default"].render,
    screen = _zhnTestUtils["default"].screen,
    wrapByUiThemeProvider = _zhnTestUtils["default"].wrapByUiThemeProvider,
    fireClick = _zhnTestUtils["default"].fireClick;

var _helperStyledFalse = function _helperStyledFalse(bt, chbox) {
  expect(bt).toHaveStyle("color: grey");
  expect(chbox).toHaveAttribute('aria-checked', "false");
};

var _helperStyledTrue = function _helperStyledTrue(checkedColor, bt, chbox) {
  expect(bt).toHaveStyle("color: " + checkedColor);
  expect(chbox).toHaveAttribute('aria-checked', "true");
};

var _crTestArtifacts = function _crTestArtifacts(checkedColor) {
  var bt = screen.getByRole('button'),
      chbox = screen.getByRole('checkbox'),
      _testStyledFalse = _helperStyledFalse.bind(null, bt, chbox),
      _testStyledTrue = _helperStyledTrue.bind(null, checkedColor, bt, chbox);

  return {
    bt: bt,
    chbox: chbox,
    _testStyledFalse: _testStyledFalse,
    _testStyledTrue: _testStyledTrue
  };
};

describe('RowCheckBox', function () {
  test('should render RowCheckBox with onToggle handler', function () {
    var initValue = false,
        caption = 'CheckBox',
        checkedColor = '#222222',
        onToggle = jest.fn(),
        props = {
      initValue: initValue,
      checkedColor: checkedColor,
      caption: caption,
      onToggle: onToggle
    },
        _render = render(wrapByUiThemeProvider( /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox["default"], (0, _extends2["default"])({}, props)))),
        rerender = _render.rerender,
        _crTestArtifacts2 = _crTestArtifacts(checkedColor),
        bt = _crTestArtifacts2.bt,
        chbox = _crTestArtifacts2.chbox,
        _testStyledFalse = _crTestArtifacts2._testStyledFalse,
        _testStyledTrue = _crTestArtifacts2._testStyledTrue,
        _testOnToggleCalled = function _testOnToggleCalled(times, argValue) {
      expect(onToggle).toHaveBeenCalledTimes(times);
      expect(onToggle.mock.calls[times - 1][0]).toBe(argValue);
    }; //1 Test initial values


    _testStyledFalse(); //2 Test click on buttom
    //2.1 From false


    fireClick(bt);

    _testStyledTrue();

    _testOnToggleCalled(1, true); //2.2 From true


    fireClick(bt);

    _testStyledFalse();

    _testOnToggleCalled(2, false); //3 Test click on checkbox
    //3.1 From false


    fireClick(chbox);

    _testStyledTrue();

    _testOnToggleCalled(3, true); //3.2 From true


    fireClick(chbox);

    _testStyledFalse();

    _testOnToggleCalled(4, false); //4 After parent rerender have previous value


    rerender(wrapByUiThemeProvider( /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox["default"], (0, _extends2["default"])({}, props, {
      initValue: true
    }))));

    _testStyledFalse();
  });
  test('should render RowCheckBox with onCheck, onUnCheck handlers', function () {
    var initValue = false,
        caption = 'CheckBox',
        checkedColor = '#222222',
        onCheck = jest.fn(),
        onUnCheck = jest.fn(),
        onToggle = jest.fn(),
        props = {
      initValue: initValue,
      checkedColor: checkedColor,
      caption: caption,
      onCheck: onCheck,
      onUnCheck: onUnCheck,
      onToggle: onToggle
    },
        _render2 = render(wrapByUiThemeProvider( /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox["default"], (0, _extends2["default"])({}, props)))),
        rerender = _render2.rerender,
        _crTestArtifacts3 = _crTestArtifacts(checkedColor),
        bt = _crTestArtifacts3.bt,
        chbox = _crTestArtifacts3.chbox,
        _testStyledFalse = _crTestArtifacts3._testStyledFalse,
        _testStyledTrue = _crTestArtifacts3._testStyledTrue,
        _testCalled = function _testCalled(fn, times) {
      expect(fn).toHaveBeenCalledTimes(times);
      expect(fn.mock.calls[times - 1][0]).toBe(void 0);
      expect(onToggle).toHaveBeenCalledTimes(0);
    }; //1 Test initial values


    _testStyledFalse(); //2 Test click on checkbox
    //2.1 From false


    fireClick(chbox);

    _testStyledTrue();

    _testCalled(onCheck, 1); //2.2 From true


    fireClick(chbox);

    _testStyledFalse();

    _testCalled(onUnCheck, 1); //3 Test click on button
    //3.1 From false


    fireClick(bt);

    _testStyledTrue();

    _testCalled(onCheck, 2); //3.2 From true


    fireClick(bt);

    _testStyledFalse();

    _testCalled(onUnCheck, 2); //4 After parent rerender have previous value


    rerender(wrapByUiThemeProvider( /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox["default"], (0, _extends2["default"])({}, props, {
      initValue: true
    }))));

    _testStyledFalse();
  });
  test('should not render button for empty caption', function () {
    var _render3 = render(wrapByUiThemeProvider( /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox["default"], {}))),
        rerender = _render3.rerender,
        _testToBeInDocument = function _testToBeInDocument() {
      var chbox = screen.getByRole('checkbox'),
          bt = screen.queryByRole('button');
      expect(chbox).toBeInTheDocument();
      expect(bt).not.toBeInTheDocument();
    };

    _testToBeInDocument();

    rerender(wrapByUiThemeProvider( /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox["default"], {})));

    _testToBeInDocument();
  });
});
//# sourceMappingURL=RowCheckBox.test.js.map