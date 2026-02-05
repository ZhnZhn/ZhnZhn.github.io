"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const useDialogFocus = (isShow, refElementFocus1, refElementFocus2) => {
  const _refPrevFocused = (0, _uiApi.useRef)(),
    _refIsShowPrev = (0, _uiApi.useRef)();

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    const _isPrevShow = (0, _uiApi.getRefValue)(_refIsShowPrev);
    if (isShow && !_isPrevShow) {
      (0, _uiApi.setRefValue)(_refPrevFocused, document.activeElement);
      (0, _uiApi.focusRefElement)(refElementFocus1, refElementFocus2);
    } else if (!isShow && _isPrevShow) {
      (0, _uiApi.focusRefElement)(_refPrevFocused);
      (0, _uiApi.setRefValue)(_refPrevFocused, null);
    }
    (0, _uiApi.setRefValue)(_refIsShowPrev, isShow);
  }, [isShow]);
  //refElementFocus1, refElementFocus2
  /*eslint-enable react-hooks/exhaustive-deps */
};
var _default = exports.default = useDialogFocus;
//# sourceMappingURL=useDialogFocus.js.map