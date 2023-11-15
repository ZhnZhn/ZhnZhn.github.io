"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _has = require("../has");
const useTouchHandlers = () => {
  const _refBlurId = (0, _uiApi.useRef)(),
    [isFocused, setIsFocused] = (0, _uiApi.useState)(),
    [_hFocus, _hBlur] = (0, _uiApi.useMemo)(() => [() => {
      clearTimeout((0, _uiApi.getRefValue)(_refBlurId));
      setIsFocused(true);
    }, () => {
      (0, _uiApi.setRefValue)(_refBlurId, setTimeout(() => setIsFocused(false), 800));
    }], [])

    /*eslint-disable react-hooks/exhaustive-deps */,
    touchHandlers = (0, _uiApi.useMemo)(() => _has.HAS_TOUCH_EVENTS ? {
      onFocus: _hFocus,
      onBlur: _hBlur
    } : void 0, []);
  // _hFocus, _hBlur
  /*eslint-enable react-hooks/exhaustive-deps */

  (0, _uiApi.useEffect)(() => () => {
    clearTimeout((0, _uiApi.getRefValue)(_refBlurId));
  }, []);
  return [isFocused, touchHandlers];
};
var _default = exports.default = useTouchHandlers;
//# sourceMappingURL=useTouchHandlers.js.map