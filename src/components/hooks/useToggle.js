import {
  isBool,
  isFn,
  isStr,
  isObj
} from '../../utils/isTypeFn';

import { useReducer } from '../uiApi';

const _initState = initialValue => !!initialValue
, _reducer = (
  state,
  value
) => isBool(value)
  ? value
  : !state;

export const useToggle = (
  initialValue
) => useReducer(
  _reducer,
  initialValue,
  _initState
)

const hasOwnProperty = Object.prototype.hasOwnProperty
, _isNotOwnBooleanPropsEqual = (
  state,
  stateSlice
) => {
  let propName;
  for(propName in stateSlice) {
    if (hasOwnProperty.call(stateSlice, propName)) {
      if (!isBool(stateSlice[propName])) {
        return;
      }
      if (state[propName] !== stateSlice[propName]) {
        return !0;
      }
    }
  }
}
, _initToggleState = (
  initialValue
) => isFn(initialValue)
  ? initialValue()
  : initialValue
, _reducerToggleState = (
  state,
  propNameOrStateSlice
) => isStr(propNameOrStateSlice)
 ? {
     ...state,
     [propNameOrStateSlice]: !state[propNameOrStateSlice]
   }
 : isObj(propNameOrStateSlice)
   && _isNotOwnBooleanPropsEqual(state, propNameOrStateSlice)
     ? {
         ...state,
         ...propNameOrStateSlice
       }
     : state;

export const useToggleState = (
  initialValue
) => useReducer(
  _reducerToggleState,
  initialValue || {},
  _initToggleState
)

export default useToggle
