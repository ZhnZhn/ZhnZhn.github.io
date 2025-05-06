export { bindTo } from '../utils/bindTo';

export {
  Suspense,
  lazy,

  Component,

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
  isFn,
  isNumber
} from '../utils/isTypeFn';
import {
  isArr,
  isFn,
  isObj
} from '../utils/isTypeFn';

export const crObjWithNullPrototype = () => Object.create(null)

export const safeMap = (
  itemsOrItem,
  crElement
) => isArr(itemsOrItem)
  ? itemsOrItem.length > 0
      ? itemsOrItem.map(crElement)
      : null
  : isObj(itemsOrItem)
  ? crElement(itemsOrItem, 0)
  : null

export const cloneUiElement = (
  Element,
  overrideProps,
  key=Element.key
) => (<Element.type
  key={key}
  {...Element.props}
  {...overrideProps}
/>)

export const renderChildren = (
  children,
  ...args
) => isFn(children)
  ? children(...args)
  : children

export const IfTrue = (
  props
) => props.v
  ? props.children
  : null

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

const _fGetByPropName = (
  propName,
  dfValue
) => ref => {
  const _inst = getRefValue(ref);
  return _inst && isFn(_inst[propName])
    ? _inst[propName]()
    : dfValue;
};

export const getRefOptions = _fGetByPropName("getOptions")
export const isInputValid = _fGetByPropName("isValid", false)
export const getInputValue = _fGetByPropName("getValue")

export const getInputValidValue = (
  ref,
  dfValue
) => isInputValid(ref)
 ? getInputValue(ref)
 : dfValue

export const clearInputValue = ref => {
  const inputInst = getRefValue(ref);
  if (inputInst && isFn(inputInst.setValue)) {
    inputInst.setValue('')
  }
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
