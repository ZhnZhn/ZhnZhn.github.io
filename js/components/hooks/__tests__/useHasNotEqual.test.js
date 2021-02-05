"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reactHooks = require("@testing-library/react-hooks");

var _useHasNotEqual = _interopRequireDefault(require("../useHasNotEqual"));

var _getHas = function _getHas(result) {
  return result.current;
};

var _rerender = function _rerender(result, rerender, value, expectedResult) {
  rerender({
    value: value
  });
  expect(_getHas(result)).toBe(expectedResult);
};

describe('useHasNotEqual', function () {
  test('should return false for initial render and for same value for next rerender', function () {
    var is = true,
        _renderHook = (0, _reactHooks.renderHook)(function (_ref) {
      var value = _ref.value;
      return (0, _useHasNotEqual["default"])(value);
    }, {
      initialProps: {
        value: is
      }
    }),
        result = _renderHook.result,
        rerender = _renderHook.rerender;

    expect(_getHas(result)).toBe(false);

    var _testRerender = _rerender.bind(null, result, rerender); // for bool


    _testRerender(is, false);

    _testRerender(false, true);

    _testRerender(!is, false);

    _testRerender(is, true);

    _testRerender(is, false);

    _testRerender(is, false); // for object


    var obj = {};

    _testRerender(obj, true);

    _testRerender(obj, false);

    _testRerender({}, true);

    _testRerender({}, true);

    _testRerender(obj, true);

    _testRerender(obj, false);

    _testRerender(obj, false);
  });
});
//# sourceMappingURL=useHasNotEqual.test.js.map