"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reactHooks = require("@testing-library/react-hooks");

var _useToggle = _interopRequireDefault(require("../useToggle"));

describe('useToggle', function () {
  test('should toggle state from default initialValue false', function () {
    var _renderHook = (0, _reactHooks.renderHook)(function () {
      return (0, _useToggle["default"])();
    }),
        result = _renderHook.result; //assert initial state


    expect(result.current[0]).toBe(false);
    var _toggle = result.current[1];
    expect(typeof _toggle).toBe('function'); //toggle && assert new state

    (0, _reactHooks.act)(result.current[1]);
    expect(result.current[0]).toBe(true);
    expect(result.current[1]).toEqual(_toggle); //toggle && assert new state

    (0, _reactHooks.act)(result.current[1]);
    expect(result.current[0]).toBe(false);
    expect(result.current[1]).toEqual(_toggle);
  });
  test('should use bool initialValue', function () {
    var _renderHook2 = (0, _reactHooks.renderHook)(function () {
      return (0, _useToggle["default"])(true);
    }),
        result = _renderHook2.result; //assert initial state


    expect(result.current[0]).toBe(true); //toggle && assert new state

    (0, _reactHooks.act)(result.current[1]);
    expect(result.current[0]).toBe(false);
  });
  test('should convert to bool initialValue', function () {
    var _renderHook3 = (0, _reactHooks.renderHook)(function () {
      return (0, _useToggle["default"])(null);
    }),
        result = _renderHook3.result;

    expect(result.current[0]).toBe(false);

    var _renderHook4 = (0, _reactHooks.renderHook)(function () {
      return (0, _useToggle["default"])('');
    }),
        r2 = _renderHook4.result;

    expect(r2.current[0]).toBe(false);

    var _renderHook5 = (0, _reactHooks.renderHook)(function () {
      return (0, _useToggle["default"])(0);
    }),
        r3 = _renderHook5.result;

    expect(r3.current[0]).toBe(false);

    var _renderHook6 = (0, _reactHooks.renderHook)(function () {
      return (0, _useToggle["default"])(NaN);
    }),
        r4 = _renderHook6.result;

    expect(r4.current[0]).toBe(false);

    var _renderHook7 = (0, _reactHooks.renderHook)(function () {
      return (0, _useToggle["default"])(1);
    }),
        r5 = _renderHook7.result;

    expect(r5.current[0]).toBe(true);

    var _renderHook8 = (0, _reactHooks.renderHook)(function () {
      return (0, _useToggle["default"])('str');
    }),
        r6 = _renderHook8.result;

    expect(r6.current[0]).toBe(true);
  });
});
//# sourceMappingURL=useToggle.test.js.map