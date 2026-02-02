"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.useToggleState = exports.useToggleAsync = exports.useToggle = exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _uiApi = require("../uiApi");
var _useEffectTimeoutIf = _interopRequireDefault(require("./useEffectTimeoutIf"));
const _initState = initialValue => !!initialValue,
  _reducer = (state, value) => (0, _isTypeFn.isBool)(value) ? value : !state;
const useToggle = initialValue => (0, _uiApi.useReducer)(_reducer, initialValue, _initState);
exports.useToggle = useToggle;
const useToggleAsync = (initialValue, fn, mls) => {
  const [is, toggle] = useToggle(initialValue);
  (0, _useEffectTimeoutIf.default)(!is, fn, mls || 300);
  return [is, toggle];
};
exports.useToggleAsync = useToggleAsync;
const _isNotOwnBooleanPropsEqual = (state, stateSlice) => {
    let propName;
    for (propName in stateSlice) {
      if ((0, _isTypeFn.hasOwnProperty)(stateSlice, propName)) {
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