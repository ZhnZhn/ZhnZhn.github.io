export {
  createContext,
  memo,
  forwardRef,
  useContext,
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useImperativeHandle
} from 'react';

export const getRefValue = ref => (ref || {}).current

export const setRefValue = (
  ref,
  value
) => {
  if (ref) {
    ref.current = value
  }
}

const _isFn = fn => typeof fn === 'function';

export const focusRefElement = (
  ref1,
  ref2
) => {
  const _el = getRefValue(ref1)
    || getRefValue(ref2);
  if (_el && _isFn(_el.focus)) {
    _el.focus()
  }
}

export const isInputValid = ref => {
  const inputComp = getRefValue(ref);
  return inputComp
    ? inputComp.isValid()
    : false;
}

export const getInputValue = ref => {
  const inputComp = getRefValue(ref);
  return inputComp
    ? inputComp.getValue()
    : void 0
}
