export { isTokenInStr } from '../utils/isTokenInStr';
export { bindTo } from '../utils/bindTo';

export {
  Suspense,
  lazy,

  Component,
  Children,
  createRef,
  createElement,
  cloneElement,
  memo,

  forwardRef,
  createContext,
  useContext,
  useRef,
  useState,
  useReducer,
  useCallback,
  useMemo,
  useLayoutEffect,
  useEffect,
  useSyncExternalStore,
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

const _focusHtmlElement = (
  element
) => {
  if (element && _isFn(element.focus)) {
    element.focus()
  }
}

const _getValueFromFnOrRef = (
  refOrFn
) => _isFn(refOrFn)
  ? refOrFn()
  : getRefValue(refOrFn)

export const focusRefElement = (
  fnOrRef1,
  fnOrRef2
) => {
  _focusHtmlElement(
     _getValueFromFnOrRef(fnOrRef1)
     || _getValueFromFnOrRef(fnOrRef2)
  )
}

export const focusElementById = (
  id
) => {
  _focusHtmlElement(
    document.getElementById(id)
  )
}

export const stopImmediatePropagation = (evt) => {
  evt.stopPropagation()
  evt.nativeEvent.stopImmediatePropagation()
}

export const stopDefaultFor = (evt) => {
  evt.stopPropagation()
  evt.preventDefault()
}

export const isInputValid = ref => {
  const inputComp = getRefValue(ref);
  return inputComp && _isFn(inputComp.isValid)
    ? inputComp.isValid()
    : false;
}

export const getInputValue = ref => {
  const inputInst = getRefValue(ref);
  return inputInst && _isFn(inputInst.getValue)
    ? inputInst.getValue()
    : void 0
}

export const clearInputValue = ref => {
  const inputInst = getRefValue(ref);
  if (inputInst && _isFn(inputInst.setValue)) {
    inputInst.setValue('')
  }
}

export const getInputValidValue = (
  ref,
  dfValue
) => isInputValid(ref)
  ? getInputValue(ref)
  : dfValue;

export const getRefOptions = (
  ref
) => {
  const _inst = getRefValue(ref)
  return _inst && _isFn(_inst.getOptions)
    ? _inst.getOptions()
    : void 0
};

const _getFirstTouches = (
  touches
) => (touches && touches[0]) || {}
, CLIENT_X = 'clientX'
, CLIENT_Y = 'clientY'
, _fGetTouch = (propName) => (
  touches
) => _getFirstTouches(touches)[propName]
, _getTouchClientX = _fGetTouch(CLIENT_X)
, _getTouchClientY = _fGetTouch(CLIENT_Y)
, _fGetEvt = (propName, getTouch) => (
  evt
) => evt[propName]
  || getTouch(evt.targetTouches)
  || getTouch(evt.changedTouches)
  || 0;

export const getClientX = _fGetEvt(CLIENT_X, _getTouchClientX)
export const getClientY = _fGetEvt(CLIENT_Y, _getTouchClientY)

export const toHref = (href, isHttp) => {
  const protocol = (href || '')
   .split('://')[0];
  return protocol === 'https'
     || ( isHttp && protocol === 'http')
   ? href
   : void 0;
};
