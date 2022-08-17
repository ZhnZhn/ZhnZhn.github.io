"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

const useEventCallback = handler => {
  const ref = (0, _uiApi.useRef)(null);
  (0, _uiApi.useLayoutEffect)(() => {
    ref.current = handler;
  });
  return (0, _uiApi.useCallback)(function () {
    const fn = ref.current;
    return fn(...arguments);
  }, []);
};

var _default = useEventCallback;
exports.default = _default;
//# sourceMappingURL=useEventCallback.js.map