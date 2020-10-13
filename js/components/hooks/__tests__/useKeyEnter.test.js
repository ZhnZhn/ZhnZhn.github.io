"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reactHooks = require("@testing-library/react-hooks");

var _useKeyEnter = _interopRequireDefault(require("../useKeyEnter"));

var _factorySameFnForEmptyDeps = _interopRequireDefault(require("./_factorySameFnForEmptyDeps"));

describe('useKeyEnter', function () {
  test('should return fn onKeyEnter depended of deps', function () {
    var onEnter = jest.fn(),
        _renderHook = (0, _reactHooks.renderHook)(function (_ref) {
      var onEnter = _ref.onEnter;
      return (0, _useKeyEnter["default"])(onEnter, [onEnter]);
    }, {
      initialProps: {
        onEnter: onEnter
      }
    }),
        result = _renderHook.result,
        rerender = _renderHook.rerender; //1 Test return type


    var _onKeyEnter = result.current;
    expect(typeof _onKeyEnter).toBe('function');
    expect(onEnter).toHaveBeenCalledTimes(0); //2 Test KeyDown
    //2.1 KeyDown Enter

    var _eventEnter = {
      keyCode: 13
    };
    (0, _reactHooks.act)(function () {
      return _onKeyEnter(_eventEnter);
    });
    expect(result.current).toEqual(_onKeyEnter);
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEnter.mock.calls[0][0]).toBe(_eventEnter); //2.2 KeyDown Blank

    var _eventBlank = {
      keyCode: 32
    };
    (0, _reactHooks.act)(function () {
      return _onKeyEnter(_eventBlank);
    });
    expect(result.current).toEqual(_onKeyEnter);
    expect(onEnter).toHaveBeenCalledTimes(2);
    expect(onEnter.mock.calls[1][0]).toBe(_eventBlank); //2.2 KeyDown not onEnter

    var _eventNotEnter = {
      keyCode: 20
    };
    (0, _reactHooks.act)(function () {
      return _onKeyEnter(_eventNotEnter);
    });
    expect(onEnter).toHaveBeenCalledTimes(2); //3 Test rerender for return instance depended on deps
    //3.1 With same onEnter

    rerender({
      onEnter: onEnter
    });
    expect(_onKeyEnter).toEqual(result.current); //3.2 With new onEnter

    rerender({
      onEnter: jest.fn()
    });
    expect(_onKeyEnter).not.toEqual(result.current);
  });
  test('should return same fn in case of empty deps', (0, _factorySameFnForEmptyDeps["default"])(_useKeyEnter["default"]));
});
//# sourceMappingURL=useKeyEnter.test.js.map