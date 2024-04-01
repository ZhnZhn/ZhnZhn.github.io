import {
  useRef,
  useEffect,
  getRefValue,
  setRefValue,
  focusRefElement,
  getComboboxElement
} from '../uiApi';

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
      const _inputEl = getComboboxElement(refRoot);
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
