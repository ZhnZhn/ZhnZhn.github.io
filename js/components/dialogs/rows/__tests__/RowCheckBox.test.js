"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

require("@testing-library/jest-dom");

var _react = require("@testing-library/react");

var _RowCheckBox = _interopRequireDefault(require("../RowCheckBox"));

var _uiTheme = _interopRequireDefault(require("../../../styles/uiTheme"));

var _ThemeContext = _interopRequireDefault(require("../../../hoc/ThemeContext"));

var _helperStyledFalse = function _helperStyledFalse(bt, chbox) {
  expect(bt).toHaveStyle("color: grey");
  expect(chbox).toHaveAttribute('aria-checked', "false");
};

var _helperStyledTrue = function _helperStyledTrue(checkedColor, bt, chbox) {
  expect(bt).toHaveStyle("color: " + checkedColor);
  expect(chbox).toHaveAttribute('aria-checked', "true");
};

var _crTestArtifacts = function _crTestArtifacts(checkedColor) {
  var bt = _react.screen.getByRole('button'),
      chbox = _react.screen.getByRole('checkbox'),
      _testStyledFalse = _helperStyledFalse.bind(null, bt, chbox),
      _testStyledTrue = _helperStyledTrue.bind(null, checkedColor, bt, chbox);

  return {
    bt: bt,
    chbox: chbox,
    _testStyledFalse: _testStyledFalse,
    _testStyledTrue: _testStyledTrue
  };
};

var RowCheckBoxTest = function RowCheckBoxTest(props) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ThemeContext["default"].Provider, {
    value: _uiTheme["default"],
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox["default"], (0, _extends2["default"])({}, props))
  });
};

var _renderRowCheckBox = function _renderRowCheckBox(props) {
  return (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(RowCheckBoxTest, (0, _extends2["default"])({}, props)));
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
        _renderRowCheckBox2 = _renderRowCheckBox(props),
        rerender = _renderRowCheckBox2.rerender,
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


    _react.fireEvent.click(bt);

    _testStyledTrue();

    _testOnToggleCalled(1, true); //2.2 From true


    _react.fireEvent.click(bt);

    _testStyledFalse();

    _testOnToggleCalled(2, false); //3 Test click on checkbox
    //3.1 From false


    _react.fireEvent.click(chbox);

    _testStyledTrue();

    _testOnToggleCalled(3, true); //3.2 From true


    _react.fireEvent.click(chbox);

    _testStyledFalse();

    _testOnToggleCalled(4, false); //4 After parent rerender have previous value


    rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(RowCheckBoxTest, (0, _extends2["default"])({}, props, {
      initValue: true
    })));

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
        _renderRowCheckBox3 = _renderRowCheckBox(props),
        rerender = _renderRowCheckBox3.rerender,
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


    _react.fireEvent.click(chbox);

    _testStyledTrue();

    _testCalled(onCheck, 1); //2.2 From true


    _react.fireEvent.click(chbox);

    _testStyledFalse();

    _testCalled(onUnCheck, 1); //3 Test click on button
    //3.1 From false


    _react.fireEvent.click(bt);

    _testStyledTrue();

    _testCalled(onCheck, 2); //3.2 From true


    _react.fireEvent.click(bt);

    _testStyledFalse();

    _testCalled(onUnCheck, 2); //4 After parent rerender have previous value


    rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(RowCheckBoxTest, (0, _extends2["default"])({}, props, {
      initValue: true
    })));

    _testStyledFalse();
  });
  test('should not render button for empty caption', function () {
    var _renderRowCheckBox4 = _renderRowCheckBox(),
        rerender = _renderRowCheckBox4.rerender,
        _testToBeInDocument = function _testToBeInDocument() {
      var chbox = _react.screen.getByRole('checkbox'),
          bt = _react.screen.queryByRole('button');

      expect(chbox).toBeInTheDocument();
      expect(bt).not.toBeInTheDocument();
    };

    _testToBeInDocument();

    rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(RowCheckBoxTest, {}));

    _testToBeInDocument();
  });
});
//# sourceMappingURL=RowCheckBox.test.js.map