"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

const useDialogFocus = (ref, isShow) => {
  const refRoot = (0, _uiApi.useRef)(),
        refBtMore = (0, _uiApi.useRef)(),
        _refPrevFocused = (0, _uiApi.useRef)(),
        _refIsShowPrev = (0, _uiApi.useRef)(),
        focus = (0, _uiApi.useCallback)(() => {
    _refPrevFocused.current = document.activeElement;
    (0, _uiApi.focusRefElement)(refBtMore, refRoot);
  }, []),
        focusPrev = (0, _uiApi.useCallback)(() => {
    (0, _uiApi.focusRefElement)(_refPrevFocused);
    _refPrevFocused.current = null;
  }, []);
  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _uiApi.useEffect)(() => {
    const _isPrevShow = (0, _uiApi.getRefValue)(_refIsShowPrev);

    if (isShow && !_isPrevShow) {
      focus();
    } else if (!isShow && _isPrevShow) {
      focusPrev();
    }

    _refIsShowPrev.current = isShow;
  }, [isShow]); //focus, focusPrev

  (0, _uiApi.useImperativeHandle)(ref, () => ({
    focus,
    focusPrev
  }), []); //focus, focusPrev

  /*eslint-enable react-hooks/exhaustive-deps */

  return [refRoot, refBtMore];
};

var _default = useDialogFocus;
exports.default = _default;
//# sourceMappingURL=useDialogFocus.js.map