"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.useRefFocusIf = exports.useRefFocusElement = exports.useFocusFirstItem = exports.useFnFocus = exports.useAsyncFocusFirstItemIf = void 0;
var _uiApi = require("../uiApi");
var _has = require("../has");
var _useEffectTimeoutIf = _interopRequireDefault(require("./useEffectTimeoutIf"));
const useFnFocus = fn => {
  const _ref = (0, _uiApi.useRef)();
  return [_ref, /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useCallback)(() => {
    fn();
    (0, _uiApi.focusRefElement)(_ref);
  }, [])
  // fn
  /*eslint-enable react-hooks/exhaustive-deps */];
};
exports.useFnFocus = useFnFocus;
const useRefFocusElement = () => {
  const refFocusElement = (0, _uiApi.useRef)(),
    setRefFocusElement = (0, _uiApi.useCallback)(el => {
      (0, _uiApi.setRefValue)(refFocusElement, el);
    }, []);
  return [refFocusElement, setRefFocusElement];
};
exports.useRefFocusElement = useRefFocusElement;
const useRefFocusIf = isRefFocus => {
  const ref = (0, _uiApi.useRef)();
  (0, _uiApi.useEffect)(() => {
    if (isRefFocus) {
      (0, _uiApi.focusRefElement)(ref);
    }
  }, [isRefFocus]);
  return ref;
};
exports.useRefFocusIf = useRefFocusIf;
const useAsyncFocusFirstItemIf = function (isVisible, getFirstElement, mls) {
  if (mls === void 0) {
    mls = 350;
  }
  const _isFocus = _has.HAS_KEYBOARD_FOCUS && isVisible;
  (0, _useEffectTimeoutIf.default)(_isFocus, () => (0, _uiApi.focusRefElement)(getFirstElement), mls);
};
exports.useAsyncFocusFirstItemIf = useAsyncFocusFirstItemIf;
const useFocusFirstItem = isFocus => {
  const _refFirstItem = (0, _uiApi.useRef)();
  useAsyncFocusFirstItemIf(isFocus, _refFirstItem);
  return _refFirstItem;
};
exports.useFocusFirstItem = useFocusFirstItem;
//# sourceMappingURL=useFocus.js.map