"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = require("@testing-library/react");
var _useInputKeyDown = _interopRequireDefault(require("../useInputKeyDown"));
describe('useInputKeyDown', () => {
  test('should return handler for input KeyDown', () => {
    const onEnter = jest.fn(),
      onDelete = jest.fn(),
      stopPropagation = jest.fn(),
      stopImmediatePropagation = jest.fn(),
      evt = {
        stopPropagation,
        nativeEvent: {
          stopImmediatePropagation
        }
      };
    let initialValue = 'a';
    const {
      result,
      rerender
    } = (0, _react.renderHook)(_ref => {
      let {
        onEnter,
        onDelete,
        initialValue
      } = _ref;
      return (0, _useInputKeyDown.default)({
        onEnter,
        onDelete
      }, [initialValue]);
    }, {
      initialProps: {
        onEnter,
        onDelete,
        initialValue
      }
    });

    //1 Test return type
    let onKeyDown = result.current;
    expect(typeof onKeyDown).toBe('function');

    //2.1 Test onEnter with event.target.value
    (0, _react.act)(() => onKeyDown({
      ...evt,
      keyCode: 13,
      target: {
        value: 'a'
      }
    }));
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEnter.mock.calls[0][0]).toBe('a');
    expect(stopPropagation).toHaveBeenCalledTimes(1);
    expect(stopImmediatePropagation).toHaveBeenCalledTimes(1);

    //3.1 Test onDelete for Escape
    const preventDefault = jest.fn();
    (0, _react.act)(() => onKeyDown({
      ...evt,
      preventDefault,
      keyCode: 27
    }));
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(stopPropagation).toHaveBeenCalledTimes(2);
    expect(stopImmediatePropagation).toHaveBeenCalledTimes(2);
    //3.2 Test onDelete for Delete
    (0, _react.act)(() => onKeyDown({
      ...evt,
      keyCode: 46,
      preventDefault
    }));
    expect(onDelete).toHaveBeenCalledTimes(2);
    expect(preventDefault).toHaveBeenCalledTimes(2);
    expect(stopPropagation).toHaveBeenCalledTimes(3);
    expect(stopImmediatePropagation).toHaveBeenCalledTimes(3);

    //4 Test rerender with new deps
    initialValue = 'b';
    rerender({
      onEnter: void 0,
      initialValue
    });
    //4.1 Test return new function
    expect(typeof result.current).toBe('function');
    expect(result.current).not.toBe(onKeyDown);
    //2.2 Test onEnter without fn
    (0, _react.act)(() => result.current({
      ...evt,
      keyCode: 13
    }));
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(stopPropagation).toHaveBeenCalledTimes(4);
    expect(stopImmediatePropagation).toHaveBeenCalledTimes(4);
  });
});
//# sourceMappingURL=useInputKeyDown.test.js.map