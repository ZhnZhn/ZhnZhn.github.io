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
