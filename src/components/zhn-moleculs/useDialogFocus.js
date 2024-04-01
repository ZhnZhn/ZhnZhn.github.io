import {
  useRef,
  useEffect,
  getRefValue,
  setRefValue,
  focusRefElement
} from '../uiApi';

const useDialogFocus = (
  isShow,
  refElementFocus
) => {
  const _refPrevFocused = useRef()
  , _refIsShowPrev = useRef();

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const _isPrevShow = getRefValue(_refIsShowPrev);
    if (isShow && !_isPrevShow) {
      setRefValue(_refPrevFocused, document.activeElement)
      focusRefElement(refElementFocus)
    } else if (!isShow && _isPrevShow) {
      focusRefElement(_refPrevFocused)
      setRefValue(_refPrevFocused, null)
    }
    setRefValue(_refIsShowPrev, isShow)
  }, [isShow])
  //refElementFocus
  /*eslint-disable react-hooks/exhaustive-deps */
};

export default useDialogFocus
