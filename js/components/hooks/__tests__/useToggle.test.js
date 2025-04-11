"use strict";

var _react = require("@testing-library/react");
var _useToggle = require("../useToggle");
const _getState = result => result.current[0],
  _getToggle = result => result.current[1];

/* eslint-disable react-hooks/rules-of-hooks */
const _renderInitialTest = (initialValue, expectedValue) => {
  const {
    result
  } = (0, _react.renderHook)(() => (0, _useToggle.useToggle)(initialValue));
  expect(_getState(result)).toBe(expectedValue);
  const toggle = _getToggle(result);
  expect(typeof toggle).toBe('function');
  return [result, toggle];
};
/* eslint-enable react-hooks/rules-of-hooks */

const _testToggle = (result, toggle) => {
  const beforeState = _getState(result);
  expect(typeof beforeState).toBe('boolean');
  (0, _react.act)(toggle);
  expect(_getState(result)).toBe(!beforeState);
  expect(_getToggle(result)).toEqual(toggle);
};
describe('useToggle', () => {
  test('should toggle state from default initialValue false', () => {
    const [result, toggle] = _renderInitialTest(void 0, false);
    const _actToggleTest = _testToggle.bind(null, result, toggle);
    _actToggleTest();
    _actToggleTest();
  });
  test('should use bool initialValue', () => {
    const [result, toggle] = _renderInitialTest(true, true);
    const _actToggleTest = _testToggle.bind(null, result, toggle);
    _actToggleTest();
    _actToggleTest();
  });
  test('should use boolean parameter for toggle', () => {
    const [result, toggle] = _renderInitialTest(false, false);
    (0, _react.act)(() => toggle(false));
    expect(_getState(result)).toBe(false);
    (0, _react.act)(() => toggle(true));
    expect(_getState(result)).toBe(true);
  });
  test('should toggle in case toggle parameter not boolean', () => {
    const [result, toggle] = _renderInitialTest(false, false);
    (0, _react.act)(() => toggle(''));
    expect(_getState(result)).toBe(true);
    (0, _react.act)(() => toggle(0));
    expect(_getState(result)).toBe(false);
  });
  test('should convert to bool initialValue', () => {
    _renderInitialTest(null, false);
    _renderInitialTest(void 0, false);
    _renderInitialTest('', false);
    _renderInitialTest(0, false);
    _renderInitialTest(NaN, false);
    _renderInitialTest(1, true);
    _renderInitialTest('str', true);
  });
});
//# sourceMappingURL=useToggle.test.js.map