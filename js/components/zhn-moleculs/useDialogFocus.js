"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const _getComboboxElement = refRoot => {
  const _elRoot = (0, _uiApi.getRefValue)(refRoot);
  if (_elRoot) {
    const _comboboxNodeList = _elRoot.querySelectorAll('input[role="combobox"]');
    let i = 0,
      _elInput;
    for (; i < _comboboxNodeList.length; i++) {
      _elInput = _comboboxNodeList.item(i);
      if (_elInput && _elInput.clientHeight) {
        return _elInput;
      }
    }
  }
};
const useDialogFocus = (isShow, refBtMenuMore, isFocusCombobox) => {
  const refRoot = (0, _uiApi.useRef)(),
    _refPrevFocused = (0, _uiApi.useRef)(),
    _refIsShowPrev = (0, _uiApi.useRef)();

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    const _isPrevShow = (0, _uiApi.getRefValue)(_refIsShowPrev);
    if (isShow && !_isPrevShow) {
      //focus
      (0, _uiApi.setRefValue)(_refPrevFocused, document.activeElement);
      const _inputEl = _getComboboxElement(refRoot);
      (0, _uiApi.focusRefElement)(isFocusCombobox && _inputEl ? () => _inputEl : refBtMenuMore, refRoot);
    } else if (!isShow && _isPrevShow) {
      //focusPrev
      (0, _uiApi.focusRefElement)(_refPrevFocused);
      (0, _uiApi.setRefValue)(_refPrevFocused, null);
    }
    (0, _uiApi.setRefValue)(_refIsShowPrev, isShow);
  }, [isShow]);
  //refBtMenuMore
  /*eslint-enable react-hooks/exhaustive-deps */

  return refRoot;
};
var _default = exports.default = useDialogFocus;
//# sourceMappingURL=useDialogFocus.js.map