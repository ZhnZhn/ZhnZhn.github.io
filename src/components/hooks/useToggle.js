import {
  useReducer,
  isBool
} from '../uiApi';

const _initState = initialValue => !!initialValue
, _reducer = (
  state,
  value
) => isBool(value)
  ? value
  : !state;

const useToggle = (
  initialValue
) => useReducer(
  _reducer,
  initialValue,
  _initState
);

export default useToggle
