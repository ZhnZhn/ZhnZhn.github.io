"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reactHooks = require("@testing-library/react-hooks");

var _useRefInit = _interopRequireDefault(require("../useRefInit"));

var _getValue = function _getValue(result) {
  return result.current;
};
/* eslint-disable react-hooks/rules-of-hooks */


var _testRenderAndRerender = function _testRenderAndRerender(init, expectedValue) {
  var _renderHook = (0, _reactHooks.renderHook)(function () {
    return (0, _useRefInit["default"])(init);
  }),
      r1 = _renderHook.result,
      rr1 = _renderHook.rerender;

  expect(_getValue(r1)).toBe(expectedValue);
  rr1();
  expect(_getValue(r1)).toBe(expectedValue);
  expect(init).toBeCalledTimes(1);
};
/* eslint-enable react-hooks/rules-of-hooks */


describe('useRefInit', function () {
  test('should return computed by function value', function () {
    _testRenderAndRerender(jest.fn(function () {
      return false;
    }), false);

    _testRenderAndRerender(jest.fn(function () {
      return true;
    }), true);

    _testRenderAndRerender(jest.fn(function () {
      return '';
    }), '');
  });
});
//# sourceMappingURL=useRefInit.test.js.map