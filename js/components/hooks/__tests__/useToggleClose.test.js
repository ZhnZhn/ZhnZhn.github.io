"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = require("@testing-library/react");
var _useToggleClose = _interopRequireDefault(require("../useToggleClose"));
const _getState = result => result.current[0],
  _getToggle = result => result.current[1],
  _getClose = result => result.current[2];

/* eslint-disable react-hooks/rules-of-hooks */
const _renderInitialTest = (initialValue, expectedValue) => {
  const {
    result
  } = (0, _react.renderHook)(() => (0, _useToggleClose.default)(initialValue));
  expect(_getState(result)).toBe(expectedValue);
  const toggle = _getToggle(result),
    close = _getClose(result);
  expect(typeof toggle).toBe('function');
  expect(typeof close).toBe('function');
  return [result, toggle, close];
};
/* eslint-enable react-hooks/rules-of-hooks */

describe('useToggleClose', () => {
  test('should return tuple with boolean state, by default false, and reference equal functions toggle, close', () => {
    const [result, toggle, close] = _renderInitialTest(void 0, false);
    (0, _react.act)(() => toggle());
    expect(_getState(result)).toBe(true);
    expect(_getToggle(result)).toBe(toggle);
    expect(_getClose(result)).toBe(close);
    (0, _react.act)(() => close());
    expect(_getState(result)).toBe(false);
    expect(_getToggle(result)).toBe(toggle);
    expect(_getClose(result)).toBe(close);
    (0, _react.act)(() => toggle());
    expect(_getState(result)).toBe(true);
    expect(_getToggle(result)).toBe(toggle);
    expect(_getClose(result)).toBe(close);
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
//# sourceMappingURL=useToggleClose.test.js.map