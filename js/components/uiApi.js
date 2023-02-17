"use strict";

exports.__esModule = true;
exports.useState = exports.useRef = exports.useReducer = exports.useMemo = exports.useLayoutEffect = exports.useImperativeHandle = exports.useEffect = exports.useContext = exports.useCallback = exports.stopImmediatePropagation = exports.setRefValue = exports.memo = exports.isInputValid = exports.getRefValue = exports.getRefElementStyle = exports.getInputValue = exports.getClientY = exports.getClientX = exports.forwardRef = exports.focusRefElement = exports.createRef = exports.createElement = exports.createContext = exports.cloneElement = exports.Component = void 0;
var _react = require("react");
exports.Component = _react.Component;
exports.createRef = _react.createRef;
exports.createElement = _react.createElement;
exports.cloneElement = _react.cloneElement;
exports.createContext = _react.createContext;
exports.memo = _react.memo;
exports.forwardRef = _react.forwardRef;
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
const focusRefElement = (ref1, ref2) => {
  const _el = getRefValue(ref1) || getRefValue(ref2);
  if (_el && _isFn(_el.focus)) {
    _el.focus();
  }
};
exports.focusRefElement = focusRefElement;
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
const _getFirstTouches = touches => touches && touches[0] || {};
const _getTouchClientX = touches => _getFirstTouches(touches).clientX;
const _getTouchClientY = touches => _getFirstTouches(touches).clientY;
const getClientX = evt => evt.clientX || _getTouchClientX(evt.targetTouches) || _getTouchClientX(evt.changedTouches) || 0;
exports.getClientX = getClientX;
const getClientY = evt => evt.clientY || _getTouchClientY(evt.targetTouches) || _getTouchClientY(evt.changedTouches) || 0;
exports.getClientY = getClientY;
//# sourceMappingURL=uiApi.js.map