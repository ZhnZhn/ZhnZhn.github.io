"use strict";

exports.__esModule = true;
exports.useState = exports.useRef = exports.useMemo = exports.useImperativeHandle = exports.useEffect = exports.useContext = exports.useCallback = exports.setRefValue = exports.memo = exports.isInputValid = exports.getRefValue = exports.getInputValue = exports.forwardRef = exports.focusRefElement = exports.createContext = void 0;

var _react = require("react");

exports.createContext = _react.createContext;
exports.memo = _react.memo;
exports.forwardRef = _react.forwardRef;
exports.useContext = _react.useContext;
exports.useRef = _react.useRef;
exports.useState = _react.useState;
exports.useCallback = _react.useCallback;
exports.useMemo = _react.useMemo;
exports.useEffect = _react.useEffect;
exports.useImperativeHandle = _react.useImperativeHandle;

const getRefValue = ref => (ref || {}).current;

exports.getRefValue = getRefValue;

const setRefValue = (ref, value) => {
  if (ref) {
    ref.current = value;
  }
};

exports.setRefValue = setRefValue;

const _isFn = fn => typeof fn === 'function';

const focusRefElement = (ref1, ref2) => {
  const _el = getRefValue(ref1) || getRefValue(ref2);

  if (_el && _isFn(_el.focus)) {
    _el.focus();
  }
};

exports.focusRefElement = focusRefElement;

const isInputValid = ref => {
  const inputComp = getRefValue(ref);
  return inputComp ? inputComp.isValid() : false;
};

exports.isInputValid = isInputValid;

const getInputValue = ref => {
  const inputComp = getRefValue(ref);
  return inputComp ? inputComp.getValue() : void 0;
};

exports.getInputValue = getInputValue;
//# sourceMappingURL=uiApi.js.map