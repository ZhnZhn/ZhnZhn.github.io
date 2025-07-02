import {
  useRef,
  useCallback,
  useEffect,
  setRefValue,
  focusRefElement
} from '../uiApi';

import useEffectTimeout from './useEffectTimeout';

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

export const useAsyncFocusIf = (
  is,
  getFocusElement,
  mls
) => {
  useEffectTimeout(
    () => focusRefElement(getFocusElement),
    mls || 1000,
    [is],
    is
  )
}
