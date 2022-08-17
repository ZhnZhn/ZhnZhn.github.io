"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

const useHasNotEqual = value => {
  const _ref = (0, _uiApi.useRef)(value),
        {
    current
  } = _ref;

  _ref.current = value;
  return !(current === value);
};

var _default = useHasNotEqual;
exports.default = _default;
//# sourceMappingURL=useHasNotEqual.js.map