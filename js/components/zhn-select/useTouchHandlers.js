"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _has = require("../has");
const useTouchHandlers = () => {
  const _refBlurId = (0, _uiApi.useRef)(),
    [isFocused, setIsFocused] = (0, _uiApi.useState)();
  (0, _uiApi.useEffect)(() => () => {
    clearTimeout((0, _uiApi.getRefValue)(_refBlurId));
  }, []);
  return [isFocused, (0, _uiApi.useMemo)(() => _has.HAS_TOUCH_EVENTS ? {
    onFocus: () => {
      clearTimeout((0, _uiApi.getRefValue)(_refBlurId));
      setIsFocused(true);
    },
    onBlur: () => {
      (0, _uiApi.setRefValue)(_refBlurId, setTimeout(() => setIsFocused(false), 800));
    }
  } : void 0, [])];
};
var _default = exports.default = useTouchHandlers;
//# sourceMappingURL=useTouchHandlers.js.map