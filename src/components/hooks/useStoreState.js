import { useState } from '../uiApi'

const useStoreState = (
  initialState,
  useStoreMessage,
  updateState
) => {
  const [
    state,
    setState
  ] = useState(initialState);
  useStoreMessage(storeMessage => updateState(storeMessage, setState, state))
  return [
    state,
    setState
  ];
};

export default useStoreState
