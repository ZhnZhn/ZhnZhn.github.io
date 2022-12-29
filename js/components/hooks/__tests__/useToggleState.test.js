"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = require("@testing-library/react");
var _useToggleState = _interopRequireDefault(require("../useToggleState"));
const _getState = result => result.current[0],
  _getToggle = result => result.current[1];

/* eslint-disable react-hooks/rules-of-hooks */
const _renderInitialTest = (initialValue, expectedValue) => {
  const {
    result
  } = (0, _react.renderHook)(() => (0, _useToggleState.default)(initialValue));
  expect(_getState(result)).toEqual(expectedValue);
  const toggle = _getToggle(result);
  expect(typeof toggle).toBe('function');
  return [result, toggle];
};
/* eslint-enable react-hooks/rules-of-hooks */

describe('useToggleState', () => {
  test('should return object state and reference equal function toggle', () => {
    const initialState = {
        prop1: true,
        prop2: true
      },
      [result, toggle] = _renderInitialTest(initialState, initialState);
    (0, _react.act)(() => toggle('prop1'));
    expect(_getState(result)).toEqual({
      prop1: false,
      prop2: true
    });
    expect(_getToggle(result)).toEqual(toggle);
    (0, _react.act)(() => toggle('prop2'));
    expect(_getState(result)).toEqual({
      prop1: false,
      prop2: false
    });
    expect(_getToggle(result)).toEqual(toggle);
    (0, _react.act)(() => toggle('prop1'));
    expect(_getState(result)).toEqual({
      prop1: true,
      prop2: false
    });
    expect(_getToggle(result)).toEqual(toggle);
    (0, _react.act)(() => toggle('prop3'));
    expect(_getState(result)).toEqual({
      prop1: true,
      prop2: false,
      prop3: true
    });
    expect(_getToggle(result)).toEqual(toggle);
  });
  test('should init empty object state by default', () => {
    _renderInitialTest(void 0, {});
  });
  test('should also use function as initialValue', () => {
    const _initialState = {
        prop1: true
      },
      _initialValue = () => _initialState;
    _renderInitialTest(_initialValue, _initialState);
  });
});
//# sourceMappingURL=useToggleState.test.js.map