"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reactHooks = require("@testing-library/react-hooks");

var _useSelectItem = _interopRequireDefault(require("../useSelectItem"));

var _getRef = function _getRef(result) {
  return result.current[0];
};

var _getRefValue = function _getRefValue(result) {
  return _getRef(result).current;
};

var _getSelect = function _getSelect(result) {
  return result.current[1];
};

describe('useSelectItem', function () {
  test('should return [ref, const select]', function () {
    var _renderHook = (0, _reactHooks.renderHook)(function () {
      return (0, _useSelectItem["default"])();
    }),
        r1 = _renderHook.result,
        rerender = _renderHook.rerender; //1 Initial values


    expect(_getRefValue(r1)).toBe(void 0);

    var _select = _getSelect(r1);

    expect(typeof _select).toBe('function'); //2.1 select item

    _select({
      caption: 'a'
    });

    expect(_getRefValue(r1)).toBe('a'); //2.2 select empty item

    _select();

    expect(_getRefValue(r1)).toBe(void 0); //2.3 select item

    _select({
      caption: 'b'
    });

    expect(_getRefValue(r1)).toBe('b'); //3 rerender

    rerender();
    expect(_getRefValue(r1)).toBe('b');
    expect(_getSelect(r1)).toBe(_select);
  });
});
//# sourceMappingURL=useSelectItem.test.js.map