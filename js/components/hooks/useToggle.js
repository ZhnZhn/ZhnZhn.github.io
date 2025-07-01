"use strict";

exports.__esModule = true;
exports.useToggleState = exports.useToggleAsync = exports.useToggle = exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _uiApi = require("../uiApi");
const _initState = initialValue => !!initialValue,
  _reducer = (state, value) => (0, _isTypeFn.isBool)(value) ? value : !state;
const useToggle = initialValue => (0, _uiApi.useReducer)(_reducer, initialValue, _initState);
exports.useToggle = useToggle;
const useToggleAsync = function (initialValue, fn, mls) {
  if (mls === void 0) {
    mls = 300;
  }
  const _refId = (0, _uiApi.useRef)(),
    [is, toggle] = useToggle(initialValue);
  /*eslint-disable react-hooks/exhaustive-deps*/
  (0, _uiApi.useEffect)(() => {
    if ((0, _isTypeFn.isFn)(fn)) {
      (0, _uiApi.setRefValue)(_refId, setTimeout(fn, mls));
    }
    return () => clearTimeout((0, _uiApi.getRefValue)(_refId));
  }, [is]);
  // fn, mls
  /*eslint-enable react-hooks/exhaustive-deps*/
  return [is, toggle];
};
exports.useToggleAsync = useToggleAsync;
const hasOwnProperty = Object.prototype.hasOwnProperty,
  _isNotOwnBooleanPropsEqual = (state, stateSlice) => {
    let propName;
    for (propName in stateSlice) {
      if (hasOwnProperty.call(stateSlice, propName)) {
        if (!(0, _isTypeFn.isBool)(stateSlice[propName])) {
          return;
        }
        if (state[propName] !== stateSlice[propName]) {
          return !0;
        }
      }
    }
  },
  _initToggleState = initialValue => (0, _isTypeFn.isFn)(initialValue) ? initialValue() : initialValue,
  _reducerToggleState = (state, propNameOrStateSlice) => (0, _isTypeFn.isStr)(propNameOrStateSlice) ? {
    ...state,
    [propNameOrStateSlice]: !state[propNameOrStateSlice]
  } : (0, _isTypeFn.isObj)(propNameOrStateSlice) && _isNotOwnBooleanPropsEqual(state, propNameOrStateSlice) ? {
    ...state,
    ...propNameOrStateSlice
  } : state;
const useToggleState = initialValue => (0, _uiApi.useReducer)(_reducerToggleState, initialValue || {}, _initToggleState);
exports.useToggleState = useToggleState;
var _default = exports.default = useToggle;
//# sourceMappingURL=useToggle.js.map