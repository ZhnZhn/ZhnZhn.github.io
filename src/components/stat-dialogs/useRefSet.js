import { useRef, useCallback } from 'react';

const useRefSet = (initialValue) => {
  const ref = useRef(initialValue)
  , setRefValue = useCallback(value => {
    ref.current = value
  }, []);
  return [
    ref,
    setRefValue
  ];
};

export default useRefSet
