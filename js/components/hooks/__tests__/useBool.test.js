"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reactHooks = require("@testing-library/react-hooks");

var _useBool = _interopRequireDefault(require("../useBool"));

var _getIs = function _getIs(result) {
  return result.current[0];
},
    _getSetTrue = function _getSetTrue(result) {
  return result.current[1];
},
    _getSetFalse = function _getSetFalse(result) {
  return result.current[2];
};
/* eslint-disable react-hooks/rules-of-hooks */


var _testInitialValue = function _testInitialValue(initialValue, expectedValue) {
  var _renderHook = (0, _reactHooks.renderHook)(function () {
    return (0, _useBool["default"])(initialValue);
  }),
      r1 = _renderHook.result;

  expect(_getIs(r1)).toBe(expectedValue);
};
/* eslint-enable react-hooks/rules-of-hooks */


var _actSetValue = function _actSetValue(r, setTrue, setFalse, setValue, expectedValue) {
  (0, _reactHooks.act)(setValue);
  expect(_getIs(r)).toBe(expectedValue);
  expect(_getSetTrue(r)).toEqual(setTrue);
  expect(_getSetFalse(r)).toEqual(setFalse);
};

describe('useBool', function () {
  test('should use initialValue with default value false', function () {
    _testInitialValue(void 0, false);

    _testInitialValue(false, false);

    _testInitialValue(true, true);
  });
  test('should return setTrue and setFalse function for setting vale', function () {
    var _renderHook2 = (0, _reactHooks.renderHook)(function () {
      return (0, _useBool["default"])();
    }),
        r1 = _renderHook2.result,
        setTrue = _getSetTrue(r1),
        setFalse = _getSetFalse(r1);

    expect(_getIs(r1)).toBe(false);
    expect(typeof setTrue).toBe('function');
    expect(typeof setFalse).toBe('function');

    var _testActSetValue = _actSetValue.bind(null, r1, setTrue, setFalse);

    _testActSetValue(setTrue, true);

    _testActSetValue(setTrue, true);

    _testActSetValue(setFalse, false);
  });
});
//# sourceMappingURL=useBool.test.js.map