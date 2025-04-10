"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _uiApi = require("../uiApi");
const hasOwnProperty = Object.prototype.hasOwnProperty,
  _isNotOwnBooleanPropsEqual = (state, stateSlice) => {
    let propName;
    for (propName in stateSlice) {
      if (hasOwnProperty.call(stateSlice, propName)) {
        if (!(0, _isTypeFn.isBool)(stateSlice[propName])) {
          return;
        }
        if (state[propName] !== stateSlice[propName]) {
          return true;
        }
      }
    }
  },
  _initState = initialValue => (0, _isTypeFn.isFn)(initialValue) ? initialValue() : initialValue,
  _reducer = (state, propNameOrStateSlice) => (0, _isTypeFn.isStr)(propNameOrStateSlice) ? {
    ...state,
    [propNameOrStateSlice]: !state[propNameOrStateSlice]
  } : (0, _isTypeFn.isObj)(propNameOrStateSlice) && _isNotOwnBooleanPropsEqual(state, propNameOrStateSlice) ? {
    ...state,
    ...propNameOrStateSlice
  } : state;
const useToggleState = initialValue => (0, _uiApi.useReducer)(_reducer, initialValue || {}, _initState);
var _default = exports.default = useToggleState;
//# sourceMappingURL=useToggleState.js.map