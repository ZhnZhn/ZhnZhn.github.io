import {
  useRef,
  useState,
  useMemo,
  useEffect,
  getRefValue,
  setRefValue
} from '../uiApi';

import { HAS_TOUCH_EVENTS } from '../has';

const useTouchHandlers = () => {
  const _refBlurId = useRef()
  , [
    isFocused,
    setIsFocused
  ] = useState()
  , [
    _hFocus,
    _hBlur
  ] = useMemo(() => [
    () => {
      clearTimeout(getRefValue(_refBlurId))
      setIsFocused(true)
    },
    () => {
      setRefValue(_refBlurId, setTimeout(
        () => setIsFocused(false),
        800
      ))
    }
  ], [])
  
  /*eslint-disable react-hooks/exhaustive-deps */
  , touchHandlers = useMemo(() => HAS_TOUCH_EVENTS
    ? {
        onFocus: _hFocus,
        onBlur: _hBlur
      }
    : void 0
  , [])
  // _hFocus, _hBlur
  /*eslint-enable react-hooks/exhaustive-deps */

  useEffect(() => () => {
    clearTimeout(getRefValue(_refBlurId))
  }, [])

  return [
    isFocused,
    touchHandlers
  ];
}

export default useTouchHandlers
