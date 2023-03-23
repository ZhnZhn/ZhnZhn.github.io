import { useReducer } from '../uiApi';

const _getTypeOf = v => typeof v
, hasOwnProperty = Object.prototype.hasOwnProperty
, _isNotOwnBooleanPropsEqual = (
  state,
  stateSlice
) => {
  let propName;
  for(propName in stateSlice) {
    if (hasOwnProperty.call(stateSlice, propName)) {
      if (_getTypeOf(stateSlice[propName]) !== 'boolean') {
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
) => _getTypeOf(initialValue) === 'function'
  ? initialValue()
  : initialValue
, _reducer = (
  state,
  propNameOrStateSlice
) => _getTypeOf(propNameOrStateSlice) === 'string'
 ? {
     ...state,
     [propNameOrStateSlice]: !state[propNameOrStateSlice]
   }
 : propNameOrStateSlice
   && _getTypeOf(propNameOrStateSlice) === 'object'
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
