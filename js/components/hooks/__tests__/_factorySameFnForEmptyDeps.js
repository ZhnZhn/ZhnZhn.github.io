"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = require("@testing-library/react");
describe('_factorySameFnForEmptyDeps', () => {
  test('', () => expect('').toBe(''));
});
const factorySameFnForEmptyDeps = useHook => () => {
  const fn = jest.fn()
    //1 Test return type
    ,
    {
      result,
      rerender
    } = (0, _react.renderHook)(_ref => {
      let {
        fn
      } = _ref;
      return useHook(fn);
    }, {
      initialProps: {
        fn
      }
    });
  const _fn = result.current;
  expect(typeof _fn).toBe('function');

  //2 Test rerender
  //2.1 With same fn
  rerender({
    fn
  });
  expect(_fn).toEqual(result.current);

  //2.2 With new fn
  rerender({
    fn: jest.fn()
  });
  expect(_fn).toEqual(result.current);

  //2.3 With empty fn
  rerender({});
  expect(_fn).toEqual(result.current);
};
var _default = factorySameFnForEmptyDeps;
exports.default = _default;
//# sourceMappingURL=_factorySameFnForEmptyDeps.js.map