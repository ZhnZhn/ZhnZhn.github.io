"use strict";

var _react = require("@testing-library/react");
var _useProperty = require("../useProperty");
const _getValue = result => result.current;
const _testRenderAndRerender = (init, expectedValue) => {
  const {
    result,
    rerender
  } = (0, _react.renderHook)(() => (0, _useProperty.useRefInit)(init));
  expect(_getValue(result)).toBe(expectedValue);
  rerender();
  expect(_getValue(result)).toBe(expectedValue);
  expect(init).toHaveBeenCalledTimes(1);
};
describe('useRefInit', () => {
  test('should return computed by function value', () => {
    _testRenderAndRerender(jest.fn(() => false), false);
    _testRenderAndRerender(jest.fn(() => true), true);
    _testRenderAndRerender(jest.fn(() => ''), '');
  });
});
//# sourceMappingURL=useRefInit.test.js.map