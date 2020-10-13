"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reactHooks = require("@testing-library/react-hooks");

var _useKeyEscape = _interopRequireDefault(require("../useKeyEscape"));

var _factorySameFnForEmptyDeps = _interopRequireDefault(require("./_factorySameFnForEmptyDeps"));

describe('useKeyEscape', function () {
  test('', function () {
    var onEscape = jest.fn(),
        _renderHook = (0, _reactHooks.renderHook)(function (_ref) {
      var onEscape = _ref.onEscape;
      return (0, _useKeyEscape["default"])(onEscape, [onEscape]);
    }, {
      initialProps: {
        onEscape: onEscape
      }
    }),
        result = _renderHook.result,
        rerender = _renderHook.rerender; //1 Test return type


    var _onKeyEscape = result.current;
    expect(typeof _onKeyEscape).toBe('function');
    expect(onEscape).toHaveBeenCalledTimes(0); //2 Test KeyDown
    //2.1 KeyDown Escape

    var _eventEscape = {
      keyCode: 27,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    };
    (0, _reactHooks.act)(function () {
      return _onKeyEscape(_eventEscape);
    });
    expect(result.current).toEqual(_onKeyEscape);
    expect(_eventEscape.preventDefault).toHaveBeenCalledTimes(1);
    expect(_eventEscape.stopPropagation).toHaveBeenCalledTimes(1);
    expect(onEscape).toHaveBeenCalledTimes(1);
    expect(onEscape.mock.calls[0][0]).toBe(void 0); //2.2 KeyDown not Escape

    var _eventNotEscape = {
      keyCode: 20
    };
    (0, _reactHooks.act)(function () {
      return _onKeyEscape(_eventNotEscape);
    });
    expect(onEscape).toHaveBeenCalledTimes(1); //3 Test rerender for return instance depended on deps
    //3.1 With same onEscape

    rerender({
      onEscape: onEscape
    });
    expect(_onKeyEscape).toEqual(result.current); //3.2 With new onEnter

    rerender({
      onEnter: jest.fn()
    });
    expect(_onKeyEscape).not.toEqual(result.current);
  });
  test('should return same fn in case of empty deps', (0, _factorySameFnForEmptyDeps["default"])(_useKeyEscape["default"]));
});
//# sourceMappingURL=useKeyEscape.test.js.map