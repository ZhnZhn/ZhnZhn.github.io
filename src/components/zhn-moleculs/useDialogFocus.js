import { useRef, useCallback, useEffect } from 'react';
import focusNode from '../zhn-utils/focusNode';

const _getRefValue = ref => ref.current;

const useDialogFocus = (isShow, refBtMore, refRootDiv) => {
  const  _refPrevFocused = useRef()
  , _refIsShow = useRef(isShow)
  /*eslint-disable react-hooks/exhaustive-deps */
  , focus = useCallback(() => {
      _refPrevFocused.current = document.activeElement
      focusNode(_getRefValue(refBtMore) || _getRefValue(refRootDiv))
  }, [])
  //refBtMore, refRootDiv
  /*eslint-enable react-hooks/exhaustive-deps */
  , focusPrev = useCallback(()=>{
      focusNode(_getRefValue(_refPrevFocused))
      _refPrevFocused.current = null
  }, []);

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(()=>{
    const _isPrevShow = _getRefValue(_refIsShow);
    if (isShow && !_isPrevShow) {
      focus()
    } else if (!isShow && _isPrevShow) {
      focusPrev()
    }
    _refIsShow.current = isShow
  }, [isShow])
  //focus, focusPrev
  /*eslint-enable react-hooks/exhaustive-deps */

  return [focus, focusPrev];
};

export default useDialogFocus
