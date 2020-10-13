"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _reactHooks = require("@testing-library/react-hooks");

describe('_factorySameFnForEmptyDeps', function () {
  test('', function () {
    return expect('').toBe('');
  });
});

var factorySameFnForEmptyDeps = function factorySameFnForEmptyDeps(useHook) {
  return function () {
    var fn = jest.fn(),
        _renderHook = (0, _reactHooks.renderHook)(function (_ref) {
      var fn = _ref.fn;
      return useHook(fn);
    }, {
      initialProps: {
        fn: fn
      }
    }),
        result = _renderHook.result,
        rerender = _renderHook.rerender; //1 Test return type


    var _fn = result.current;
    expect(typeof _fn).toBe('function'); //2 Test rerender
    //2.1 With same fn

    rerender({
      fn: fn
    });
    expect(_fn).toEqual(result.current); //2.2 With new fn

    rerender({
      fn: jest.fn()
    });
    expect(_fn).toEqual(result.current); //2.3 With empty fn

    rerender();
    expect(_fn).toEqual(result.current);
  };
};

var _default = factorySameFnForEmptyDeps;
exports["default"] = _default;
//# sourceMappingURL=_factorySameFnForEmptyDeps.js.map