import {
  useRef,
  useEffect,
  getRefValue,
  setRefValue,
  focusRefElement
} from '../uiApi';

const _getComboboxElement = (
  refRoot
) => {
  const _elRoot = getRefValue(refRoot);
  if (_elRoot) {
    const _comboboxNodeList = _elRoot.querySelectorAll('input[role="combobox"]')
    let i = 0, _elInput;
    for (; i<_comboboxNodeList.length; i++){
      _elInput = _comboboxNodeList.item(i)
      if (_elInput && _elInput.clientHeight) {
        return _elInput;
      }
    }
  }
}

const useDialogFocus = (
  isShow,
  refBtMenuMore,
  isFocusCombobox
) => {
  const refRoot = useRef()
  , _refPrevFocused = useRef()
  , _refIsShowPrev = useRef();

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const _isPrevShow = getRefValue(_refIsShowPrev);
    if (isShow && !_isPrevShow) {
      //focus
      setRefValue(_refPrevFocused, document.activeElement)
      const _inputEl = _getComboboxElement(refRoot);
      focusRefElement(
        isFocusCombobox && _inputEl
           ? () => _inputEl
           : refBtMenuMore,
        refRoot
      )
    } else if (!isShow && _isPrevShow) {
      //focusPrev
      focusRefElement(_refPrevFocused)
      setRefValue(_refPrevFocused, null)
    }
    setRefValue(_refIsShowPrev, isShow)
  }, [isShow])
  //refBtMenuMore
  /*eslint-enable react-hooks/exhaustive-deps */

  return refRoot;
};

export default useDialogFocus
