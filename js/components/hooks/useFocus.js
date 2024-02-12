"use strict";

exports.__esModule = true;
exports.useRefFocusIf = exports.useRefFocusElement = exports.useFnFocus = exports.useAsyncFocusIf = void 0;
var _uiApi = require("../uiApi");
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
const useAsyncFocusIf = (is, getFocusElement, mls) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    if (is) {
      setTimeout(() => (0, _uiApi.focusRefElement)(getFocusElement), mls || 1000);
    }
  }, [is]);
  // getFocusElement, mls
  /*eslint-enable react-hooks/exhaustive-deps */
};
exports.useAsyncFocusIf = useAsyncFocusIf;
//# sourceMappingURL=useFocus.js.map