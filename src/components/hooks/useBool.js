import { useState  } from '../uiApi';

const useBool = (initialValue) => {
  const [
     state,
     setState
  ] = useState(() => [
    !!initialValue,
    () => setState(prevState => [true, prevState[1], prevState[2]]),
    () => setState(prevState => [false, prevState[1], prevState[2]]),
  ]);
  return state;
};

export default useBool
