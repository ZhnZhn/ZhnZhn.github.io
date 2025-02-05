export { isTokenInStr } from '../utils/isTokenInStr';
export { bindTo } from '../utils/bindTo';
export { joinBy } from '../utils/arrFn';

export {
  Suspense,
  lazy,

  Component,
  createRef,
  memo,

  createContext,
  useContext,
  useRef,
  useId,
  useState,
  useReducer,
  useCallback,
  useMemo,
  useLayoutEffect,
  useEffect,
  useSyncExternalStore,
  useImperativeHandle
} from 'react';

export {
  isArr,
  isBool,
  isFn,
  isNumber,
  isStr,
  isUndef,
  isObj
} from '../utils/isTypeFn';
import {
  isArr,
  isFn,
  isObj
} from '../utils/isTypeFn';

export const crObjWithNullPrototype = () => Object.create(null)

export const safeMap = (
  items,
  crElement
) => isArr(items) && items.length > 0
  ? items.map(crElement)
  : null

export const safeMapElements = (
  elementsOrElement,
  crElement
) => !isArr(elementsOrElement) && isObj(elementsOrElement)
  ? crElement(elementsOrElement, 0)
  : safeMap(elementsOrElement, crElement)

export const cloneUiElement = (
  Element,
  overrideProps,
  key=Element.key
) => (<Element.type
  key={key}
  {...Element.props}
  {...overrideProps}
/>)

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

export const isRefElementContaintsEvtTarget = (
  ref,
  evt
) => {
  const _el = getRefValue(ref);
  return _el
    && isFn(_el.contains)
    && _el.contains(evt.target);
}

export const getRefElementStyle = (
  ref
) => (getRefValue(ref) || {}).style

export const focusHtmlElement = (
  element
) => {
  if (element && isFn(element.focus)) {
    element.focus()
  }
};

const _getValueFromFnOrRef = (
  refOrFn
) => isFn(refOrFn)
  ? refOrFn()
  : getRefValue(refOrFn);

export const focusRefElement = (
  fnOrRef1,
  fnOrRef2
) => {
  focusHtmlElement(
     _getValueFromFnOrRef(fnOrRef1)
     || _getValueFromFnOrRef(fnOrRef2)
  )
}

export const focusElementById = (
  id
) => {
  focusHtmlElement(
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

export const getEventComposedPath = evt => isFn(evt.composedPath)
  ? evt.composedPath()
  : evt.path || []

export const isInputValid = ref => {
  const inputComp = getRefValue(ref);
  return inputComp && isFn(inputComp.isValid)
    ? inputComp.isValid()
    : false;
}

export const getInputValue = ref => {
  const inputInst = getRefValue(ref);
  return inputInst && isFn(inputInst.getValue)
    ? inputInst.getValue()
    : void 0
}

export const clearInputValue = ref => {
  const inputInst = getRefValue(ref);
  if (inputInst && isFn(inputInst.setValue)) {
    inputInst.setValue('')
  }
}

export const getInputValidValue = (
  ref,
  dfValue
) => isInputValid(ref)
 ? getInputValue(ref)
 : dfValue

export const getRefOptions = (
  ref
) => {
  const _inst = getRefValue(ref)
  return _inst && isFn(_inst.getOptions)
    ? _inst.getOptions()
    : void 0
}

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
}

export const getComboboxElement = (
  refRoot
) => {
  const _elRoot = getRefValue(refRoot);
  if (_elRoot) {
    const _comboboxNodeList = _elRoot.querySelectorAll('input[role="combobox"]')
    let i = 0, _elInput;
    for (; i<_comboboxNodeList.length; i++){
      _elInput = _comboboxNodeList.item(i)
      if (_elInput && _elInput.clientHeight) {
        return _elInput;
      }
    }
  }
}
