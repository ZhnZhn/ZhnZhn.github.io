import { useRef, useCallback, useEffect } from 'react';
import focusNode from '../zhn-utils/focusNode';

const useRefFocusPrev = () => {
  const ref = useRef()
  , _refPrev = useRef()
  , focus = useCallback(_ =>  {
     _refPrev.current = document.activeElement
     focusNode(ref.current)
  }, [])
  , focusPrev = useCallback(_ => {
    focusNode(_refPrev.current)
    _refPrev.current = null
  }, []);

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(_ => {
    focus()
  }, [])
  // focus
  /*eslint-enable react-hooks/exhaustive-deps */

  return [ref, focus, focusPrev];
};

export default useRefFocusPrev
