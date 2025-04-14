"use strict";

exports.__esModule = true;
exports.useSyncExternalStore = exports.useState = exports.useRef = exports.useReducer = exports.useMemo = exports.useLayoutEffect = exports.useImperativeHandle = exports.useId = exports.useEffect = exports.useContext = exports.useCallback = exports.toHref = exports.stopImmediatePropagation = exports.stopDefaultFor = exports.setRefValue = exports.safeMap = exports.renderChildren = exports.memo = exports.lazy = exports.isRefElementContaintsEvtTarget = exports.isNumber = exports.isInputValid = exports.getRefValue = exports.getRefOptions = exports.getRefElementStyle = exports.getInputValue = exports.getInputValidValue = exports.getEventComposedPath = exports.getComboboxElement = exports.getClientY = exports.getClientX = exports.focusRefElement = exports.focusHtmlElement = exports.focusElementById = exports.createContext = exports.crObjWithNullPrototype = exports.cloneUiElement = exports.clearInputValue = exports.bindTo = exports.Suspense = exports.Component = void 0;
var _bindTo = require("../utils/bindTo");
exports.bindTo = _bindTo.bindTo;
var _react = require("react");
exports.Suspense = _react.Suspense;
exports.lazy = _react.lazy;
exports.Component = _react.Component;
exports.memo = _react.memo;
exports.createContext = _react.createContext;
exports.useContext = _react.useContext;
exports.useRef = _react.useRef;
exports.useId = _react.useId;
exports.useState = _react.useState;
exports.useReducer = _react.useReducer;
exports.useCallback = _react.useCallback;
exports.useMemo = _react.useMemo;
exports.useLayoutEffect = _react.useLayoutEffect;
exports.useEffect = _react.useEffect;
exports.useSyncExternalStore = _react.useSyncExternalStore;
exports.useImperativeHandle = _react.useImperativeHandle;
var _isTypeFn = require("../utils/isTypeFn");
exports.isArr = _isTypeFn.isArr;
exports.isFn = _isTypeFn.isFn;
exports.isNumber = _isTypeFn.isNumber;
var _jsxRuntime = require("react/jsx-runtime");
const crObjWithNullPrototype = () => Object.create(null);
exports.crObjWithNullPrototype = crObjWithNullPrototype;
const safeMap = (itemsOrItem, crElement) => (0, _isTypeFn.isArr)(itemsOrItem) ? itemsOrItem.length > 0 ? itemsOrItem.map(crElement) : null : (0, _isTypeFn.isObj)(itemsOrItem) ? crElement(itemsOrItem, 0) : null;
exports.safeMap = safeMap;
const cloneUiElement = function (Element, overrideProps, key) {
  if (key === void 0) {
    key = Element.key;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Element.type, {
    ...Element.props,
    ...overrideProps
  }, key);
};
exports.cloneUiElement = cloneUiElement;
const renderChildren = function (children) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return (0, _isTypeFn.isFn)(children) ? children(...args) : children;
};
exports.renderChildren = renderChildren;
const getRefValue = ref => (ref || {}).current;
exports.getRefValue = getRefValue;
const setRefValue = (ref, value) => {
  if (ref) {
    ref.current = value;
  }
};
exports.setRefValue = setRefValue;
const isRefElementContaintsEvtTarget = (ref, evt) => {
  const _el = getRefValue(ref);
  return _el && (0, _isTypeFn.isFn)(_el.contains) && _el.contains(evt.target);
};
exports.isRefElementContaintsEvtTarget = isRefElementContaintsEvtTarget;
const getRefElementStyle = ref => (getRefValue(ref) || {}).style;
exports.getRefElementStyle = getRefElementStyle;
const focusHtmlElement = element => {
  if (element && (0, _isTypeFn.isFn)(element.focus)) {
    element.focus();
  }
};
exports.focusHtmlElement = focusHtmlElement;
const _getValueFromFnOrRef = refOrFn => (0, _isTypeFn.isFn)(refOrFn) ? refOrFn() : getRefValue(refOrFn);
const focusRefElement = (fnOrRef1, fnOrRef2) => {
  focusHtmlElement(_getValueFromFnOrRef(fnOrRef1) || _getValueFromFnOrRef(fnOrRef2));
};
exports.focusRefElement = focusRefElement;
const focusElementById = id => {
  focusHtmlElement(document.getElementById(id));
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
const getEventComposedPath = evt => (0, _isTypeFn.isFn)(evt.composedPath) ? evt.composedPath() : evt.path || [];
exports.getEventComposedPath = getEventComposedPath;
const _fGetByPropName = (propName, dfValue) => ref => {
  const _inst = getRefValue(ref);
  return _inst && (0, _isTypeFn.isFn)(_inst[propName]) ? _inst[propName]() : dfValue;
};
const getRefOptions = exports.getRefOptions = _fGetByPropName("getOptions");
const isInputValid = exports.isInputValid = _fGetByPropName("isValid", false);
const getInputValue = exports.getInputValue = _fGetByPropName("getValue");
const getInputValidValue = (ref, dfValue) => isInputValid(ref) ? getInputValue(ref) : dfValue;
exports.getInputValidValue = getInputValidValue;
const clearInputValue = ref => {
  const inputInst = getRefValue(ref);
  if (inputInst && (0, _isTypeFn.isFn)(inputInst.setValue)) {
    inputInst.setValue('');
  }
};
exports.clearInputValue = clearInputValue;
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
const getComboboxElement = refRoot => {
  const _elRoot = getRefValue(refRoot);
  if (_elRoot) {
    const _comboboxNodeList = _elRoot.querySelectorAll('input[role="combobox"]');
    let i = 0,
      _elInput;
    for (; i < _comboboxNodeList.length; i++) {
      _elInput = _comboboxNodeList.item(i);
      if (_elInput && _elInput.clientHeight) {
        return _elInput;
      }
    }
  }
};
exports.getComboboxElement = getComboboxElement;
//# sourceMappingURL=uiApi.js.map