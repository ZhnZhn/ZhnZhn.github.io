export {
  Component,
  createRef,
  createElement,
  cloneElement,

  createContext,
  memo,
  forwardRef,
  useContext,
  useRef,
  useState,
  useReducer,
  useCallback,
  useMemo,
  useLayoutEffect,
  useEffect,
  useImperativeHandle
} from 'react';

const _isFn = fn => typeof fn === 'function';

export const getRefValue = (
  ref
) => (ref || {}).current

export const setRefValue = (
  ref,
  value
) => {
  if (ref) {
    ref.current = value
  }
}

export const getRefElementStyle = (
  ref
) => (getRefValue(ref) || {}).style;

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

export const stopImmediatePropagation = (evt) => {
  evt.stopPropagation()
  evt.nativeEvent.stopImmediatePropagation()
}

export const isInputValid = ref => {
  const inputComp = getRefValue(ref);
  return inputComp && _isFn(inputComp.isValid)
    ? inputComp.isValid()
    : false;
}

export const getInputValue = ref => {
  const inputComp = getRefValue(ref);
  return inputComp && _isFn(inputComp.getValue)
    ? inputComp.getValue()
    : void 0
}

const _getFirstTouches = (
  touches
) => (touches && touches[0]) || {};

const _getTouchClientX = (
  touches
) => _getFirstTouches(touches).clientX;

const _getTouchClientY = (
  touches
) => _getFirstTouches(touches).clientY;

export const getClientX = (
  evt
) => evt.clientX
  || _getTouchClientX(evt.targetTouches)
  || _getTouchClientX(evt.changedTouches)
  || 0;

export const getClientY = (
  evt
) => evt.clientY
  || _getTouchClientY(evt.targetTouches)
  || _getTouchClientY(evt.changedTouches)
  || 0;
