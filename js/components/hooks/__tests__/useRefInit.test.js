"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = require("@testing-library/react");
var _useRefInit = _interopRequireDefault(require("../useRefInit"));
const _getValue = result => result.current;

/* eslint-disable react-hooks/rules-of-hooks */
const _testRenderAndRerender = (init, expectedValue) => {
  const {
    result: r1,
    rerender: rr1
  } = (0, _react.renderHook)(() => (0, _useRefInit.default)(init));
  expect(_getValue(r1)).toBe(expectedValue);
  rr1();
  expect(_getValue(r1)).toBe(expectedValue);
  expect(init).toBeCalledTimes(1);
};
/* eslint-enable react-hooks/rules-of-hooks */

describe('useRefInit', () => {
  test('should return computed by function value', () => {
    _testRenderAndRerender(jest.fn(() => false), false);
    _testRenderAndRerender(jest.fn(() => true), true);
    _testRenderAndRerender(jest.fn(() => ''), '');
  });
});
//# sourceMappingURL=useRefInit.test.js.map