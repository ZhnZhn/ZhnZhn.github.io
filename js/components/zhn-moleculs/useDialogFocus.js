"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const useDialogFocus = (isShow, ref, refBtMenuMore) => {
  const refRoot = (0, _uiApi.useRef)(),
    _refPrevFocused = (0, _uiApi.useRef)(),
    _refIsShowPrev = (0, _uiApi.useRef)()
    /*eslint-disable react-hooks/exhaustive-deps */,
    focus = (0, _uiApi.useCallback)(() => {
      (0, _uiApi.setRefValue)(_refPrevFocused, document.activeElement);
      (0, _uiApi.focusRefElement)(refBtMenuMore, refRoot);
    }, [])
    // refBtMenuMore
    /*eslint-enable react-hooks/exhaustive-deps */,
    focusPrev = (0, _uiApi.useCallback)(() => {
      (0, _uiApi.focusRefElement)(_refPrevFocused);
      (0, _uiApi.setRefValue)(_refPrevFocused, null);
    }, []);

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    const _isPrevShow = (0, _uiApi.getRefValue)(_refIsShowPrev);
    if (isShow && !_isPrevShow) {
      focus();
    } else if (!isShow && _isPrevShow) {
      focusPrev();
    }
    (0, _uiApi.setRefValue)(_refIsShowPrev, isShow);
  }, [isShow]);
  //focus, focusPrev
  (0, _uiApi.useImperativeHandle)(ref, () => ({
    focus,
    focusPrev
  }), []);
  //focus, focusPrev
  /*eslint-enable react-hooks/exhaustive-deps */

  return refRoot;
};
var _default = useDialogFocus;
exports.default = _default;
//# sourceMappingURL=useDialogFocus.js.map