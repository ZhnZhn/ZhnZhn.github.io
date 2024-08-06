"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const useHasNotEqual = value => {
  const _ref = (0, _uiApi.useRef)(value),
    isCurrentValue = (0, _uiApi.useCallback)(_value => _ref.current === _value, []),
    {
      current
    } = _ref;
  _ref.current = value;
  return [!(current === value), isCurrentValue];
};
var _default = exports.default = useHasNotEqual;
//# sourceMappingURL=useHasNotEqual.js.map