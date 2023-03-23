"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const _getTypeOf = v => typeof v,
  hasOwnProperty = Object.prototype.hasOwnProperty,
  _isNotOwnBooleanPropsEqual = (state, stateSlice) => {
    let propName;
    for (propName in stateSlice) {
      if (hasOwnProperty.call(stateSlice, propName)) {
        if (_getTypeOf(stateSlice[propName]) !== 'boolean') {
          return;
        }
        if (state[propName] !== stateSlice[propName]) {
          return true;
        }
      }
    }
  },
  _initState = initialValue => _getTypeOf(initialValue) === 'function' ? initialValue() : initialValue,
  _reducer = (state, propNameOrStateSlice) => _getTypeOf(propNameOrStateSlice) === 'string' ? {
    ...state,
    [propNameOrStateSlice]: !state[propNameOrStateSlice]
  } : propNameOrStateSlice && _getTypeOf(propNameOrStateSlice) === 'object' && _isNotOwnBooleanPropsEqual(state, propNameOrStateSlice) ? {
    ...state,
    ...propNameOrStateSlice
  } : state;
const useToggleState = initialValue => (0, _uiApi.useReducer)(_reducer, initialValue || {}, _initState);
var _default = useToggleState;
exports.default = _default;
//# sourceMappingURL=useToggleState.js.map