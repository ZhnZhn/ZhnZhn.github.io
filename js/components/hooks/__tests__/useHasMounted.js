"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reactHooks = require("@testing-library/react-hooks");

var _useHasMounted = _interopRequireDefault(require("../useHasMounted"));

var _getHasMounted = function _getHasMounted(result) {
  return result.current;
};

describe('useHasMounted', function () {
  test('should return true only for first render', function () {
    var _renderHook = (0, _reactHooks.renderHook)(function () {
      return (0, _useHasMounted["default"])();
    }),
        result = _renderHook.result,
        rerender = _renderHook.rerender;

    expect(_getHasMounted(result)).toBe(true);
    rerender();
    expect(_getHasMounted(result)).toBe(false);
    rerender();
    expect(_getHasMounted(result)).toBe(false);
  });
});
//# sourceMappingURL=useHasMounted.js.map