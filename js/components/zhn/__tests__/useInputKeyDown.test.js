"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reactHooks = require("@testing-library/react-hooks");

var _useInputKeyDown = _interopRequireDefault(require("../useInputKeyDown"));

describe('useInputKeyDown', function () {
  test('should return handle for input KeyDown', function () {
    var onEnter = jest.fn(),
        onDelete = jest.fn();
    var initialValue = 'a';

    var _renderHook = (0, _reactHooks.renderHook)(function (_ref) {
      var onEnter = _ref.onEnter,
          onDelete = _ref.onDelete,
          initialValue = _ref.initialValue;
      return (0, _useInputKeyDown["default"])({
        onEnter: onEnter,
        onDelete: onDelete
      }, [initialValue]);
    }, {
      initialProps: {
        onEnter: onEnter,
        onDelete: onDelete,
        initialValue: initialValue
      }
    }),
        result = _renderHook.result,
        rerender = _renderHook.rerender; //1 Test return type


    var onKeyDown = result.current;
    expect(typeof onKeyDown).toBe('function'); //2.1 Test onEnter with event.target.value

    (0, _reactHooks.act)(function () {
      return onKeyDown({
        keyCode: 13,
        target: {
          value: 'a'
        }
      });
    });
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEnter.mock.calls[0][0]).toBe('a'); //3.1 Test onDelete for Escape

    var preventDefault = jest.fn();
    (0, _reactHooks.act)(function () {
      return onKeyDown({
        keyCode: 27,
        preventDefault: preventDefault
      });
    });
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(preventDefault).toHaveBeenCalledTimes(1); //3.2 Test onDelete for Delete

    (0, _reactHooks.act)(function () {
      return onKeyDown({
        keyCode: 46,
        preventDefault: preventDefault
      });
    });
    expect(onDelete).toHaveBeenCalledTimes(2);
    expect(preventDefault).toHaveBeenCalledTimes(2); //4 Test rerender with new deps

    initialValue = 'b';
    rerender({
      onEnter: void 0,
      initialValue: initialValue
    }); //4.1 Test return new function

    expect(typeof result.current).toBe('function');
    expect(result.current).not.toBe(onKeyDown); //2.2 Test onEnter without fn

    (0, _reactHooks.act)(function () {
      return result.current({
        keyCode: 13
      });
    });
    expect(onEnter).toHaveBeenCalledTimes(1);
  });
});
//# sourceMappingURL=useInputKeyDown.test.js.map