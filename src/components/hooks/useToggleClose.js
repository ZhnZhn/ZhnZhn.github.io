import { useState } from '../uiApi';

const useToggleClose = (
  initialValue
) => {
  const [
    state,
    setState
  ] = useState(() => [
    !!initialValue,
    () => setState(prevState => [!prevState[0], prevState[1], prevState[2]]),
    () => setState(prevState => [false, prevState[1], prevState[2]]),
  ]);
  return state;
};

export default useToggleClose
