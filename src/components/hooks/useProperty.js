import {
  useRef,
  useMemo
} from 'react';

const useProperty = (
  initialValue
) => {
  const ref = useRef(initialValue);
  return useMemo(() => [
    //setValue
    v => { ref.current = v },
    //getValue
    () => ref.current
  ], []);
};

export default useProperty
