import {
  useRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  getRefValue,
  setRefValue,
  focusRefElement
} from '../uiApi';

const useDialogFocus = (
  isShow,
  ref,
  refBtMenuMore
) => {
  const refRoot = useRef()
  , _refPrevFocused = useRef()
  , _refIsShowPrev = useRef()
  /*eslint-disable react-hooks/exhaustive-deps */
  , focus = useCallback(() => {
      setRefValue(_refPrevFocused, document.activeElement)
      focusRefElement(refBtMenuMore, refRoot)
  }, [])
  // refBtMenuMore
  /*eslint-enable react-hooks/exhaustive-deps */
  , focusPrev = useCallback(()=>{
      focusRefElement(_refPrevFocused)
      setRefValue(_refPrevFocused, null)
  }, []);

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(()=>{
    const _isPrevShow = getRefValue(_refIsShowPrev);
    if (isShow && !_isPrevShow) {
      focus()
    } else if (!isShow && _isPrevShow) {
      focusPrev()
    }
    setRefValue(_refIsShowPrev, isShow)    
  }, [isShow])
  //focus, focusPrev
  useImperativeHandle(ref, () => ({
    focus,
    focusPrev
  }), [])
  //focus, focusPrev
  /*eslint-enable react-hooks/exhaustive-deps */

  return refRoot;
};

export default useDialogFocus
