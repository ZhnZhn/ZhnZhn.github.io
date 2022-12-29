"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = require("@testing-library/react");
var _useHasMounted = _interopRequireDefault(require("../useHasMounted"));
const _getHasMounted = result => result.current;
describe('useHasMounted', () => {
  test('should return true only for first render', () => {
    const {
      result,
      rerender
    } = (0, _react.renderHook)(() => (0, _useHasMounted.default)());
    expect(_getHasMounted(result)).toBe(true);
    rerender();
    expect(_getHasMounted(result)).toBe(false);
    rerender();
    expect(_getHasMounted(result)).toBe(false);
  });
});
//# sourceMappingURL=useHasMounted.js.map