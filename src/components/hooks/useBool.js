import { useState  } from '../uiApi';

const _crBoolState = (
  prevState,
  value
) => prevState[0] !== value ? [
  value,
  prevState[1],
  prevState[2]
] : prevState;

export const useBool = (initialValue) => {
  const [
     state,
     setState
  ] = useState(() => [
    !!initialValue,
    () => setState(prevState => _crBoolState(prevState, true)),
    () => setState(prevState => _crBoolState(prevState, false))
  ]);
  return state;
}

export const useToggleFalse = (
  initialValue
) => {
  const [
    state,
    setState
  ] = useState(() => [
    !!initialValue,
    () => setState(prevState => _crBoolState(prevState, !prevState[0])),
    () => setState(prevState => _crBoolState(prevState, false)),
  ]);
  return state;
}
