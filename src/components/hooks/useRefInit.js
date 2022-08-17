import { useRef } from '../uiApi';

const useRefInit = (crValue) => {
  const ref = useRef(null);
  if (ref.current === null) {
    ref.current = crValue()
  }
  return ref.current;
};

export default useRefInit
