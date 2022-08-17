"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

const useHasMounted = () => {
  const _ref = (0, _uiApi.useRef)(true),
        {
    current
  } = _ref;

  _ref.current = false;
  return current;
};

var _default = useHasMounted;
exports.default = _default;
//# sourceMappingURL=useHasMounted.js.map