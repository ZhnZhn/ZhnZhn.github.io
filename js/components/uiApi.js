"use strict";

exports.__esModule = true;
exports.useState = exports.useRef = exports.useMemo = exports.useEffect = exports.useContext = exports.useCallback = exports.setRefValue = exports.memo = exports.getRefValue = exports.createContext = void 0;

var _react = require("react");

exports.createContext = _react.createContext;
exports.memo = _react.memo;
exports.useContext = _react.useContext;
exports.useRef = _react.useRef;
exports.useState = _react.useState;
exports.useCallback = _react.useCallback;
exports.useMemo = _react.useMemo;
exports.useEffect = _react.useEffect;

const getRefValue = ref => (ref || {}).current;

exports.getRefValue = getRefValue;

const setRefValue = (ref, value) => {
  if (ref) {
    ref.current = value;
  }
};

exports.setRefValue = setRefValue;
//# sourceMappingURL=uiApi.js.map