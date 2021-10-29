"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reactHooks = require("@testing-library/react-hooks");

var _useRefSet = _interopRequireDefault(require("../useRefSet"));

const _getRefValue = result => result.current[0].current;

const _getSetValue = result => result.current[1];

describe('useRefSet', () => {
  test('should return [ref, setRefValue]', () => {
    const initialValue = 'initialValue',
          updatedValue = 'updatedValue',
          {
      result,
      rerender
    } = (0, _reactHooks.renderHook)(initialValue => (0, _useRefSet.default)(initialValue), {
      initialProps: initialValue
    }),
          setRefValue = _getSetValue(result); //1 Test initialValue


    expect(_getRefValue(result)).toBe(initialValue); //2 Test rerender

    rerender(updatedValue);
    expect(_getRefValue(result)).toBe(initialValue);
    expect(setRefValue).toBe(_getSetValue(result)); //3 Test setRefValue

    setRefValue(updatedValue);
    expect(_getRefValue(result)).toBe(updatedValue);
  });
});
//# sourceMappingURL=useRefSet.test.js.map