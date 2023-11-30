"use strict";

exports.__esModule = true;
exports.useState = exports.useRef = exports.useReducer = exports.useMemo = exports.useLayoutEffect = exports.useImperativeHandle = exports.useEffect = exports.useContext = exports.useCallback = exports.toHref = exports.stopImmediatePropagation = exports.stopDefaultFor = exports.setRefValue = exports.memo = exports.lazy = exports.isTokenInStr = exports.isInputValid = exports.getRefValue = exports.getRefOptions = exports.getRefElementStyle = exports.getInputValue = exports.getInputValidValue = exports.getClientY = exports.getClientX = exports.forwardRef = exports.focusRefElement = exports.focusElementById = exports.createRef = exports.createElement = exports.createContext = exports.cloneElement = exports.clearInputValue = exports.bindTo = exports.Suspense = exports.Component = exports.Children = void 0;
var _isTokenInStr = require("../utils/isTokenInStr");
exports.isTokenInStr = _isTokenInStr.isTokenInStr;
var _bindTo = require("../utils/bindTo");
exports.bindTo = _bindTo.bindTo;
var _react = require("react");
exports.Suspense = _react.Suspense;
exports.lazy = _react.lazy;
exports.Component = _react.Component;
exports.Children = _react.Children;
exports.createRef = _react.createRef;
exports.createElement = _react.createElement;
exports.cloneElement = _react.cloneElement;
exports.memo = _react.memo;
exports.forwardRef = _react.forwardRef;
exports.createContext = _react.createContext;
exports.useContext = _react.useContext;
exports.useRef = _react.useRef;
exports.useState = _react.useState;
exports.useReducer = _react.useReducer;
exports.useCallback = _react.useCallback;
exports.useMemo = _react.useMemo;
exports.useLayoutEffect = _react.useLayoutEffect;
exports.useEffect = _react.useEffect;
exports.useImperativeHandle = _react.useImperativeHandle;
const _isFn = fn => typeof fn === 'function';
const getRefValue = ref => (ref || {}).current;
exports.getRefValue = getRefValue;
const setRefValue = (ref, value) => {
  if (ref) {
    ref.current = value;
  }
};
exports.setRefValue = setRefValue;
const getRefElementStyle = ref => (getRefValue(ref) || {}).style;
exports.getRefElementStyle = getRefElementStyle;
const _focusHtmlElement = element => {
  if (element && _isFn(element.focus)) {
    element.focus();
  }
};
const _getValueFromFnOrRef = refOrFn => _isFn(refOrFn) ? refOrFn() : getRefValue(refOrFn);
const focusRefElement = (fnOrRef1, fnOrRef2) => {
  _focusHtmlElement(_getValueFromFnOrRef(fnOrRef1) || _getValueFromFnOrRef(fnOrRef2));
};
exports.focusRefElement = focusRefElement;
const focusElementById = id => {
  _focusHtmlElement(document.getElementById(id));
};
exports.focusElementById = focusElementById;
const stopImmediatePropagation = evt => {
  evt.stopPropagation();
  evt.nativeEvent.stopImmediatePropagation();
};
exports.stopImmediatePropagation = stopImmediatePropagation;
const stopDefaultFor = evt => {
  evt.stopPropagation();
  evt.preventDefault();
};
exports.stopDefaultFor = stopDefaultFor;
const isInputValid = ref => {
  const inputComp = getRefValue(ref);
  return inputComp && _isFn(inputComp.isValid) ? inputComp.isValid() : false;
};
exports.isInputValid = isInputValid;
const getInputValue = ref => {
  const inputInst = getRefValue(ref);
  return inputInst && _isFn(inputInst.getValue) ? inputInst.getValue() : void 0;
};
exports.getInputValue = getInputValue;
const clearInputValue = ref => {
  const inputInst = getRefValue(ref);
  if (inputInst && _isFn(inputInst.setValue)) {
    inputInst.setValue('');
  }
};
exports.clearInputValue = clearInputValue;
const getInputValidValue = (ref, dfValue) => isInputValid(ref) ? getInputValue(ref) : dfValue;
exports.getInputValidValue = getInputValidValue;
const getRefOptions = ref => {
  const _inst = getRefValue(ref);
  return _inst && _isFn(_inst.getOptions) ? _inst.getOptions() : void 0;
};
exports.getRefOptions = getRefOptions;
const _getFirstTouches = touches => touches && touches[0] || {},
  CLIENT_X = 'clientX',
  CLIENT_Y = 'clientY',
  _fGetTouch = propName => touches => _getFirstTouches(touches)[propName],
  _getTouchClientX = _fGetTouch(CLIENT_X),
  _getTouchClientY = _fGetTouch(CLIENT_Y),
  _fGetEvt = (propName, getTouch) => evt => evt[propName] || getTouch(evt.targetTouches) || getTouch(evt.changedTouches) || 0;
const getClientX = exports.getClientX = _fGetEvt(CLIENT_X, _getTouchClientX);
const getClientY = exports.getClientY = _fGetEvt(CLIENT_Y, _getTouchClientY);
const toHref = (href, isHttp) => {
  const protocol = (href || '').split('://')[0];
  return protocol === 'https' || isHttp && protocol === 'http' ? href : void 0;
};
exports.toHref = toHref;
//# sourceMappingURL=uiApi.js.map