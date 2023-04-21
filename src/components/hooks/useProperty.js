import {
  useRef,
  useMemo
} from '../uiApi';

const useProperty = (
  initialValue,
  dfValue
) => {
  const ref = useRef(initialValue);
  /*eslint-disable react-hooks/exhaustive-deps */
  return useMemo(() => [
    //setValue
    v => { ref.current = v },
    //getValue
    () => ref.current || dfValue
  ], []);
  // dfValue
  /*eslint-enable react-hooks/exhaustive-deps */
};

export default useProperty
