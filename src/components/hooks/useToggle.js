import { useReducer } from '../uiApi';

const _isBool = v => typeof v === 'boolean'
, _initState = (initialValue) => !!initialValue
, _reducer = (
  state,
  value
) => _isBool(value)
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
