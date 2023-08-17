"use strict";

exports.__esModule = true;
exports.useState = exports.useRef = exports.useReducer = exports.useMemo = exports.useLayoutEffect = exports.useImperativeHandle = exports.useEffect = exports.useContext = exports.useCallback = exports.stopImmediatePropagation = exports.setRefValue = exports.memo = exports.lazy = exports.isInputValid = exports.getRefValue = exports.getRefOptions = exports.getRefElementStyle = exports.getInputValue = exports.getInputValidValue = exports.getClientY = exports.getClientX = exports.forwardRef = exports.focusRefElement = exports.focusElementById = exports.createRef = exports.createElement = exports.createContext = exports.cloneElement = exports.Suspense = exports.Component = exports.Children = void 0;
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
const focusRefElement = (ref1, ref2) => {
  _focusHtmlElement(getRefValue(ref1) || getRefValue(ref2));
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
const isInputValid = ref => {
  const inputComp = getRefValue(ref);
  return inputComp && _isFn(inputComp.isValid) ? inputComp.isValid() : false;
};
exports.isInputValid = isInputValid;
const getInputValue = ref => {
  const inputComp = getRefValue(ref);
  return inputComp && _isFn(inputComp.getValue) ? inputComp.getValue() : void 0;
};
exports.getInputValue = getInputValue;
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
const getClientX = _fGetEvt(CLIENT_X, _getTouchClientX);
exports.getClientX = getClientX;
const getClientY = _fGetEvt(CLIENT_Y, _getTouchClientY);
exports.getClientY = getClientY;
//# sourceMappingURL=uiApi.js.map