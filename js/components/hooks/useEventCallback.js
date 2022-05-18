"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

const useEventCallback = handler => {
  const ref = (0, _react.useRef)(null);
  (0, _react.useLayoutEffect)(() => {
    ref.current = handler;
  });
  return (0, _react.useCallback)(function () {
    const fn = ref.current;
    return fn(...arguments);
  }, []);
};

var _default = useEventCallback;
exports.default = _default;
//# sourceMappingURL=useEventCallback.js.map