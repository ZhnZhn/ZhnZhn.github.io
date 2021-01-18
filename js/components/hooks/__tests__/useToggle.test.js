"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reactHooks = require("@testing-library/react-hooks");

var _useToggle = _interopRequireDefault(require("../useToggle"));

var _getState = function _getState(result) {
  return result.current[0];
},
    _getToggle = function _getToggle(result) {
  return result.current[1];
};
/* eslint-disable react-hooks/rules-of-hooks */


var _renderInitialTest = function _renderInitialTest(initialValue, expectedValue) {
  var _renderHook = (0, _reactHooks.renderHook)(function () {
    return (0, _useToggle["default"])(initialValue);
  }),
      result = _renderHook.result;

  expect(_getState(result)).toBe(expectedValue);

  var toggle = _getToggle(result);

  expect(typeof toggle).toBe('function');
  return [result, toggle];
};
/* eslint-enable react-hooks/rules-of-hooks */


var _testToggle = function _testToggle(result, toggle) {
  var beforeState = _getState(result);

  expect(typeof beforeState).toBe('boolean');
  (0, _reactHooks.act)(toggle);
  expect(_getState(result)).toBe(!beforeState);
  expect(_getToggle(result)).toEqual(toggle);
};

describe('useToggle', function () {
  test('should toggle state from default initialValue false', function () {
    var _renderInitialTest2 = _renderInitialTest(void 0, false),
        result = _renderInitialTest2[0],
        toggle = _renderInitialTest2[1];

    var _actToggleTest = _testToggle.bind(null, result, toggle);

    _actToggleTest();

    _actToggleTest();
  });
  test('should use bool initialValue', function () {
    var _renderInitialTest3 = _renderInitialTest(true, true),
        result = _renderInitialTest3[0],
        toggle = _renderInitialTest3[1];

    var _actToggleTest = _testToggle.bind(null, result, toggle);

    _actToggleTest();

    _actToggleTest();
  });
  test('should convert to bool initialValue', function () {
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