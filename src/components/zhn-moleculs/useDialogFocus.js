import {
  useRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  getRefValue,
  focusRefElement
} from '../uiApi';

const useDialogFocus = (
  ref,
  isShow
) => {
  const refRoot = useRef()
  , refBtMore = useRef()
  , _refPrevFocused = useRef()
  , _refIsShowPrev = useRef()
  , focus = useCallback(() => {
      _refPrevFocused.current = document.activeElement
      focusRefElement(refBtMore, refRoot)
  }, [])
  , focusPrev = useCallback(()=>{
      focusRefElement(_refPrevFocused)
      _refPrevFocused.current = null
  }, []);

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(()=>{
    const _isPrevShow = getRefValue(_refIsShowPrev);
    if (isShow && !_isPrevShow) {
      focus()
    } else if (!isShow && _isPrevShow) {
      focusPrev()
    }
    _refIsShowPrev.current = isShow
  }, [isShow])
  //focus, focusPrev
  useImperativeHandle(ref, () => ({
    focus,
    focusPrev
  }), [])
  //focus, focusPrev
  /*eslint-enable react-hooks/exhaustive-deps */

  return [refRoot, refBtMore];
};

export default useDialogFocus
