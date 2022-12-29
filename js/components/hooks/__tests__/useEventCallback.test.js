"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = require("@testing-library/react");
var _useEventCallback = _interopRequireDefault(require("../useEventCallback"));
describe('useEventCallback', () => {
  test('should return same function on rerender', () => {
    const handler1 = jest.fn(),
      {
        result,
        rerender
      } = (0, _react.renderHook)(_ref => {
        let {
          handler
        } = _ref;
        return (0, _useEventCallback.default)(handler);
      }, {
        initialProps: {
          handler: handler1
        }
      }),
      fn1 = result.current;
    expect(typeof fn1).toBe('function');
    const hadnler2 = jest.fn();
    rerender({
      handler: hadnler2
    });
    const fn2 = result.current;
    expect(fn1).toEqual(fn2);
  });
});
//# sourceMappingURL=useEventCallback.test.js.map