"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reactHooks = require("@testing-library/react-hooks");

var _useProperty = _interopRequireDefault(require("../useProperty"));

var _getSetValue = function _getSetValue(result) {
  return result.current[0];
};

var _getGetValue = function _getGetValue(result) {
  return result.current[1];
};

describe('useProperty', function () {
  test('should return constant setter and changing getter across rendering', function () {
    var initialValue = 'a',
        _renderHook = (0, _reactHooks.renderHook)(function () {
      return (0, _useProperty["default"])(initialValue);
    }),
        result = _renderHook.result,
        rerender = _renderHook.rerender;

    var _getValue1 = _getGetValue(result),
        _setValue1 = _getSetValue(result);

    expect(_getValue1()).toBe(initialValue);

    _setValue1('b');

    expect(_getValue1()).toBe('b');
    rerender();

    var _setValue2 = _getSetValue(result),
        _getValue2 = _getGetValue(result);

    expect(_setValue1).toBe(_setValue2);
    expect(_getValue2).not.toBe(_getValue1);
    expect(_getValue2()).toBe('b');

    _setValue2('c');

    expect(_getValue2()).toBe('c');
  });
});
//# sourceMappingURL=useProperty.test.js.map