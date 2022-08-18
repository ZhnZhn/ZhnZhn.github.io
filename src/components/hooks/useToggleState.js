import { useReducer } from '../uiApi';

const _isFn = v => typeof v === 'function'
, _initState = (
  initialValue
) => _isFn(initialValue)
  ? initialValue()
  : initialValue
, _reducer = (
  state,
  propName
) => ({
  ...state,
  [propName]: !state[propName]
});

const useToggleState = (
  initialValue
) => useReducer(
  _reducer,
  initialValue || {},
  _initState
);

export default useToggleState
