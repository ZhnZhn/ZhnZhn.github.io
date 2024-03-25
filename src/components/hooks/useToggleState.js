import {
  useReducer,
  isBool,
  isFn,
  isStr,
  isObj
} from '../uiApi';

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
        return true;
      }
    }
  }
}
, _initState = (
  initialValue
) => isFn(initialValue)
  ? initialValue()
  : initialValue
, _reducer = (
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

const useToggleState = (
  initialValue
) => useReducer(
  _reducer,
  initialValue || {},
  _initState
);

export default useToggleState
