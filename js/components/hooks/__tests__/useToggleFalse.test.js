"use strict";

var _react = require("@testing-library/react");
var _useBool = require("../useBool");
const _getState = result => result.current[0],
  _getToggle = result => result.current[1],
  _getSetFalse = result => result.current[2];
const _renderInitialTest = (initialValue, expectedValue) => {
  const {
    result
  } = (0, _react.renderHook)(() => (0, _useBool.useToggleFalse)(initialValue));
  expect(_getState(result)).toBe(expectedValue);
  const toggle = _getToggle(result),
    setFalse = _getSetFalse(result);
  expect(typeof toggle).toBe('function');
  expect(typeof setFalse).toBe('function');
  return [result, toggle, setFalse];
};
describe('useToggleFalse', () => {
  test('should return tuple with boolean state, by default false, and reference equal functions toggle, setFalse', () => {
    const [result, toggle, setFalse] = _renderInitialTest(void 0, false);
    (0, _react.act)(() => toggle());
    expect(_getState(result)).toBe(true);
    expect(_getToggle(result)).toBe(toggle);
    expect(_getSetFalse(result)).toBe(setFalse);
    (0, _react.act)(() => setFalse());
    expect(_getState(result)).toBe(false);
    expect(_getToggle(result)).toBe(toggle);
    expect(_getSetFalse(result)).toBe(setFalse);
    (0, _react.act)(() => toggle());
    expect(_getState(result)).toBe(true);
    expect(_getToggle(result)).toBe(toggle);
    expect(_getSetFalse(result)).toBe(setFalse);
  });
  test('should use boolean initialValue parameter', () => {
    _renderInitialTest(false, false);
    _renderInitialTest(true, true);
  });
  test('should convert initialValue to boolean', () => {
    _renderInitialTest(null, false);
    _renderInitialTest(void 0, false);
    _renderInitialTest('', false);
    _renderInitialTest(0, false);
    _renderInitialTest(NaN, false);
    _renderInitialTest(1, true);
    _renderInitialTest('str', true);
  });
});
//# sourceMappingURL=useToggleFalse.test.js.map