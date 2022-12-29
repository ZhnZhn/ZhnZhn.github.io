"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = require("@testing-library/react");
var _useHasNotEqual = _interopRequireDefault(require("../useHasNotEqual"));
const _getHas = result => result.current;
const _rerender = (result, rerender, value, expectedResult) => {
  rerender({
    value
  });
  expect(_getHas(result)).toBe(expectedResult);
};
describe('useHasNotEqual', () => {
  test('should return false for initial render and for same value for next rerender', () => {
    const is = true,
      {
        result,
        rerender
      } = (0, _react.renderHook)(_ref => {
        let {
          value
        } = _ref;
        return (0, _useHasNotEqual.default)(value);
      }, {
        initialProps: {
          value: is
        }
      });
    expect(_getHas(result)).toBe(false);
    const _testRerender = _rerender.bind(null, result, rerender);

    // for bool
    _testRerender(is, false);
    _testRerender(false, true);
    _testRerender(!is, false);
    _testRerender(is, true);
    _testRerender(is, false);
    _testRerender(is, false);

    // for object
    const obj = {};
    _testRerender(obj, true);
    _testRerender(obj, false);
    _testRerender({}, true);
    _testRerender({}, true);
    _testRerender(obj, true);
    _testRerender(obj, false);
    _testRerender(obj, false);
  });
});
//# sourceMappingURL=useHasNotEqual.test.js.map