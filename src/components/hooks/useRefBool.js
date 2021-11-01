import { useRef, useCallback } from 'react';

const useRefBool = initialValue => {
  const ref = useRef(initialValue)
  , setTrue = useCallback(() => {
    ref.current = true
  }, [])
  , setFalse = useCallback(() => {
    ref.current = false
  }, []);
  return [ref, setTrue, setFalse];
};

export default useRefBool
