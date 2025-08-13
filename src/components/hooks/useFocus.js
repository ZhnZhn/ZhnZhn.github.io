import {
  useRef,
  useCallback,
  useEffect,
  setRefValue,
  focusRefElement
} from '../uiApi';
import { HAS_KEYBOARD_FOCUS } from '../has';

import useEffectTimeoutIf from './useEffectTimeoutIf';

export const useFnFocus = (fn) => {
  const _ref = useRef();
  return [
    _ref,
    /*eslint-disable react-hooks/exhaustive-deps */
    useCallback(() => {
      fn()
      focusRefElement(_ref)
    }, [])
    // fn
    /*eslint-enable react-hooks/exhaustive-deps */
  ];
}

export const useRefFocusElement = () => {
  const refFocusElement = useRef()
  , setRefFocusElement = useCallback(el => {
     setRefValue(refFocusElement, el)
  }, []);
  return [
    refFocusElement,
    setRefFocusElement
  ];
}

export const useRefFocusIf = (
  isRefFocus
) => {
  const ref = useRef();
  useEffect(() => {
    if (isRefFocus) {
      focusRefElement(ref)
    }
  }, [isRefFocus])
  return ref;
}

export const useAsyncFocusFirstItemIf = (
  isVisible,
  getFirstElement,
  mls = 350
) => {
  const _isFocus = HAS_KEYBOARD_FOCUS && isVisible;
  useEffectTimeoutIf(
    _isFocus,
    () => focusRefElement(getFirstElement),
    mls
  )
}

export const useFocusFirstItem = (
  isFocus
) => {
  const _refFirstItem = useRef();
  useAsyncFocusFirstItemIf(
    isFocus,
    _refFirstItem
  );
  return _refFirstItem
}
