"use strict";

var _uiApi = require("../uiApi");
describe("getRefValue", () => {
  const fn = _uiApi.getRefValue;
  test('should return ref value', () => {
    expect(fn()).toBe(void 0);
    expect(fn(null)).toBe(void 0);
    expect(fn({
      current: 'a'
    })).toBe('a');
  });
});
describe("setRefValue", () => {
  const fn = _uiApi.setRefValue;
  test("should set value to ref", () => {
    const ref = {
        current: void 0
      },
      value = 'v';
    fn(ref, value);
    expect(ref.current).toBe(value);
  });
});
describe("focusRefElement", () => {
  const fn = _uiApi.focusRefElement,
    _crRefWithFocus = focus => ({
      current: {
        focus
      }
    });
  test('should call focus function from ref1', () => {
    const focus1 = jest.fn(),
      focus2 = jest.fn(),
      ref1 = _crRefWithFocus(focus1),
      ref2 = _crRefWithFocus(focus2);
    fn(ref1, ref2);
    expect(focus1).toHaveBeenCalledTimes(1);
    expect(focus2).toHaveBeenCalledTimes(0);
  });
  test('should call focus function from ref2', () => {
    const focus2 = jest.fn(),
      ref2 = _crRefWithFocus(focus2);
    fn(void 0, ref2);
    expect(focus2).toHaveBeenCalledTimes(1);
  });
});
describe("isInputValid", () => {
  const fn = _uiApi.isInputValid;
  test("should return valid boolean from ref instance", () => {
    expect(fn()).toBe(false);
    expect(fn(null)).toBe(false);
    expect(fn({
      current: void 0
    })).toBe(false);
    expect(fn({
      current: null
    })).toBe(false);
    expect(fn({
      current: {
        isValid: () => true
      }
    })).toBe(true);
    expect(fn({
      current: {
        isValid: () => false
      }
    })).toBe(false);
  });
  test("should retun false for wrong method name", () => {
    expect(fn({
      current: {
        isInputValid: () => true
      }
    })).toBe(false);
    expect(fn({
      current: {
        is: () => true
      }
    })).toBe(false);
  });
});
describe("getInputValue", () => {
  const fn = _uiApi.getInputValue;
  test("should return input value from ref instance", () => {
    expect(fn()).toBe();
    expect(fn(null)).toBe();
    expect(fn({
      current: void 0
    })).toBe();
    expect(fn({
      current: null
    })).toBe();
    expect(fn({
      current: {
        getV: () => 'value'
      }
    })).toBe();
    expect(fn({
      current: {
        getValue: () => 'value'
      }
    })).toBe('value');
  });
});
describe('getInputValidValue', () => {
  const fn = _uiApi.getInputValidValue;
  test('should return from ref valid value or dfValue', () => {
    const value = 'value',
      dfValue = 'dfValue';
    expect(fn({
      current: {
        isValid: () => true,
        getValue: () => value
      }
    })).toBe(value);
    expect(fn({
      current: {
        isValid: () => false
      }
    }, dfValue)).toBe(dfValue);
  });
  test('should return dfValue in edge case of isValid', () => {
    const dfValue = 'dfValue';
    expect(fn(void 0, dfValue)).toBe(dfValue);
    expect(fn(null, dfValue)).toBe(dfValue);
    expect(fn({}, dfValue)).toBe(dfValue);
    expect(fn({
      current: null
    }, dfValue)).toBe(dfValue);
    expect(fn({
      current: {
        isValid: true
      }
    }, dfValue)).toBe(dfValue);
  });
  test('should return void 0 in edge case of getValue', () => {
    const dfValue = 'dfValue';
    expect(fn({
      current: {
        isValid: () => true
      }
    }, dfValue)).toBe(void 0);
    expect(fn({
      current: {
        isValid: () => true,
        getValue: 'value'
      }
    }, dfValue)).toBe(void 0);
  });
});
//# sourceMappingURL=uiApi.test.js.map